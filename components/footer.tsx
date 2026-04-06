import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/f8studios',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/f8studios',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/f8studios',
      icon: Linkedin,
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
              Dubai & Egypt
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
              href="mailto:hello@f8studios.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              hello@f8studios.com
            </a>
          </div>
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
