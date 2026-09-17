import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { getSocialIcon, MailIcon } from '@/components/SocialIcons'

export const revalidate = 300

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
          Contact Us
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-16 max-w-3xl text-brand-black">
          Start a conversation.
        </h1>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-brand-black/50 mb-4">
                Office Address
              </h2>
              <p className="text-lg leading-relaxed text-brand-black">
                {settings?.officeAddress?.line1}
                <br />
                {settings?.officeAddress?.line2}
                <br />
                {settings?.officeAddress?.line3}
                <br />
                {settings?.officeAddress?.city},{' '}
                {settings?.officeAddress?.country}
              </p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-brand-black/50 mb-4">
                Mailing Address
              </h2>
              <p className="text-lg text-brand-black">
                {settings?.mailingAddress}
              </p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-brand-black/50 mb-4">
                Phone
              </h2>
              <p className="text-lg text-brand-black">{settings?.phone1}</p>
              <p className="text-lg text-brand-black">{settings?.phone2}</p>
            </div>

            {settings?.email && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-brand-black/50 mb-4">
                  Email
                </h2>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-lg text-brand-black hover:text-brand-red transition-colors inline-flex items-center gap-3"
                >
                  <MailIcon size={20} />
                  {settings.email}
                </a>
              </div>
            )}

            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-brand-black/50 mb-4">
                Working Hours
              </h2>
              <p className="text-lg text-brand-black">
                {settings?.workingHours?.weekdays}
              </p>
              <p className="text-lg text-brand-black/60">
                {settings?.workingHours?.weekends}
              </p>
            </div>

            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-brand-black/50 mb-4">
                  Follow Us
                </h2>
                <div className="flex gap-3">
                  {settings.socialLinks.map(
                    (s: { platform: string; url: string }, i: number) => {
                      const Icon = getSocialIcon(s.platform)
                      return (
                        <a
                          key={i}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform}
                          className="w-11 h-11 border border-brand-black/15 flex items-center justify-center text-brand-black/70 hover:bg-brand-red hover:border-brand-red hover:text-brand-white transition-colors"
                        >
                          <Icon size={18} />
                        </a>
                      )
                    }
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-brand-black text-brand-white p-10">
            <h2 className="font-serif text-2xl mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 text-brand-white/60">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-brand-white/30 py-3 focus:border-brand-red outline-none transition-colors text-brand-white placeholder:text-brand-white/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 text-brand-white/60">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-brand-white/30 py-3 focus:border-brand-red outline-none transition-colors text-brand-white placeholder:text-brand-white/30"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 text-brand-white/60">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full bg-transparent border-b border-brand-white/30 py-3 focus:border-brand-red outline-none transition-colors text-brand-white placeholder:text-brand-white/30"
                  placeholder="+255…"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2 text-brand-white/60">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-brand-white/30 py-3 focus:border-brand-red outline-none transition-colors resize-none text-brand-white placeholder:text-brand-white/30"
                  placeholder="Tell us about your matter…"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-red text-brand-white py-4 text-sm uppercase tracking-wider hover:bg-brand-white hover:text-brand-black transition-colors"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}