import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Animation - F8 Studios',
  description: 'F8 Studios Animations - Dynamic 3D renderings and walkthroughs',
}

export default function AnimationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
              Animation & Walkthroughs
            </h1>
            <div className="h-1 w-12 bg-accent" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg" />
                <h3 className="text-lg font-light tracking-wide text-foreground">
                  Project Animation {item}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dynamic 3D walkthroughs that bring architectural concepts to life with fluid motion and realistic renderings.
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="max-w-3xl border-t border-border pt-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our animations transform static designs into immersive experiences. Each frame is meticulously crafted to showcase spatial relationships, material qualities, and the emotional journey through designed spaces.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
