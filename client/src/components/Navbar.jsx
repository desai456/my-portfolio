import { useState, useEffect } from 'react'
import { Menu, X, Code2, BarChart3 } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home',          href: '#home' },
  { label: 'About',         href: '#about' },
  { label: 'Skills',        href: '#skills' },
  { label: 'Projects',      href: '#projects' },
  { label: 'Experience',    href: '#experience' },
  { label: 'Certifications',href: '#certifications' },
  { label: 'Contact',       href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = NAV_ITEMS.map(i => i.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={e => handleNav(e, '#home')}
          className="flex items-center gap-2 group"
          aria-label="Harshil Desai Portfolio"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-violet flex items-center justify-center shadow-lg group-hover:shadow-primary-500/40 transition-all">
            <BarChart3 size={18} className="text-white" />
          </div>
          <span className="font-display font-800 text-white text-lg hidden sm:block">
            Harshil<span className="gradient-text"> Desai</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8" role="navigation">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={e => handleNav(e, item.href)}
                className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:desaiharshil456@gmail.com"
            className="hidden sm:flex btn-primary text-sm py-2 px-5"
          >
            Hire Me
          </a>
          <button
            className="lg:hidden p-2 rounded-lg glass text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="glass border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={e => handleNav(e, item.href)}
                className={`nav-link block py-2 text-base ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="mailto:desaiharshil456@gmail.com" className="btn-primary block text-center mt-2">
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
