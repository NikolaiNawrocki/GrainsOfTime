import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Disc, Mic2, Compass, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/ui/EditorialImage";

export const metadata: Metadata = {
  title: "About the Ensemble",
  description:
    "The story, tradition, and brotherhood of Grains of Time, NC State's all-male a cappella group founded in 1968.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Mic2,
      title: "Vocal Discipline",
      description:
        "Every arrangement is performed entirely without accompaniment. From punchy beatbox grooves to resonant bass pedals, every frequency is produced live by the human voice.",
    },
    {
      icon: Shield,
      title: "An Enduring Brotherhood",
      description:
        "Beyond musical performance, Grains of Time is a brotherhood spanning over five decades. Generations of alumni return to Raleigh annually to sing alongside current undergraduates.",
    },
    {
      icon: Compass,
      title: "Student-Led Craft",
      description:
        "Arrangements, choreography, staging, travel logistics, and rehearsals are managed entirely by active student officers and ensemble directors.",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <SectionHeading
          eyebrow="Heritage & Brotherhood"
          title="The Living Sound of NC State"
          subtitle="Founded in 1968, Grains of Time is North Carolina State University's premier all-male a cappella ensemble—merging historic tradition with contemporary vocal innovation."
        />

        {/* Hero Archival Image Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <EditorialImage
              aspectRatio="16/9"
              alt="Grains of Time ensemble on stage"
              placeholderLabel="Campus Showcase • Stewart Theatre"
              caption="Live ensemble performance representing NC State University in Raleigh."
              credit="Grains of Time Archive"
              priority
            />
          </div>
          <div className="lg:col-span-4 p-8 bg-grains-surface border border-grains-border rounded-sm space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-grains-red-bright uppercase block">
              Ensemble Profile
            </span>
            <h3 className="text-xl font-serif text-grains-paper">
              Fifty-Eight Years of Contemporary Harmony
            </h3>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              From traditional collegiate choral singing during the civil rights era to today&apos;s complex contemporary arrangements, Grains of Time embodies the creative spirit of North Carolina State.
            </p>
            <div className="pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-500 space-y-1">
              <p>INSTITUTION: NC State University</p>
              <p>FOUNDED: 1968 • Raleigh, NC</p>
              <p>GENRE: Contemporary A Cappella</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Narrative Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Chapter 1: The Founding */}
        <section className="space-y-4">
          <span className="text-xs font-mono text-grains-red uppercase tracking-[0.2em] block">
            Chapter 01
          </span>
          <h2 className="text-3xl font-serif text-grains-paper">
            The Inception in 1968
          </h2>
          <div className="text-zinc-300 font-sans leading-relaxed space-y-4 text-base">
            <p>
              In the late 1960s, a dedicated contingent of NC State vocalists sought to establish an all-male ensemble characterized by tight vocal blending, high energy, and authentic collegiate fellowship. What began as an intimate student collective soon grew into one of the most recognizable performing arts groups in Raleigh.
            </p>
            <p>
              The name <em>Grains of Time</em> symbolizes the accumulation of individual voices across the sands of time—each passing class contributing its unique timbre before handing the tuning fork to the next generation.
            </p>
          </div>
        </section>

        {/* Pull Quote */}
        <blockquote className="my-12 p-8 border-l-2 border-grains-red bg-grains-surface rounded-r-sm">
          <p className="text-xl sm:text-2xl font-serif italic text-grains-paper leading-snug">
            &ldquo;In a cappella, there is nowhere to hide. Every breath, pitch bend, and rhythmic subdivision rests on the person standing next to you.&rdquo;
          </p>
          <cite className="mt-4 block text-xs font-mono tracking-widest text-zinc-500 uppercase not-italic">
            — Grains of Time Rehearsal Tradition
          </cite>
        </blockquote>

        {/* Chapter 2: The Sound & Brotherhood */}
        <section className="space-y-4">
          <span className="text-xs font-mono text-grains-red uppercase tracking-[0.2em] block">
            Chapter 02
          </span>
          <h2 className="text-3xl font-serif text-grains-paper">
            The Rehearsal Room & Craft
          </h2>
          <div className="text-zinc-300 font-sans leading-relaxed space-y-4 text-base">
            <p>
              Twice a week inside the practice rooms of Price Music Center on NC State’s campus, the ensemble gathers to workshop new charts. Baritones lock into bass overtones; tenors navigate delicate falsetto leads; vocal percussionists develop acoustic kick drums and crisp snare taps using precision microphone technique.
            </p>
            <p>
              The repertoire spans contemporary chart-toppers, classic rock staples, R&B grooves, and perennial NC State fight songs. Every arrangement is written by members or alumni, tailored to the group&apos;s exact vocal contours.
            </p>
          </div>
        </section>

        {/* Values / Pillars */}
        <section className="pt-8">
          <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-8 block">
            Core Tenets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 bg-grains-surface border border-grains-border rounded-sm space-y-3"
                >
                  <Icon className="w-5 h-5 text-grains-red" />
                  <h4 className="text-lg font-serif text-grains-paper">
                    {v.title}
                  </h4>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Bar */}
        <div className="mt-16 p-8 bg-gradient-to-r from-zinc-950 via-grains-surface to-zinc-950 border border-grains-border rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-serif text-grains-paper">
              Want to see Grains of Time live?
            </h4>
            <p className="text-sm text-zinc-400 font-sans">
              Check our upcoming semester showcase schedule or inquire about booking us for your event.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/events"
              className="px-4 py-2.5 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap"
            >
              Upcoming Shows
            </Link>
            <Link
              href="/book"
              className="px-4 py-2.5 bg-grains-surface hover:bg-grains-surface-elevated border border-grains-border text-zinc-300 hover:text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap"
            >
              Book Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
