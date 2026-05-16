import { useRef, useState, useEffect } from 'react'
import { Calendar, MapPin, Trophy, Zap } from 'lucide-react'

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

const EXPERIENCES = [
  {
    title: 'AI Interview Platform',
    type: 'Software Group Project',
    org: 'CHARUSAT — 4th Semester',
    location: 'Anand, Gujarat',
    date: '27 December 2025',
    description:
      'Developed an AI-powered mock interview platform with real-time simulations and instant technical feedback. Built using FastAPI, React, Google AI and PostgreSQL with JWT authentication.',
    tags: ['FastAPI', 'React', 'PostgreSQL', 'AI', 'JWT'],
    icon: '🤖',
    gradient: 'from-primary-600 to-accent-violet',
    type_label: 'Academic Project',
  },
  {
    title: 'RIDE SHARE — MERN Stack Website',
    type: 'Hackathon',
    org: 'Tech-Tonic Hackathon 2025',
    location: 'Online',
    date: 'August 2025',
    description:
      'Designed and developed a full MERN stack ride-sharing application during the Tech-Tonic Hackathon. Implemented real-time matching, responsive UI, and complete user flows for both drivers and passengers.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
    icon: '🚗',
    gradient: 'from-amber-500 to-orange-500',
    type_label: 'Hackathon — 2025',
  },
  {
    title: 'Responsive Website',
    type: 'Hackathon',
    org: 'ODOO Hackathon',
    location: 'Online',
    date: 'June 2025',
    description:
      'Participated in the ODOO Hackathon and built a fully responsive multi-page website with modern UI/UX principles, optimized performance, and mobile-first design approach.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    icon: '🌐',
    gradient: 'from-blue-500 to-cyan-400',
    type_label: 'Hackathon',
  },
]

export default function Experience() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="experience">
      <div ref={ref} className="max-w-7xl mx-auto px-6">

        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">My journey so far</p>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Hackathons</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-violet to-transparent hidden sm:block" aria-hidden="true" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className={`relative flex gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 flex flex-col items-center hidden sm:flex">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-lg shadow-lg z-10 relative`}>
                    {exp.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="glass-card p-6 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="sm:hidden text-xl">{exp.icon}</span>
                        <span className={`tech-tag bg-gradient-to-r ${exp.gradient} text-white border-0 font-semibold text-xs`}>
                          {exp.type_label}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-white">{exp.title}</h3>
                      <p className={`text-sm bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent font-semibold`}>
                        {exp.org}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-400 space-y-1">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar size={11} />
                        {exp.date}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin size={11} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
