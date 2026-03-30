import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  SiJavascript, SiTypescript, SiReact, SiCss, SiHtml5,
  SiNodedotjs, SiPython, SiCplusplus, SiDotnet,
  SiPostgresql, SiMysql, SiWordpress, SiGit, SiGithub,
  SiDocker, SiLinux
} from 'react-icons/si'
import LogoLoop from '../bits/LogoLoop'
import CountUp from '../bits/CountUp'
import MagicBento from '../bits/MagicBento'
import './Skills.css'

const TECH_ROW = [
  { node: <SiReact />, label: 'React' },
  { node: <SiJavascript />, label: 'JavaScript' },
  { node: <SiTypescript />, label: 'TypeScript' },
  { node: <SiHtml5 />, label: 'HTML5' },
  { node: <SiCss />, label: 'CSS3' },
  { node: <SiNodedotjs />, label: 'Node.js' },
  { node: <SiPostgresql />, label: 'PostgreSQL' },
  { node: <SiMysql />, label: 'MySQL' },
  { node: <SiWordpress />, label: 'WordPress' },
  { node: <SiDotnet />, label: 'C# / .NET' },
  { node: <SiPython />, label: 'Python' },
  { node: <SiCplusplus />, label: 'C/C++' },
  { node: <SiGit />, label: 'Git' },
  { node: <SiGithub />, label: 'GitHub' },
  { node: <SiDocker />, label: 'Docker' },
  { node: <SiLinux />, label: 'Linux' },
]

const SKILL_BANDS = [
  { label: 'Frontend Development', pct: 93, chips: ['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Framer Motion', 'Bootstrap', 'CSS3', 'HTML5', 'Figma'] },
  { label: 'Backend & Databases',  pct: 82, chips: ['Node.js', 'PostgreSQL', 'MySQL', '.NET Core', 'REST API'] },
  { label: 'Programski jezici',    pct: 78, chips: ['C# / .NET', 'Java', 'Python', 'C / C++', 'SQL'] },
]

const LANG_BARS = [
  { lang: 'Hrvatski', level: 'Materinji',   pct: 100 },
  { lang: 'Engleski', level: 'Tečan · C1',  pct: 90 },
  { lang: 'Njemački', level: 'Osnove · A2', pct: 25 },
]

const BENTO_STATS = [
  { to: 16, suffix: '+', label: 'Tehnologija',    sub: 'React, Node, .NET, Docker...' },
  { to: 3,  suffix: '+', label: 'God. iskustva',  sub: 'Enterprise & freelance' },
  { to: 8,  suffix: '+', label: 'Projekata',      sub: 'Full-stack, web, API' },
  { to: 3,  suffix: '',  label: 'Jezika',         sub: 'HR · EN · DE' },
]

/* ─── Individual skill band row ─── */
function SkillBand({ band, i }) {
  return (
    <motion.div
      className="skill-band"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="skill-band__top">
        <div className="skill-band__left">
          <span className="skill-band__idx">0{i + 1}</span>
          <h3 className="skill-band__label">{band.label}</h3>
          <div className="skill-band__chips">
            {band.chips.map(c => <span key={c} className="skill-chip-dark">{c}</span>)}
          </div>
        </div>
        <div className="skill-band__right">
          <CountUp
            to={band.pct}
            suffix="%"
            className={`skill-band__pct${i % 2 === 0 ? ' skill-band__pct--crimson' : ''}`}
          />
        </div>
      </div>
      <div className="skill-band__track">
        <motion.div
          className="skill-band__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${band.pct}%` }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section ref={sectionRef} className="skills section-dark" id="skills">

      {/* ── Parallax mega title ── */}
      <div className="skills__title-row">
        <motion.div className="skills__title-track" style={{ x: titleX }}>
          <span className="mega-title">VJEŠTINE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">VJEŠTINE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">VJEŠTINE&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      {/* ── Fast ticker ── */}
      <div className="skills__ticker">
        <LogoLoop items={TECH_ROW} speed={35} logoHeight={18} gap={40} pauseOnHover fadeOut direction="left" />
      </div>

      {/* ── Skill bands ── */}
      <div className="skills__bands">
        {SKILL_BANDS.map((band, i) => (
          <SkillBand key={band.label} band={band} i={i} />
        ))}
      </div>

      {/* ── Languages ── */}
      <div className="skills__langs-section">
        <p className="skills__langs-heading">Jezici</p>
        <div className="skills__langs-list">
          {LANG_BARS.map(l => (
            <div key={l.lang} className="skills__lang-row">
              <div className="skills__lang-header">
                <span className="skills__lang-name">{l.lang}</span>
                <span className="skills__lang-level">{l.level}</span>
              </div>
              <div className="skills__lang-track">
                <motion.div
                  className="skills__lang-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Magic Bento stats grid ── */}
      <div className="skills__bento-section">
        <MagicBento className="skills__bento-grid">
          {BENTO_STATS.map((s, i) => (
            <MagicBento.Card key={s.label} glowColor="165,28,48" className="skills__bento-card">
              <CountUp to={s.to} suffix={s.suffix} className="skills__bento-val" />
              <p className="skills__bento-label">{s.label}</p>
              <p className="skills__bento-sub">{s.sub}</p>
            </MagicBento.Card>
          ))}
        </MagicBento>
      </div>

    </section>
  )
}
