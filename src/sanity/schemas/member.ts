import { defineField, defineType } from 'sanity';
import { UserCircle } from 'lucide-react';

export const member = defineType({
  name: 'member',
  title: 'Members',
  type: 'document',
  icon: UserCircle,
  groups: [
    { name: 'basics', title: 'Basic Info', default: true },
    { name: 'photo', title: 'Portrait' },
    { name: 'details', title: 'Personal Details' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Name',
      type: 'slug',
      group: 'basics',
      options: { source: 'name', maxLength: 96 },
      description: 'Click "Generate" — this creates the web address for this member. You don\'t need to type this yourself.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Member Status',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'Current Member', value: 'active' },
          { title: 'Alumni / Former Member', value: 'alumni' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      description: 'When a member graduates, change this to "Alumni" and they will automatically move to the alumni section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vocalPart',
      title: 'Vocal Part',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'Tenor 1', value: 'Tenor 1' },
          { title: 'Tenor 2', value: 'Tenor 2' },
          { title: 'Tenor 2 / Baritone 1', value: 'Tenor 2 / Baritone 1' },
          { title: 'Baritone', value: 'Baritone' },
          { title: 'Baritone 2 / VP', value: 'Baritone 2 / VP' },
          { title: 'Bass', value: 'Bass' },
          { title: 'Bass / VP', value: 'Bass / VP' },
          { title: 'Vocal Percussion / Beatbox', value: 'Vocal Percussion' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadershipRole',
      title: 'Leadership Role (if any)',
      type: 'string',
      group: 'basics',
      description: 'e.g. President, Music Director, Business Manager. Leave empty for general members.',
    }),
    defineField({
      name: 'order',
      title: 'Sort Position',
      type: 'number',
      group: 'basics',
      description: 'Lower numbers appear first on the page. Use 10, 20, 30 so you can insert members between existing ones later.',
      initialValue: 10,
    }),
    // Portrait
    defineField({
      name: 'portrait',
      title: 'Portrait Photo',
      type: 'image',
      group: 'photo',
      options: { hotspot: true },
      description: 'Upload a headshot or portrait. Click the crop icon (✂) to set the focal point on their face — this ensures mobile cropping never cuts off their head.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Describe This Photo',
          type: 'string',
          description: 'A brief description for accessibility (e.g. "Portrait of John Smith").',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown };
              if (parent?.asset && !alt) {
                return 'Please describe this photo for accessibility.';
              }
              return true;
            }),
        }),
      ],
    }),
    // Personal Details
    defineField({
      name: 'graduationYear',
      title: 'Graduation Year / Academic Standing',
      type: 'string',
      group: 'details',
      description: 'Academic standing or expected graduation year (e.g. Senior, Junior, Sophomore, Freshman, or 2026).',
    }),
    defineField({
      name: 'major',
      title: 'Major / Area of Study',
      type: 'string',
      group: 'details',
      description: 'e.g. Mechanical Engineering, Computer Science.',
    }),
    defineField({
      name: 'hometown',
      title: 'Hometown',
      type: 'string',
      group: 'details',
      description: 'e.g. Raleigh, NC or Charlotte, NC.',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
      group: 'details',
      description: 'A few sentences about this member.',
    }),
    defineField({
      name: 'funFact',
      title: 'Fun Fact (optional)',
      type: 'string',
      group: 'details',
      description: 'e.g. "Ask me about coffee brewing, vinyl collecting, or 90s R&B."',
    }),
    defineField({
      name: 'favoriteSong',
      title: 'Favorite Grains Song (optional)',
      type: 'string',
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'vocalPart',
      role: 'leadershipRole',
      media: 'portrait',
    },
    prepare({ title, subtitle, role, media }) {
      return {
        title,
        subtitle: role ? `${subtitle} · ${role}` : subtitle,
        media,
      };
    },
  },
});
