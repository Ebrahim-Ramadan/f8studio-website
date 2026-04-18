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

export interface HiringCandidateInput {
  full_name: string
  phone?: string | null
  email: string
  portfolio?: string | null
  years_experience?: number | null
  main_field?: string | null
  software_skills?: string[]
  visualization_level?: string | null
  ai_tools?: string[]
  ai_usage?: string[]
  ai_use_behavior?: string | null
  prompt_skill?: string | null
  ai_importance?: string | null
  design_style?: string | null
  contrast_preference?: string | null
  design_tendency?: string | null
  design_focus?: string | null
  start_approach?: string | null
  problem_approach?: string[]
  feedback_handling?: string | null
  under_pressure?: string | null
  work_environment?: string | null
  scenario_response?: string | null
  portfolio_project?: string | null
  portfolio_why?: string | null
  final_filter?: string | null
  current_salary?: string | null
  expected_salary?: string | null
  created_at?: string
}

export async function createHiringCandidate(input: HiringCandidateInput): Promise<boolean> {
  try {
    await sql`
      INSERT INTO hiring_candidates (
        full_name,
        phone,
        email,
        portfolio,
        years_experience,
        main_field,
        software_skills,
        visualization_level,
        ai_tools,
        ai_usage,
        ai_use_behavior,
        prompt_skill,
        ai_importance,
        design_style,
        contrast_preference,
        design_tendency,
        design_focus,
        start_approach,
        problem_approach,
        feedback_handling,
        under_pressure,
        work_environment,
        scenario_response,
        portfolio_project,
        portfolio_why,
        final_filter,
        current_salary,
        expected_salary,
        created_at
      ) VALUES (
        ${input.full_name},
        ${input.phone ?? null},
        ${input.email},
        ${input.portfolio ?? null},
        ${input.years_experience ?? null},
        ${input.main_field ?? null},
        ${JSON.stringify(input.software_skills ?? [])}::jsonb,
        ${input.visualization_level ?? null},
        ${JSON.stringify(input.ai_tools ?? [])}::jsonb,
        ${JSON.stringify(input.ai_usage ?? [])}::jsonb,
        ${input.ai_use_behavior ?? null},
        ${input.prompt_skill ?? null},
        ${input.ai_importance ?? null},
        ${input.design_style ?? null},
        ${input.contrast_preference ?? null},
        ${input.design_tendency ?? null},
        ${input.design_focus ?? null},
        ${input.start_approach ?? null},
        ${JSON.stringify(input.problem_approach ?? [])}::jsonb,
        ${input.feedback_handling ?? null},
        ${input.under_pressure ?? null},
        ${input.work_environment ?? null},
        ${input.scenario_response ?? null},
        ${input.portfolio_project ?? null},
        ${input.portfolio_why ?? null},
        ${input.final_filter ?? null},
        ${input.current_salary ?? null},
        ${input.expected_salary ?? null},
        ${input.created_at ?? new Date().toISOString()}
      )
    `

    return true
  } catch (error) {
    console.error('Error creating hiring candidate:', error)
    return false
  }
}
