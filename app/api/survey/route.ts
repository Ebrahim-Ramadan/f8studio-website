import { NextResponse } from 'next/server'
import { createSurveySubmission } from  '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const ok = await createSurveySubmission(body)

    if (ok) return NextResponse.json({ success: true })

    return NextResponse.json({ success: false }, { status: 500 })
  } catch (error) {
    console.error('API /api/survey error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
