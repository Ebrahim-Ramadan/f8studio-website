'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { useState } from 'react'

interface ProjectCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  slug?: string
}

export function ProjectCard({ id, name, description, imageUrl, slug = id }: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleClick = () => {
    try {
      const preview = { id, name, description, imageUrl }
      sessionStorage.setItem(`project_preview_${id}`, JSON.stringify(preview))
    } catch (e) {
      // ignore sessionStorage failures
    }
  }

  return (
    <Link href={`/projects/${slug}`} onClick={handleClick}>
      <div className="group cursor-pointer">
        <div className="relative rounded-lg overflow-hidden bg-muted aspect-video mb-6">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={`rounded-lg object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                isLoading ? 'blur-sm' : 'blur-0'
              }`}
              onLoad={() => setIsLoading(false)}
            />
          )}
          <div className="rounded-lg absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <div className=" space-y-2 ">
          <h3 className="capitalize text-2xl font-bold tracking-wide text-foreground group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-base text-muted-foreground line-clamp-2 md:leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
