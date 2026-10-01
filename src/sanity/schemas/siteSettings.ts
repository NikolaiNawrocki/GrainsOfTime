import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website Settings',
  type: 'document',
  icon: Settings,
  groups: [
    { name: 'general', title: 'Website Basics', default: true },
    { name: 'announcement', title: 'Announcement Banner' },
    { name: 'contact', title: 'Contact Information' },
    { name: 'social', title: 'Social Media Links' },
    { name: 'sharing', title: 'Sharing & Search' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Website Title',
      type: 'string',
      group: 'general',
      description: 'Shown in browser tabs and when people search for your site on Google.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Grains of Time | NC State All-Male A Cappella',
    }),
    defineField({
      name: 'description',
      title: 'Website Description',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'A short description of your group. Google and social media use this when showing your site in search results. Keep it under 200 characters.',
      validation: (Rule) => Rule.required().max(200),
      initialValue: 'Official website and living archive of Grains of Time, North Carolina State University\'s premier all-male a cappella ensemble, founded in 1968.',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Year Founded',
      type: 'number',
      group: 'general',
      readOnly: true,
      initialValue: 1968,
      description: 'The year Grains of Time was founded. This is shown on the website but cannot be changed.',
    }),
    defineField({
      name: 'locationAffiliation',
      title: 'University & Location',
      type: 'string',
      group: 'general',
      initialValue: 'North Carolina State University • Raleigh, North Carolina',
      description: 'Shown in the footer and on the homepage.',
    }),
    // Announcement Banner
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      type: 'object',
      group: 'announcement',
      description: 'A colored bar at the top of every page. Use it for audition dates, ticket sales, or important news.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Banner',
          type: 'boolean',
          description: 'Turn this on to display the announcement on the website.',
          initialValue: false,
        }),
        defineField({
          name: 'text',
          title: 'Banner Message',
          type: 'string',
          description: 'Keep it short — e.g. "Fall Auditions: September 15 at Price Music Center"',
        }),
        defineField({
          name: 'linkUrl',
          title: 'Link (optional)',
          type: 'string',
          description: 'Where should the banner link to? Use a page on your site (e.g. /events) or a full web address.',
        }),
        defineField({
          name: 'linkText',
          title: 'Link Button Text',
          type: 'string',
          initialValue: 'Learn More',
          description: 'The clickable text at the end of the banner, e.g. "Learn More", "Get Tickets", "Sign Up".',
        }),
      ],
    }),
    // Contact
    defineField({
      name: 'contactEmail',
      title: 'General Contact Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
      initialValue: 'grainsoftimencsu@gmail.com',
      description: 'The main email address shown on the website for general inquiries.',
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
      initialValue: 'booking@grainsoftime.com',
      description: 'The email address where booking/performance requests are sent.',
    }),
    // Social Media
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      description: 'Add your official social media profiles. Leave any field empty to hide that icon on the website.',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Your Instagram profile URL (e.g. https://instagram.com/grainsoftime)',
          initialValue: 'https://instagram.com/grainsoftime',
        }),
        defineField({
          name: 'spotify',
          title: 'Spotify',
          type: 'url',
          description: 'Your Spotify artist page URL. Leave empty if you don\'t have one yet.',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'Your YouTube channel URL. Leave empty if you don\'t have one yet.',
        }),
        defineField({
          name: 'gofundme',
          title: 'Fundraising / Support Page',
          type: 'url',
          description: 'GoFundMe or other fundraising page URL. Leave empty when not running a campaign.',
        }),
        defineField({
          name: 'merch',
          title: 'Merchandise Store',
          type: 'url',
          description: 'Your online merchandise store URL.',
          initialValue: 'https://ladiesinredncsu.myshopify.com/collections/all',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Sharing
    defineField({
      name: 'defaultOgImage',
      title: 'Social Media Preview Image',
      type: 'image',
      group: 'sharing',
      options: { hotspot: true },
      description: 'When someone shares your website on social media or in a text message, this image is shown as the preview. Use a high-quality group photo (recommended size: 1200×630 pixels).',
      fields: [
        defineField({
          name: 'alt',
          title: 'Describe This Image',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
