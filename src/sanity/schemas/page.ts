import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow / Subheading",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Lead Paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Editorial Page Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
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
              title: "Credit",
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
          title: "Attribution",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description (Optional)",
      type: "text",
      rows: 2,
    }),
  ],
});
