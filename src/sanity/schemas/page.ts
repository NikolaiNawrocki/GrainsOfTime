import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export const page = defineType({
  name: "page",
  title: "Custom Pages",
  type: "document",
  icon: FileText,
  description: "Create additional editorial pages beyond the core sections.",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Primary headline shown at the top of the page.",
    }),
    defineField({
      name: "slug",
      title: "URL Address",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "Click 'Generate' to automatically build the web address for this page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Category / Eyebrow Label",
      type: "string",
      description: "Small uppercase label above the title (e.g. 'Special Feature' or 'Announcements').",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Introductory Summary",
      type: "text",
      rows: 3,
      description: "Brief opening paragraph introducing the page content.",
    }),
    defineField({
      name: "body",
      title: "Page Content",
      type: "array",
      description: "Write formatted text, insert paragraphs, headers, and embed photographs.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Image Description",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "credit",
              title: "Photo Credit",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Featured Pull Quote (Optional)",
      type: "object",
      fields: [
        defineField({
          name: "quote",
          title: "Quote Text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "attribution",
          title: "Attribution / Source",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "Search & Social Summary (Optional)",
      type: "text",
      rows: 2,
      description: "Short summary shown on Google and social media cards when sharing this page.",
    }),
  ],
});
