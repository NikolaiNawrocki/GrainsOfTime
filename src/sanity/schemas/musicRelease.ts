import { defineField, defineType } from "sanity";
import { Disc3 } from "lucide-react";

export const musicRelease = defineType({
  name: "musicRelease",
  title: "Discography & Releases",
  type: "document",
  icon: Disc3,
  groups: [
    { name: "basics", title: "Release Info", default: true },
    { name: "streaming", title: "Streaming Links" },
    { name: "tracks", title: "Tracklist" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Release Title",
      type: "string",
      group: "basics",
      validation: (Rule) => Rule.required(),
      description: "The name of this album, EP, or single (e.g. 'Standard Procedure').",
    }),
    defineField({
      name: "releaseYear",
      title: "Release Year",
      type: "string",
      group: "basics",
      validation: (Rule) => Rule.required(),
      description: "e.g. '2024' or '2019'.",
    }),
    defineField({
      name: "releaseType",
      title: "Format / Type",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "Full Album (LP)", value: "Album" },
          { title: "EP (Extended Play)", value: "EP" },
          { title: "Single", value: "Single" },
          { title: "Live Concert Recording", value: "Live Recording" },
        ],
      },
      initialValue: "Album",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverArt",
      title: "Cover Artwork",
      type: "image",
      group: "basics",
      options: { hotspot: true },
      description: "Upload the high-res cover art. Click the crop icon to set the focal center.",
      fields: [
        defineField({
          name: "alt",
          title: "Artwork Description",
          type: "string",
          description: "Accessibility description (e.g. 'Album cover of Standard Procedure').",
        }),
      ],
    }),
    defineField({
      name: "notes",
      title: "Liner Notes & Credits",
      type: "text",
      rows: 4,
      group: "basics",
      description: "Production credits, studio info, soloists, sound engineering, and acknowledgments.",
    }),
    // Streaming Links
    defineField({
      name: "spotifyUrl",
      title: "Spotify Album / Track Link",
      type: "url",
      group: "streaming",
      description: "Direct URL to listen on Spotify. Leave blank if not available.",
    }),
    defineField({
      name: "appleMusicUrl",
      title: "Apple Music Link",
      type: "url",
      group: "streaming",
      description: "Direct URL to listen on Apple Music. Leave blank if not available.",
    }),
    // Tracklist
    defineField({
      name: "tracklist",
      title: "Tracklist",
      type: "array",
      group: "tracks",
      description: "Add recorded tracks in album playback order.",
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
              title: "Track Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "originalArtist",
              title: "Original Artist / Composer",
              type: "string",
            }),
            defineField({
              name: "soloist",
              title: "Featured Soloist(s)",
              type: "string",
              description: "e.g. 'John Doe (Lead), Alex Smith (Vocal Percussion)'",
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
