import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  SiJavascript, SiTypescript, SiReact, SiCss, SiHtml5,
  SiNodedotjs, SiPython, SiCplusplus, SiDotnet,
  SiPostgresql, SiMysql, SiWordpress, SiGit, SiGithub,
  SiDocker, SiLinux
} from 'react-icons/si'
import { FiCode, FiTool } from 'react-icons/fi'
import LogoLoop from '../bits/LogoLoop'
import CountUp from '../bits/CountUp'
import GlareHover from '../bits/GlareHover'
import useInView from '../hooks/useInView'
import './Skills.css'

const TECH_ROW1 = [
  { node: <SiReact />, label: 'React' },
  { node: <SiJavascript />, label: 'JavaScript' },
  { node: <SiTypescript />, label: 'TypeScript' },
  { node: <SiHtml5 />, label: 'HTML5' },
  { node: <SiCss />, label: 'CSS3' },
  { node: <SiNodedotjs />, label: 'Node.js' },
  { node: <SiPostgresql />, label: 'PostgreSQL' },
  { node: <SiMysql />, label: 'MySQL' },
]
const TECH_ROW2 = [
  { node: <SiWordpress />, label: 'WordPress' },
  { node: <SiDotnet />, label: 'C# / .NET' },
  { node: <SiPython />, label: 'Python' },
  { node: <SiCplusplus />, label: 'C/C++' },
  { node: <SiGit />, label: 'Git' },
  { node: <SiGithub />, label: 'GitHub' },
  { node: <SiDocker />, label: 'Docker' },
  { node: <SiLinux />, label: 'Linux' },
]

const COMPETENCY_CARDS = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript ES6+', 'HTML5 / CSS3', 'Framer Motion', 'Responsive Design'],
    level: 93,
  },
  {
    title: 'Backend & Databases',
    items: ['Node.js', 'REST APIs', 'PostgreSQL', 'MySQL', 'SQL Server', 'Entity Framework'],
    level: 82,
  },
  {
    title: 'Languages',
    items: ['C#', 'Java', 'Python', 'C / C++', 'JavaScript', 'SQL'],
    level: 78,
  },
  {
    title: 'CMS & Tools',
    items: ['WordPress', 'Git / GitHub', 'Docker', 'VS Code', 'Agile / Scrum', 'Linux'],
    level: 85,
  },
]

const LANG_BARS = [
  { lang: 'Croatian', level: 'Native', pct: 100 },
  { lang: 'English', level: 'Fluent (C1)', pct: 90 },
  { lang: 'German', level: 'Basic', pct: 25 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  return (
    <section ref={sectionRef} className="skills" id="skills">
      {/* Parallax title */}
      <div className="skills__title-row">
        <motion.div className="skills__title-track" style={{ x: titleX }}>
          <span className="mega-title">EXPERTISE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">EXPERTISE&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      {/* Logo Loop — two rows scrolling opposite directions */}
      <div className="skills__loops">
        <LogoLoop items={TECH_ROW1} speed={60} logoHeight={20} gap={48} pauseOnHover fadeOut direction="left" />
        <LogoLoop items={TECH_ROW2} speed={50} logoHeight={20} gap={48} pauseOnHover fadeOut direction="right" />
      </div>

      <div ref={ref} className="sticky-layout">
        <div className="sticky-panel skills__sticky">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Proficiency
          </motion.span>
          <motion.h2 className="skills__heading" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Full-stack engineer, front-to-back.
          </motion.h2>
          <motion.div className="skills__stats" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="skills__stat">
              <CountUp to={16} suffix="+" className="skills__stat-val" />
              <span className="skills__stat-label">Technologies</span>
            </div>
            <div className="skills__stat">
              <CountUp to={3} suffix="+" className="skills__stat-val" />
              <span className="skills__stat-label">Years Coding</span>
            </div>
          </motion.div>

          <motion.div className="skills__langs" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <h4 className="skills__langs-title">Languages</h4>
            {LANG_BARS.map((l, i) => (
              <div key={l.lang} className="lang-bar">
                <div className="lang-bar__header">
                  <span>{l.lang}</span>
                  <span className="lang-bar__level">{l.level}</span>
                </div>
                <div className="lang-bar__track">
                  <motion.div
                    className="lang-bar__fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${l.pct}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="scroll-panel">
          <div className="skills__cards">
            {COMPETENCY_CARDS.map((card, i) => (
              <motion.div key={card.title} custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <GlareHover background="var(--surface)" borderRadius="14px" borderColor="var(--border)" glareColor="#A51C30" glareOpacity={0.1}>
                  <div className="skill-card">
                    <div className="skill-card__header">
                      <h3 className="skill-card__title">{card.title}</h3>
                      <div className="skill-card__bar-wrap">
                        <motion.div
                          className="skill-card__bar"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${card.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <span className="skill-card__pct">{card.level}%</span>
                      </div>
                    </div>
                    <div className="skill-card__items">
                      {card.items.map(item => (
                        <span key={item} className="skill-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                </GlareHover>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
