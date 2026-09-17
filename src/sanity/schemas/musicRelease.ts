import { defineField, defineType } from "sanity";

export const musicRelease = defineType({
  name: "musicRelease",
  title: "Discography & Music",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Release Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "releaseYear",
      title: "Release Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "releaseType",
      title: "Release Type",
      type: "string",
      options: {
        list: [
          { title: "Album / LP", value: "Album" },
          { title: "EP", value: "EP" },
          { title: "Single", value: "Single" },
          { title: "Live Recording", value: "Live Recording" },
        ],
      },
      initialValue: "Album",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverArt",
      title: "Cover Artwork",
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
      ],
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL (Optional)",
      type: "url",
      description: "Direct link to album/single on Spotify.",
    }),
    defineField({
      name: "appleMusicUrl",
      title: "Apple Music URL (Optional)",
      type: "url",
    }),
    defineField({
      name: "tracklist",
      title: "Tracklist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "trackNumber",
              title: "Track Number",
              type: "number",
            }),
            defineField({
              name: "title",
              title: "Song Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "originalArtist",
              title: "Original Artist",
              type: "string",
            }),
            defineField({
              name: "soloist",
              title: "Soloist(s)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              num: "trackNumber",
              title: "title",
              soloist: "soloist",
            },
            prepare({ num, title, soloist }) {
              return {
                title: `${num ? num + ". " : ""}${title}`,
                subtitle: soloist ? `Solo: ${soloist}` : undefined,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "notes",
      title: "Credits & Liner Notes",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "releaseYear",
      type: "releaseType",
      media: "coverArt",
    },
    prepare({ title, year, type, media }) {
      return {
        title,
        subtitle: `${type} • ${year}`,
        media,
      };
    },
  },
});
