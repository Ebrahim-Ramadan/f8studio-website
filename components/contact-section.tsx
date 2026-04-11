'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
}

export const COUNTRY_CODES = [
  { label: 'Afghanistan', code: '+93' },
  { label: 'Albania', code: '+355' },
  { label: 'Algeria', code: '+213' },
  { label: 'Andorra', code: '+376' },
  { label: 'Angola', code: '+244' },
  { label: 'Antigua and Barbuda', code: '+1268' },
  { label: 'Argentina', code: '+54' },
  { label: 'Armenia', code: '+374' },
  { label: 'Australia', code: '+61' },
  { label: 'Austria', code: '+43' },
  { label: 'Azerbaijan', code: '+994' },
  { label: 'Bahamas', code: '+1242' },
  { label: 'Bahrain', code: '+973' },
  { label: 'Bangladesh', code: '+880' },
  { label: 'Barbados', code: '+1246' },
  { label: 'Belarus', code: '+375' },
  { label: 'Belgium', code: '+32' },
  { label: 'Belize', code: '+501' },
  { label: 'Benin', code: '+229' },
  { label: 'Bhutan', code: '+975' },
  { label: 'Bolivia', code: '+591' },
  { label: 'Bosnia and Herzegovina', code: '+387' },
  { label: 'Botswana', code: '+267' },
  { label: 'Brazil', code: '+55' },
  { label: 'Brunei', code: '+673' },
  { label: 'Bulgaria', code: '+359' },
  { label: 'Burkina Faso', code: '+226' },
  { label: 'Burundi', code: '+257' },
  { label: 'Cabo Verde', code: '+238' },
  { label: 'Cambodia', code: '+855' },
  { label: 'Cameroon', code: '+237' },
  { label: 'Canada', code: '+1' },
  { label: 'Central African Republic', code: '+236' },
  { label: 'Chad', code: '+235' },
  { label: 'Chile', code: '+56' },
  { label: 'China', code: '+86' },
  { label: 'Colombia', code: '+57' },
  { label: 'Comoros', code: '+269' },
  { label: 'Congo', code: '+242' },
  { label: 'Costa Rica', code: '+506' },
  { label: 'Croatia', code: '+385' },
  { label: 'Cuba', code: '+53' },
  { label: 'Cyprus', code: '+357' },
  { label: 'Czech Republic', code: '+420' },
  { label: 'Denmark', code: '+45' },
  { label: 'Djibouti', code: '+253' },
  { label: 'Dominica', code: '+1767' },
  { label: 'Dominican Republic', code: '+1849' },
  { label: 'Ecuador', code: '+593' },
  { label: 'Egypt', code: '+20' },
  { label: 'El Salvador', code: '+503' },
  { label: 'Equatorial Guinea', code: '+240' },
  { label: 'Eritrea', code: '+291' },
  { label: 'Estonia', code: '+372' },
  { label: 'Eswatini', code: '+268' },
  { label: 'Ethiopia', code: '+251' },
  { label: 'Fiji', code: '+679' },
  { label: 'Finland', code: '+358' },
  { label: 'France', code: '+33' },
  { label: 'Gabon', code: '+241' },
  { label: 'Gambia', code: '+220' },
  { label: 'Georgia', code: '+995' },
  { label: 'Germany', code: '+49' },
  { label: 'Ghana', code: '+233' },
  { label: 'Greece', code: '+30' },
  { label: 'Grenada', code: '+1473' },
  { label: 'Guatemala', code: '+502' },
  { label: 'Guinea', code: '+224' },
  { label: 'Guinea-Bissau', code: '+245' },
  { label: 'Guyana', code: '+592' },
  { label: 'Haiti', code: '+509' },
  { label: 'Honduras', code: '+504' },
  { label: 'Hungary', code: '+36' },
  { label: 'Iceland', code: '+354' },
  { label: 'India', code: '+91' },
  { label: 'Indonesia', code: '+62' },
  { label: 'Iran', code: '+98' },
  { label: 'Iraq', code: '+964' },
  { label: 'Ireland', code: '+353' },
  { label: 'Israel', code: '+972' },
  { label: 'Italy', code: '+39' },
  { label: 'Jamaica', code: '+1876' },
  { label: 'Japan', code: '+81' },
  { label: 'Jordan', code: '+962' },
  { label: 'Kazakhstan', code: '+7' },
  { label: 'Kenya', code: '+254' },
  { label: 'Kiribati', code: '+686' },
  { label: 'Korea, North', code: '+850' },
  { label: 'Korea, South', code: '+82' },
  { label: 'Kosovo', code: '+383' },
  { label: 'Kuwait', code: '+965' },
  { label: 'Kyrgyzstan', code: '+996' },
  { label: 'Laos', code: '+856' },
  { label: 'Latvia', code: '+371' },
  { label: 'Lebanon', code: '+961' },
  { label: 'Lesotho', code: '+266' },
  { label: 'Liberia', code: '+231' },
  { label: 'Libya', code: '+218' },
  { label: 'Liechtenstein', code: '+423' },
  { label: 'Lithuania', code: '+370' },
  { label: 'Luxembourg', code: '+352' },
  { label: 'Madagascar', code: '+261' },
  { label: 'Malawi', code: '+265' },
  { label: 'Malaysia', code: '+60' },
  { label: 'Maldives', code: '+960' },
  { label: 'Mali', code: '+223' },
  { label: 'Malta', code: '+356' },
  { label: 'Marshall Islands', code: '+692' },
  { label: 'Mauritania', code: '+222' },
  { label: 'Mauritius', code: '+230' },
  { label: 'Mexico', code: '+52' },
  { label: 'Micronesia', code: '+691' },
  { label: 'Moldova', code: '+373' },
  { label: 'Monaco', code: '+377' },
  { label: 'Mongolia', code: '+976' },
  { label: 'Montenegro', code: '+382' },
  { label: 'Morocco', code: '+212' },
  { label: 'Mozambique', code: '+258' },
  { label: 'Myanmar', code: '+95' },
  { label: 'Namibia', code: '+264' },
  { label: 'Nauru', code: '+674' },
  { label: 'Nepal', code: '+977' },
  { label: 'Netherlands', code: '+31' },
  { label: 'New Zealand', code: '+64' },
  { label: 'Nicaragua', code: '+505' },
  { label: 'Niger', code: '+227' },
  { label: 'Nigeria', code: '+234' },
  { label: 'North Macedonia', code: '+389' },
  { label: 'Norway', code: '+47' },
  { label: 'Oman', code: '+968' },
  { label: 'Pakistan', code: '+92' },
  { label: 'Palau', code: '+680' },
  { label: 'Palestine', code: '+970' },
  { label: 'Panama', code: '+507' },
  { label: 'Papua New Guinea', code: '+675' },
  { label: 'Paraguay', code: '+595' },
  { label: 'Peru', code: '+51' },
  { label: 'Philippines', code: '+63' },
  { label: 'Poland', code: '+48' },
  { label: 'Portugal', code: '+351' },
  { label: 'Qatar', code: '+974' },
  { label: 'Romania', code: '+40' },
  { label: 'Russia', code: '+7' },
  { label: 'Rwanda', code: '+250' },
  { label: 'Saint Kitts and Nevis', code: '+1869' },
  { label: 'Saint Lucia', code: '+1758' },
  { label: 'Saint Vincent and the Grenadines', code: '+1784' },
  { label: 'Samoa', code: '+685' },
  { label: 'San Marino', code: '+378' },
  { label: 'Sao Tome and Principe', code: '+239' },
  { label: 'Saudi Arabia', code: '+966' },
  { label: 'Senegal', code: '+221' },
  { label: 'Serbia', code: '+381' },
  { label: 'Seychelles', code: '+248' },
  { label: 'Sierra Leone', code: '+232' },
  { label: 'Singapore', code: '+65' },
  { label: 'Slovakia', code: '+421' },
  { label: 'Slovenia', code: '+386' },
  { label: 'Solomon Islands', code: '+677' },
  { label: 'Somalia', code: '+252' },
  { label: 'South Africa', code: '+27' },
  { label: 'South Sudan', code: '+211' },
  { label: 'Spain', code: '+34' },
  { label: 'Sri Lanka', code: '+94' },
  { label: 'Sudan', code: '+249' },
  { label: 'Suriname', code: '+597' },
  { label: 'Sweden', code: '+46' },
  { label: 'Switzerland', code: '+41' },
  { label: 'Syria', code: '+963' },
  { label: 'Taiwan', code: '+886' },
  { label: 'Tajikistan', code: '+992' },
  { label: 'Tanzania', code: '+255' },
  { label: 'Thailand', code: '+66' },
  { label: 'Timor-Leste', code: '+670' },
  { label: 'Togo', code: '+228' },
  { label: 'Tonga', code: '+676' },
  { label: 'Trinidad and Tobago', code: '+1868' },
  { label: 'Tunisia', code: '+216' },
  { label: 'Turkey', code: '+90' },
  { label: 'Turkmenistan', code: '+993' },
  { label: 'Tuvalu', code: '+688' },
  { label: 'Uganda', code: '+256' },
  { label: 'Ukraine', code: '+380' },
  { label: 'United Arab Emirates', code: '+971' },
  { label: 'United Kingdom', code: '+44' },
  { label: 'United States', code: '+1' },
  { label: 'Uruguay', code: '+598' },
  { label: 'Uzbekistan', code: '+998' },
  { label: 'Vanuatu', code: '+678' },
  { label: 'Vatican City', code: '+379' },
  { label: 'Venezuela', code: '+58' },
  { label: 'Vietnam', code: '+84' },
  { label: 'Yemen', code: '+967' },
  { label: 'Zambia', code: '+260' },
  { label: 'Zimbabwe', code: '+263' }
]

