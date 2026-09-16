import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      initialValue:
        'Mzinga Legal & Tax Consultants is a professional legal, tax, finance, and management consultancy. We combine deep local credentials with global thinking to serve clients from Tanzania and around the world.',
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 3,
      initialValue:
        'To empower clients through sound legal advice and efficient tax strategies, ensuring compliance, minimizing risk, and enabling growth both locally and globally.',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 3,
      initialValue:
        'To be the preferred partner for legal and tax consultancy in East Africa and beyond, known for ethical standards, deep technical competence, and client success.',
    }),
    defineField({
      name: 'valuesImage',
      title: 'Values Image',
      type: 'image',
      description:
        'A single designed graphic that presents all five firm values (Professionalism, Integrity, Excellence, Client-Focus, Confidentiality). Recommended: landscape or square, at least 1600px wide.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description:
            'Describe the values graphic for accessibility — e.g., "Mzinga values: Professionalism, Integrity, Excellence, Client-Focus, Confidentiality."',
        },
      ],
    }),
  ],
})