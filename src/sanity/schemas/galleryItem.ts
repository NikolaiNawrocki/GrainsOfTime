import { defineField, defineType } from 'sanity';
import { ImageIcon } from 'lucide-react';

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Photos',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'A short name so you can find this photo later (e.g. "Spring 2025 Showcase").',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Upload your photo here. Click the crop icon (✂) to choose which part stays visible when the photo is cropped on different screens.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Describe This Photo',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'A brief description for accessibility (e.g. "Grains of Time performing at Stewart Theatre").',
        }),
        defineField({
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
          description: 'Shown below the photo in the gallery.',
        }),
        defineField({
          name: 'credit',
          title: 'Photo Credit (optional)',
          type: 'string',
          description: 'Who took this photo? e.g. "Photo by Jane Smith" or "NC State Media".',
        }),
      ],
    }),
    defineField({
      name: 'year',
      title: 'Year Taken',
      type: 'string',
      description: 'e.g. "2024" or "Circa 1982". Helps visitors browse by year.',
    }),
    defineField({
      name: 'tags',
      title: 'Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Live Concerts', value: 'concert' },
          { title: 'Rehearsals', value: 'rehearsal' },
          { title: 'Tours & Travel', value: 'travel' },
          { title: 'Historical / Archival', value: 'archival' },
          { title: 'Backstage & Brotherhood', value: 'backstage' },
        ],
      },
      description: 'Choose one or more categories to help organize the gallery.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Turn this on to feature this photo on the homepage gallery section.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      credit: 'image.credit',
      year: 'year',
      media: 'image',
    },
    prepare({ title, credit, year, media }) {
      return {
        title,
        subtitle: [year, credit].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
