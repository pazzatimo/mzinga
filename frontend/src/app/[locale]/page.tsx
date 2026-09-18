import { client } from '@/sanity/lib/client'
import { homepageQuery, clientsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('sections')

  const [data, clients] = await Promise.all([
    client.fetch(homepageQuery, { locale }),
    client.fetch(clientsQuery),
  ])

  if (!data) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <p className="text-brand-black/60 text-lg">
          Content loading… Add a Homepage document in the Studio for this language.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Hero — full-bleed background image */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-end overflow-hidden">
        {data.heroImage?.asset ? (
          <Image
            src={urlFor(data.heroImage).width(2400).url()}
            alt={data.heroImage.alt || data.heroHeadline}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/70 to-brand-black/40" />

        <div className="relative w-full max-w-7xl mx-auto px-6 pb-20 lg:pb-28 pt-40">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] mb-6 text-brand-white">
              {data.heroHeadline}
            </h1>
            <p className="text-base md:text-lg max-w-xl text-brand-white/75 leading-relaxed mb-10">
              {data.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-brand-red text-brand-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-brand-white hover:text-brand-black transition-colors"
              >
                {data.heroCtaText || t('getStarted')}
              </Link>
              <Link
                href="/services"
                className="border border-brand-white/60 text-brand-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-brand-white hover:text-brand-black transition-colors"
              >
                {t('ourServices')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      {data.trustMetrics?.length > 0 && (
        <section className="border-y border-brand-black/10 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.trustMetrics.map(
              (m: { value: string; label: string }, i: number) => (
                <div key={i} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl text-brand-red mb-2">
                    {m.value}
                  </p>
                  <p className="text-sm uppercase tracking-wider text-brand-black/60">
                    {m.label}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
            {t('whyChooseUs')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-2xl text-brand-black">
            {t('whyChooseUsHeadline')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-black/10">
            {data.features?.map(
              (f: { title: string; description: string }, i: number) => (
                <div key={i} className="bg-brand-white p-10">
                  <span className="text-brand-red font-serif text-2xl">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-xl mt-4 mb-3 text-brand-black">
                    {f.title}
                  </h3>
                  <p className="text-brand-black/60 leading-relaxed text-sm">
                    {f.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Services Grid — dark section */}
      <section className="py-24 px-6 bg-brand-black text-brand-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
            {t('ourServices')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-2xl text-brand-white">
            {t('ourServicesHeadline')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services?.map(
              (s: {
                _id: string
                title: string
                slug?: { current: string }
                shortDescription: string
                icon?: string
              }) => {
                const IconComponent =
                  (Icons as any)[s.icon || 'Scale'] || Icons.Scale
                return (
                  <Link
                    key={s._id}
                    href={`/services/${s.slug?.current}`}
                    className="group border border-brand-white/20 p-8 hover:bg-brand-red hover:border-brand-red transition-colors"
                  >
                    <IconComponent
                      className="text-brand-red group-hover:text-brand-white transition-colors mb-6"
                      size={28}
                    />
                    <h3 className="font-serif text-xl mb-3 text-brand-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-brand-white/60 group-hover:text-brand-white/90 text-sm leading-relaxed transition-colors">
                      {s.shortDescription}
                    </p>
                  </Link>
                )
              }
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {data.faq?.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
              {t('faq')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-12 text-brand-black">
              {t('faqHeadline')}
            </h2>
            <div className="divide-y divide-brand-black/10">
              {data.faq.map(
                (item: { question: string; answer: string }, i: number) => (
                  <details key={i} className="group py-6">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <span className="font-serif text-lg pr-8 text-brand-black">
                        {item.question}
                      </span>
                      <span className="text-brand-red text-2xl group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-brand-black/60 leading-relaxed pr-12">
                      {item.answer}
                    </p>
                  </details>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Clients */}
      {clients?.length > 0 && (
        <section className="py-20 px-6 border-t border-brand-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
                {t('clients')}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-black max-w-2xl mx-auto">
                {t('clientsHeadline')}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 items-center">
              {clients.map(
                (c: {
                  _id: string
                  name: string
                  logo: { asset: { _ref: string } }
                  url?: string
                }) => {
                  const logoImage = (
                    <div className="relative h-16 md:h-20 w-full flex items-center justify-center">
                      <Image
                        src={urlFor(c.logo).height(160).url()}
                        alt={c.name}
                        width={200}
                        height={80}
                        className="max-h-full w-auto object-contain"
                      />
                    </div>
                  )

                  return c.url ? (
                    <a
                      key={c._id}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block opacity-70 hover:opacity-100 transition-opacity duration-300"
                      aria-label={c.name}
                    >
                      {logoImage}
                    </a>
                  ) : (
                    <div
                      key={c._id}
                      className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                    >
                      {logoImage}
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-red overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 px-6 lg:px-12 py-20 lg:py-28 flex flex-col justify-center">
              <p className="text-brand-white/70 uppercase tracking-[0.3em] text-xs mb-6">
                {t('getStarted')}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-brand-white leading-[1.1]">
                {t('ctaHeadline')}
              </h2>
              <p className="text-brand-white/80 mb-10 text-lg max-w-lg leading-relaxed">
                {t('ctaBody')}
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-block bg-brand-white text-brand-black px-10 py-4 text-sm uppercase tracking-wider hover:bg-brand-black hover:text-brand-white transition-colors"
                >
                  {t('contactUs')}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[520px]">
              {data.ctaImage?.asset ? (
                <Image
                  src={urlFor(data.ctaImage).width(1200).url()}
                  alt={data.ctaImage.alt || 'Mzinga Legal & Tax Consultants'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              ) : (
                <div className="absolute inset-0 bg-brand-black/20" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}