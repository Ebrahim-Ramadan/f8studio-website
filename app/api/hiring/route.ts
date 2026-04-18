import { NextRequest, NextResponse } from 'next/server'
import { createHiringCandidate } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const HiringSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().optional().nullable(),
  email: z.string().email('Please provide a valid email address'),
  portfolio: z.string().url().optional().nullable().or(z.literal('')).optional(),
  yearsExperience: z.coerce.number().min(0).max(100).optional().nullable(),
  mainField: z.string().optional().nullable(),
  softwareSkills: z.array(z.string()).optional(),
  visualizationLevel: z.string().optional().nullable(),
  aiTools: z.array(z.string()).optional(),
  aiUsage: z.array(z.string()).optional(),
  aiUseBehavior: z.string().optional().nullable(),
  promptSkill: z.string().optional().nullable(),
  aiImportance: z.string().optional().nullable(),
  designStyle: z.string().optional().nullable(),
  contrastPreference: z.string().optional().nullable(),
  designTendency: z.string().optional().nullable(),
  designFocus: z.string().optional().nullable(),
  startApproach: z.string().optional().nullable(),
  problemApproach: z.union([z.array(z.string()), z.string()]).optional(),
  feedbackHandling: z.string().optional().nullable(),
  underPressure: z.string().optional().nullable(),
  workEnvironment: z.string().optional().nullable(),
  scenarioResponse: z.string().optional().nullable(),
  portfolioProject: z.string().optional().nullable(),
  portfolioWhy: z.string().optional().nullable(),
  finalFilter: z.string().optional().nullable(),
  currentSalary: z.string().optional().nullable(),
  expectedSalary: z.string().optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = HiringSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    const payload = {
      ...data,
      softwareSkills: data.softwareSkills ?? [],
      aiTools: data.aiTools ?? [],
      aiUsage: data.aiUsage ?? [],
      problemApproach: Array.isArray(data.problemApproach) ? data.problemApproach : data.problemApproach ? [data.problemApproach] : [],
      createdAt: new Date().toISOString(),
    }

    const saved = await createHiringCandidate({
      full_name: data.fullName,
      phone: data.phone ?? null,
      email: data.email,
      portfolio: data.portfolio ?? null,
      years_experience: data.yearsExperience ?? null,
      main_field: data.mainField ?? null,
      software_skills: data.softwareSkills ?? [],
      visualization_level: data.visualizationLevel ?? null,
      ai_tools: data.aiTools ?? [],
      ai_usage: data.aiUsage ?? [],
      ai_use_behavior: data.aiUseBehavior ?? null,
      prompt_skill: data.promptSkill ?? null,
      ai_importance: data.aiImportance ?? null,
      design_style: data.designStyle ?? null,
      contrast_preference: data.contrastPreference ?? null,
      design_tendency: data.designTendency ?? null,
      design_focus: data.designFocus ?? null,
      start_approach: data.startApproach ?? null,
      problem_approach: Array.isArray(data.problemApproach) ? data.problemApproach : data.problemApproach ? [data.problemApproach] : [],
      feedback_handling: data.feedbackHandling ?? null,
      under_pressure: data.underPressure ?? null,
      work_environment: data.workEnvironment ?? null,
      scenario_response: data.scenarioResponse ?? null,
      portfolio_project: data.portfolioProject ?? null,
      portfolio_why: data.portfolioWhy ?? null,
      final_filter: data.finalFilter ?? null,
      current_salary: data.currentSalary ?? null,
      expected_salary: data.expectedSalary ?? null,
      created_at: new Date().toISOString(),
    })

    if (!saved) {
      return NextResponse.json({ error: 'Unable to save application.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Application received.' }, { status: 201, headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    console.error('Error in hiring API:', error)
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }
}
