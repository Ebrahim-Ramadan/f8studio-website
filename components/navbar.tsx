'use client'

import { usePathname } from 'next/navigation'
import { Menu, X, FolderOpen, Play, Sparkles, UserRound, Info, Mail, FileQuestion } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'next-view-transitions'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const navItems = [
    { href: '/', label: 'Projects', icon: FolderOpen },
    { href: '/showreel', label: 'Showreel', icon: Play },
    { href: '/animation', label: 'Animation', icon: Sparkles },
    { href: '/hiring', label: 'Apply', icon: UserRound },
    { href: '/about', label: 'About', icon: Info },
    // { href: '/survey', label: 'Survey', icon: FileQuestion },
    { href: '/#contact', label: 'Contact', icon: Mail },
  ]

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  const openMenu = () => {
    setIsVisible(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimating(true))
    })
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      setIsOpen(false)
    }, 350)
  }

  const toggleMenu = () => {
    isOpen ? closeMenu() : openMenu()
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-xl  border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
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
            <div className="hidden md:flex items-center gap-10">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 text-sm tracking-wide transition-colors ${
                    isActive(href)
                      ? 'text-foreground font-bold text-base'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon
        size={14}
        strokeWidth={2}
        className={isActive(href) ? 'text-blue-500' : ''}
      />
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-foreground p-1 transition-transform duration-200 active:scale-90"
              aria-label="Toggle menu"
            >
              <span
                className="block transition-all duration-300"
                style={{
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
                  position: isOpen ? 'absolute' : 'relative',
                }}
              >
                <Menu size={24} />
              </span>
              <span
                className="block transition-all duration-300"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
                  position: isOpen ? 'relative' : 'absolute',
                }}
              >
                <X size={24} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-screen Overlay */}
      {isVisible && (
        <div className="md:hidden fixed inset-0 z-40" aria-hidden={!isOpen}>
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: isAnimating ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
              backdropFilter: isAnimating ? 'blur(12px)' : 'blur(0px)',
              WebkitBackdropFilter: isAnimating ? 'blur(12px)' : 'blur(0px)',
              transitionDuration: '350ms',
              transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
              transitionProperty: 'background-color, backdrop-filter',
            }}
            onClick={closeMenu}
          />

          {/* Slide-down menu panel */}
          <div
            className="absolute left-0 right-0 top-10"
            style={{
              background: 'rgba(var(--background-rgb, 255 255 255) / 0.85)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderBottom: '1px solid rgba(128,128,128,0.15)',
              transform: isAnimating ? 'translateY(0%)' : 'translateY(-100%)',
              transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1)',
              paddingTop: 'calc(env(safe-area-inset-top) + 64px)',
              paddingBottom: '24px',
              boxShadow: isAnimating ? '0 8px 40px rgba(0,0,0,0.18)' : 'none',
            }}
          >
            <div className="px-6 space-y-1">
              {navItems.map(({ href, label, icon: Icon }, index) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 text-base tracking-wide py-3.5 border-b border-border/40 last:border-none transition-all ${
                    isActive(href)
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground'
                  }`}
                  style={{
                    opacity: isAnimating ? 1 : 0,
                    transform: isAnimating ? 'translateY(0px)' : 'translateY(-10px)',
                    transition: `opacity 300ms ease ${80 + index * 45}ms, transform 300ms ease ${80 + index * 45}ms`,
                  }}
                  onClick={closeMenu}
                >
                  {/* Icon container — pill bg when active */}
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
                      isActive(href)
                        ? 'bg-foreground/10'
                        : 'bg-muted/60'
                    }`}
                  >
                   <Icon
        size={14}
        strokeWidth={2}
        className={isActive(href) ? 'text-blue-500' : ''}
      />
                  </span>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}