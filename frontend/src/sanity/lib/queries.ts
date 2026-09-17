import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    heroCtaText,
    heroImage{
      asset,
      alt
    },
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
    ctaImage{
      asset,
      alt
    },
    "faq": *[_type == "faq" && showOnHomepage == true] | order(order asc){
      _id,
      question,
      answer
    }
  }
`

export const clientsQuery = groq`
  *[_type == "client"] | order(order asc){
    _id,
    name,
    logo,
    url
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    intro,
    mission,
    vision,
    valuesImage{
      asset,
      alt
    }
  }
`

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0]{
    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    heroImages[]{
      asset,
      alt
    }
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
    logo{
      asset,
      alt
    },
    logoInverse{
      asset,
      alt
    },
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