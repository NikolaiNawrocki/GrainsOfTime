import { defineType, defineField } from 'sanity';
import { BookOpen } from 'lucide-react';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  icon: BookOpen,
  groups: [
    { name: 'header', title: 'Page Header & Profile', default: true },
    { name: 'story', title: 'Our Story & Chapters' },
    { name: 'values', title: 'Mission & Values' },
    { name: 'cta', title: 'Call to Action' },
  ],
  fields: [
    // Header group
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Page Title',
      group: 'header',
      initialValue: 'The Living Sound of NC State',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 2,
      title: 'Page Subtitle',
      group: 'header',
      initialValue: "Founded in 1968, Grains of Time is North Carolina State University's premier all-male a cappella ensemble—merging historic tradition with contemporary vocal innovation.",
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      group: 'header',
      description: 'A large photo at the top of the About page.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Ensemble Profile Card (displayed next to Hero Image)
    defineField({
      name: 'profileBadge',
      type: 'string',
      title: 'Profile Card Badge',
      group: 'header',
      initialValue: 'Ensemble Profile',
    }),
    defineField({
      name: 'profileTitle',
      type: 'string',
      title: 'Profile Card Heading',
      group: 'header',
      initialValue: 'Fifty-Eight Years of Contemporary Harmony',
    }),
    defineField({
      name: 'profileDescription',
      type: 'text',
      rows: 3,
      title: 'Profile Card Description',
      group: 'header',
      initialValue: "From traditional collegiate choral singing during the civil rights era to today's complex contemporary arrangements, Grains of Time embodies the creative spirit of North Carolina State.",
    }),
    defineField({
      name: 'profileInstitution',
      type: 'string',
      title: 'Institution Detail',
      group: 'header',
      initialValue: 'NC State University',
    }),
    defineField({
      name: 'profileFounded',
      type: 'string',
      title: 'Founded Detail',
      group: 'header',
      initialValue: '1968 • Raleigh, NC',
    }),
    defineField({
      name: 'profileGenre',
      type: 'string',
      title: 'Genre Detail',
      group: 'header',
      initialValue: 'Contemporary A Cappella',
    }),

    // Story & Chapters group
    defineField({
      name: 'storyEyebrow',
      type: 'string',
      title: 'Small Label Above Story',
      group: 'story',
      initialValue: 'Heritage & Brotherhood',
    }),

    // Chapter 01
    defineField({
      name: 'chapter1',
      type: 'object',
      title: 'Chapter 01',
      group: 'story',
      fields: [
        defineField({
          name: 'chapterLabel',
          type: 'string',
          title: 'Chapter Label',
          initialValue: 'Chapter 01',
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Chapter Title',
          initialValue: 'The Inception in 1968',
        }),
        defineField({
          name: 'content',
          type: 'text',
          rows: 6,
          title: 'Chapter Narrative',
          description: 'Paragraphs can be separated by a blank line.',
          initialValue: 'In the late 1960s, a dedicated contingent of NC State vocalists sought to establish an all-male ensemble characterized by tight vocal blending, high energy, and authentic collegiate fellowship. What began as an intimate student collective soon grew into one of the most recognizable performing arts groups in Raleigh.\n\nThe name Grains of Time symbolizes the accumulation of individual voices across the sands of time—each passing class contributing its unique timbre before handing the tuning fork to the next generation.',
        }),
      ],
    }),

    // Pull Quote
    defineField({
      name: 'pullQuote',
      type: 'object',
      title: 'Featured Quote (Between Chapters)',
      group: 'story',
      fields: [
        defineField({
          name: 'quote',
          type: 'text',
          rows: 3,
          title: 'Quote',
          initialValue: 'In a cappella, there is nowhere to hide. Every breath, pitch bend, and rhythmic subdivision rests on the person standing next to you.',
        }),
        defineField({
          name: 'attribution',
          type: 'string',
          title: 'Attribution / Who Said This',
          initialValue: '— Grains of Time Rehearsal Tradition',
        }),
      ],
    }),

    // Chapter 02
    defineField({
      name: 'chapter2',
      type: 'object',
      title: 'Chapter 02',
      group: 'story',
      fields: [
        defineField({
          name: 'chapterLabel',
          type: 'string',
          title: 'Chapter Label',
          initialValue: 'Chapter 02',
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Chapter Title',
          initialValue: 'The Rehearsal Room & Craft',
        }),
        defineField({
          name: 'content',
          type: 'text',
          rows: 6,
          title: 'Chapter Narrative',
          description: 'Paragraphs can be separated by a blank line.',
          initialValue: "Twice a week inside the practice rooms of Price Music Center on NC State’s campus, the ensemble gathers to workshop new charts. Baritones lock into bass overtones; tenors navigate delicate falsetto leads; vocal percussionists develop acoustic kick drums and crisp snare taps using precision microphone technique.\n\nThe repertoire spans contemporary chart-toppers, classic rock staples, R&B grooves, and perennial NC State fight songs. Every arrangement is written by members or alumni, tailored to the group's exact vocal contours.",
        }),
      ],
    }),

    // Additional Chapters
    defineField({
      name: 'additionalChapters',
      type: 'array',
      title: 'Additional Chapters (Optional)',
      group: 'story',
      description: 'Add more narrative chapters (e.g., Chapter 03, Chapter 04).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'chapterLabel',
              type: 'string',
              title: 'Chapter Label (e.g. Chapter 03)',
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Chapter Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              type: 'text',
              rows: 5,
              title: 'Narrative',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'chapterLabel',
            },
          },
        },
      ],
    }),

    // Rich Text Story Body (Alternative / Supplemental)
    defineField({
      name: 'storyBody',
      type: 'array',
      title: 'Rich Text Story (Supplemental / Custom Blocks)',
      group: 'story',
      description: 'Optional rich text blocks with custom headings, lists, and formatting.',
      of: [{ type: 'block' }],
    }),

    // Values group
    defineField({
      name: 'missionHeading',
      type: 'string',
      title: 'Section Heading',
      group: 'values',
      initialValue: 'Core Tenets',
    }),
    defineField({
      name: 'missionText',
      type: 'text',
      rows: 4,
      title: 'Mission Statement / Intro',
      group: 'values',
    }),
    defineField({
      name: 'valuesItems',
      type: 'array',
      title: 'Core Values & Pillars',
      group: 'values',
      description: "List the group's core values or pillars.",
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 2,
              title: 'Description',
            }),
          ],
        },
      ],
    }),

    // Call to Action group
    defineField({
      name: 'ctaHeading',
      type: 'string',
      title: 'Call to Action Heading',
      group: 'cta',
      initialValue: 'Want to see Grains of Time live?',
    }),
    defineField({
      name: 'ctaDescription',
      type: 'text',
      rows: 2,
      title: 'Call to Action Description',
      group: 'cta',
      initialValue: 'Check our upcoming semester showcase schedule or inquire about booking us for your event.',
    }),
    defineField({
      name: 'ctaPrimaryText',
      type: 'string',
      title: 'Primary Button Text',
      group: 'cta',
      initialValue: 'Upcoming Shows',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      type: 'string',
      title: 'Primary Button Link',
      group: 'cta',
      initialValue: '/events',
    }),
    defineField({
      name: 'ctaSecondaryText',
      type: 'string',
      title: 'Secondary Button Text',
      group: 'cta',
      initialValue: 'Book Us',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      type: 'string',
      title: 'Secondary Button Link',
      group: 'cta',
      initialValue: '/book',
    }),
  ],
});
