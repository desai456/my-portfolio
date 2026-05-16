import { useRef, useState, useEffect } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

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

const PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered Mock Interview Platform',
    subtitle: 'AI Integration & Scalability',
    description:
      'Developed an AI-powered mock interview platform using FastAPI, React, Google AI, and PostgreSQL to deliver real-time interview simulations and instant technical feedback. Features secure JWT-based authentication and a scalable backend supporting 20+ file conversion workflows optimized through in-memory streaming.',
    tags: ['FastAPI', 'React', 'PostgreSQL', 'Google AI', 'JWT', 'Python'],
    gradient: 'from-primary-600 to-accent-violet',
    icon: '🤖',
    category: 'AI',
    highlights: ['Real-time AI feedback','JWT Auth','20+ workflows','In-memory streaming'],
    github: 'https://github.com/desai456',
    live: null,
  },
  {
    id: 2,
    title: 'Hair & Skin Care Clinic Platform',
    subtitle: 'Full-Stack Medical Management',
    description:
      'Architected a high-performance full-stack medical clinic platform with a responsive React/Vite frontend integrated with a high-concurrency FastAPI & PostgreSQL backend. Optimized for heavy traffic with multi-worker Uvicorn, dynamic API rate limiting, GZip compression, and a global error-handling wrapper.',
    tags: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Uvicorn', 'Python'],
    gradient: 'from-accent-cyan to-green-500',
    icon: '🏥',
    category: 'Full-Stack',
    highlights: ['Multi-worker backend','Rate limiting','GZip compression','Global error handler'],
    github: 'https://github.com/desai456',
    live: null,
  },
  {
    id: 3,
    title: 'RIDE SHARE App',
    subtitle: 'Tech-Tonic Hackathon 2025',
    description:
      'Built a fully functional MERN stack ride-sharing web application during Tech-Tonic Hackathon 2025. Features real-time matching, responsive UI, and seamless user experience for drivers and passengers.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
    gradient: 'from-amber-500 to-orange-500',
    icon: '🚗',
    category: 'Full-Stack',
    highlights: ['MERN Stack','Real-time matching','Responsive UI','Hackathon Winner'],
    github: 'https://github.com/desai456',
    live: null,
  },
  {
    id: 4,
    title: 'Data Analytics Dashboard',
    subtitle: 'Power BI & Python EDA',
    description:
      'Created a comprehensive data analytics dashboard using Python (Pandas, NumPy, Matplotlib, Seaborn) and Power BI. Focused on EDA, trend analysis, and interactive business intelligence visualizations.',
    tags: ['Python', 'Pandas', 'Power BI', 'NumPy', 'Matplotlib', 'EDA'],
    gradient: 'from-yellow-500 to-red-400',
    icon: '📊',
    category: 'Data Science',
    highlights: ['EDA pipeline','Interactive charts','Business insights','Power BI reports'],
    github: 'https://github.com/desai456',
    live: null,
  },
  {
    id: 5,
    title: 'Responsive ODOO Website',
    subtitle: 'ODOO Hackathon Project',
    description:
      'Developed a responsive multi-page website during the ODOO Hackathon. Focused on modern UI/UX design, mobile-first responsiveness, and performance optimization.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    gradient: 'from-purple-500 to-pink-500',
    icon: '🌐',
    category: 'Web Dev',
    highlights: ['Mobile-first','Modern UI','Performance','Hackathon project'],
    github: 'https://github.com/desai456',
    live: null,
  },
]

const CATEGORIES = ['All', 'AI', 'Full-Stack', 'Data Science', 'Web Dev']

function ProjectCard({ project, delay }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
    setTilt({ x, y })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-6 flex flex-col h-full group cursor-default"
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
          {project.icon}
        </div>
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label={`${project.title} GitHub`}
          >
            <Github size={14} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label={`${project.title} live`}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="mb-2">
        <span className="tech-tag mb-2">{project.category}</span>
        <h3 className="font-display font-bold text-lg text-white leading-tight mt-2">{project.title}</h3>
        <p className={`text-sm bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent font-semibold mt-0.5`}>
          {project.subtitle}
        </p>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {project.highlights.map(h => (
          <div key={h} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${project.gradient} flex-shrink-0`} />
            {h}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
        {project.tags.map(t => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView]     = useInView(0.05)
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="bg-dark-800/40">
      <div ref={ref} className="max-w-7xl mx-auto px-6">

        <div className={`text-center mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">What I've built</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-primary-600 to-accent-violet text-white shadow-lg shadow-primary-500/30'
                  : 'glass text-slate-400 hover:text-white border border-white/10 hover:border-primary-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <ProjectCard project={project} delay={i * 100} />
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a
            href="https://github.com/desai456"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Github size={16} />
            View All on GitHub
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
