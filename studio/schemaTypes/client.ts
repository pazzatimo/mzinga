import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      description: 'Used for alt text and internal reference. Not displayed on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description:
        'Upload the client logo. PNG with transparent background works best. Aim for at least 400px on the longest side.',
      options: { hotspot: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL (optional)',
      type: 'url',
      description:
        'If provided, the logo links to the client website. Leave blank to display the logo without a link.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Lower numbers appear first. Use 10, 20, 30… to leave room for inserting clients later.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})