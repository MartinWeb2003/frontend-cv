import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCode, FiLayers, FiCpu, FiGlobe, FiAward, FiUsers } from 'react-icons/fi'
import MagicBento from '../bits/MagicBento'
import CountUp from '../bits/CountUp'
import ThreeScene from './ThreeScene'
import useInView from '../hooks/useInView'
import './About.css'

const STATS = [
  { value: 3, suffix: '+', label: 'Godine iskustva' },
  { value: 10, suffix: '+', label: 'Projekata' },
  { value: 16, suffix: '+', label: 'Tehnologija' },
  { value: 2, suffix: '', label: 'Diplome' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function About() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY    = useTransform(scrollYProgress, [0, 1], [80, -80])
  const sceneY    = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textY     = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section ref={sectionRef} className="about" id="about">
      {/* Parallax mega title */}
      <div className="about__title-row">
        <motion.div style={{ y: titleY }} className="about__title-inner">
          <span className="mega-title">O&nbsp;</span>
          <span className="mega-title mega-title--outline">MENI</span>
        </motion.div>
      </div>

      {/* Sticky layout: left = text, right = 3D + bento */}
      <div ref={ref} className="sticky-layout">

        <div className="sticky-panel about__sticky">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Pozadina
          </motion.span>
          <motion.h2 className="about__heading" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Izgradnja na sjecištu inženjeringa i dizajna.
          </motion.h2>
          <motion.p className="about__para" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Student sam računarstva na FER-u u Zagrebu, trenutno na magistarskom studiju
            Softverskog inženjerstva i informacijskih sustava. Radim kao Software Developer
            u Ericsson Nikola Tesla, gdje sam doprinio enterprise softverskim sustavima u agilnom okruženju.
          </motion.p>
          <motion.p className="about__para" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Uz glavni posao, freelancem — izgrađujem full-stack web aplikacije, WordPress rješenja
            i REST API integracije za klijente iz različitih industrija.
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

        <div className="scroll-panel about__right">
          {/* 3D scene with parallax */}
          <motion.div className="about__3d" style={{ y: sceneY }}>
            <ThreeScene />
            <div className="about__3d-label">
              <span>↑ Interaktivno · pomakni miš</span>
            </div>
          </motion.div>

          {/* Bento cards */}
          <motion.div style={{ y: textY }}>
            <MagicBento className="about__bento">
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiCode size={26} color="#A51C30" />
                  <h3>Čist kod</h3>
                  <p>Čitljiv, održiv, skalabilan. Buduće ja uvijek zahvaljuje sadašnjem.</p>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiLayers size={26} color="#A51C30" />
                  <h3>Full-Stack</h3>
                  <p>Fluent od pixel-perfect sučelja do optimiziranih PostgreSQL upita.</p>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-wide">
                <div className="bento-inner bento-inner--row">
                  <FiCpu size={30} color="#A51C30" />
                  <div>
                    <h3>Performans na prvom mjestu</h3>
                    <p>Svaka milisekunda je važna. Optimiziram bundle, renderiranje i Core Web Vitals.</p>
                  </div>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiGlobe size={26} color="#A51C30" />
                  <h3>Međunarodni</h3>
                  <p>Tečan engleski (C1). Iskustvo u multikulturalnim inženjerskim timovima.</p>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiAward size={26} color="#A51C30" />
                  <h3>Akademski</h3>
                  <p>Magistarski studij na FER-u — jednom od vodećih tehničkih fakulteta u Europi.</p>
                </div>
              </MagicBento.Card>
            </MagicBento>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
