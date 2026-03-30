import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCalendar, FiCheckCircle, FiClock, FiBookOpen, FiAward } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Education.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Education() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const titleX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const card1Y = useTransform(scrollYProgress, [0, 1], [70, -30])
  const card2Y = useTransform(scrollYProgress, [0, 1], [110, -60])

  return (
    <section ref={sectionRef} className="education" id="obrazovanje">
      {/* Parallax mega title */}
      <div className="education__title-row">
        <motion.div className="education__title-track" style={{ x: titleX }}>
          <span className="mega-title">OBRAZOVANJE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">OBRAZOVANJE&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">OBRAZOVANJE&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      <div ref={ref} className="container education__body">

        {/* ── Diplomski studij (in progress) ── */}
        <motion.div style={{ y: card1Y }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="edu-card">
              <div className="edu-card__left">
                <div className="edu-active-badge">
                  <span className="edu-active-dot" />
                  Aktivno · Diplomski studij
                </div>
                <h2 className="edu-card__title">
                  Magistar inženjerstva<br />računarstva
                </h2>
                <div className="edu-card__meta">
                  <span className="edu-card__school">Fakultet elektrotehnike i računarstva (FER)</span>
                  <span className="edu-card__spec">Softversko inženjerstvo i informacijski sustavi</span>
                </div>
              </div>
              <div className="edu-card__right">
                <div className="edu-stat">
                  <FiCalendar size={14} color="#A51C30" />
                  <span className="edu-stat__label">Trajanje</span>
                  <span className="edu-stat__val">2023/24 – 2025/26</span>
                </div>
                <div className="edu-stat">
                  <FiClock size={14} color="#A51C30" />
                  <span className="edu-stat__label">Status</span>
                  <span className="edu-stat__val">2. godina · u tijeku</span>
                </div>
                <div className="edu-stat">
                  <FiBookOpen size={14} color="#A51C30" />
                  <span className="edu-stat__label">Sveučilište</span>
                  <span className="edu-stat__val">Sveučilište u Zagrebu</span>
                </div>
                <div className="edu-tags">
                  {['Softversko inženjerstvo', 'Informacijski sustavi', 'ML', 'Distribuirani sustavi'].map(t =>
                    <span key={t} className="tag">{t}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Preddiplomski studij (completed) ── */}
        <motion.div style={{ y: card2Y }}>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="edu-card edu-card--done">
              <div className="edu-card__left">
                <div className="edu-done-badge">
                  <FiCheckCircle size={11} />
                  Završeno · Preddiplomski studij
                </div>
                <h2 className="edu-card__title">
                  Sveučilišni prvostupnik<br />računarstva
                </h2>
                <div className="edu-card__meta">
                  <span className="edu-card__school">Fakultet elektrotehnike i računarstva (FER)</span>
                  <span className="edu-card__spec">Sveučilište u Zagrebu · univ. bacc. ing. comp.</span>
                </div>
              </div>
              <div className="edu-card__right">
                <div className="edu-stat">
                  <FiCalendar size={14} color="#A51C30" />
                  <span className="edu-stat__label">Akademska godina</span>
                  <span className="edu-stat__val">2020/21 – 2022/23</span>
                </div>
                <div className="edu-stat">
                  <FiAward size={14} color="#A51C30" />
                  <span className="edu-stat__label">Stečeni naziv</span>
                  <span className="edu-stat__val">univ. bacc. ing. comp.</span>
                </div>
                <div className="edu-stat">
                  <FiCheckCircle size={14} color="#22c55e" />
                  <span className="edu-stat__label">Status</span>
                  <span className="edu-stat__val edu-stat__val--green">Završeno</span>
                </div>
                <div className="edu-tags">
                  {['Algoritmi i strukture podataka', 'Operacijski sustavi', 'Baze podataka', 'Računarstvo'].map(t =>
                    <span key={t} className="tag">{t}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
