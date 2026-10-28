import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mic, Clock, HelpCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Book the Grains | Inquiries",
  description:
    "Hire Grains of Time for your university event, corporate reception, private celebration, or vocal showcase.",
};

export default async function BookPage() {
  const settings = await getSiteSettings();

  const heading = "Bring the Music to Your Event";

  const performanceDetails = [
    {
      icon: Mic,
      title: "Sound and Equipment",
      description:
        "We can perform without microphones in smaller spaces. For larger or outdoor venues, we recommend at least 3-5 microphones or a choir mic setup. For full concerts, our preferred setup includes 8-12 wireless handheld microphones, a dedicated bass/beatbox microphone, and stage monitors.",
    },
    {
      icon: Clock,
      title: "Advance Notice",
      description:
        "As full-time NC State students, we kindly ask that performance requests be submitted at least 3-4 weeks in advance.",
    },
  ];

  const faqs = [
    {
      q: "What styles of music does Grains of Time perform?",
      a: "Our repertoire includes contemporary pop, classic rock, traditional NC State songs, and holiday favorites, all arranged for our five-part vocal ensemble.",
    },
    {
      q: "How long is a typical performance?",
      a: "A performance can range from a short 5-10 minute appearance to a full 45-75 minute concert, depending on the event.",
    },
    {
      q: "Does Grains of Time travel outside of the Triangle?",
      a: "Yes! While we're based in Raleigh, we regularly travel throughout North Carolina and beyond for performances.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-grains-white">
      {/* Header */}
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-14 max-w-3xl">
          <SectionHeading
            title={heading}
          />
        </div>
      </ScrollReveal>

      {/* Main Grid: Form + Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Secure Inquiry Form */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="up" distance={20} duration={650}>
            <BookingForm />
          </ScrollReveal>
        </div>

        {/* Right Column: Performance Details, FAQs, and Additional Contact */}
        <div className="lg:col-span-5 space-y-8">
          {/* Box 1: Booking & Performance Details Card */}
          <ScrollReveal direction="up" distance={20} duration={650} delay={100}>
            <div className="p-6 sm:p-8 bg-grains-cream border border-grains-border rounded-sm space-y-6 shadow-subtle">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-grains-black font-semibold">
                Booking & Performance Details
              </h3>
              <div className="space-y-5">
                {performanceDetails.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-8 h-8 rounded-sm bg-white border border-grains-border flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-grains-red" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-serif text-grains-black font-medium">
                          {item.title}
                        </h4>
                        <p className="text-xs text-grains-text/80 font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Box 2: Frequently Asked Questions */}
          <ScrollReveal direction="up" distance={20} duration={650} delay={180}>
            <div className="p-6 sm:p-8 bg-grains-cream border border-grains-border rounded-sm space-y-6 shadow-subtle">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-grains-black font-semibold">
                <HelpCircle className="w-4 h-4 text-grains-red" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="space-y-1">
                    <h4 className="text-sm font-serif text-grains-black font-medium">
                      {faq.q}
                    </h4>
                    <p className="text-xs text-grains-text/80 font-sans leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Box 3: Additional Questions Box */}
          <ScrollReveal direction="up" distance={20} duration={650} delay={240}>
            <div className="p-6 sm:p-8 bg-grains-cream border border-grains-border rounded-sm shadow-subtle">
              <p className="text-xs sm:text-sm text-grains-text/85 font-sans leading-relaxed">
                For any additional questions, feel free to contact us at{" "}
                <a
                  href="mailto:ncstategrains@gmail.com"
                  className="text-grains-red hover:underline font-medium"
                >
                  ncstategrains@gmail.com
                </a>{" "}
                or through any of our social media pages!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
