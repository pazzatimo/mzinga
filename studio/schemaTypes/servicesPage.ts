import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Our Services',
      description: 'Small label above the headline.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue:
        'Expertise across every dimension of legal and tax practice.',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      initialValue:
        'From corporate structuring to tax dispute resolution, our team delivers practical, jurisdiction-aware advice tailored to your needs.',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      description:
        'Upload 3–6 images. They will scroll continuously right-to-left as a background behind the hero text. Best: landscape 16:9 photography, at least 1920×1080px.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Describe the image for accessibility.',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(8),
    }),
  ],
})