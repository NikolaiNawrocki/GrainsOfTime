import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mic2, Compass, Shield, LucideIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAboutPage } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About the Ensemble",
  description:
    "The story, tradition, and brotherhood of Grains of Time, NC State's all-male a cappella group founded in 1968.",
};

export default async function AboutPage() {
  const content = await getAboutPage();

  const eyebrow = content?.storyEyebrow || "Heritage & Brotherhood";
  const title = content?.heading || "The Living Sound of NC State";
  const subtitle =
    content?.subtitle ||
    "Founded in 1968, Grains of Time is North Carolina State University's premier all-male a cappella ensemble—merging historic tradition with contemporary vocal innovation.";

  // Profile Card
  const profileBadge = content?.profileBadge || "Ensemble Profile";
  const profileTitle = content?.profileTitle || "Fifty-Eight Years of Contemporary Harmony";
  const profileDescription =
    content?.profileDescription ||
    "From traditional collegiate choral singing during the civil rights era to today's complex contemporary arrangements, Grains of Time embodies the creative spirit of North Carolina State.";
  const profileInstitution = content?.profileInstitution || "NC State University";
  const profileFounded = content?.profileFounded || "1968 • Raleigh, NC";
  const profileGenre = content?.profileGenre || "Contemporary A Cappella";

  // Chapter 1
  const ch1Label = content?.chapter1?.chapterLabel || "Chapter 01";
  const ch1Title = content?.chapter1?.title || "The Inception in 1968";
  const ch1Content =
    content?.chapter1?.content ||
    "In the late 1960s, a dedicated contingent of NC State vocalists sought to establish an all-male ensemble characterized by tight vocal blending, high energy, and authentic collegiate fellowship. What began as an intimate student collective soon grew into one of the most recognizable performing arts groups in Raleigh.\n\nThe name Grains of Time symbolizes the accumulation of individual voices across the sands of time—each passing class contributing its unique timbre before handing the tuning fork to the next generation.";

  // Pull Quote
  const pullQuoteText =
    content?.pullQuote?.quote ||
    "In a cappella, there is nowhere to hide. Every breath, pitch bend, and rhythmic subdivision rests on the person standing next to you.";
  const pullQuoteCite =
    content?.pullQuote?.attribution || "— Grains of Time Rehearsal Tradition";

  // Chapter 2
  const ch2Label = content?.chapter2?.chapterLabel || "Chapter 02";
  const ch2Title = content?.chapter2?.title || "The Rehearsal Room & Craft";
  const ch2Content =
    content?.chapter2?.content ||
    "Twice a week inside the practice rooms of Price Music Center on NC State’s campus, the ensemble gathers to workshop new charts. Baritones lock into bass overtones; tenors navigate delicate falsetto leads; vocal percussionists develop acoustic kick drums and crisp snare taps using precision microphone technique.\n\nThe repertoire spans contemporary chart-toppers, classic rock staples, R&B grooves, and perennial NC State fight songs. Every arrangement is written by members or alumni, tailored to the group's exact vocal contours.";

  // Call to action
  const ctaHeading = content?.ctaHeading || "Want to see Grains of Time live?";
  const ctaDescription =
    content?.ctaDescription ||
    "Check our upcoming semester showcase schedule or inquire about booking us for your event.";
  const ctaPrimaryText = content?.ctaPrimaryText || "Upcoming Shows";
  const ctaPrimaryLink = content?.ctaPrimaryLink || "/events";
  const ctaSecondaryText = content?.ctaSecondaryText || "Book Us";
  const ctaSecondaryLink = content?.ctaSecondaryLink || "/book";

  const renderParagraphs = (text: string) => {
    return text.split(/\n\s*\n/).map((para, idx) => (
      <p key={idx}>{para.trim()}</p>
    ));
  };

  const defaultValues = [
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

  const valueIcons: LucideIcon[] = [Mic2, Shield, Compass];

  const displayValues =
    content?.valuesItems && content.valuesItems.length > 0
      ? content.valuesItems.map((item, idx) => ({
          icon: valueIcons[idx % valueIcons.length],
          title: item.title,
          description: item.description,
        }))
      : defaultValues;

  return (
    <div className="py-16 sm:py-24 bg-grains-white">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <ScrollReveal direction="up" distance={16} duration={600}>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </ScrollReveal>

        {/* Hero Archival Image Grid */}
        <ScrollReveal direction="up" distance={20} duration={700} delay={100}>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <EditorialImage
                image={content?.heroImage}
                src={content?.heroImage?.imageUrl || "/GrainsPhotos/MediaDay2026/IMG_4550.jpg"}
                aspectRatio="16/9"
                alt={content?.heroImage?.alt || "Grains of Time current active ensemble at NC State Memorial Belltower"}
                placeholderLabel="Ensemble Portrait • Memorial Belltower"
                credit="Grains of Time Media"
                priority
                containerClassName="shadow-editorial"
              />
            </div>
            <div className="lg:col-span-4 p-8 bg-grains-cream border border-grains-border rounded-sm space-y-4 shadow-subtle">
              <div className="flex items-center justify-between pb-2 border-b border-grains-border/70">
                <span className="text-[11px] font-mono tracking-widest text-grains-red uppercase block font-semibold">
                  {profileBadge}
                </span>
                <div className="w-8 h-8 rounded-full bg-grains-black p-1.5 flex items-center justify-center border border-grains-border shadow-sm">
                  <Image
                    src="/GrainsPhotos/grains-logo-.PNG"
                    alt="Grains of Time Logo"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-serif text-grains-black">
                {profileTitle}
              </h3>
              <p className="text-sm text-grains-text/80 font-sans leading-relaxed">
                {profileDescription}
              </p>
              <div className="pt-4 border-t border-grains-border text-xs font-mono text-grains-muted space-y-1">
                <p>INSTITUTION: {profileInstitution}</p>
                <p>FOUNDED: {profileFounded}</p>
                <p>GENRE: {profileGenre}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Editorial Narrative Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Chapter 1 */}
        <ScrollReveal direction="up" distance={20} duration={650}>
          <section className="space-y-4">
            <span className="text-xs font-mono text-grains-red uppercase tracking-[0.2em] block font-semibold">
              {ch1Label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-grains-black font-normal">
              {ch1Title}
            </h2>
            <div className="text-grains-text/85 font-sans leading-relaxed space-y-4 text-base">
              {renderParagraphs(ch1Content)}
            </div>
          </section>
        </ScrollReveal>

        {/* Pull Quote in Soft Cream */}
        <ScrollReveal direction="up" distance={20} duration={650}>
          <blockquote className="my-12 p-8 sm:p-10 border-l-4 border-grains-red bg-grains-cream rounded-r-sm shadow-subtle">
            <p className="text-xl sm:text-2xl font-serif italic text-grains-black leading-snug">
              &ldquo;{pullQuoteText}&rdquo;
            </p>
            <cite className="mt-4 block text-xs font-mono tracking-widest text-grains-muted uppercase not-italic font-medium">
              {pullQuoteCite}
            </cite>
          </blockquote>
        </ScrollReveal>

        {/* Chapter 2 */}
        <ScrollReveal direction="up" distance={20} duration={650}>
          <section className="space-y-4">
            <span className="text-xs font-mono text-grains-red uppercase tracking-[0.2em] block font-semibold">
              {ch2Label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-grains-black font-normal">
              {ch2Title}
            </h2>
            <div className="text-grains-text/85 font-sans leading-relaxed space-y-4 text-base">
              {renderParagraphs(ch2Content)}
            </div>
          </section>
        </ScrollReveal>

        {/* Additional Chapters (if configured in Studio) */}
        {content?.additionalChapters && content.additionalChapters.length > 0 && (
          <div className="space-y-20">
            {content.additionalChapters.map((ch, idx) => (
              <ScrollReveal key={idx} direction="up" distance={20} duration={650}>
                <section className="space-y-4">
                  {ch.chapterLabel && (
                    <span className="text-xs font-mono text-grains-red uppercase tracking-[0.2em] block font-semibold">
                      {ch.chapterLabel}
                    </span>
                  )}
                  <h2 className="text-3xl sm:text-4xl font-serif text-grains-black font-normal">
                    {ch.title}
                  </h2>
                  {ch.content && (
                    <div className="text-grains-text/85 font-sans leading-relaxed space-y-4 text-base">
                      {renderParagraphs(ch.content)}
                    </div>
                  )}
                </section>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Supplemental Rich Text Story (if provided) */}
        {content?.storyBody && content.storyBody.length > 0 && (
          <ScrollReveal direction="up" distance={20} duration={650}>
            <div className="prose prose-zinc max-w-none text-grains-text/85 font-sans leading-relaxed">
              <PortableText value={content.storyBody} />
            </div>
          </ScrollReveal>
        )}

        {/* Values / Pillars */}
        <section className="pt-8">
          <ScrollReveal direction="up" distance={16} duration={600}>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-grains-muted mb-8 block font-semibold">
              {content?.missionHeading || "Core Tenets"}
            </h3>
            {content?.missionText && (
              <p className="text-base text-grains-text/85 font-sans leading-relaxed mb-8">
                {content.missionText}
              </p>
            )}
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayValues.map((v, idx) => {
              const Icon = v.icon;
              return (
                <ScrollReveal
                  key={v.title}
                  direction="up"
                  distance={20}
                  duration={650}
                  delay={idx * 100}
                  className="h-full"
                >
                  <div className="p-6 bg-grains-cream border border-grains-border rounded-sm space-y-3 shadow-subtle h-full">
                    <Icon className="w-5 h-5 text-grains-red" />
                    <h4 className="text-lg font-serif text-grains-black">
                      {v.title}
                    </h4>
                    <p className="text-sm text-grains-text/75 font-sans leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Call to Action Bar in Primary Black */}
        <ScrollReveal direction="up" distance={20} duration={700}>
          <div className="mt-16 p-8 sm:p-10 bg-grains-black text-white rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-editorial">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-serif text-white">
                {ctaHeading}
              </h4>
              <p className="text-sm text-slate-300 font-sans">
                {ctaDescription}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={ctaPrimaryLink}
                className="px-5 py-3 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap shadow-subtle font-medium"
              >
                {ctaPrimaryText}
              </Link>
              <Link
                href={ctaSecondaryLink}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap"
              >
                {ctaSecondaryText}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
