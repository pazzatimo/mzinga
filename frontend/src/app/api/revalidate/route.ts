import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<any>(req, secret, true)
    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    const { _type } = body
    if (!_type) {
      return new Response('Missing document type', { status: 400 })
    }

    const locales = ['en', 'sw']

    switch (_type) {
      case 'homepage':
      case 'faq':
        locales.forEach((l) => revalidatePath(`/${l}`))
        break
      case 'servicesPage':
      case 'service':
        locales.forEach((l) => revalidatePath(`/${l}/services`))
        locales.forEach((l) => revalidatePath(`/${l}`))
        if (body.slug?.current) {
          locales.forEach((l) =>
            revalidatePath(`/${l}/services/${body.slug.current}`)
          )
        }
        break
      case 'aboutPage':
        locales.forEach((l) => revalidatePath(`/${l}/about`))
        break
      case 'siteSettings':
        revalidatePath('/', 'layout')
        break
      case 'teamMember':
        locales.forEach((l) => revalidatePath(`/${l}/team`))
        break
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    return new Response(`Internal Server Error: ${err.message}`, { status: 500 })
  }
}