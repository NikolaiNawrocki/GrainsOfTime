import { defineField, defineType } from 'sanity';
import { CalendarDays } from 'lucide-react';

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarDays,
  groups: [
    { name: 'details', title: 'Event Info', default: true },
    { name: 'location', title: 'Date & Location' },
    { name: 'tickets', title: 'Tickets & Admission' },
    { name: 'media', title: 'Event Poster' },
    { name: 'after', title: 'After the Event' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Spring 2027 Finale Showcase" or "Fall Auditions"',
    }),
    defineField({
      name: 'slug',
      title: 'URL Name',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      description: 'Click "Generate" to create automatically.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Concert / Showcase', value: 'concert' },
          { title: 'Campus Event', value: 'campus' },
          { title: 'Private Performance', value: 'private' },
          { title: 'Audition / Callout', value: 'audition' },
          { title: 'Tour / Festival', value: 'other' },
        ],
      },
      initialValue: 'concert',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Live — visible on the website', value: 'published' },
          { title: 'Draft — not visible yet', value: 'draft' },
          { title: 'Sold Out', value: 'sold_out' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Past Event — moved to archive', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      description: 'Controls whether this event appears on the public website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'details',
      description: 'Turn this on to highlight this event on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'summary',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      group: 'details',
      description: 'A brief summary shown on event cards (max 250 characters).',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'details',
      description: 'The complete event description. Use headings, bold, and links as needed.',
    }),
    // Date & Location
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time (optional)',
      type: 'datetime',
      group: 'location',
    }),
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      group: 'location',
      description: 'e.g. Stewart Theatre, Talley Student Union',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Venue Address',
      type: 'string',
      group: 'location',
      description: 'e.g. 2610 Cates Ave, Raleigh, NC 27606',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'location',
      initialValue: 'Raleigh, NC',
    }),
    // Tickets
    defineField({
      name: 'ticketUrl',
      title: 'Ticket / RSVP Link',
      type: 'url',
      group: 'tickets',
      description: 'Link to buy tickets or RSVP (e.g. Eventbrite, university tickets page). Leave empty if not applicable.',
    }),
    defineField({
      name: 'isFree',
      title: 'Free Admission',
      type: 'boolean',
      group: 'tickets',
      initialValue: false,
      description: 'Turn this on if the event has free admission.',
    }),
    defineField({
      name: 'accessibilityNotes',
      title: 'Accessibility Information (optional)',
      type: 'string',
      group: 'tickets',
      description: 'e.g. "Wheelchair accessible seating available" or "Assisted listening devices provided."',
    }),
    // Poster
    defineField({
      name: 'posterImage',
      title: 'Event Poster',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Upload your event poster or a promotional image. Click the crop icon to choose the focal point.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Describe This Image',
          type: 'string',
        }),
      ],
    }),
    // After the event
    defineField({
      name: 'setlist',
      title: 'Concert Setlist',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'after',
      description: 'After the concert, add the songs you performed for the archive.',
    }),
    defineField({
      name: 'recap',
      title: 'Event Recap',
      type: 'text',
      rows: 4,
      group: 'after',
      description: 'A short write-up about how the event went. This is shown on the archived event page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'startDate',
      venue: 'venue',
      status: 'status',
      media: 'posterImage',
    },
    prepare({ title, date, venue, status, media }) {
      const d = date ? new Date(date).toLocaleDateString() : 'Date TBA';
      const statusLabel: Record<string, string> = {
        published: '● Live',
        draft: '○ Draft',
        sold_out: '🔴 Sold Out',
        cancelled: '✕ Cancelled',
        archived: '◻ Archived',
      };
      return {
        title,
        subtitle: `${d} @ ${venue} — ${statusLabel[status] || status}`,
        media,
      };
    },
  },
});
