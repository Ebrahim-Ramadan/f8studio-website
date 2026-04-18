import { Facebook, Instagram, Linkedin } from 'lucide-react'
import type { SVGProps } from 'react'

function BehanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} className='w-6'>
      <path d="M8.88 11.58c.93-.43 1.4-1.21 1.4-2.34 0-2-1.5-3.13-4.15-3.13H0V18h6.43c2.7 0 4.26-1.26 4.26-3.46 0-1.52-.61-2.5-1.81-2.96ZM3 8.53h2.8c1.03 0 1.53.41 1.53 1.24 0 .84-.5 1.26-1.53 1.26H3V8.53Zm2.9 7.04H3v-2.42h2.9c1.13 0 1.67.39 1.67 1.2 0 .82-.54 1.22-1.67 1.22ZM19.3 9.2c-3.11 0-5.04 1.87-5.04 4.9s1.88 4.9 5.04 4.9c2.48 0 4.18-1.16 4.67-3.18h-2.98c-.32.62-.9.92-1.73.92-1.18 0-1.95-.63-2.11-1.72H24v-.68c0-3.11-1.75-5.14-4.7-5.14Zm-2.12 3.95c.2-1.03.93-1.63 2.05-1.63 1.1 0 1.82.58 1.96 1.63h-4.01ZM15.58 6.05h7.46v1.7h-7.46z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61575441685133',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/f8.studios',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/f8-studios-8635683ba',
      icon: Linkedin,
    },
    {
      name: 'Behance',
      href: 'https://www.behance.net/f8studios',
      icon: BehanceIcon,
    },

  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-light tracking-wider text-foreground mb-4">F8 Studios</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Al-Mansurah, Egypt
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-medium tracking-wide text-foreground mb-4">Follow</h4>
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-wide text-foreground mb-4">Contact</h4>
            <a
              href="mailto:info@f8-studios.net"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              info@f8-studios.net
            </a>
          </div>
        </div>
        
<div className="hidden md:flex flex-row justify-center mx-auto max-w-7xl  text-center">
  <div className="bg-gradient-to-r from-black from-transparent via-black/20 to-transparent w-full  h-[2px] "></div>
  </div>
       

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} F8 Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
