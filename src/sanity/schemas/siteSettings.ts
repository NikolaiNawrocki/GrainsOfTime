import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description: "Primary site title for browser tabs and search engines.",
      validation: (Rule) => Rule.required(),
      initialValue: "Grains of Time | NC State All-Male A Cappella",
    }),
    defineField({
      name: "description",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      description: "Default meta description used across pages.",
      validation: (Rule) => Rule.required().max(200),
      initialValue:
        "Official website and living archive of Grains of Time, North Carolina State University's premier all-male a cappella ensemble, founded in 1968.",
    }),
    defineField({
      name: "announcement",
      title: "Announcement Banner",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable Banner",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "text",
          title: "Announcement Text",
          type: "string",
          description: "Short notice (e.g. audition dates, ticket releases).",
        }),
        defineField({
          name: "linkUrl",
          title: "Link URL (Optional)",
          type: "string",
          description: "Internal route (e.g., /events) or external URL.",
        }),
        defineField({
          name: "linkText",
          title: "Link Text",
          type: "string",
          initialValue: "Learn More",
        }),
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "General Contact Email",
      type: "string",
      validation: (Rule) => Rule.email(),
      initialValue: "grainsoftimencsu@gmail.com",
    }),
    defineField({
      name: "bookingEmail",
      title: "Booking Inquiry Recipient Email",
      type: "string",
      validation: (Rule) => Rule.email(),
      initialValue: "booking@grainsoftime.com",
    }),
    defineField({
      name: "socialLinks",
      title: "Official Social & External Links",
      type: "object",
      description:
        "Only verified official links are displayed publicly. Blank links are automatically hidden.",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
          initialValue: "https://instagram.com/grainsoftime",
        }),
        defineField({
          name: "spotify",
          title: "Spotify Artist/Profile URL",
          type: "url",
          description: "Leave empty until official verified Grains of Time Spotify profile is supplied.",
        }),
        defineField({
          name: "youtube",
          title: "YouTube Channel URL",
          type: "url",
          description: "Leave empty until official verified YouTube channel is supplied.",
        }),
        defineField({
          name: "gofundme",
          title: "GoFundMe / Support URL",
          type: "url",
          description: "Leave empty until official fundraising campaign is active.",
        }),
        defineField({
          name: "merch",
          title: "Official Merchandise Store URL",
          type: "url",
          description: "Shopify or university partner store link.",
          initialValue: "https://ladiesinredncsu.myshopify.com/collections/all",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "locationAffiliation",
      title: "Location / University Affiliation Text",
      type: "string",
      initialValue: "North Carolina State University • Raleigh, North Carolina",
    }),
    defineField({
      name: "foundedYear",
      title: "Founding Year",
      type: "number",
      readOnly: true,
      initialValue: 1968,
      description: "Historic founding year (Est. 1968).",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Social Sharing Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
