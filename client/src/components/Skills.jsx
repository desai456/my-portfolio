import { useEffect, useRef, useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

function useInView(threshold = 0.2) {
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

function SkillBar({ name, level, color = 'from-primary-600 to-accent-cyan', animated }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-slate-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className={`skill-bar-fill bg-gradient-to-r ${color}`} style={{ width: animated ? `${level}%` : '0%' }} />
      </div>
    </div>
  )
}

function TechBadge({ icon, label, color }) {
  return (
    <div className={`glass-card p-3 flex flex-col items-center gap-2 cursor-default group hover:scale-105 transition-transform border ${color}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors text-center leading-tight">{label}</span>
    </div>
  )
}

const CORE_SKILLS = [
  { name: 'Python',    level: 88, color: 'from-blue-500 to-cyan-400' },
  { name: 'SQL',       level: 82, color: 'from-orange-500 to-amber-400' },
  { name: 'Power BI',  level: 80, color: 'from-yellow-500 to-amber-400' },
  { name: 'Machine Learning', level: 78, color: 'from-purple-500 to-violet-400' },
  { name: 'Pandas / NumPy',   level: 85, color: 'from-green-500 to-emerald-400' },
  { name: 'EDA',              level: 83, color: 'from-pink-500 to-rose-400' },
]

const WEB_SKILLS = [
  { name: 'React / Vite',     level: 80, color: 'from-cyan-500 to-sky-400' },
  { name: 'Node.js / Express',level: 72, color: 'from-green-600 to-lime-400' },
  { name: 'MongoDB',          level: 70, color: 'from-green-500 to-teal-400' },
  { name: 'PostgreSQL',       level: 74, color: 'from-blue-600 to-indigo-400' },
  { name: 'FastAPI',          level: 76, color: 'from-teal-500 to-cyan-400' },
  { name: 'Tailwind CSS',     level: 82, color: 'from-sky-500 to-blue-400' },
]

const TOOLS = [
  { icon:'🐍', label:'Python',         color:'border-blue-500/30' },
  { icon:'🗄️', label:'SQL',            color:'border-orange-500/30' },
  { icon:'📊', label:'Power BI',       color:'border-yellow-500/30' },
  { icon:'🤖', label:'Scikit-learn',   color:'border-purple-500/30' },
  { icon:'🐼', label:'Pandas',         color:'border-green-500/30' },
  { icon:'📈', label:'NumPy',          color:'border-blue-400/30' },
  { icon:'⚡', label:'FastAPI',         color:'border-teal-500/30' },
  { icon:'⚛️', label:'React',          color:'border-cyan-500/30' },
  { icon:'🟢', label:'Node.js',        color:'border-green-600/30' },
  { icon:'🍃', label:'MongoDB',        color:'border-green-500/30' },
  { icon:'🐘', label:'PostgreSQL',     color:'border-indigo-500/30' },
  { icon:'📓', label:'Jupyter',        color:'border-orange-400/30' },
  { icon:'🐙', label:'GitHub',         color:'border-slate-400/30' },
  { icon:'🎨', label:'Tailwind CSS',   color:'border-sky-500/30' },
  { icon:'🌐', label:'HTML/PHP',       color:'border-red-400/30' },
]

const RADAR_DATA = [
  { skill: 'Data Analysis', value: 88 },
  { skill: 'Machine Learning', value: 78 },
  { skill: 'Visualization', value: 82 },
  { skill: 'Backend Dev', value: 74 },
  { skill: 'Frontend Dev', value: 80 },
  { skill: 'SQL / DB', value: 82 },
]

export default function Skills() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="skills">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle mb-3">What I bring to the table</p>
          <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-14">
          <div className={`glass-card p-6 space-y-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-display font-bold text-lg text-white mb-1">🧪 Data Science</h3>
            {CORE_SKILLS.map(s => <SkillBar key={s.name} {...s} animated={inView} />)}
          </div>

          <div className={`glass-card p-6 flex flex-col items-center transition-all duration-700 delay-200 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <h3 className="font-display font-bold text-lg text-white mb-4">⚡ Skill Radar</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(99,102,241,0.2)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Radar name="Skill" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip contentStyle={{ background: '#090d1f', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8 }} labelStyle={{ color: '#a5b4fc' }} itemStyle={{ color: '#06b6d4' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className={`glass-card p-6 space-y-5 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-display font-bold text-lg text-white mb-1">🌐 Web Development</h3>
            {WEB_SKILLS.map(s => <SkillBar key={s.name} {...s} animated={inView} />)}
          </div>
        </div>

        <div className={`transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-display font-bold text-xl text-white text-center mb-6">Tools & Technologies</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3">
            {TOOLS.map(t => <TechBadge key={t.label} {...t} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
