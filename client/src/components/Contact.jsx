import { useRef, useState, useEffect } from 'react'
import { Mail, Github, Linkedin, MapPin, Phone, Send, CheckCircle, AlertCircle, Instagram } from 'lucide-react'

function useInView(threshold = 0.1) {
  const ref  = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'desaiharshil456@gmail.com',
    href: 'mailto:desaiharshil456@gmail.com',
    gradient: 'from-primary-600 to-accent-violet',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/desai456',
    href: 'https://github.com/desai456',
    gradient: 'from-slate-500 to-slate-700',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/harshildesai',
    href: 'https://linkedin.com',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Anand, Gujarat, India',
    href: null,
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@_desai_5435',
    href: 'https://www.instagram.com/_desai_5435/',
    gradient: 'from-pink-500 to-rose-500',
  },
]

export default function Contact() {
  const [ref, inView] = useInView(0.1)
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact">
      <div ref={ref} className="max-w-7xl mx-auto px-6">

        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">Let's work together</p>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Have a project in mind or looking for a Data Science / Full-Stack developer? I'd love to connect!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <div className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-lg text-white mb-5">Contact Details</h3>
              <div className="space-y-4">
                {CONTACT_INFO.map(item => (
                  <div key={item.label} className="flex items-center gap-3 group">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      <item.icon size={16} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-primary-400 transition-colors truncate block">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-slate-300">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Available for Work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Currently open to internship, freelance, or full-time Data Science &amp; Web Development roles.
              </p>
            </div>
          </div>

          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
              <h3 className="font-display font-bold text-lg text-white mb-2">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="text-xs text-slate-400 mb-1.5 block">Your Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Harshil Desai"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs text-slate-400 mb-1.5 block">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="harshil@example.com"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="text-xs text-slate-400 mb-1.5 block">Subject *</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Collaboration / Job Opportunity"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs text-slate-400 mb-1.5 block">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <CheckCircle size={16} /> Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle size={16} /> Something went wrong. Please email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
