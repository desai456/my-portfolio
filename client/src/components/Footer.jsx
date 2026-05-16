import { Github, Linkedin, Mail, BarChart3, Heart, ArrowUp, Instagram } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',           href: '#home' },
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-dark-900">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-violet flex items-center justify-center">
                <BarChart3 size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Harshil <span className="gradient-text">Desai</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Data Scientist &amp; Full-Stack Developer passionate about turning data into actionable insights.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github,   href: 'https://github.com/desai456', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://www.instagram.com/_desai_5435/', label: 'Instagram' },
                { icon: Mail,     href: 'mailto:desaiharshil456@gmail.com', label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/40 transition-all hover:scale-110"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={e => handleNav(e, link.href)} className="text-slate-500 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['Python','SQL','React','FastAPI','Power BI','MongoDB','Scikit-learn','Node.js','PostgreSQL','Tailwind CSS'].map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            © 2026 Harshil Desai · Made with
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            using React + Tailwind CSS
          </p>
          <button onClick={scrollTop} className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/40 transition-all hover:scale-110" aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
