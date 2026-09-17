import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-white text-brand-black font-sans antialiased">
        <Navbar
          logo={settings?.logo}
          companyName={settings?.companyName}
        />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}