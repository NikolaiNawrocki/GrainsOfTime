import { defineField, defineType } from "sanity";

export const member = defineType({
  name: "member",
  title: "Members & Alumni",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Roster Status",
      type: "string",
      options: {
        list: [
          { title: "Current Active Member", value: "active" },
          { title: "Alumni / Former Member", value: "alumni" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vocalPart",
      title: "Vocal Part",
      type: "string",
      options: {
        list: [
          { title: "Tenor 1", value: "Tenor 1" },
          { title: "Tenor 2", value: "Tenor 2" },
          { title: "Baritone", value: "Baritone" },
          { title: "Bass", value: "Bass" },
          { title: "Vocal Percussion / Beatbox", value: "Vocal Percussion" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Numeric sort order within the section (lower numbers appear first).",
      initialValue: 10,
    }),
    defineField({
      name: "leadershipRole",
      title: "Executive / Leadership Role (Optional)",
      type: "string",
      description: "e.g. President, Music Director, Business Manager, Tour Coordinator.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive alt text (required if image is uploaded).",
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown };
              if (parent?.asset && !alt) {
                return "Alternative text is required for member portraits.";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "graduationYear",
      title: "Graduation / Class Year",
      type: "number",
      description: "Anticipated or actual graduation year (e.g. 2026).",
    }),
    defineField({
      name: "major",
      title: "Academic Discipline / Major",
      type: "string",
      description: "e.g. Mechanical Engineering, Computer Science, Architecture.",
    }),
    defineField({
      name: "hometown",
      title: "Hometown",
      type: "string",
      description: "e.g. Raleigh, NC or Charlotte, NC.",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
      description: "Short editorial biography.",
    }),
    defineField({
      name: "funFact",
      title: "Ask Me About / Fun Fact (Optional)",
      type: "string",
      description: "e.g. 'Coffee brewing, vinyl collecting, or 90s R&B.'",
    }),
    defineField({
      name: "favoriteSong",
      title: "Favorite Grains Song / Performance (Optional)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "vocalPart",
      role: "leadershipRole",
      media: "portrait",
    },
    prepare({ title, subtitle, role, media }) {
      return {
        title,
        subtitle: role ? `${subtitle} • ${role}` : subtitle,
        media,
      };
    },
  },
});
