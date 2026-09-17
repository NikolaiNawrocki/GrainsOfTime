import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mic, Volume2, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Book the Ensemble | Inquiries",
  description:
    "Hire Grains of Time for your university event, corporate reception, private celebration, or high school vocal masterclass.",
};

export default function BookPage() {
  const technicalGuidelines = [
    {
      icon: Volume2,
      title: "Acoustics & Sound",
      description:
        "For small intimate rooms (under 75 guests), we can perform completely unamplified. For auditoriums, gymnasiums, or outdoor events, sound reinforcement (at least 3–5 wireless vocal mics or an area choir array) is strongly recommended.",
    },
    {
      icon: Mic,
      title: "Microphone Setup",
      description:
        "For full collegiate-level amplified sets, our ideal configuration is 8–12 handheld wireless microphones and 1 dedicated bass/beatbox microphone with dedicated stage monitors.",
    },
    {
      icon: Clock,
      title: "Advance Notice",
      description:
        "Because all members are full-time undergraduate students at NC State, we kindly request inquiries at least 3–4 weeks prior to your target event date, especially around midterms and finals periods.",
    },
  ];

  const faqs = [
    {
      q: "What styles of music does Grains of Time perform?",
      a: "Our setlist encompasses contemporary pop hits, classic rock staples, R&B grooves, traditional NC State anthems, and seasonal holiday favorites—all arranged specifically for our 5-part vocal ensemble.",
    },
    {
      q: "How long is a typical performance?",
      a: "We accommodate performances ranging from a single national anthem or alma mater opener (5–10 minutes) up to a full two-act concert showcase (45–75 minutes).",
    },
    {
      q: "Does Grains of Time travel outside of the Triangle?",
      a: "Yes! While our primary performance hub is Raleigh and the Research Triangle, we regularly travel across North Carolina and the East Coast for festivals, high school clinics, and special events.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-14 max-w-3xl">
        <SectionHeading
          eyebrow="Commission & Hire"
          title="Bring the Sound to Your Event"
          subtitle="From NC State university convocations to private celebrations and masterclasses, Grains of Time brings unforgettable vocal energy to every stage."
        />
      </div>

      {/* Main Grid: Form + Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Secure Inquiry Form */}
        <div className="lg:col-span-7">
          <BookingForm />
        </div>

        {/* Right Column: Technical Rider & FAQs */}
        <div className="lg:col-span-5 space-y-8">
          {/* Performance Guidelines Card */}
          <div className="p-6 sm:p-8 bg-grains-surface border border-grains-border rounded-sm space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-grains-paper font-semibold">
              Performance Guidelines & Rider
            </h3>
            <div className="space-y-5">
              {technicalGuidelines.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-grains-red" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif text-grains-paper">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick FAQs */}
          <div className="p-6 sm:p-8 bg-grains-surface border border-grains-border rounded-sm space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-grains-paper font-semibold">
              <HelpCircle className="w-4 h-4 text-grains-red" />
              <span>Frequently Asked Questions</span>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="space-y-1">
                  <h4 className="text-sm font-serif text-grains-paper">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
