import { defineType, defineField } from 'sanity';
import { Home } from 'lucide-react';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: Home,
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'introduction', title: 'Introduction' },
    { name: 'quickLinks', title: 'Quick Links' },
    { name: 'featured', title: 'Featured Content' },
    { name: 'archival', title: 'Archival & Timeline Feature' },
  ],
  fields: [
    // Hero Section group
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      group: 'hero',
      options: { hotspot: true },
      description: 'The large photo at the top of your homepage. Click the crop icon (✂) to choose which part stays visible on phones.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Describe this image',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'heroHeading',
      type: 'string',
      title: 'Main Heading',
      group: 'hero',
      initialValue: 'Grains of Time',
      description: 'The big title displayed over the hero image.',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'string',
      title: 'Subtitle',
      group: 'hero',
      initialValue: "NC State's Premier All-Male A Cappella Ensemble",
      description: 'The smaller text that appears below the main heading.',
    }),
    defineField({
      name: 'heroTagline',
      type: 'text',
      rows: 2,
      title: 'Short Description',
      group: 'hero',
      initialValue: 'Individual voices accumulating into a lasting legacy.',
      description: 'A brief poetic line shown alongside the hero image.',
    }),
    defineField({
      name: 'heroDescription',
      type: 'text',
      rows: 3,
      title: 'About Snippet',
      group: 'hero',
      initialValue: 'Since 1968, Grains of Time has defined collegiate vocal music at NC State. Roots in tradition, an ear toward experimentation, and an unbreakable brotherhood.',
      description: 'A short paragraph introducing the group to new visitors.',
    }),

    // Introduction group
    defineField({
      name: 'pullQuoteText',
      type: 'text',
      rows: 3,
      title: 'Pull Quote',
      group: 'introduction',
      initialValue: 'No instruments. Just brotherhood, acoustic discipline, and arrangements forged over fifty-plus years in Raleigh.',
      description: 'A featured quote displayed prominently on the homepage.',
    }),
    defineField({
      name: 'pullQuoteAttribution',
      type: 'string',
      title: 'Quote Attribution',
      group: 'introduction',
      initialValue: 'Grains of Time Charter • North Carolina State University',
      description: 'Who said or wrote this quote.',
    }),
    defineField({
      name: 'pullQuoteEyebrow',
      type: 'string',
      title: 'Small Label Above Quote',
      group: 'introduction',
      initialValue: 'Tradition & Experimentation',
    }),

    // Quick Links group
    defineField({
      name: 'quickLinks',
      type: 'array',
      title: 'Homepage Cards',
      group: 'quickLinks',
      description: 'The four feature cards shown below the introduction. Each links to a page on the site.',
      validation: (Rule) => Rule.max(4),
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
            defineField({
              name: 'linkUrl',
              type: 'string',
              title: 'Link',
              description: 'e.g. /members, /events, /history',
            }),
            defineField({
              name: 'actionText',
              type: 'string',
              title: 'Button Text',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'actionText',
            },
          },
        },
      ],
    }),

    // Featured Content group
    defineField({
      name: 'showFeaturedEvent',
      type: 'boolean',
      title: 'Show Upcoming Event on Homepage',
      group: 'featured',
      initialValue: true,
      description: 'When turned on, the next upcoming event will be highlighted on the homepage.',
    }),
    defineField({
      name: 'galleryCount',
      type: 'number',
      title: 'Number of Gallery Photos to Show',
      group: 'featured',
      initialValue: 6,
      description: 'How many photos from the gallery appear on the homepage.',
      validation: (Rule) => Rule.min(0).max(12),
    }),
    defineField({
      name: 'primaryCtaText',
      type: 'string',
      title: 'Primary Button Text',
      group: 'featured',
      initialValue: 'Concert Schedule',
    }),
    defineField({
      name: 'primaryCtaLink',
      type: 'string',
      title: 'Primary Button Link',
      group: 'featured',
      initialValue: '/events',
    }),
    defineField({
      name: 'secondaryCtaText',
      type: 'string',
      title: 'Secondary Button Text',
      group: 'featured',
      initialValue: 'The Story Since 1968',
    }),
    defineField({
      name: 'secondaryCtaLink',
      type: 'string',
      title: 'Secondary Button Link',
      group: 'featured',
      initialValue: '/about',
    }),

    // Archival Feature group
    defineField({
      name: 'archivalEyebrow',
      type: 'string',
      title: 'Small Label Above Section',
      group: 'archival',
      initialValue: 'The Archive',
    }),
    defineField({
      name: 'archivalHeading',
      type: 'string',
      title: 'Section Heading',
      group: 'archival',
      initialValue: '1968: Where the Harmony Began',
    }),
    defineField({
      name: 'archivalSubtitle',
      type: 'text',
      rows: 2,
      title: 'Section Subtitle',
      group: 'archival',
      initialValue: 'More than half a century ago, a handful of NC State students gathered to sing without instruments. Today, that foundation remains unbroken.',
    }),
    defineField({
      name: 'archivalNarrative',
      type: 'text',
      rows: 5,
      title: 'Section Narrative',
      group: 'archival',
      description: 'Paragraphs can be separated by a blank line.',
      initialValue: 'From barbershop and collegiate choral classics in the late 1960s to contemporary pop, rock, and student-arranged soul charts today, Grains of Time reflects the spirit of North Carolina State University.\n\nEvery decade has contributed unique voices, legendary arrangements, and enduring friendships that span generations of alumni.',
    }),
    defineField({
      name: 'archivalImage',
      type: 'image',
      title: 'Archival Photograph',
      group: 'archival',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image Description',
          initialValue: 'Grains of Time brothers in unity under concert spotlights',
        }),
        defineField({
          name: 'credit',
          type: 'string',
          title: 'Photo Credit',
          initialValue: 'Grains of Time Archive',
        }),
      ],
    }),
    defineField({
      name: 'archivalStatFounded',
      type: 'number',
      title: 'Stat: Founded Year',
      group: 'archival',
      initialValue: 1968,
    }),
    defineField({
      name: 'archivalStatDecades',
      type: 'string',
      title: 'Stat: Decades Label',
      group: 'archival',
      initialValue: '5+',
    }),
    defineField({
      name: 'archivalStatRecordings',
      type: 'string',
      title: 'Stat: Recorded Tracks Label',
      group: 'archival',
      initialValue: '50+',
    }),
    defineField({
      name: 'archivalCtaText',
      type: 'string',
      title: 'Button Text',
      group: 'archival',
      initialValue: 'Explore Timeline (1968–Present)',
    }),
    defineField({
      name: 'archivalCtaLink',
      type: 'string',
      title: 'Button Link',
      group: 'archival',
      initialValue: '/history',
    }),
  ],
});
