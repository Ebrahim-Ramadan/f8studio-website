import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProjectCard } from '@/components/project-card'
import { getProjects } from '@/lib/db'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const projects = await getProjects()
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
              Where Form Follows Fate
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              High-end 3D visualization, interior and exterior design, and technical detailing that transforms concepts into refined, realistic outcomes.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-light tracking-wide text-foreground mb-16">
            Projects
          </h2>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
      </main>
      <Footer />
    </>
  )
}
