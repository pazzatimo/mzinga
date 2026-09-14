export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
          About Us
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-16 max-w-3xl text-brand-black">
          Legal and tax consultancy, reimagined for a globalised Tanzania.
        </h1>

        <div className="max-w-none">
          <p className="text-xl leading-relaxed text-brand-black/80 mb-12">
            Mzinga Legal & Tax Consultants is a professional legal, tax, finance, and
            management consultancy. We combine deep local credentials with global
            thinking to serve clients from Tanzania and around the world.
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-20">
            <div className="border-l-2 border-brand-red pl-8">
              <h2 className="font-serif text-2xl mb-4 text-brand-black">
                Our Mission
              </h2>
              <p className="text-brand-black/70 leading-relaxed">
                To empower clients through sound legal advice and efficient tax
                strategies, ensuring compliance, minimizing risk, and enabling growth
                both locally and globally.
              </p>
            </div>
            <div className="border-l-2 border-brand-red pl-8">
              <h2 className="font-serif text-2xl mb-4 text-brand-black">
                Our Vision
              </h2>
              <p className="text-brand-black/70 leading-relaxed">
                To be the preferred partner for legal and tax consultancy in East
                Africa and beyond, known for ethical standards, deep technical
                competence, and client success.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-3xl mb-8 text-brand-black">Our Values</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Professionalism',
                desc: 'We adhere to the highest standards of practice.',
              },
              {
                title: 'Integrity',
                desc: 'Honest, transparent, principled advice.',
              },
              {
                title: 'Excellence',
                desc: 'Continuous learning, staying up-to-date with law and tax regulations.',
              },
              {
                title: 'Client-Focus',
                desc: "Listening, understanding, and adapting to each client's needs.",
              },
              {
                title: 'Confidentiality',
                desc: 'Strict protection of client data and information.',
              },
            ].map((v, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-brand-red font-serif text-2xl shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl mb-1 text-brand-black">
                    {v.title}
                  </h3>
                  <p className="text-brand-black/60">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}