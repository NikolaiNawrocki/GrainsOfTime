import { defineField, defineType } from "sanity";
import { Inbox } from "lucide-react";

export const bookingInquiry = defineType({
  name: "bookingInquiry",
  title: "Booking Requests",
  type: "document",
  icon: Inbox,
  readOnly: true,
  description: "Inquiries submitted via the public /book form. Status can be updated as you coordinate with the client.",
  fields: [
    defineField({
      name: "name",
      title: "Contact Name",
      type: "string",
    }),
    defineField({
      name: "organization",
      title: "Organization / Event Host",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "eventDate",
      title: "Requested Performance Date",
      type: "string",
    }),
    defineField({
      name: "venue",
      title: "Venue & City",
      type: "string",
    }),
    defineField({
      name: "eventType",
      title: "Type of Event",
      type: "string",
    }),
    defineField({
      name: "gigDuration",
      title: "Gig Duration",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Event Details & Notes",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "submittedAt",
      title: "Submission Timestamp",
      type: "datetime",
    }),
    defineField({
      name: "inquiryStatus",
      title: "Status Workflow",
      type: "string",
      options: {
        list: [
          { title: "● New / Unread", value: "new" },
          { title: "◐ In Communication", value: "contacted" },
          { title: "✓ Confirmed Booking", value: "confirmed" },
          { title: "✕ Declined / Archived", value: "archived" },
        ],
      },
      initialValue: "new",
      readOnly: false,
      description: "Update this status as the Business Manager coordinates with the requester.",
    }),
  ],
  preview: {
    select: {
      name: "name",
      org: "organization",
      date: "eventDate",
      status: "inquiryStatus",
    },
    prepare({ name, org, date, status }) {
      const statusLabel: Record<string, string> = {
        new: "● New",
        contacted: "◐ Contacted",
        confirmed: "✓ Confirmed",
        archived: "✕ Archived",
      };
      return {
        title: `${name}${org ? ` (${org})` : ""}`,
        subtitle: `${date || "Date flexible"} — ${statusLabel[status] || "New"}`,
      };
    },
  },
});
