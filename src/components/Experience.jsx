import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiCalendar } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Experience.css'

const EXPERIENCES = [
  {
    roleKey:    'experience.job1Role',
    typeKey:    'experience.job1Type',
    company:    'Ericsson Nikola Tesla',
    periodKey:  'experience.job1Period',
    bulletKeys: ['experience.job1B1', 'experience.job1B2', 'experience.job1B3', 'experience.job1B4'],
    tags: ['Git', 'Agile/Scrum', 'C#', 'Testiranje', 'Enterprise'],
    index: 1,
  },
  {
    roleKey:    'experience.job2Role',
    typeKey:    'experience.job2Type',
    company:    'Neovisni projekti',
    periodKey:  'experience.job2Period',
    bulletKeys: ['experience.job2B1', 'experience.job2B2', 'experience.job2B3', 'experience.job2B4'],
    tags: ['React', 'WordPress', 'REST API', 'PostgreSQL', 'Node.js'],
    index: 2,
  },
]

const EDUCATION = [
  { degreeHR: 'Magistar — Softversko inženjerstvo i informacijski sustavi', school: 'FER, Sveučilište u Zagrebu', period: '2023/24 – aktivan', index: 3 },
  { degreeHR: 'Prvostupnik — Računarstvo', school: 'FER, Sveučilište u Zagrebu', period: '2021 – 2023', index: 4 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Experience() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const titleX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rightY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} className="experience section-dark" id="experience">
      <div className="experience__title-row">
        <motion.div className="experience__title-track" style={{ x: titleX }}>
          <span className="mega-title">ISKUSTVO&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">ISKUSTVO&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">ISKUSTVO&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      <div ref={ref} className="sticky-layout">
        <div className="sticky-panel experience__left">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {t('experience.sectionLabel')}
          </motion.span>
          <motion.p className="experience__left-text" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {t('experience.intro')}
          </motion.p>

          <div className="experience__edu-list">
            <motion.h4 className="experience__edu-label" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              {t('nav.education')}
            </motion.h4>
            {EDUCATION.map((edu) => (
              <motion.div key={edu.degreeHR} className="edu-item" custom={edu.index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className="edu-item__period"><FiCalendar size={10} />{edu.period}</div>
                <div className="edu-item__degree">{edu.degreeHR}</div>
                <div className="edu-item__school">{edu.school}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="scroll-panel" style={{ y: rightY }}>
          <div className="exp-list">
            {EXPERIENCES.map((exp) => (
              <motion.div key={exp.company} className="exp-item" custom={exp.index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className="exp-item__header">
                  <div>
                    <div className="exp-item__num">0{exp.index}</div>
                    <h3 className="exp-item__role">{t(exp.roleKey)}</h3>
                    <div className="exp-item__meta">
                      <span className="exp-item__company">{exp.company}</span>
                      <span className="exp-item__type">{t(exp.typeKey)}</span>
                    </div>
                  </div>
                  <div className="exp-item__period"><FiCalendar size={11} />{t(exp.periodKey)}</div>
                </div>
                <ul className="exp-item__bullets">
                  {exp.bulletKeys.map((key) => (
                    <li key={key}><span className="exp-bullet-dot" />{t(key)}</li>
                  ))}
                </ul>
                <div className="exp-item__tags">
                  {exp.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
