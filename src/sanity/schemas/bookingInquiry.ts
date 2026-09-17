import { defineField, defineType } from "sanity";

export const bookingInquiry = defineType({
  name: "bookingInquiry",
  title: "Booking Inquiries",
  type: "document",
  readOnly: true, // Inquiries are submitted from the public form and reviewed here
  fields: [
    defineField({
      name: "name",
      title: "Contact Name",
      type: "string",
    }),
    defineField({
      name: "organization",
      title: "Organization / Client",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "eventDate",
      title: "Proposed Event Date",
      type: "string",
    }),
    defineField({
      name: "venue",
      title: "Venue / City",
      type: "string",
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
    }),
    defineField({
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Performance Request Details",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "submittedAt",
      title: "Submission Timestamp",
      type: "datetime",
    }),
    defineField({
      name: "inquiryStatus",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New / Unread", value: "new" },
          { title: "In Communication", value: "contacted" },
          { title: "Confirmed Booking", value: "confirmed" },
          { title: "Archived / Declined", value: "archived" },
        ],
      },
      initialValue: "new",
      readOnly: false, // Officers can update the status
    }),
  ],
  preview: {
    select: {
      name: "name",
      org: "organization",
      date: "eventDate",
      status: "inquiryStatus",
    },
    prepare({ name, org, date, status }) {
      return {
        title: `${name} ${org ? `(${org})` : ""}`,
        subtitle: `Date: ${date || "Flexible"} • Status: ${status?.toUpperCase() || "NEW"}`,
      };
    },
  },
});
