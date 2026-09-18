import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.0.value' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tax Advisory & Planning', value: 'tax-advisory' },
          { title: 'Tax Filing & Compliance', value: 'tax-filing' },
          { title: 'Tax Dispute Resolution', value: 'tax-dispute' },
          { title: 'Corporate & Commercial Law', value: 'corporate-law' },
          { title: 'Regulatory Compliance', value: 'regulatory' },
          { title: 'Mining & Natural Resources', value: 'mining' },
          { title: 'NGO & Non-Profit Services', value: 'ngo' },
          { title: 'Legal Drafting & Advisory', value: 'legal-drafting' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Key Points',
      type: 'internationalizedArrayString',
      description: 'Add key points per language.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Scale", "FileText", "Building")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
})