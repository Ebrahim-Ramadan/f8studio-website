import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProjectCard } from '@/components/project-card'
import { ContactSection } from '@/components/contact-section'
import { getProjects } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await getProjects()
  
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-background pt-24 pb-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:-mt-12 md:-z-50 md:py-0 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
                Form Follows Fate
              </h1>
              <p className="md:text-lg text-base text-muted-foreground md:leading-relaxed max-w-xl">
                High-end 3D visualization, interior and exterior design, and technical detailing that transforms concepts into refined, realistic outcomes.
              </p>
            </div>

            <div className="hidden md:flex justify-end">
              <div className="relative h-fit max-w-md aspect-square opacity-80 pointer-events-none select-none">
                <img
                  src="/globe-outline-light.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-6 ">
          <h2 className="text-3xl font-light tracking-wide text-foreground md:mb-16 mb-6">
            Projects
          </h2>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  imageUrl={
                    project.images && Array.isArray(project.images) && project.images.length > 0
                      ? `/api/projects/${project.id}/images/${project.images[0]}`
                      : '/placeholder.svg?height=400&width=600'
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found yet.</p>
            </div>
          )}
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
