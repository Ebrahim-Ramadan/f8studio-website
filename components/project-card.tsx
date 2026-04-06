'use client'

import Image from 'next/image'
import Link from 'next/link'
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

  return (
    <Link href={`/projects/${slug}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden bg-muted aspect-video mb-6">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                isLoading ? 'blur-sm' : 'blur-0'
              }`}
              onLoadingComplete={() => setIsLoading(false)}
            />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-light tracking-wide text-foreground group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
