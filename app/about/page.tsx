import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About F8 Studios',
  description: 'Learn more about F8 Studios and our approach to architecture and design',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
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
          <div className="space-y-12">
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
                  Based in Dubai and Egypt, we bring a unique perspective shaped by diverse cultures and architectural traditions. Our global approach meets local understanding.
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
      <Footer />
    </>
  )
}
