import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowDown, Download, BarChart2, BrainCircuit, Code, Instagram } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'

/* ── Floating particle canvas ───────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#6366f1','#8b5cf6','#06b6d4','#ec4899','#f59e0b']
    const count  = 70
    const dots   = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x
          const dy   = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 120) * 0.15})`
            ctx.lineWidth   = 0.6
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }

      dots.forEach(d => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = d.color + Math.round(d.alpha * 255).toString(16).padStart(2,'0')
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="glass-card p-4 flex items-center gap-3 min-w-[140px]">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <div className="font-display font-bold text-xl text-white">{value}</div>
        <div className="text-xs text-slate-400">{label}</div>
      </div>
    </div>
  )
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-mesh"
    >
      <ParticleCanvas />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-[120px]" />
        <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-accent-violet/8 blur-[80px]" />
        <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-accent-cyan/6 blur-[60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 text-sm text-primary-300 font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </div>

            <h1 className="section-title">
              Hi, I'm{' '}
              <span className="gradient-text block mt-1">Harshil Desai</span>
            </h1>

            <div className="flex items-center gap-3 text-xl sm:text-2xl font-display font-semibold text-slate-300">
              <span className="text-slate-500">&lt;</span>
              <TypeAnimation
                sequence={[
                  'Data Scientist',      2500,
                  'ML Engineer',         2000,
                  'Analytics Expert',    2000,
                  'Full-Stack Developer',2000,
                  'Power BI Developer',  2000,
                ]}
                speed={50}
                repeat={Infinity}
                className="text-accent-cyan"
              />
              <span className="text-slate-500">/&gt;</span>
            </div>

            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              B.Tech Computer Engineering student at{' '}
              <span className="text-primary-400 font-semibold">CHARUSAT</span>,
              passionate about transforming raw data into actionable insights.
              Skilled in Python, SQL, Machine Learning & Power BI.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Code size={16} />
                View Projects
              </button>
              <a
                href="mailto:desaiharshil456@gmail.com"
                className="btn-outline flex items-center gap-2"
              >
                <Mail size={16} />
                Get In Touch
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/desai456" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 transition-all hover:scale-110">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 transition-all hover:scale-110">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/_desai_5435/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 transition-all hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="mailto:desaiharshil456@gmail.com" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 transition-all hover:scale-110">
                <Mail size={18} />
              </a>
              <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent max-w-[80px]" />
              <span className="text-slate-500 text-sm">Follow me</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 animate-slide-right">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-primary-600 via-accent-violet to-accent-cyan p-[3px] animate-float">
                <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-900 to-dark-700 flex flex-col items-center justify-center gap-1">
                    <span className="font-display font-black text-6xl gradient-text select-none">HD</span>
                    <span className="text-slate-500 text-xs font-mono tracking-widest">DATA SCIENCE</span>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-full border border-primary-500/15 animate-spin-slow" style={{ animationDuration: '20s' }} aria-hidden="true" />
              <div className="absolute -inset-8 rounded-full border border-accent-violet/10 animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} aria-hidden="true" />

              <div className="absolute -right-6 top-8 hidden sm:block glass-card px-3 py-2 text-xs font-semibold text-accent-cyan whitespace-nowrap">🐍 Python Expert</div>
              <div className="absolute -left-8 bottom-12 hidden sm:block glass-card px-3 py-2 text-xs font-semibold text-accent-violet whitespace-nowrap">📊 Power BI</div>
              <div className="absolute -bottom-2 right-4 hidden sm:block glass-card px-3 py-2 text-xs font-semibold text-primary-300 whitespace-nowrap">🤖 ML Engineer</div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <StatCard icon={Code}        value="5+"   label="Projects Built"      color="bg-primary-600/80" />
              <StatCard icon={BarChart2}   value="4+"   label="Certifications"      color="bg-accent-violet/70" />
              <StatCard icon={BrainCircuit} value="7.01" label="CGPA / CHARUSAT"   color="bg-accent-cyan/60" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <button onClick={scrollToAbout} className="text-slate-500 hover:text-primary-400 transition-colors animate-bounce-slow" aria-label="Scroll to about section">
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
