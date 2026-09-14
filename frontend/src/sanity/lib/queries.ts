import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    heroCtaText,
    trustMetrics,
    features,
    services[]->{
      _id,
      title,
      slug,
      shortDescription,
      icon
    },
    clientTypes,
    faq
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(_createdAt asc){
    _id,
    title,
    slug,
    category,
    shortDescription,
    bulletPoints,
    icon
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    category,
    shortDescription,
    fullDescription,
    bulletPoints,
    icon
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    companyName,
    tagline,
    officeAddress,
    mailingAddress,
    phone1,
    phone2,
    email,
    workingHours,
    socialLinks
  }
`

export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    photo,
    qualifications,
    bio,
    email,
    phone
  }
`