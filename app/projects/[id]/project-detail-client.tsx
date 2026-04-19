'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowLeft } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

interface Project {
  id: string
  name: string
  description: string
  images: string[] | null
  created_at: string
  updated_at: string
}

interface ProjectDetailClientProps {
  id: string
}

export function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/projects/${id}`, {
          cache: 'no-store',
        })
        if (!response.ok) throw new Error('Failed to fetch project')
        const data = await response.json()
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <p className="text-muted-foreground">
            <Spinner />
          </p>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error || 'Project not found'}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const images = project.images && Array.isArray(project.images) ? project.images : []

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {images.length > 0 ? (
            <div className="space-y-4">
              {images.map((imageId) => (
                <div key={imageId} className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={`/api/projects/${project.id}/images/${imageId}`}
                    alt={project.name}
                    fill
                    className="object-cover w-full h-full"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No images available for this project</p>
            </div>
          )}

          <div className="mt-10 pt-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground mb-2 uppercase">
                  Project Date
                </h3>
                <p className="text-base text-muted-foreground">
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground mb-2 uppercase">
                  Behind the Project
                </h3>
                {/* few images of the F8 team (local images from /public) shown as overlapping thumbnails */}
                {(() => {
                  const teamImages = ['/placeholder-user.jpg', '/logo.jpeg', '/logo black png.png', '/placeholder.jpg']

                  return (
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {teamImages.slice(0, 4).map((src, i) => (
                          <div
                            key={src}
                            className={`${i !== 0 ? '-ml-4' : ''} w-20 h-20 rounded-lg overflow-hidden ring-1 ring-white/10 shadow-sm bg-muted`}
                          >
                            <Image
                              src={src}
                              alt={`Team image ${i + 1}`}
                              width={160}
                              height={120}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="ml-4 text-sm text-muted-foreground">Our team</div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}