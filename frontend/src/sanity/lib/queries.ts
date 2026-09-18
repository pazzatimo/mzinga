import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage" && language == $locale][0]{
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
      "title": coalesce(
        title[_key == $locale][0].value,
        title[0].value
      ),
      slug,
      "shortDescription": coalesce(
        shortDescription[_key == $locale][0].value,
        shortDescription[0].value
      ),
      icon
    },
    clientTypes,
    ctaImage{
      asset,
      alt
    },
    "faq": *[_type == "faq" && showOnHomepage == true] | order(order asc){
      _id,
      "question": coalesce(
        question[_key == $locale][0].value,
        question[0].value
      ),
      "answer": coalesce(
        answer[_key == $locale][0].value,
        answer[0].value
      )
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
  *[_type == "aboutPage" && language == $locale][0]{
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
  *[_type == "servicesPage" && language == $locale][0]{
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
  *[_type == "service"] | order(order asc){
    _id,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[0].value
    ),
    slug,
    category,
    "shortDescription": coalesce(
      shortDescription[_key == $locale][0].value,
      shortDescription[0].value
    ),
    "bulletPoints": bulletPoints[_key == $locale][0].value,
    icon
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    "title": coalesce(
      title[_key == $locale][0].value,
      title[0].value
    ),
    slug,
    category,
    "shortDescription": coalesce(
      shortDescription[_key == $locale][0].value,
      shortDescription[0].value
    ),
    "fullDescription": fullDescription[_key == $locale][0].value,
    "bulletPoints": bulletPoints[_key == $locale][0].value,
    icon
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $locale][0]{
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
    "role": coalesce(
      role[_key == $locale][0].value,
      role[0].value
    ),
    photo,
    qualifications,
    "bio": coalesce(
      bio[_key == $locale][0].value,
      bio[0].value
    ),
    email,
    phone
  }
`