import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mzinga Legal & Tax Consultants | Tanzania',
  description:
    'Comprehensive Legal & Tax Solutions for Businesses, NGOs, Investors & Individuals Worldwide',
}

export const revalidate = 300

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const settings = await client.fetch(siteSettingsQuery, { locale })

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-white text-brand-black font-sans antialiased">
        <NextIntlClientProvider>
          <Navbar
            logo={settings?.logo}
            companyName={settings?.companyName}
          />
          <main>{children}</main>
          <Footer settings={settings} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}