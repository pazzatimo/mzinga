import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
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
            // Singleton: Homepage
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
                  .title('Homepage')
              ),

            // Singleton: Site Settings
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

            // Lists: Services & Team
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('teamMember').title('Team Members'),
          ]),
    }),
    visionTool(), // GROQ query playground — useful during development
  ],

  schema: {
    types: schemaTypes,
  },
})