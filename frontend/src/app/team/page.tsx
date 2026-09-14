import { client } from '@/sanity/lib/client'
import { teamQuery } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Mail, Phone } from 'lucide-react'

export const revalidate = 60

export default async function TeamPage() {
  const team = await client.fetch(teamQuery)

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
          Our Team
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl text-brand-black">
          Experienced professionals. Committed to your success.
        </h1>
        <p className="text-brand-black/60 max-w-2xl mb-16 text-lg">
          Our consultants bring together deep technical expertise in Tanzanian and
          international legal and tax frameworks, along with a shared commitment to
          integrity and client service.
        </p>

        {team.length === 0 ? (
          <div className="border border-brand-black/10 p-16 text-center">
            <p className="text-brand-black/60 text-lg">
              Team profiles coming soon.
            </p>
            <p className="text-brand-black/40 text-sm mt-3">
              Add team members in the Studio to display them here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map(
              (member: {
                _id: string
                name: string
                role: string
                photo?: { asset: { _ref: string } }
                qualifications?: string[]
                bio?: string
                email?: string
                phone?: string
              }) => (
                <article key={member._id} className="group">
                  {/* Photo */}
                  <div className="aspect-[4/5] bg-brand-black/5 mb-6 overflow-hidden relative">
                    {member.photo ? (
                      <Image
                        src={urlFor(member.photo).width(600).height(750).url()}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif text-6xl text-brand-red/40">
                          {member.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name & Role */}
                  <h2 className="font-serif text-2xl mb-1 text-brand-black">
                    {member.name}
                  </h2>
                  <p className="text-brand-red text-sm uppercase tracking-wider mb-4">
                    {member.role}
                  </p>

                  {/* Qualifications */}
                  {member.qualifications && member.qualifications.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {member.qualifications.map((q, i) => (
                        <li
                          key={i}
                          className="text-xs border border-brand-black/15 px-2 py-1 text-brand-black/70"
                        >
                          {q}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-brand-black/60 leading-relaxed text-sm mb-4">
                      {member.bio}
                    </p>
                  )}

                  {/* Contact */}
                  <div className="space-y-2 text-sm">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-brand-black/70 hover:text-brand-red transition-colors"
                      >
                        <Mail size={14} />
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-brand-black/70 hover:text-brand-red transition-colors"
                      >
                        <Phone size={14} />
                        {member.phone}
                      </a>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 pt-16 border-t border-brand-black/10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-brand-black">
            Want to work with us?
          </h2>
          <p className="text-brand-black/60 max-w-2xl mx-auto mb-8">
            Whether you need a consultation or are interested in joining our team,
            we'd like to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-red text-brand-white px-10 py-4 text-sm uppercase tracking-wider hover:bg-brand-black transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}