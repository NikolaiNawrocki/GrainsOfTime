import { defineField, defineType } from 'sanity';
import { Music } from 'lucide-react';

export const repertoireItem = defineType({
  name: 'repertoireItem',
  title: 'Songs',
  type: 'document',
  icon: Music,
  fields: [
    defineField({
      name: 'title',
      title: 'Song Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'originalArtist',
      title: 'Original Artist',
      type: 'string',
      description: 'Who originally performed this song? e.g. "Stevie Wonder", "The Beatles".',
    }),
    defineField({
      name: 'arranger',
      title: 'Arranger',
      type: 'string',
      description: 'Who arranged this song for the group? Credit your student arrangers here.',
    }),
    defineField({
      name: 'status',
      title: 'Currently Performing?',
      type: 'string',
      options: {
        list: [
          { title: 'Yes — in our current setlist', value: 'current' },
          { title: 'No — a past arrangement', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          { title: 'Contemporary Pop', value: 'Contemporary Pop' },
          { title: 'Classic Rock', value: 'Classic Rock' },
          { title: 'Soul & R&B', value: 'Soul & R&B' },
          { title: 'Country', value: 'Country' },
          { title: 'NC State Tradition', value: 'NC State Tradition' },
          { title: 'Ballad / Choral', value: 'Ballad' },
        ],
      },
    }),
    defineField({
      name: 'yearPerformed',
      title: 'Season / Year',
      type: 'string',
      description: 'e.g. "2025–2026" or "Spring 2024".',
    }),
    defineField({
      name: 'listeningUrl',
      title: 'Listening Link (optional)',
      type: 'url',
      description: 'Link to a YouTube video, Spotify track, or other recording of this song.',
    }),
    defineField({
      name: 'notes',
      title: 'Notes (optional)',
      type: 'text',
      rows: 2,
      description: 'Any additional notes about this arrangement or its history.',
    }),
    defineField({
      name: 'order',
      title: 'Sort Position',
      type: 'number',
      initialValue: 10,
      description: 'Lower numbers appear first. Use 10, 20, 30 to leave room for inserting songs later.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'originalArtist',
      status: 'status',
    },
    prepare({ title, artist, status }) {
      const badge = status === 'current' ? '● Current' : '○ Past';
      return {
        title,
        subtitle: artist ? `${artist} — ${badge}` : badge,
      };
    },
  },
});
