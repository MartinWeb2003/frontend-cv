import { motion } from 'framer-motion'
import { FiCode, FiLayers, FiCpu, FiGlobe } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './About.css'

const STATS = [
  { value: '3+', label: 'Years Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: '2', label: 'Degrees (in progress)' },
  { value: '∞', label: 'Curiosity' },
]

const TRAITS = [
  { icon: <FiCode />, title: 'Clean Code', desc: 'Readable, maintainable, and scalable code that future-me will thank present-me for.' },
  { icon: <FiLayers />, title: 'Full-Stack', desc: 'Comfortable across the entire stack — from pixel-perfect UIs to optimized database queries.' },
  { icon: <FiCpu />, title: 'Performance', desc: 'Every millisecond counts. I obsess over performance, bundle sizes, and UX smoothness.' },
  { icon: <FiGlobe />, title: 'International', desc: 'Fluent in English (C1), with hands-on experience collaborating in multicultural teams.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section className="about section-padding" id="about" ref={ref}>
      <div className="about__bg-line" />
      <div className="container">
        <motion.span
          className="section-label"
          custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          Who I am
        </motion.span>
        <div className="about__grid">
          <div className="about__text">
            <motion.h2
              className="section-title"
              custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            >
              Building the web,<br />
              <span className="gradient-text">one commit at a time.</span>
            </motion.h2>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="about__para"
            >
              I&apos;m a Computer Science graduate student at the Faculty of Electrical Engineering
              and Computing (FER) in Zagreb, currently pursuing a Master&apos;s in Software Engineering
              and Information Systems. I work as a Software Developer at Ericsson Nikola Tesla,
              where I contribute to large-scale enterprise software in an agile environment.
            </motion.p>

            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="about__para"
            >
              Outside of my main role, I freelance — building full-stack web apps, custom WordPress
              solutions, and REST API integrations for clients. I thrive at the intersection of
              engineering precision and creative design.
            </motion.p>

            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="about__stats"
            >
              {STATS.map(s => (
                <div key={s.label} className="stat">
                  <span className="stat__value gradient-text">{s.value}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="about__traits">
            {TRAITS.map((t, i) => (
              <motion.div
                key={t.title}
                className="trait-card"
                custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              >
                <span className="trait-icon">{t.icon}</span>
                <div>
                  <h4 className="trait-title">{t.title}</h4>
                  <p className="trait-desc">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
