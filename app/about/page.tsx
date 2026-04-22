import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About F8 Studios',
  description: 'Learn more about F8 Studios and our approach to architecture and design',
}

export default function AboutPage() {
  const members = [
    {
      name: 'Ahmed Ramadan',
      role: 'COO',
      img: '/members/ahmed ramadan - coo.webp',
      email: 'ahmedramadan@f8-studios.net',
      quote:
        '“It’s never about a single element—it’s about how lighting, materials, technology, and space work together to create something complete, functional, and alive.”',
    },
    {
      name: 'Lamis Abualsaad',
      role: 'CEO',
      img: '/members/lamis - ceo.webp',
      email: 'lamisabualsaad@f8-studios.net',
      quote:
        '“what’s real doesn’t just look good — it works, it lasts, it feels right. It holds its value over time, not because it tries to impress, but because it’s built with intention, honesty, and purpose.”',
    },
  ]

  return (
    <>
      <main className="min-h-screen bg-background pt-24">
        <section className="max-w-4xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
              About F8
            </h1>
            <div className="h-1 w-12 bg-accent" />
          </div>


          {/* Content */}
          <div className="space-y-12 ">

          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8 pt-6">
            {members.map((m) => (
              <div key={m.name} className="text-center w-full md:max-w-xs">
                <div className="mx-auto w-full max-w-xs aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={800}
                    height={1000}
                    quality={75}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="mt-6 text-sm font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
                
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-left tracking-wider">{m.quote}</p>
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-muted-foreground mt-1 block hover:underline"
                  >
                    {m.email}
                  </a>
                )}
              </div>
            ))}
          </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                F8 is a creative studio where design is shaped with intention — every line, form, and detail driven by a deeper sense of direction.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground mb-4">
                  Our Expertise
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We specialize in high-end 3D visualization, interior and exterior design, and technical detailing, transforming concepts into refined, realistic outcomes that meet international standards.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground mb-4">
                  Our Philosophy
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  At F8, form is never random — it is guided, purposeful, and meant to become. We believe in the power of intentional design that speaks through space and structure. Every project is an opportunity to push boundaries and create something that endures.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground mb-4">
                  Locations
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Based in Al-Mansurah, Egypt, we bring a unique perspective shaped by diverse cultures and architectural traditions. Our global approach meets local understanding.
                </p>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground mb-3 uppercase">
                  Intention
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every decision is purposeful and deliberate, guiding the outcome.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground mb-3 uppercase">
                  Excellence
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We strive for international standards in all our work.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground mb-3 uppercase">
                  Innovation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pushing boundaries and exploring new possibilities.
                </p>
              </div>
            </div>
          
          
          </div>
        </section>
      </main>
    </>
  )
}