function applyCountryCode(phone: string, countryCode: string) {
  const value = phone.trim()

  if (!value) {
    return `${countryCode} `
  }

  if (value.startsWith('+')) {
    const numberWithoutCode = value.replace(/^\+\d+\s*/, '')
    return `${countryCode} ${numberWithoutCode}`.trimEnd()
  }

  return `${countryCode} ${value}`
}

export function ContactSection() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [countryCode, setCountryCode] = useState('+20')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmissionState('submitting')
    setResponseMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setSubmissionState('success')
      setResponseMessage(data.message || 'Thanks. Your message has been sent.')
      setFormData(INITIAL_FORM)
    } catch (error) {
      setSubmissionState('error')
      setResponseMessage(error instanceof Error ? error.message : 'Failed to send message.')
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 scroll-mt-28" id="contact">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
          <div className="p-4 md:p-10 border-b lg:border-b-0 lg:border-r border-border bg-gradient-to-b from-muted/50 to-transparent">
            <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-3">Contact Us</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">Let's build your next project</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              Share your idea, project scope, and timeline. We will review your message and get back to you with a tailored response.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p>Email: hello@f8studios.com</p>
              <p>Location: Al-Mansurah, Egypt</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-2 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm text-foreground">Full Name *</label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-foreground">Email *</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-foreground">Phone</label>
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-2">
                  <select
                    aria-label="Country code"
                    value={countryCode}
                    onChange={(event) => {
                      const selectedCode = event.target.value
                      setCountryCode(selectedCode)
                      setFormData((prev) => ({
                        ...prev,
                        phone: applyCountryCode(prev.phone, selectedCode),
                      }))
                    }}
                    className="h-9 rounded-md border border-input bg-transparent text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full max-w-[120px] truncate"
                  >
                    {COUNTRY_CODES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.label} ({country.code})
                      </option>
                    ))}
                  </select>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder={`${countryCode} 10XXXXXXXX`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm text-foreground">Project Type</label>
                <Input
                  id="projectType"
                  value={formData.projectType}
                  onChange={(event) => setFormData((prev) => ({ ...prev, projectType: event.target.value }))}
                  placeholder="Interior, Exterior, 3D Visualization"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-foreground">Message *</label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Tell us about your project..."
                className="min-h-36"
                required
              />
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div
                className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                  submissionState === 'success'
                    ? 'text-emerald-600 opacity-100 translate-y-0'
                    : submissionState === 'error'
                      ? 'text-destructive opacity-100 translate-y-0'
                      : 'text-muted-foreground opacity-100'
                }`}
              >
                <CheckCircle2
                  className={`h-4 w-4 transition-all duration-300 ${
                    submissionState === 'success' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                  aria-hidden="true"
                />
                <p>{responseMessage || 'We typically reply within 1-2 business days.'}</p>
              </div>

              <Button type="submit" disabled={submissionState === 'submitting'} className="min-w-36">
                {submissionState === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
