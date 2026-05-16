import { useEffect, useRef, useState } from 'react'
import { GraduationCap, MapPin, Calendar, Award, User } from 'lucide-react'

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView]    = useInView(0.3)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 50
    const id = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(parseFloat(start.toFixed(2)))
      if (start >= target) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const EDUCATION = [
  {
    degree: 'Bachelor of Technology — Computer Engineering',
    institution: 'Charotar University of Science and Technology (CHARUSAT)',
    location: 'Anand, Gujarat',
    period: 'Jun 2024 – Pursuing',
    grade: 'CGPA: 7.01 / 10 (till 4th Sem)',
    icon: GraduationCap,
    color: 'text-accent-cyan',
    bg:    'bg-accent-cyan/10',
    border:'border-accent-cyan/30',
  },
  {
    degree: 'Higher Secondary School (GSHEB)',
    institution: 'Shri N.P. Bhalodia High School',
    location: 'Junagadh, Gujarat',
    period: 'Completed Mar 2024',
    grade: 'Percentage: 82.28%',
    icon: Award,
    color: 'text-accent-violet',
    bg:    'bg-accent-violet/10',
    border:'border-accent-violet/30',
  },
]

export default function About() {
  const [ref, inView] = useInView(0.15)

  return (
    <section id="about" className="bg-dark-800/40">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">Get to know me</p>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className={`space-y-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                <User size={18} className="text-primary-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Personal Summary</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Currently pursuing a{' '}
              <span className="text-primary-300 font-semibold">Bachelor of Technology in Computer Engineering</span>{' '}
              at CHARUSAT with hands-on experience in{' '}
              <span className="text-accent-cyan font-semibold">Data Science, Analytics, and AI-driven solutions</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Skilled in <span className="text-accent-violet font-semibold">Python, SQL, Power BI, and Machine Learning</span>,
              with a strong foundation in data analysis, visualization, and problem-solving through
              projects, hackathons, and industry certifications.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {['Teamwork','Leadership','Problem Solving','Critical Thinking','Communication','Project Management'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Location', value: 'Anand, Gujarat' },
                { label: 'Email',    value: 'desaiharshil456@gmail.com' },
                { label: 'Degree',   value: 'B.Tech Computer Eng.' },
                { label: 'Status',   value: 'Open to Work' },
              ].map(i => (
                <div key={i.label} className="glass-card p-3">
                  <div className="text-xs text-slate-500 mb-0.5">{i.label}</div>
                  <div className="text-sm text-slate-200 font-medium truncate">{i.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'CGPA',      value: 7.01, suffix: '', decimals: true },
                { label: 'Projects',  value: 5,    suffix: '+', decimals: false },
                { label: 'Certs',     value: 6,    suffix: '+', decimals: false },
              ].map(s => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="font-display font-black text-2xl gradient-text">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <GraduationCap size={20} className="text-primary-400" />
              Education
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((ed, i) => (
                <div key={i} className={`glass-card p-5 border ${ed.border} transition-all duration-500`} style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${ed.bg} border ${ed.border} flex items-center justify-center flex-shrink-0`}>
                      <ed.icon size={18} className={ed.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm leading-snug">{ed.degree}</h4>
                      <p className={`${ed.color} text-sm font-medium mt-0.5`}>{ed.institution}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {ed.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={11} /> {ed.period}</span>
                      </div>
                      <div className="mt-2">
                        <span className={`tech-tag ${ed.color} border-current`}>{ed.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
