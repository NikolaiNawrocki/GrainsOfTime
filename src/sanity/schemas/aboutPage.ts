import { defineType, defineField } from 'sanity';
import { BookOpen } from 'lucide-react';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  icon: BookOpen,
  groups: [
    { name: 'header', title: 'Page Header', default: true },
    { name: 'story', title: 'Our Story' },
    { name: 'values', title: 'Mission & Values' },
  ],
  fields: [
    // Header group
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Page Title',
      group: 'header',
      initialValue: 'About Grains of Time',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 2,
      title: 'Page Subtitle',
      group: 'header',
      initialValue: "NC State's all-male a cappella ensemble, founded in 1968.",
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

    // Story group
    defineField({
      name: 'storyEyebrow',
      type: 'string',
      title: 'Small Label Above Story',
      group: 'story',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'storyBody',
      type: 'array',
      title: 'Our Story',
      group: 'story',
      description: 'The main text about the group. Use headings, bold, italic, and links as needed.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'pullQuote',
      type: 'object',
      title: 'Featured Quote',
      group: 'story',
      fields: [
        defineField({
          name: 'quote',
          type: 'text',
          rows: 3,
          title: 'Quote',
        }),
        defineField({
          name: 'attribution',
          type: 'string',
          title: 'Who Said This',
        }),
      ],
    }),

    // Values group
    defineField({
      name: 'missionHeading',
      type: 'string',
      title: 'Section Heading',
      group: 'values',
      initialValue: 'Our Mission',
    }),
    defineField({
      name: 'missionText',
      type: 'text',
      rows: 4,
      title: 'Mission Statement',
      group: 'values',
    }),
    defineField({
      name: 'valuesItems',
      type: 'array',
      title: 'Core Values',
      group: 'values',
      description: "List your group's core values or pillars.",
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
  ],
});
