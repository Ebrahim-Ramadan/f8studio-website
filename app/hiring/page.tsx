"use client"

import { useState, useEffect, useRef } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'

export default function HiringPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [applicantName, setApplicantName] = useState<string | null>(null)
  const [animateCheck, setAnimateCheck] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  function fieldHasError(key: string) {
    return Boolean(fieldErrors && fieldErrors[key] && fieldErrors[key].length)
  }

  function prettifyKey(key: string) {
    // split camelCase or snake_case
    const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ')
    return spaced.charAt(0).toUpperCase() + spaced.slice(1)
  }

  function formatFieldErrors(errors: Record<string, string[]>) {
    return Object.entries(errors)
      .map(([k, v]) => `${prettifyKey(k)}: ${Array.isArray(v) ? v[0] : v}`)
      .join('\n')
  }

  const HiringClientSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().nullable().or(z.literal('')),
    email: z.string().email('Please provide a valid email address'),
    portfolio: z.string().url().nullable().or(z.literal('')),
    yearsExperience: z.coerce.number().min(0).max(100).nullable(),
    mainField: z.string().nullable().or(z.literal('')),
    softwareSkills: z.array(z.string()),
    visualizationLevel: z.string().nullable().or(z.literal('')),
    aiTools: z.array(z.string()),
    aiUsage: z.array(z.string()),
    aiUseBehavior: z.string().nullable().or(z.literal('')),
    promptSkill: z.string().nullable().or(z.literal('')),
    aiImportance: z.string().nullable().or(z.literal('')),
    designStyle: z.string().nullable().or(z.literal('')),
    contrastPreference: z.string().nullable().or(z.literal('')),
    designTendency: z.string().nullable().or(z.literal('')),
    designFocus: z.string().nullable().or(z.literal('')),
    startApproach: z.string().nullable().or(z.literal('')),
    problemApproach: z.union([z.array(z.string()), z.string()]),
    feedbackHandling: z.string().nullable().or(z.literal('')),
    underPressure: z.string().nullable().or(z.literal('')),
    workEnvironment: z.string().nullable().or(z.literal('')),
    scenarioResponse: z.string().nullable().or(z.literal('')),
    portfolioProject: z.string().nullable().or(z.literal('')),
    portfolioWhy: z.string().nullable().or(z.literal('')),
    finalFilter: z.string().nullable().or(z.literal('')),
    currentSalary: z.string().nullable().or(z.literal('')),
    expectedSalary: z.string().nullable().or(z.literal('')),
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setFieldErrors({})
    // capture the form element synchronously (React event may be pooled)
    const formEl = e.currentTarget as HTMLFormElement

    const form = new FormData(formEl)
    const data: any = {}
    form.forEach((v, k) => {
      // handle multi-select checkboxes
      if (k.endsWith('[]')) {
        const key = k.replace(/\[\]$/, '')
        if (!data[key]) data[key] = []
        data[key].push(v)
      } else {
        // try to coerce numbers
        if (k === 'yearsExperience') data[k] = Number(v)
        else data[k] = String(v)
      }
    })

    try {
      // client-side validation
      const validation = HiringClientSchema.safeParse(data)
      if (!validation.success) {
        const flattened = validation.error.flatten().fieldErrors
        setFieldErrors(flattened)
        // show human-friendly message
        setMessage(formatFieldErrors(flattened))
        // scroll to first field with error
        scrollToFirstError(flattened)
        setLoading(false)
        return
      }

      const res = await fetch('/api/hiring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()
      if (!res.ok) {
        // show server-side validation details if provided
        if (json?.details?.fieldErrors) {
          setFieldErrors(json.details.fieldErrors)
          setMessage(formatFieldErrors(json.details.fieldErrors))
          scrollToFirstError(json.details.fieldErrors)
        } else {
          setMessage(json?.error || 'Submission failed')
        }
        throw new Error(json?.error || 'Error')
      }

      // show success state with personalized message
      setApplicantName(String( data.full_name || 'Applicant'))
      setMessage('Application submitted — thank you!')
      // reset the captured form element
      try { formEl.reset() } catch {}
      // trigger success UI
      setSubmitted(true)
      setAnimateCheck(false)
      // small timeout to start svg stroke animation
      setTimeout(() => setAnimateCheck(true), 50)
    } catch (err: any) {
      if (!message) setMessage(err.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  function scrollToFirstError(errors: Record<string, string[]>) {
    if (!errors) return
    const keys = Object.keys(errors)
    for (const k of keys) {
      const arr = errors[k]
      if (arr && arr.length) {
        // try direct name
        let el: Element | null = document.querySelector(`[name="${k}"]`)
        // try array-style name for checkboxes
        if (!el) el = document.querySelector(`[name="${k}[]"]`)
        if (!el) {
          // try id fallback
          el = document.getElementById(k)
        }
        if (el && 'scrollIntoView' in el) {
          ;(el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' })
          try {
            ;(el as HTMLElement).focus()
          } catch {}
          return
        }
      }
    }
  }

  return (
   <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-black-50 via-indigo-100 to-indigo-200 dark:from-indigo-900 dark:via-slate-800 dark:to-indigo-900 py-24">
      
      <div className="max-w-3xl mx-auto px-3 md:px-6">
      
        {!submitted ? (
          <Card className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Join Our Team</CardTitle>
            </CardHeader>
            <CardContent className='px-3 md:px-6'>
              <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
                <section>
                <h2 className="text-2xl font-bold">Basic Information</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                  <div>
                    <label className="block font-medium font-medium mb-1">Full name</label>
                    <Input
                      name="fullName"
                      placeholder="Type Your Full name"
                      required
                      className={fieldHasError('fullName') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-destructive text-sm mt-1">{fieldErrors.fullName[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Phone number</label>
                    <Input
                      name="phone"
                      placeholder="Type Your Phone number"
                      className={fieldHasError('phone') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''}
                    />
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Email</label>
                    <Input
                      name="email"
                      placeholder="Type Your Email"
                      type="email"
                      required
                      className={fieldHasError('email') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''}
                    />
                    {fieldErrors.email && (
                      <p className="text-destructive text-sm mt-1">{fieldErrors.email[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Portfolio link</label>
                    <Input
                      name="portfolio"
                      placeholder="Type Your Portfolio link"
                      className={fieldHasError('portfolio') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Experience Level</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                  <div>
                    <label className="block font-medium font-bold mb-1">Years of experience </label>
                    <Input
                      name="yearsExperience"
                      type="number"
                      min={0}
                      max={50}
                      defaultValue={0}
                      className={`w-40 ${fieldHasError('yearsExperience') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''}`}
                    />
                    {fieldErrors.yearsExperience && (
                      <p className="text-destructive text-sm mt-1">{fieldErrors.yearsExperience[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Main field</label>
                    <select
                      name="mainField"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('mainField') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select main field</option>
                      <option>Interior Design</option>
                      <option>Architecture</option>
                      <option>Visualization (3D)</option>
                      <option>Mixed</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Software Skills</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {['AutoCAD','3ds Max','Corona Renderer','V-Ray','SketchUp','Photoshop','Other'].map((s)=> (
                      <label key={s} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="checkbox" name={`softwareSkills[]`} value={s} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="block  font-medium mb-1">Your level in 3D visualization</label>
                    <select
                      name="visualizationLevel"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('visualizationLevel') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">AI Tools Usage</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                    <label className="block font-medium font-medium mb-1"> Which AI tools do you currently use in your workflow? (Select all that apply)</label>

               
                  <div className="grid grid-cols-2 gap-2">
                    {['Midjourney','DALL·E','Nano banana','Kling','Stable Diffusion','ChatGPT','Photoshop AI tools','Other','I don’t use AI tools'].map((a)=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="checkbox" name={`aiTools[]`} value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block font-medium font-medium mb-1">How do you use AI in your design process? (Select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Idea generation (concepts & inspiration)','Creating moodboards','Image enhancement / upscaling','Presentation support','Rendering assistance','I don’t use AI'].map((u)=> (
                        <label key={u} className="inline-flex items-center gap-2 font-medium">
                          <input className="h-4 w-4 accent-indigo-600" type="checkbox" name={`aiUsage[]`} value={u} />
                          <span>{u}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium font-medium mb-1">When using AI-generated results, you usually:</label>
                    <select
                      name="aiUseBehavior"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('aiUseBehavior') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select an option</option>
                      <option>Use them as they are</option>
                      <option>Modify and refine them</option>
                      <option>Use them only for inspiration</option>
                      <option>Avoid using them</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium font-medium mb-1">How would you rate your prompt writing skills?</label>
                    <select
                      name="promptSkill"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('promptSkill') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium font-medium mb-1">AI in your workflow is:</label>
                    <select
                      name="aiImportance"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('aiImportance') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select importance</option>
                      <option>Essential</option>
                      <option>Helpful but not necessary</option>
                      <option>Not important</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Design Taste</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                  <label className="block font-medium font-medium mb-1">Which design style do you prefer? </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Minimal','Modern','Contemporary','Classic','Eclectic'].map(s=> (
                      <label key={s} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="designStyle" value={s} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Contrast preference</label>
                    <select
                      name="contrastPreference"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('contrastPreference') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select contrast</option>
                      <option>High contrast</option>
                      <option>Medium</option>
                      <option>Low contrast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Your design tendency</label>
                    <select
                      name="designTendency"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('designTendency') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select tendency</option>
                      <option>Clean & simple</option>
                      <option>Balanced</option>
                      <option>Rich & detailed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">When designing, you focus more on:</label>
                    <select
                      name="designFocus"
                      className={`border-input h-9 rounded-md px-3 bg-transparent w-64 focus-visible:ring-ring/50 ${fieldHasError('designFocus') ? 'border-rose-600 ring-1 ring-rose-600' : ''}`}>
                      <option value="">Select focus</option>
                      <option>Overall mood</option>
                      <option>Details</option>
                      <option>Both equally</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Work Approach</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                  <label className="block font-medium font-medium mb-1">How do you usually start a project? </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Moodboard first','Space planning first','References research','Depends on project'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="startApproach" value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                    <label className="block font-medium font-medium mb-1">When facing a design problem, you usually:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['look for references','experiment','ask for feedback','analyze before acting'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="checkbox" name={`problemApproach[]`} value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Personality & Behavior</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                     <label className="block font-medium font-medium mb-1">How do you usually handle feedback on your designs?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['I follow exactly','I discuss and suggest improvements','I defend my design if needed'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="feedbackHandling" value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                  
                  <label className="block font-medium font-medium mb-1">How do you usually handle stress in your workflow?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Stay calm and organized','Work faster even if messy','Get stressed but deliver','Need guidance'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="underPressure" value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Work Style</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40">
                    <label className="block font-medium font-medium mb-1">What type of work environment do you prefer?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Structured & clear tasks','Flexible & creative','Fast-paced','Balanced'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="workEnvironment" value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Scenario Question</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40">
                    <label className="block font-medium font-medium mb-1">If a client asks for something you feel is not aesthetically good:</label>
                 
                  <div className="grid grid-cols-2 gap-2">
                    {['I do exactly what they ask','I suggest alternatives','I explain why it may not work','I try to balance both'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="scenarioResponse" value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Portfolio Insight</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-3">
                  <div>
                    <label className="block font-medium font-medium mb-1">Which project represents you the most?</label>
                    <Input name="portfolioProject" placeholder="Answer here" className={fieldHasError('portfolioProject') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''} />
                  </div>
                  <div>
                    <label className="block font-medium font-medium mb-1">Why?</label>
                    <Textarea name="portfolioWhy" placeholder="?" className={`mt-0 ${fieldHasError('portfolioWhy') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''}`} />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Final Filter & Salary</h2>
                <div className="mt-4 p-6 border border-input rounded-lg bg-background/40 space-y-4">
                
                  <label className="block font-medium font-medium mb-1">Which describes you more:</label> 
                  <div className="grid grid-cols-2 gap-2">
                    {['I follow instructions well','I think and challenge ideas','I do both depending on the situation'].map(a=> (
                      <label key={a} className="inline-flex items-center gap-2 font-medium">
                        <input className="h-4 w-4 accent-indigo-600" type="radio" name="finalFilter" value={a} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block font-medium font-medium mb-1">Current salary</label>
                    <Input name="currentSalary" placeholder="Current salary" className={fieldHasError('currentSalary') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''} />
                    <label className="block font-medium font-medium mb-1">Expected salary</label>
                    <Input name="expectedSalary" placeholder="Expected salary" className={fieldHasError('expectedSalary') ? 'border-rose-600 focus-visible:ring-rose-500 ring-1 ring-rose-600' : ''} />
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-end gap-4">
                {message && (
                  <div className="font-medium mr-auto text-rose-600 whitespace-pre-wrap">{message}</div>
                )}
                <Button type="submit" size="lg" disabled={loading} className='text-lg font-bold'>
                  {loading ? 'Submitting...' : 'Submit '}
                </Button>
              </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto px-3 md:px-6">
            <Card className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm py-12">
              <CardContent>
                <div className="py-6 flex flex-col items-center justify-center gap-6">
                  <div className="w-40 h-40 rounded-full bg-white/90 dark:bg-slate-900/80 flex items-center justify-center shadow-lg">
                    <svg width="96" height="96" viewBox="0 0 52 52" className="text-emerald-600" aria-hidden>
                      <circle cx="26" cy="26" r="25" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="2"></circle>
                      <path
                        d="M14 27l7 7 16-16"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 48,
                          strokeDashoffset: animateCheck ? 0 : 48,
                          transition: 'stroke-dashoffset 600ms cubic-bezier(.2,.8,.2,1)'
                        }}
                      />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Thanks{applicantName ? `, ${applicantName}` : ''} — we received your application</h3>
                    <p className="mt-2 text-muted-foreground">{message ?? 'We will review your submission and be in touch shortly.'}</p>
                    <p className="mt-3 text-sm text-muted-foreground">In the meantime, feel free to explore our recent projects or learn more about how we work.</p>
                  </div>

                  <div className="flex gap-3">
                    <Link href="/projects">
                      <Button size="lg">Explore our work</Button>
                    </Link>
                    <button
                      className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                      onClick={() => {
                        setSubmitted(false)
                        setMessage(null)
                        setFieldErrors({})
                        setApplicantName(null)
                        setAnimateCheck(false)
                      }}
                    >
                      Submit another
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
