import { defineField, defineType } from "sanity";

export const timelineEntry = defineType({
  name: "timelineEntry",
  title: "Timeline & History",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year / Date Range",
      type: "string",
      description: "e.g. '1968', '1974–1978', '1995', or 'Present Day'.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "era",
      title: "Era Label",
      type: "string",
      description: "e.g. 'The Inception', 'Campus Tradition', 'Modern Collegiate Era'.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "decade",
      title: "Decade Grouping",
      type: "string",
      options: {
        list: [
          { title: "1960s", value: "1960s" },
          { title: "1970s", value: "1970s" },
          { title: "1980s", value: "1980s" },
          { title: "1990s", value: "1990s" },
          { title: "2000s", value: "2000s" },
          { title: "2010s", value: "2010s" },
          { title: "2020s & Present", value: "2020s" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Milestone Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Chronological Sort Order",
      type: "number",
      initialValue: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "narrative",
      title: "Historical Narrative",
      type: "text",
      rows: 5,
      description: "Verified historical account. (Do not invent unverified historical claims).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "archivalImage",
      title: "Archival Photograph / Document",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
        defineField({
          name: "caption",
          title: "Photo Caption",
          type: "string",
        }),
        defineField({
          name: "credit",
          title: "Source / Archival Credit",
          type: "string",
          description: "e.g. NC State Special Collections, Grains of Time Archive, or specific alumnus.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "headline",
      year: "year",
      era: "era",
      media: "archivalImage",
    },
    prepare({ title, year, era, media }) {
      return {
        title: `[${year}] ${title}`,
        subtitle: era,
        media,
      };
    },
  },
});
