import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiChevronDown } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Experience.css'

const EXPERIENCES = [
  {
    role: 'Software Developer — Student Position',
    company: 'Ericsson Nikola Tesla',
    period: 'Apr 2025 – Nov 2025',
    type: 'Full-time (Student)',
    bullets: [
      'Developed and maintained software components in collaboration with cross-functional engineering teams',
      'Worked with version control systems (Git) within an agile development environment',
      'Participated in implementation and testing of new features across the software lifecycle',
      'Assisted in debugging and improving system performance for enterprise-grade applications',
      'Collaborated with senior engineers to design reliable, scalable software solutions',
    ],
    tags: ['Git', 'Agile', 'C#', 'Testing', 'Enterprise Software'],
    color: '#00a8e0',
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    period: '2023 – Present',
    type: 'Freelance',
    bullets: [
      'Developed full-stack web applications using React, SQL databases, and REST APIs',
      'Built and customized websites using WordPress — from themes to custom plugins',
      'Maintained and optimized existing web applications for performance and reliability',
      'Communicated directly with clients to understand requirements and deliver tailored solutions',
      'Managed full project lifecycle from scoping and design to deployment and support',
    ],
    tags: ['React', 'WordPress', 'REST APIs', 'PostgreSQL', 'Node.js'],
    color: '#6c63ff',
  },
]

const EDUCATION = [
  {
    degree: "Master's Degree — Software Engineering & Information Systems",
    school: 'Faculty of Electrical Engineering and Computing (FER)',
    university: 'University of Zagreb',
    period: '2023/24 – Active',
    color: '#6c63ff',
  },
  {
    degree: "Bachelor's Degree — Computer Science",
    school: 'Faculty of Electrical Engineering and Computing (FER)',
    university: 'University of Zagreb',
    period: '2021 – 2023',
    color: '#00d4ff',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
}

function ExpCard({ exp, index, inView }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.div
      className="exp-card"
      custom={index} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
      style={{ '--card-accent': exp.color }}
    >
      <div className="exp-card__accent" />
      <div className="exp-card__header" onClick={() => setExpanded(!expanded)}>
        <div className="exp-card__meta">
          <div className="exp-card__role-line">
            <FiBriefcase size={14} />
            <span className="exp-card__type">{exp.type}</span>
          </div>
          <h3 className="exp-card__role">{exp.role}</h3>
          <div className="exp-card__company">{exp.company}</div>
        </div>
        <div className="exp-card__right">
          <div className="exp-card__period">
            <FiCalendar size={12} />
            {exp.period}
          </div>
          <FiChevronDown
            size={16}
            className={`exp-card__chevron ${expanded ? 'rotated' : ''}`}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="exp-card__bullets">
              {exp.bullets.map((b, i) => (
                <li key={i} className="exp-bullet">
                  <span className="bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="exp-card__tags">
              {exp.tags.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section className="experience section-padding" id="experience" ref={ref}>
      <div className="container">
        <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Where I&apos;ve Worked
        </motion.span>
        <motion.h2 className="section-title" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Experience &amp; <span className="gradient-text">Education</span>
        </motion.h2>

        <div className="experience__grid">
          <div className="experience__work">
            <motion.h3 className="exp-section-label" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              Work Experience
            </motion.h3>
            <div className="exp-timeline">
              {EXPERIENCES.map((exp, i) => (
                <ExpCard key={exp.company} exp={exp} index={i + 3} inView={inView} />
              ))}
            </div>
          </div>

          <div className="experience__edu">
            <motion.h3 className="exp-section-label" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              Education
            </motion.h3>
            <div className="edu-list">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  className="edu-card"
                  custom={i + 4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
                  style={{ '--edu-color': edu.color }}
                >
                  <div className="edu-card__accent" />
                  <div className="edu-period">{edu.period}</div>
                  <h4 className="edu-degree">{edu.degree}</h4>
                  <p className="edu-school">{edu.school}</p>
                  <p className="edu-uni">{edu.university}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
