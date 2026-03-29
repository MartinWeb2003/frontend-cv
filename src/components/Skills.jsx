import { motion } from 'framer-motion'
import {
  FiCode, FiDatabase, FiLayout, FiTool, FiUsers, FiGlobe
} from 'react-icons/fi'
import {
  SiJavascript, SiTypescript, SiReact, SiCss, SiHtml5,
  SiNodedotjs, SiPython, SiCplusplus, SiDotnet,
  SiPostgresql, SiMysql, SiWordpress, SiGit, SiGithub,
  SiDocker, SiLinux
} from 'react-icons/si'
import useInView from '../hooks/useInView'
import './Skills.css'

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    icon: <FiLayout />,
    color: '#6c63ff',
    skills: [
      { name: 'React', icon: <SiReact />, level: 92 },
      { name: 'JavaScript', icon: <SiJavascript />, level: 90 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 75 },
      { name: 'HTML5', icon: <SiHtml5 />, level: 95 },
      { name: 'CSS3', icon: <SiCss />, level: 90 },
    ],
  },
  {
    label: 'Backend & DB',
    icon: <FiDatabase />,
    color: '#00d4ff',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, level: 78 },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 80 },
      { name: 'MySQL / SQL', icon: <SiMysql />, level: 82 },
      { name: 'REST APIs', icon: <FiCode />, level: 88 },
      { name: 'WordPress', icon: <SiWordpress />, level: 85 },
    ],
  },
  {
    label: 'Languages',
    icon: <FiCode />,
    color: '#ff6584',
    skills: [
      { name: 'C# / .NET', icon: <SiDotnet />, level: 80 },
      { name: 'Java', icon: <FiCode />, level: 72 },
      { name: 'Python', icon: <SiPython />, level: 75 },
      { name: 'C/C++', icon: <SiCplusplus />, level: 68 },
    ],
  },
  {
    label: 'Tools & DevOps',
    icon: <FiTool />,
    color: '#ffd166',
    skills: [
      { name: 'Git', icon: <SiGit />, level: 88 },
      { name: 'GitHub', icon: <SiGithub />, level: 88 },
      { name: 'VS Code', icon: <FiTool />, level: 95 },
      { name: 'Docker', icon: <SiDocker />, level: 55 },
      { name: 'Linux', icon: <SiLinux />, level: 65 },
    ],
  },
]

const SOFT_SKILLS = [
  { icon: <FiUsers />, label: 'Team Collaboration' },
  { icon: <FiCode />, label: 'Problem Solving' },
  { icon: <FiTool />, label: 'Fast Learning' },
  { icon: <FiGlobe />, label: 'Multicultural Work' },
  { icon: <FiUsers />, label: 'Client Communication' },
  { icon: <FiLayout />, label: 'Agile / Scrum' },
]

const LANGUAGES = [
  { lang: 'Croatian', level: 'Native', pct: 100 },
  { lang: 'English', level: 'Fluent (C1)', pct: 90 },
  { lang: 'German', level: 'Basic', pct: 25 },
]

function SkillBar({ name, icon, level, color, index, inView }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__icon" style={{ color }}>{icon}</span>
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: index * 0.06 + 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section className="skills section-padding" id="skills" ref={ref}>
      <div className="container">
        <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          What I Know
        </motion.span>
        <motion.h2 className="section-title" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Skills &amp; <span className="gradient-text">Technologies</span>
        </motion.h2>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="skill-category"
              custom={ci + 2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            >
              <div className="skill-category__header">
                <span className="skill-cat-icon" style={{ color: cat.color }}>{cat.icon}</span>
                <h3 className="skill-cat-label">{cat.label}</h3>
              </div>
              <div className="skill-bars">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={cat.color}
                    index={ci * 5 + si}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="skills__bottom">
          <motion.div className="soft-skills" custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <h3 className="skills-sub-title">Professional Skills</h3>
            <div className="soft-grid">
              {SOFT_SKILLS.map(s => (
                <div key={s.label} className="soft-chip">
                  <span className="soft-chip__icon">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="languages" custom={7} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <h3 className="skills-sub-title">Languages</h3>
            {LANGUAGES.map((l) => (
              <div key={l.lang} className="lang-item">
                <div className="lang-item__header">
                  <span className="lang-name">{l.lang}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
                <div className="lang-track">
                  <motion.div
                    className="lang-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${l.pct}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
