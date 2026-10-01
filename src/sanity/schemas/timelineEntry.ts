import { defineField, defineType } from "sanity";
import { Clock } from "lucide-react";

export const timelineEntry = defineType({
  name: "timelineEntry",
  title: "History & Timeline",
  type: "document",
  icon: Clock,
  fields: [
    defineField({
      name: "year",
      title: "Year / Date Range",
      type: "string",
      description: 'e.g. "1968", "1974–1978", or "Present Day".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Milestone Headline",
      type: "string",
      description: 'A clear headline for this milestone (e.g. "Grains of Time Founded").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "era",
      title: "Era Label",
      type: "string",
      description: 'Which period does this belong to? e.g. "The Inception", "Campus Tradition", "Modern Era".',
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
      description: "Used to group milestones on the interactive timeline.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "narrative",
      title: "Historical Narrative",
      type: "text",
      rows: 5,
      description: "Tell the story of this milestone. What occurred and why was it significant?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort Position",
      type: "number",
      initialValue: 10,
      description: "Lower numbers appear earlier in the timeline. Use 10, 20, 30 for flexible reordering.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "archivalImage",
      title: "Historical Photo / Document",
      type: "image",
      options: { hotspot: true },
      description: "Archival photograph, ticket stub, program scan, or historical media.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Description (for screen readers)",
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
          description: 'e.g. "NC State Special Collections", "Grains of Time Archive", or donor name.',
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
        title: `${year} — ${title}`,
        subtitle: era,
        media,
      };
    },
  },
});
