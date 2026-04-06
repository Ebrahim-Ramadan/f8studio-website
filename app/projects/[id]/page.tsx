import type { Metadata } from 'next'
import { getProjectById } from '@/lib/db'
import { ProjectDetailClient } from '../../../components/project-detail-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    return {
      title: 'Project Not Found | F8 Studios',
    }
  }

  return {
    title: `${project.name} | F8 Studios`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <ProjectDetailClient id={id} />
}
