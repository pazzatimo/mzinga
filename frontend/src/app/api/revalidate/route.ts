import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET

    if (!secret) {
      return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<any>(
      req,
      secret,
      true
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    const { _type } = body

    if (!_type) {
      return new Response('Bad Request: Missing document type', { status: 400 })
    }

    console.log(`Webhook received for document type: ${_type}`)

    switch (_type) {
      case 'homepage':
      case 'faq':
        revalidatePath('/')
        break
      case 'servicesPage':
      case 'service':
        revalidatePath('/services')
        revalidatePath('/')
        if (body.slug?.current) {
          revalidatePath(`/services/${body.slug.current}`)
        }
        break
      case 'aboutPage':
        revalidatePath('/about')
        break
      case 'siteSettings':
        revalidatePath('/', 'layout')
        break
      case 'teamMember':
        revalidatePath('/team')
        break
      default:
        console.log(`No revalidation path for type: ${_type}`)
    }

    console.log(`Revalidation successful for type: ${_type}`)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    console.error('Error revalidating:', err)
    return new Response(`Internal Server Error: ${err.message}`, { status: 500 })
  }
}