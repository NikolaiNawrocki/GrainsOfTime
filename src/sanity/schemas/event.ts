import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Events & Concerts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time (Optional)",
      type: "datetime",
    }),
    defineField({
      name: "venue",
      title: "Venue Name",
      type: "string",
      description: "e.g. Stewart Theatre, Talley Student Union",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Venue Address",
      type: "string",
      description: "e.g. 2610 Cates Ave, Raleigh, NC 27606",
    }),
    defineField({
      name: "city",
      title: "City & State",
      type: "string",
      initialValue: "Raleigh, NC",
    }),
    defineField({
      name: "eventType",
      title: "Event Category",
      type: "string",
      options: {
        list: [
          { title: "Major Concert / Showcase", value: "concert" },
          { title: "NC State Campus Event", value: "campus" },
          { title: "Private / Commissioned Performance", value: "private" },
          { title: "Audition / Callout", value: "audition" },
          { title: "Tour / Festival", value: "other" },
        ],
      },
      initialValue: "concert",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Event Status",
      type: "string",
      options: {
        list: [
          { title: "Published (Active)", value: "published" },
          { title: "Draft / Unannounced", value: "draft" },
          { title: "Sold Out", value: "sold_out" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Archived (Past Performance)", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "published",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature on Homepage",
      type: "boolean",
      description: "Highlight as the primary upcoming event on the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 2,
      description: "Brief overview for calendar cards and previews.",
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: "description",
      title: "Full Event Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "posterImage",
      title: "Event Poster / Banner Image",
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
      name: "ticketUrl",
      title: "Ticket / RSVP Link (Optional)",
      type: "url",
      description: "External ticketing platform (e.g. Ticketmaster, Eventbrite, NC State Tickets).",
    }),
    defineField({
      name: "isFree",
      title: "Free Admission",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "accessibilityNotes",
      title: "Venue Accessibility Notes (Optional)",
      type: "string",
      description: "e.g. Wheelchair accessible seating, assisted listening devices available.",
    }),
    defineField({
      name: "setlist",
      title: "Concert Setlist (Past/Archived Events)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "recap",
      title: "Event Recap (Past/Archived Events)",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "startDate",
      venue: "venue",
      status: "status",
      media: "posterImage",
    },
    prepare({ title, date, venue, status, media }) {
      const d = date ? new Date(date).toLocaleDateString() : "Date TBA";
      return {
        title,
        subtitle: `${d} @ ${venue} [${status?.toUpperCase()}]`,
        media,
      };
    },
  },
});
