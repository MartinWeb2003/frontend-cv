import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCode, FiLayers, FiCpu, FiGlobe, FiAward, FiUsers } from 'react-icons/fi'
import MagicBento from '../bits/MagicBento'
import CountUp from '../bits/CountUp'
import useInView from '../hooks/useInView'
import './About.css'

const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Shipped' },
  { value: 5, suffix: '+', label: 'Technologies' },
  { value: 2, suffix: '', label: 'Degrees' },
]

export default function About() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
  }

  return (
    <section ref={sectionRef} className="about" id="about">
      {/* Full-width title row */}
      <div className="about__title-row">
        <motion.div style={{ y: titleY }}>
          <div className="mega-title">ABOUT</div>
          <div className="mega-title mega-title--outline">ME</div>
        </motion.div>
      </div>

      <div ref={ref} className="sticky-layout">
        <div className="sticky-panel about__sticky">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Background
          </motion.span>
          <motion.h2 className="about__heading" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Building at the intersection of engineering and design.
          </motion.h2>
          <motion.p className="about__para" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            CS graduate student at FER Zagreb, currently pursuing a Master's in Software Engineering
            and Information Systems. Working as a Software Developer at Ericsson Nikola Tesla —
            building enterprise-grade systems in agile teams.
          </motion.p>
          <motion.p className="about__para" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Outside my main role, I freelance — delivering full-stack web apps, custom WordPress
            solutions, and REST API integrations for clients across different industries.
          </motion.p>
          <motion.div className="about__stats" custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {STATS.map((s, i) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-value">
                  <CountUp to={s.value} duration={1.8} delay={i * 0.15} suffix={s.suffix} />
                </span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="scroll-panel">
          <MagicBento className="about__bento">
            <MagicBento.Card className="bento-tall">
              <div className="bento-inner">
                <FiCode size={28} color="#A51C30" />
                <h3>Clean Code</h3>
                <p>Readable, maintainable, scalable. Future-me always thanks present-me for the documentation.</p>
              </div>
            </MagicBento.Card>
            <MagicBento.Card className="bento-tall">
              <div className="bento-inner">
                <FiLayers size={28} color="#A51C30" />
                <h3>Full-Stack</h3>
                <p>Fluent across the entire stack — from pixel-perfect UIs to optimized PostgreSQL queries.</p>
              </div>
            </MagicBento.Card>
            <MagicBento.Card className="bento-wide">
              <div className="bento-inner bento-inner--row">
                <FiCpu size={32} color="#A51C30" />
                <div>
                  <h3>Performance First</h3>
                  <p>Every millisecond matters. I obsess over bundle sizes, rendering performance, and Core Web Vitals.</p>
                </div>
              </div>
            </MagicBento.Card>
            <MagicBento.Card className="bento-tall">
              <div className="bento-inner">
                <FiGlobe size={28} color="#A51C30" />
                <h3>International</h3>
                <p>Fluent English (C1). Experienced in multicultural, cross-functional engineering teams.</p>
              </div>
            </MagicBento.Card>
            <MagicBento.Card className="bento-tall">
              <div className="bento-inner">
                <FiAward size={28} color="#A51C30" />
                <h3>Academic</h3>
                <p>Master's in Software Engineering at FER Zagreb — one of Europe's top technical universities.</p>
              </div>
            </MagicBento.Card>
            <MagicBento.Card className="bento-wide">
              <div className="bento-inner bento-inner--row">
                <FiUsers size={32} color="#A51C30" />
                <div>
                  <h3>Collaborative</h3>
                  <p>Strong communicator who thrives in agile teams. Direct client-facing experience from freelance work.</p>
                </div>
              </div>
            </MagicBento.Card>
          </MagicBento>
        </div>
      </div>
    </section>
  )
}
