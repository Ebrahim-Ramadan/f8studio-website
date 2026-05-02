import { ProjectCard } from '@/components/project-card'
import { ContactSection } from '@/components/contact-section'
import { getProjects } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await getProjects()
  
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-background pt-24 pb-12 -mt-4">
        {/* Hero Section - background video */}
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-end">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src="/cinematic bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-2 leading-tight">
                Form Follows Fate
              </h1>
              <p className="md:text-lg text-base text-white/80 md:leading-relaxed max-w-xl">
                High-end 3D visualization, interior and exterior design, and technical detailing that transforms concepts into refined, realistic outcomes.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <a href="#projects" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full backdrop-blur-sm">
                Discover projects
              </a>
            </div>
          </div>
        </section>

<div className="hidden md:flex flex-row justify-center mx-auto max-w-7xl -mt-16 pb-6 text-center">
  <div className="bg-gradient-to-r from-black from-transparent via-black/20 to-transparent w-full  h-[2px] "></div>
  </div>
       
       
        {/* Projects Grid */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <h2 className="text-3xl font-light tracking-wide text-foreground md:mb-8 mb-6">
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
    </>
  )
}
