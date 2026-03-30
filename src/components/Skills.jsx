import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
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

const SKILL_BANDS_DEF = [
  { labelKey: 'skills.band1Label', pct: 93, chips: ['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Framer Motion', 'Bootstrap', 'CSS3', 'HTML5', 'Figma'] },
  { labelKey: 'skills.band2Label', pct: 82, chips: ['Node.js', 'PostgreSQL', 'MySQL', '.NET Core', 'REST API'] },
  { labelKey: 'skills.band3Label', pct: 78, chips: ['C# / .NET', 'Java', 'Python', 'C / C++', 'SQL'] },
]

const LANG_BARS_DEF = [
  { nameKey: 'skills.lang1Name', levelKey: 'skills.lang1Level', pct: 100 },
  { nameKey: 'skills.lang2Name', levelKey: 'skills.lang2Level', pct: 90 },
  { nameKey: 'skills.lang3Name', levelKey: 'skills.lang3Level', pct: 25 },
]

const BENTO_STATS_DEF = [
  { to: 16, suffix: '+', labelKey: 'skills.stat1Label', subKey: 'skills.stat1Sub' },
  { to: 3,  suffix: '+', labelKey: 'skills.stat2Label', subKey: 'skills.stat2Sub' },
  { to: 8,  suffix: '+', labelKey: 'skills.stat3Label', subKey: 'skills.stat3Sub' },
  { to: 3,  suffix: '',  labelKey: 'skills.stat4Label', subKey: 'skills.stat4Sub' },
]

function SkillBand({ band, i, label }) {
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
          <h3 className="skill-band__label">{label}</h3>
          <motion.div
            className="skill-band__chips"
            variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            {band.chips.map(c => (
              <motion.span
                key={c}
                className="skill-chip-dark"
                variants={{ hidden: { opacity: 0, y: 8, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } } }}
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
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
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section ref={sectionRef} className="skills section-dark" id="skills">

      <div className="skills__title-row">
        <motion.div className="skills__title-track" style={{ x: titleX }}>
          <span className="mega-title">{t('titles.skills')}&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">{t('titles.skills')}&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">{t('titles.skills')}&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      <div className="skills__ticker">
        <LogoLoop items={TECH_ROW} speed={35} logoHeight={18} gap={40} pauseOnHover fadeOut direction="left" />
      </div>

      <div className="skills__bands">
        {SKILL_BANDS_DEF.map((band, i) => (
          <SkillBand key={band.labelKey} band={band} i={i} label={t(band.labelKey)} />
        ))}
      </div>

      <div className="skills__langs-section">
        <p className="skills__langs-heading">{t('skills.langsHeading')}</p>
        <div className="skills__langs-list">
          {LANG_BARS_DEF.map(l => (
            <div key={l.nameKey} className="skills__lang-row">
              <div className="skills__lang-header">
                <span className="skills__lang-name">{t(l.nameKey)}</span>
                <span className="skills__lang-level">{t(l.levelKey)}</span>
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

      <motion.div
        className="skills__bento-section"
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <MagicBento className="skills__bento-grid">
          {BENTO_STATS_DEF.map((s) => (
            <motion.div
              key={s.labelKey}
              variants={{ hidden: { opacity: 0, y: 32, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } } }}
            >
              <MagicBento.Card glowColor="165,28,48" className="skills__bento-card">
                <CountUp to={s.to} suffix={s.suffix} className="skills__bento-val" />
                <p className="skills__bento-label">{t(s.labelKey)}</p>
                <p className="skills__bento-sub">{t(s.subKey)}</p>
              </MagicBento.Card>
            </motion.div>
          ))}
        </MagicBento>
      </motion.div>

    </section>
  )
}
