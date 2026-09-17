import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Photo Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title / Subject",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
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
          title: "Photographer / Attribution Credit",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "year",
      title: "Year Taken (Optional)",
      type: "string",
      description: "e.g. 2024 or Circa 1982.",
    }),
    defineField({
      name: "tags",
      title: "Categories / Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Live Concerts", value: "concert" },
          { title: "Rehearsals & Process", value: "rehearsal" },
          { title: "Tours & Travel", value: "travel" },
          { title: "Archival & History", value: "archival" },
          { title: "Backstage & Brotherhood", value: "backstage" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured in Highlights",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      credit: "image.credit",
      media: "image",
    },
    prepare({ title, credit, media }) {
      return {
        title,
        subtitle: credit ? `Credit: ${credit}` : undefined,
        media,
      };
    },
  },
});
