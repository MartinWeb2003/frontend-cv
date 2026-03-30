import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Experience.css'

const EXPERIENCES = [
  {
    role: 'Software Developer',
    type: 'Studentska pozicija',
    company: 'Ericsson Nikola Tesla',
    period: 'Tra 2025 – Stu 2025',
    bullets: [
      'Razvoj i održavanje softverskih komponenti u suradnji s inženjerskim timovima',
      'Rad s Git sustavom za kontrolu verzija unutar agilnog razvojnog okruženja',
      'Sudjelovanje u implementaciji, code reviewu i testiranju novih funkcionalnosti',
      'Debugiranje i poboljšanje performansi enterprise-grade aplikacija',
      'Suradnja sa senior inženjerima na dizajnu pouzdanih i skalabilnih softverskih rješenja',
    ],
    tags: ['Git', 'Agile/Scrum', 'C#', 'Testiranje', 'Enterprise'],
    index: 1,
  },
  {
    role: 'Freelance Web Developer',
    type: 'Samozaposleni',
    company: 'Neovisni projekti',
    period: '2023 – danas',
    bullets: [
      'Razvoj full-stack web aplikacija koristeći React, SQL baze podataka i REST API-je',
      'Izgradnja i prilagodba web stranica i plugina koristeći WordPress',
      'Upravljanje cijelim životnim ciklusom projekta: od planiranja do deployanja i podrške',
      'Direktna komunikacija s klijentima radi razumijevanja zahtjeva i isporuke rješenja',
    ],
    tags: ['React', 'WordPress', 'REST API', 'PostgreSQL', 'Node.js'],
    index: 2,
  },
]

const EDUCATION = [
  { degree: 'Magistar — Softversko inženjerstvo i informacijski sustavi', school: 'FER, Sveučilište u Zagrebu', period: '2023/24 – aktivan', index: 3 },
  { degree: 'Prvostupnik — Računarstvo', school: 'FER, Sveučilište u Zagrebu', period: '2021 – 2023', index: 4 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Experience() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const titleX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  // Only the right scroll panel gets parallax — sticky left is left alone
  const rightY  = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} className="experience section-dark" id="experience">
      {/* Parallax scrolling title track */}
      <div className="experience__title-row">
        <motion.div className="experience__title-track" style={{ x: titleX }}>
          <span className="mega-title">ISKUSTVO&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">ISKUSTVO&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">ISKUSTVO&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      {/* sticky-layout: left stands still, right scrolls */}
      <div ref={ref} className="sticky-layout">
        {/* Left sticky panel — plain div, no transform (transform would break sticky) */}
        <div className="sticky-panel experience__left">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Karijera
          </motion.span>
          <motion.p className="experience__left-text" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Od enterprise softverskog inženjeringa u Ericssonu do freelance
            projekata — gradnja stvarnih sustava koji rješavaju stvarne probleme.
          </motion.p>

          <div className="experience__edu-list">
            <motion.h4 className="experience__edu-label" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              Obrazovanje
            </motion.h4>
            {EDUCATION.map((edu) => (
              <motion.div key={edu.degree} className="edu-item" custom={edu.index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className="edu-item__period"><FiCalendar size={10} />{edu.period}</div>
                <div className="edu-item__degree">{edu.degree}</div>
                <div className="edu-item__school">{edu.school}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right scroll panel — scrolls past the sticky left */}
        <motion.div className="scroll-panel" style={{ y: rightY }}>
          <div className="exp-list">
            {EXPERIENCES.map((exp) => (
              <motion.div key={exp.company} className="exp-item" custom={exp.index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className="exp-item__header">
                  <div>
                    <div className="exp-item__num">0{exp.index}</div>
                    <h3 className="exp-item__role">{exp.role}</h3>
                    <div className="exp-item__meta">
                      <span className="exp-item__company">{exp.company}</span>
                      <span className="exp-item__type">{exp.type}</span>
                    </div>
                  </div>
                  <div className="exp-item__period"><FiCalendar size={11} />{exp.period}</div>
                </div>
                <ul className="exp-item__bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}><span className="exp-bullet-dot" />{b}</li>
                  ))}
                </ul>
                <div className="exp-item__tags">
                  {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
