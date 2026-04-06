import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export interface Project {
  id: string
  name: string
  description: string
  images: string[] | null
  created_at: string
  updated_at: string
}

export interface ProjectImage {
  id: string
  project_id: string
  filename: string
  mime_type: string
  image_data: Buffer
  created_at: string
}

export interface ContactSubmissionInput {
  full_name: string
  email: string
  phone?: string
  project_type?: string
  message: string
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await sql<Project>`
      SELECT
        p.id,
        p.name,
        p.description,
        COALESCE(
          json_agg(pi.id ORDER BY pi.created_at ASC) FILTER (WHERE pi.id IS NOT NULL),
          '[]'::json
        ) AS images,
        p.created_at,
        p.updated_at
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      GROUP BY p.id, p.name, p.description, p.created_at, p.updated_at
      ORDER BY p.created_at DESC
    `
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projects = await sql<Project>`
      SELECT
        p.id,
        p.name,
        p.description,
        COALESCE(
          json_agg(pi.id ORDER BY pi.created_at ASC) FILTER (WHERE pi.id IS NOT NULL),
          '[]'::json
        ) AS images,
        p.created_at,
        p.updated_at
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      WHERE p.id = ${id}
      GROUP BY p.id, p.name, p.description, p.created_at, p.updated_at
    `
    return projects[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getProjectImages(projectId: string): Promise<ProjectImage[]> {
  try {
    const images = await sql<ProjectImage>`
      SELECT * FROM project_images WHERE project_id = ${projectId} ORDER BY created_at ASC
    `
    return images
  } catch (error) {
    console.error('Error fetching project images:', error)
    return []
  }
}

export async function getProjectImageData(projectId: string, imageId: string): Promise<ProjectImage | null> {
  try {
    const images = await sql<ProjectImage>`
      SELECT *
      FROM project_images
      WHERE id = ${imageId} AND project_id = ${projectId}
    `
    return images[0] || null
  } catch (error) {
    console.error('Error fetching project image:', error)
    return null
  }
}

export async function createContactSubmission(input: ContactSubmissionInput): Promise<boolean> {
  try {
    await sql`
      INSERT INTO contact_submissions (
        full_name,
        email,
        phone,
        project_type,
        message
      ) VALUES (
        ${input.full_name},
        ${input.email},
        ${input.phone ?? null},
        ${input.project_type ?? null},
        ${input.message}
      )
    `

    return true
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return false
  }
}
