import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Mzinga Legal & Tax Consultants',

  projectId: 'iouh8oe3',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
                  .title('Homepage')
              ),
            S.listItem()
              .title('Services Page')
              .id('servicesPage')
              .child(
                S.document()
                  .schemaType('servicesPage')
                  .documentId('servicesPage')
                  .title('Services Page')
              ),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
                  .title('About Page')
              ),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('client').title('Clients'),
            S.documentTypeListItem('faq').title('FAQs'),
          ]),
    }),

    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'sw', title: 'Kiswahili' },
      ],
      schemaTypes: [
        'homepage',
        'servicesPage',
        'aboutPage',
        'siteSettings',
      ],
    }),

    internationalizedArray({
      languages: [
        { id: 'en', title: 'English' },
        { id: 'sw', title: 'Kiswahili' },
      ],
      fieldTypes: ['string', 'text'],
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})