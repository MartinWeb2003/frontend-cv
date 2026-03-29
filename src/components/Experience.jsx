import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCalendar, FiExternalLink } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Experience.css'

const EXPERIENCES = [
  {
    role: 'Software Developer',
    type: 'Student Position',
    company: 'Ericsson Nikola Tesla',
    period: 'Apr 2025 – Nov 2025',
    bullets: [
      'Developed and maintained software components in collaboration with cross-functional engineering teams',
      'Worked with Git-based version control within an agile, sprint-driven development environment',
      'Participated in implementation, code review, and testing of new product features',
      'Assisted in debugging and improving system performance for enterprise-grade applications',
      'Collaborated with senior engineers to design reliable, scalable software solutions',
    ],
    tags: ['Git', 'Agile/Scrum', 'C#', 'Testing', 'Enterprise'],
    accent: '#A51C30',
    index: 1,
  },
  {
    role: 'Freelance Web Developer',
    type: 'Self-Employed',
    company: 'Independent',
    period: '2023 – Present',
    bullets: [
      'Developed full-stack web applications using React, SQL databases, and REST APIs',
      'Built and customized websites and plugins using WordPress for multiple clients',
      'Maintained and optimized existing web applications for performance and reliability',
      'Managed entire project lifecycle: from scoping and design to deployment and support',
      'Communicated directly with clients to understand requirements and deliver tailored solutions',
    ],
    tags: ['React', 'WordPress', 'REST APIs', 'PostgreSQL', 'Node.js'],
    accent: '#0A0A0A',
    index: 2,
  },
]

const EDUCATION = [
  {
    degree: "Master's — Software Engineering & Information Systems",
    school: 'FER, University of Zagreb',
    period: '2023/24 – Active',
    index: 3,
  },
  {
    degree: "Bachelor's — Computer Science",
    school: 'FER, University of Zagreb',
    period: '2021 – 2023',
    index: 4,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Experience() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={sectionRef} className="experience section-dark" id="experience">
      {/* Parallax full-width title */}
      <div className="experience__title-row">
        <motion.div className="experience__title-track" style={{ x: titleX }}>
          <span className="mega-title">EXPERIENCE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">EXPERIENCE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">EXPERIENCE&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      <div ref={ref} className="sticky-layout">
        <div className="sticky-panel experience__left">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Career
          </motion.span>
          <motion.p className="experience__left-text" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            From enterprise software engineering at Ericsson to client-facing freelance projects —
            building real systems that solve real problems.
          </motion.p>
          <div className="experience__edu-list">
            <motion.h4 className="experience__edu-label" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              Education
            </motion.h4>
            {EDUCATION.map((edu) => (
              <motion.div key={edu.degree} className="edu-item" custom={edu.index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className="edu-item__period">
                  <FiCalendar size={11} />
                  {edu.period}
                </div>
                <div className="edu-item__degree">{edu.degree}</div>
                <div className="edu-item__school">{edu.school}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="scroll-panel">
          <div className="exp-list">
            {EXPERIENCES.map((exp) => (
              <motion.div
                key={exp.company}
                className="exp-item"
                custom={exp.index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              >
                <div className="exp-item__header">
                  <div>
                    <div className="exp-item__num">0{exp.index}</div>
                    <h3 className="exp-item__role">{exp.role}</h3>
                    <div className="exp-item__meta">
                      <span className="exp-item__company">{exp.company}</span>
                      <span className="exp-item__type">{exp.type}</span>
                    </div>
                  </div>
                  <div className="exp-item__period">
                    <FiCalendar size={12} />
                    {exp.period}
                  </div>
                </div>

                <ul className="exp-item__bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="exp-bullet-dot" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="exp-item__tags">
                  {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
