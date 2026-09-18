import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('about')
  const data = await client.fetch(aboutPageQuery, { locale })

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
          {t('eyebrow')}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-16 max-w-3xl text-brand-black">
          {t('headline')}
        </h1>

        <div className="max-w-none">
          <p className="text-xl leading-relaxed text-brand-black/80 mb-12">
            {data?.intro ||
              'Mzinga Legal & Tax Consultants is a professional legal, tax, finance, and management consultancy. We combine deep local credentials with global thinking to serve clients from Tanzania and around the world.'}
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-20">
            <div className="border-l-2 border-brand-red pl-8">
              <h2 className="font-serif text-2xl mb-4 text-brand-black">
                {t('mission')}
              </h2>
              <p className="text-brand-black/70 leading-relaxed">
                {data?.mission ||
                  'To empower clients through sound legal advice and efficient tax strategies, ensuring compliance, minimizing risk, and enabling growth both locally and globally.'}
              </p>
            </div>
            <div className="border-l-2 border-brand-red pl-8">
              <h2 className="font-serif text-2xl mb-4 text-brand-black">
                {t('vision')}
              </h2>
              <p className="text-brand-black/70 leading-relaxed">
                {data?.vision ||
                  'To be the preferred partner for legal and tax consultancy in East Africa and beyond, known for ethical standards, deep technical competence, and client success.'}
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="font-serif text-3xl mb-8 text-brand-black">
              {t('values')}
            </h2>

            {data?.valuesImage?.asset ? (
              <div className="relative w-full overflow-hidden bg-brand-black/5">
                <Image
                  src={urlFor(data.valuesImage).width(1600).url()}
                  alt={
                    data.valuesImage.alt ||
                    'Mzinga values: Professionalism, Integrity, Excellence, Client-Focus, Confidentiality.'
                  }
                  width={1600}
                  height={1000}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-brand-black/5 border border-brand-black/10 flex items-center justify-center">
                <p className="text-brand-black/40 text-sm">
                  Upload a values image in the Studio
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}