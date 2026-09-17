import { defineField, defineType } from "sanity";

export const repertoireItem = defineType({
  name: "repertoireItem",
  title: "Repertoire & Arrangements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Song Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "originalArtist",
      title: "Original Artist / Composer",
      type: "string",
    }),
    defineField({
      name: "arranger",
      title: "Arranger",
      type: "string",
      description: "Name of student arranger or professional collaborator.",
    }),
    defineField({
      name: "status",
      title: "Repertoire Status",
      type: "string",
      options: {
        list: [
          { title: "Current Concert Setlist", value: "current" },
          { title: "Archived Setlist", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "current",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category / Genre",
      type: "string",
      options: {
        list: [
          { title: "Contemporary Pop", value: "Contemporary Pop" },
          { title: "Classic Rock", value: "Classic Rock" },
          { title: "Soul & R&B", value: "Soul & R&B" },
          { title: "NC State Tradition", value: "NC State Tradition" },
          { title: "Ballad / Choral", value: "Ballad" },
        ],
      },
    }),
    defineField({
      name: "yearPerformed",
      title: "Academic Year / Season",
      type: "string",
      description: "e.g. '2025–2026' or 'Spring 2024'.",
    }),
    defineField({
      name: "listeningUrl",
      title: "External Listening Link (Optional)",
      type: "url",
      description: "Link to live performance video or official audio stream.",
    }),
    defineField({
      name: "notes",
      title: "Program Notes (Optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "title",
      artist: "originalArtist",
      status: "status",
    },
    prepare({ title, artist, status }) {
      return {
        title,
        subtitle: artist ? `${artist} (${status})` : `(${status})`,
      };
    },
  },
});
