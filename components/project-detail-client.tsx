'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Link } from 'next-view-transitions'

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
  const [preview, setPreview] = useState<{ id: string; name: string; description: string; imageUrl?: string } | null>(null)
  const imagesRef = useRef<HTMLDivElement | null>(null)
  const [imagesInView, setImagesInView] = useState(false)
  const [imageDims, setImageDims] = useState<Record<string, { width: number; height: number }>>({})

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

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`project_preview_${id}`)
      if (raw) {
        const parsed = JSON.parse(raw)
        setPreview(parsed)
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [id])

  useEffect(() => {
    if (!imagesRef.current || imagesInView) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setImagesInView(true)
            obs.disconnect()
            break
          }
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    )
    obs.observe(imagesRef.current)
    return () => obs.disconnect()
  }, [imagesInView])

  const images = project && Array.isArray(project.images) ? project.images : []

  useEffect(() => {
    if (!project || images.length === 0) return
    let mounted = true

    const loadDims = async () => {
      await Promise.all(
        images.map((imageId) =>
          new Promise<void>((resolve) => {
            if (!mounted) return resolve()
            // skip if already loaded
            if (imageDims[imageId]) return resolve()

            const img = new window.Image()
            img.src = `/api/projects/${project.id}/images/${imageId}`
            img.onload = () => {
              if (!mounted) return resolve()
              setImageDims((prev) => ({ ...prev, [imageId]: { width: img.naturalWidth, height: img.naturalHeight } }))
              resolve()
            }
            img.onerror = () => resolve()
          })
        )
      )
    }

    loadDims()

    return () => {
      mounted = false
    }
  }, [project, images, imageDims])

  // If there was an error and we don't have either the full project or a preview, show error
  if (error && !project && !preview) {
    return (
      <>
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
      </>
    )
  }

  

  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-background pt-24">
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
              {project?.name ?? preview?.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {project?.description ?? preview?.description}
            </p>
          </div>

          <div ref={imagesRef}>
            {project ? (
              images.length > 0 ? (
                <div className="space-y-4">
                  {images.map((imageId) => (
                    <div key={imageId} className="w-full overflow-hidden ">
                      <div className="relative aspect-video w-full overflow-hidden ">
                        <Image
                          src={`/api/projects/${project!.id}/images/${imageId}`}
                          alt={project!.name}
                          fill
                          className="h-full w-full object-contain"
                          priority={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No images available for this project</p>
                </div>
              )
            ) : (
              // Show preview image immediately if available; otherwise only show spinner when section is in view
              preview?.imageUrl ? (
                <div className="space-y-4">
                  <div className="w-full overflow-hidden ">
                    <div className="relative aspect-video w-full overflow-hidden ">
                      <Image
                        src={preview.imageUrl}
                        alt={preview.name}
                        fill
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              ) : imagesInView && loading ? (
                <div className="py-16 flex items-center justify-center">
                  <Spinner />
                </div>
              ) : null
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground mb-2 uppercase">
                  Project Date
                </h3>
                  <p className="text-base text-muted-foreground">
                  {project ? new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  }) : <span className="text-muted-foreground">Loading...</span>}
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
      {/* <Footer /> */}
    </>
  )
}