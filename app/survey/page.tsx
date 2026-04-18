"use client"

import React, { useState } from 'react'

const options = {
  lifestyle: ['Daily living', 'Hosting guests', 'Work from home', 'Relaxation', 'Mixed'],
  guest_frequency: ['Rarely', 'Occasionally', 'Frequently'],
  privacy: ['Low', 'Medium', 'High'],
  contrast: ['High contrast (bold)', 'Medium', 'Low contrast (soft & blended)'],
  lighting: ['Bright & airy', 'Balanced', 'Dim & cozy', 'Dramatic'],
  material: ['Natural (wood, stone)', 'Sleek (glass, metal)', 'Mixed', 'Not sure'],
  boldness: ['Safe & timeless', 'Slightly bold', 'Bold & unique'],
  complexity: ['Minimal', 'Balanced', 'Rich & layered'],
  texture: ['Smooth & clean', 'Moderate texture', 'Rich textures'],
  vibe: ['Subtle elegance', 'Statement design', 'Mix of both'],
  storage: ['Minimal', 'Moderate', 'Extensive'],
  custom: ['Not needed', 'Some custom pieces', 'Highly customized design'],
  hvac: ['Central HVAC', 'Split AC units', 'Not decided'],
  smart: ['Yes', 'No', 'Maybe'],
  lighting_pref: ['General lighting', 'Indirect lighting', 'Decorative lighting', 'Mix'],
  consistency: ['One consistent theme', 'Slight variation', 'Different identity per space'],
  priority: ['Finishes & materials', 'Furniture', 'Lighting', 'Custom features', 'Balanced'],
  decision: ['Myself', 'Me & partner', 'Family', 'Company team'],
  approval: ['Step-by-step approvals', 'Big picture approvals', 'Flexible']
}

export default function SurveyPage() {
  const [form, setForm] = useState<any>({
    lifestyle_primary: options.lifestyle[0],
    guest_frequency: options.guest_frequency[0],
    privacy_level: options.privacy[0],
    contrast_preference: options.contrast[0],
    lighting_mood: options.lighting[0],
    material_preference: options.material[0],
    design_boldness: options.boldness[0],
    visual_complexity: options.complexity[0],
    texture_level: options.texture[0],
    overall_vibe: options.vibe[0],
    storage_needs: options.storage[0],
    custom_elements: options.custom[0],
    hvac_system: options.hvac[0],
    smart_home_integration: options.smart[0],
    lighting_preference: options.lighting_pref[0],
    consistency_across_spaces: options.consistency[0],
    priority_focus: options.priority[0],
    decision_maker: options.decision[0],
    approval_style: options.approval[0],
    additional_notes: ''
  })

  const [status, setStatus] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((s: any) => ({ ...s, [name]: value }))
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev }
        delete next[name]
        return next
      }
      return prev
    })
  }

  function validateForm(values: any) {
    const err: Record<string, string> = {}

    // Basic required checks (these fields have defaults but validate anyway)
    if (!values.lifestyle_primary || !String(values.lifestyle_primary).trim()) {
      err.lifestyle_primary = 'Please select primary use.'
    }
    if (!values.guest_frequency || !String(values.guest_frequency).trim()) {
      err.guest_frequency = 'Please select guest frequency.'
    }
    if (!values.privacy_level || !String(values.privacy_level).trim()) {
      err.privacy_level = 'Please select a privacy level.'
    }
    if (!values.priority_focus || !String(values.priority_focus).trim()) {
      err.priority_focus = 'Please select a priority focus.'
    }

    // Additional notes length limit
    if (values.additional_notes && String(values.additional_notes).length > 1000) {
      err.additional_notes = 'Notes must be 1000 characters or less.'
    }

    return err
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateForm(form)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setStatus(null)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (data?.success) {
        setStatus('submitted')
        setErrors({})
      } else setStatus('error')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 mt-16">
      <div className="bg-white/70 dark:bg-slate-800 rounded-xl p-8 shadow-md border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Client Survey</h1>
        <p className="text-base text-slate-600 dark:text-slate-400 mb-6">Quick preferences to help us design a tailored space.</p>
        <form onSubmit={handleSubmit}>
        {Object.entries({
          'Primary use of the space': ['lifestyle_primary', options.lifestyle],
          'Guest frequency': ['guest_frequency', options.guest_frequency],
          'Privacy level needed': ['privacy_level', options.privacy],
          'Contrast preference': ['contrast_preference', options.contrast],
          'Lighting mood': ['lighting_mood', options.lighting],
          'Material preference': ['material_preference', options.material],
          'Design boldness': ['design_boldness', options.boldness],
          'Visual complexity': ['visual_complexity', options.complexity],
          'Texture level': ['texture_level', options.texture],
          'Overall vibe': ['overall_vibe', options.vibe],
          'Storage needs': ['storage_needs', options.storage],
          'Custom elements': ['custom_elements', options.custom],
          'HVAC system': ['hvac_system', options.hvac],
          'Smart home integration': ['smart_home_integration', options.smart],
          'Lighting preference': ['lighting_preference', options.lighting_pref],
          'Consistency across spaces': ['consistency_across_spaces', options.consistency],
          'Priority focus / Budget': ['priority_focus', options.priority],
          'Decision maker': ['decision_maker', options.decision],
          'Approval style': ['approval_style', options.approval]
        }).map(([label, [name, opts]]: any) => (
          <div key={name} className="mb-4">
            <label className="block text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{label}</label>
            <select name={name} value={form[name]} onChange={handleChange} className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-200">
              {opts.map((o: string) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}

          <div className="mb-4">
            <label className="block text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Additional notes</label>
            <textarea name="additional_notes" value={form.additional_notes} onChange={handleChange} className={`w-full p-3 rounded-lg border bg-white dark:bg-slate-900 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-200 min-h-[110px] ${errors.additional_notes ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`} />
            {errors.additional_notes && <p className="text-base text-red-600 mt-1">{errors.additional_notes}</p>}
          </div>

          <div className="flex items-center justify-between gap-4 mt-4">
            <button type="submit" className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 disabled:opacity-60" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : 'Submit'}
            </button>

            {status === 'submitted' && <span className="text-sm text-green-600">Thanks — submitted</span>}
            {status === 'error' && <span className="text-sm text-red-600">Submission failed</span>}
            {!status && <span className="text-sm text-slate-500">All fields optional — takes ~1 minute</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
