import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Showreel - F8 Studios',
  description: 'F8 Studios Showreel - Watch our latest projects and visualizations',
}

export default function ShowreelPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
              Showreel
            </h1>
            <div className="h-1 w-12 bg-accent" />
          </div>

          {/* Video Placeholder */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-12 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground text-lg">Showreel Coming Soon</p>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
