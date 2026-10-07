"use client";

import { useActionState, useState } from "react";
import { submitBookingInquiry, BookingActionState } from "@/app/actions/book";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

const initialState: BookingActionState = {
  success: false,
  message: "",
};

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(
    submitBookingInquiry,
    initialState
  );
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (state.success) {
    return (
      <div className="p-8 sm:p-12 bg-white border border-emerald-400/40 rounded-sm text-center space-y-4 shadow-subtle">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-2xl font-serif text-grains-black">
          Inquiry Received
        </h3>
        <p className="text-sm text-grains-text/80 font-sans max-w-md mx-auto leading-relaxed">
          {state.message}
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-grains-cream hover:bg-grains-cream-dark text-grains-black text-xs font-mono tracking-widest uppercase rounded-sm border border-grains-border transition-colors font-medium"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="p-6 sm:p-10 bg-white border border-grains-border rounded-sm space-y-6 shadow-subtle"
      noValidate
    >
      {/* Honeypot field (hidden from real users, filled by bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Leave this field blank</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.message && !state.success && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3 text-red-800 text-sm font-sans"
        >
          <AlertCircle className="w-5 h-5 text-grains-red shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Row 1: Name & Organization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Your Name <span className="text-grains-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-required="true"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            placeholder="Jane Doe"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
          {state.errors?.name && (
            <p id="name-error" className="text-xs text-red-600 font-mono">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="organization"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Organization / Client (Optional)
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            placeholder="NC State Department, Wedding, Festival"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Email Address <span className="text-grains-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            placeholder="jane@example.com"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
          {state.errors?.email && (
            <p id="email-error" className="text-xs text-red-600 font-mono">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(919) 555-0199"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
        </div>
      </div>

      {/* Row 3: Date & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="eventDate"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Event Date or Target Timeframe <span className="text-grains-red">*</span>
          </label>
          <input
            type="text"
            id="eventDate"
            name="eventDate"
            required
            aria-required="true"
            placeholder="e.g. October 24, 2026 or Fall Semester"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
          {state.errors?.eventDate && (
            <p className="text-xs text-red-600 font-mono">
              {state.errors.eventDate[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="venue"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Venue / City & State <span className="text-grains-red">*</span>
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            required
            aria-required="true"
            placeholder="Talley Student Union, Raleigh, NC"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
          {state.errors?.venue && (
            <p className="text-xs text-red-600 font-mono">
              {state.errors.venue[0]}
            </p>
          )}
        </div>
      </div>

      {/* Row 4: Event Type & Budget Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor="eventType"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Event Category <span className="text-grains-red">*</span>
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            defaultValue="Campus Event"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          >
            <option value="Campus Event">NC State Campus Event</option>
            <option value="Private Event">Private Event / Reception</option>
            <option value="Wedding">Wedding Performance</option>
            <option value="Festival">Festival or Concert Feature</option>
            <option value="Masterclass">Masterclass / School Workshop</option>
            <option value="Other">Other Performance</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="gigDuration"
            className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
          >
            Gig Duration (Optional)
          </label>
          <select
            id="gigDuration"
            name="gigDuration"
            defaultValue="Flexible / To Be Discussed"
            className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          >
            <option value="Under 15 minutes">Under 15 minutes (Anthem / Opener)</option>
            <option value="15 - 30 minutes">15 – 30 minutes</option>
            <option value="30 - 45 minutes">30 – 45 minutes</option>
            <option value="45 - 60 minutes">45 – 60 minutes</option>
            <option value="60+ minutes">60+ minutes (Full Concert / Feature)</option>
            <option value="Flexible / To Be Discussed">Flexible / To Be Discussed</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="text-xs font-mono uppercase tracking-widest text-grains-black block font-semibold"
        >
          Performance Details & Schedule <span className="text-grains-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-required="true"
          placeholder="Please describe the performance duration, desired repertoire style, sound system availability, and any specific requests..."
          className="w-full bg-white border border-grains-border rounded-sm px-4 py-2.5 text-sm text-grains-text placeholder-grains-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
        />
        {state.errors?.message && (
          <p className="text-xs text-red-600 font-mono">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-1 pt-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            className="mt-1 w-4 h-4 rounded-sm border-grains-border bg-white text-grains-red focus:ring-grains-red"
          />
          <label htmlFor="consent" className="text-xs text-grains-text/80 font-sans leading-normal">
            I understand that Grains of Time is an active student ensemble and performance confirmation is subject to academic schedules, rehearsal commitments, and technical feasibility.
          </label>
        </div>
        {state.errors?.consent && (
          <p className="text-xs text-red-600 font-mono">
            {state.errors.consent[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3.5 bg-grains-red hover:bg-grains-red-bright disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-subtle font-medium"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Performance Inquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
