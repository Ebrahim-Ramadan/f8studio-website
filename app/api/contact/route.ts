import { NextRequest, NextResponse } from 'next/server'
import { createContactSubmission } from '@/lib/db'

export const dynamic = 'force-dynamic'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Full name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      )
    }

    const saved = await createContactSubmission({
      full_name: fullName,
      email,
      phone: phone || undefined,
      project_type: projectType || undefined,
      message,
    })

    if (!saved) {
      return NextResponse.json(
        { error: 'Unable to save your message right now. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Thanks for reaching out. We will get back to you soon.' },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }
}
