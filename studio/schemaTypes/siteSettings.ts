import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company Name',
      initialValue: 'Mzinga Legal & Tax Consultants',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description:
        'Main logo for the white navbar. Recommended: horizontal orientation, PNG with transparent background, at least 400px wide. Height will be constrained to ~40px on the site.',
      options: { hotspot: false },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the logo, e.g., "Mzinga Legal & Tax Consultants logo".',
          initialValue: 'Mzinga Legal & Tax Consultants logo',
        },
      ],
    }),
    defineField({
      name: 'logoInverse',
      title: 'Logo (Inverse / White)',
      type: 'image',
      description:
        'White or light version of the logo for the dark footer. If you don\'t upload one, the main logo is used instead.',
      options: { hotspot: false },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          initialValue: 'Mzinga Legal & Tax Consultants logo',
        },
      ],
    }),
    defineField({
      name: 'officeAddress',
      type: 'object',
      title: 'Office Address',
      fields: [
        { name: 'line1', type: 'string', title: 'Building / Floor' },
        { name: 'line2', type: 'string', title: 'Street' },
        { name: 'line3', type: 'string', title: 'Landmark / Area' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'country', type: 'string', title: 'Country' },
      ],
    }),
    defineField({
      name: 'mailingAddress',
      type: 'string',
      title: 'Mailing Address (PO Box)',
    }),
    defineField({ name: 'phone1', type: 'string', title: 'Primary Phone' }),
    defineField({ name: 'phone2', type: 'string', title: 'Secondary Phone' }),
    defineField({ name: 'email', type: 'string', title: 'Email Address' }),
    defineField({
      name: 'workingHours',
      type: 'object',
      title: 'Working Hours',
      fields: [
        { name: 'weekdays', type: 'string', title: 'Monday – Friday' },
        { name: 'weekends', type: 'string', title: 'Saturday / Sunday' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Media Links',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
})