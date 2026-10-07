"use server";

import { z } from "zod";
import { BookingSubmission } from "@/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Contact name must be at least 2 characters."),
  organization: z.string().optional(),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().optional(),
  eventDate: z.string().min(1, "Please provide an estimated event date."),
  venue: z.string().min(2, "Please specify a venue or city/state."),
  eventType: z.string().min(1, "Please select an event category."),
  gigDuration: z.string().optional(),
  message: z.string().min(10, "Please provide details regarding your performance request (at least 10 characters)."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge the booking policy." }),
  }),
  honeypot: z.string().max(0, "Spam detected."),
});

export type BookingActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitBookingInquiry(
  prevState: BookingActionState | null,
  formData: FormData
): Promise<BookingActionState> {
  const rawData: Record<string, any> = {
    name: formData.get("name"),
    organization: formData.get("organization") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    eventDate: formData.get("eventDate"),
    venue: formData.get("venue"),
    eventType: formData.get("eventType"),
    gigDuration: (formData.get("gigDuration") as string) || (formData.get("budgetRange") as string) || undefined,
    message: formData.get("message"),
    consent: formData.get("consent") === "on",
    honeypot: (formData.get("website_hp") as string) || "",
  };

  // 1. Validate with Zod
  const result = bookingSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data: BookingSubmission = result.data;

  // 2. Safe delivery abstraction
  const recipientEmail = process.env.BOOKING_RECIPIENT_EMAIL || "ncstategrains@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const fromAddress = process.env.RESEND_FROM_EMAIL || "Grains of Time Booking <onboarding@resend.dev>";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipientEmail],
          reply_to: data.email,
          subject: `New Performance Inquiry: ${data.name} (${data.eventType})`,
          text: `
New Grains of Time Booking Inquiry:
===================================
Name: ${data.name}
Organization: ${data.organization || "N/A"}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Date: ${data.eventDate}
Venue: ${data.venue}
Event Type: ${data.eventType}
Gig Duration: ${data.gigDuration || "Flexible / To Be Discussed"}

Message:
${data.message}
          `,
        }),
      });

      if (!response.ok) {
        console.warn("Failed to send booking notification email via Resend:", await response.text());
      }
    } catch (err) {
      console.error("Resend API error:", err);
    }
  } else {
    // Development / Setup Mode: Safely log inquiry to server console
    console.info("--- [NEW BOOKING INQUIRY RECEIVED] ---");
    console.info(`To: ${recipientEmail}`);
    console.info(`From: ${data.name} <${data.email}>`);
    console.info(`Date: ${data.eventDate} @ ${data.venue} (${data.eventType})`);
    console.info(`Message: ${data.message}`);
    console.info("---------------------------------------");
  }

  return {
    success: true,
    message: "Your inquiry has been submitted! A member of our executive committee will follow up within 2–3 business days.",
  };
}
