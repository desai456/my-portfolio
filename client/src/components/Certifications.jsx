import { useRef, useState, useEffect } from 'react'
import { Award, ExternalLink } from 'lucide-react'

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

const CERTS = [
  {
    title: 'IBM Data Science',
    issuer: 'Coursera / IBM',
    icon: '🎓',
    gradient: 'from-blue-600 to-indigo-500',
    border: 'border-blue-500/30',
    type: 'Professional Cert',
    link: 'https://drive.google.com/file/d/1DcqfNPJRhSe6c4Zmh5TkF3TZJUc86Owu/view?usp=sharing',
  },
  {
    title: 'Meta Database Structures & Management with MySQL',
    issuer: 'Coursera / Meta',
    icon: '🗄️',
    gradient: 'from-blue-400 to-cyan-500',
    border: 'border-cyan-500/30',
    type: 'Database',
    link: 'https://drive.google.com/file/d/1IekYnz4HFqS-8ODsRu0oq2j4S4j-1GQL/view?usp=sharing',
  },
  {
    title: 'Algorithms of Graph',
    issuer: 'Coursera',
    icon: '🔗',
    gradient: 'from-purple-500 to-violet-500',
    border: 'border-violet-500/30',
    type: 'CS Fundamentals',
    link: 'https://drive.google.com/file/d/1bo8HNh3LJSmQIOpvsS4QxzLrIgaF8eK_/view?usp=sharing',
  },
  {
    title: 'Software Design and Architecture',
    issuer: 'Coursera',
    icon: '🏗️',
    gradient: 'from-green-500 to-teal-500',
    border: 'border-teal-500/30',
    type: 'Software Engineering',
    link: 'https://drive.google.com/file/d/1St8f5EqYqTHb7Et_f60MVDtlygvCcSuc/view?usp=sharing',
  },
  {
    title: 'Tech-Tonic Hackathon 2025',
    issuer: 'Tech-Tonic Committee',
    icon: '🏆',
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/30',
    type: 'Hackathon Award',
    link: null,
  },
  {
    title: 'Web Wizards Hack 2025',
    issuer: 'Hackathon Committee',
    icon: '🧙',
    gradient: 'from-pink-500 to-rose-500',
    border: 'border-pink-500/30',
    type: 'Hackathon Award',
    link: null,
  },
]

function CertCard({ cert, delay, inView }) {
  return (
    <div
      className={`glass-card p-5 border ${cert.border} flex flex-col h-full group transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        {cert.icon}
      </div>

      <span className="tech-tag w-fit mb-2">{cert.type}</span>
      <h3 className="font-display font-bold text-white text-sm leading-snug flex-1">{cert.title}</h3>
      <p className={`text-sm bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent font-semibold mt-1`}>
        {cert.issuer}
      </p>

      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-400 transition-colors"
          aria-label={`View ${cert.title} certificate`}
        >
          <ExternalLink size={11} />
          View Certificate
        </a>
      )}
    </div>
  )
}

export default function Certifications() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="certifications" className="bg-dark-800/40">
      <div ref={ref} className="max-w-7xl mx-auto px-6">

        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">Continuous learning</p>
          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Awards</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Industry-recognized credentials from top platforms, validating expertise in Data Science, Software Engineering, and competitive hackathons.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} delay={i * 100 + 200} inView={inView} />
          ))}
        </div>

        <div className={`mt-12 glass-card p-6 flex flex-wrap justify-center gap-8 text-center transition-all duration-700 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'Coursera Certifications', value: '4', icon: '🎓' },
            { label: 'Hackathon Awards', value: '2', icon: '🏆' },
            { label: 'Total Credentials', value: '6+', icon: '⭐' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-3xl mb-2">{s.icon}</span>
              <span className="font-display font-black text-2xl gradient-text">{s.value}</span>
              <span className="text-xs text-slate-400 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
