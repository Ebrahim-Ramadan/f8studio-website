'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowLeft } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  images: string[] | null
  created_at: string
  updated_at: string
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  useEffect(() => {
    if (!id) return

    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/projects/${id}`)
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
          <p className="text-muted-foreground">Loading...</p>
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6 leading-tight">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Images Gallery */}
          {images.length > 0 ? (
            <div className="space-y-4">
              {images.map((imageId) => (
                <div key={imageId} className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
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

          {/* Project Info */}
          <div className="mt-10 pt-8 border-t border-border">
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
                  Category
                </h3>
                <p className="text-base text-muted-foreground">Architecture & Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
