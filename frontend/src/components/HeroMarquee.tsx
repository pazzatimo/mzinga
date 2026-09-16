import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type HeroImage = {
  asset: { _ref: string }
  alt?: string
}

export function HeroMarquee({ images }: { images: HeroImage[] }) {
  if (!images || images.length === 0) return null

  // Duplicate the images so the animation can loop seamlessly.
  // When the strip reaches -50%, the second copy is exactly
  // where the first started — an invisible reset.
  const doubled = [...images, ...images]

  // Duration scales with image count: ~8s per image, minimum 30s
  const duration = Math.max(30, images.length * 8)

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-black">
      <div
        className="flex h-full animate-marquee"
        style={{
          width: `${doubled.length * 100}%`,
          ['--marquee-duration' as string]: `${duration}s`,
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative h-full shrink-0"
            style={{ width: `${100 / doubled.length}%` }}
          >
            <Image
              src={urlFor(img).width(1920).height(1080).url()}
              alt={img.alt || ''}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}