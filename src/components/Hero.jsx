import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import CircularText from '../bits/CircularText'
import FloatingIcons from './FloatingIcons'
import './Hero.css'

const SOCIALS = [
  { icon: <FiGithub />, href: 'https://github.com/martinbogoje', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/martinbogoje', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:bogojemartin@gmail.com', label: 'Email' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const yBg    = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const yIcons = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yText  = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const yLine  = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
  })

  return (
    <section ref={sectionRef} className="hero" id="hero">
      {/* Layer 0: background blob */}
      <motion.div className="hero__bg-shape" style={{ y: yBg }}>
        <div className="hero__blob" />
        <div className="hero__blob-grid" />
      </motion.div>

      {/* Layer 1: floating icons */}
      <motion.div className="hero__icons-layer" style={{ y: yIcons }}>
        <FloatingIcons />
      </motion.div>

      {/* Layer 2: name — fastest parallax, feels closest */}
      <motion.div className="hero__name" style={{ y: yText }}>
        <motion.span
          className="hero__name-first"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Martin
        </motion.span>
        <motion.span
          className="hero__name-last"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Bogoje
        </motion.span>
      </motion.div>

      {/* Layer 3: UI chrome */}
      <motion.div className="hero__content" style={{ opacity }}>
        <div className="container hero__container">
          <motion.div className="hero__topbar" {...fadeIn(0.1)}>
            <span className="section-label" style={{ marginBottom: 0, color: 'rgba(255,255,255,0.35)' }}>
              Softverski developer · Zagreb, Hrvatska
            </span>
            <div className="hero__socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                   className="hero__social" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero__bottom" {...fadeIn(0.9)}>
            <div className="hero__bio">
              <p>
                Student računarstva na FER-u u Zagrebu.<br />
                Bivši Software Developer u <strong>Ericsson Nikola Tesla</strong>.<br />
                Gradim iznimna web iskustva.
              </p>
              <div className="hero__cta">
                <Link to="projekti" smooth duration={800} offset={-70}>
                  <button className="btn btn-primary">
                    Pogledaj radove <FiArrowDown size={13} />
                  </button>
                </Link>
                <Link to="kontakt" smooth duration={800} offset={-70}>
                  <button className="btn btn-outline">Kontaktiraj me</button>
                </Link>
              </div>
            </div>

            <motion.div className="hero__badge" style={{ y: yIcons }}>
              <CircularText
                text="DOSTUPAN ZA POSAO • OPEN TO WORK • "
                spinDuration={20}
                onHover="speedUp"
                radius={76}
                fontSize={9.5}
                color="#A51C30"
              />
              <div className="hero__badge-center">
                <FiArrowDown size={18} color="#A51C30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="hero__scroll-line" style={{ y: yLine }} />
    </section>
  )
}
