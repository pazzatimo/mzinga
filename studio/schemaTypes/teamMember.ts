import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Full Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
    defineField({ name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true } }),
    defineField({ name: 'qualifications', type: 'array', of: [{ type: 'string' }], title: 'Qualifications' }),
    defineField({ name: 'bio', type: 'text', rows: 4, title: 'Biography' }),
    defineField({ name: 'email', type: 'string', title: 'Email' }),
    defineField({ name: 'phone', type: 'string', title: 'Phone' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' })
  ],
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }
  ]
})