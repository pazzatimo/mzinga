import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Book a Consultation',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description:
        'Featured image displayed on the right side of the homepage hero. Recommended: portrait or square orientation, at least 1200×1500px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO.',
        },
      ],
    }),
    defineField({
      name: 'trustMetrics',
      title: 'Trust Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g., "15+")' },
            {
              name: 'label',
              type: 'string',
              title: 'Label (e.g., "Years Experience")',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'What We Offer / Why Choose Us',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title' },
            {
              name: 'description',
              type: 'text',
              rows: 2,
              title: 'Description',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Core Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'clientTypes',
      title: 'Whom We Serve',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})