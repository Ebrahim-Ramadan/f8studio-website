'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Projects' },
    { href: '/showreel', label: 'Showreel' },
    { href: '/animation', label: 'Animation' },
    { href: '/hiring', label: 'Apply' },
    { href: '/about', label: 'About' },
    { href: '/#contact', label: 'Contact Us' },
  ]

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-light tracking-wider text-foreground">
            <img
            src='/logo black png.png'
            alt='F8 studios Logo'
            className="h-18 w-auto rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive(item.href)
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm tracking-wide py-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
