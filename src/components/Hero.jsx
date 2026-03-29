import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import TextPressure from '../bits/TextPressure'
import CircularText from '../bits/CircularText'
import ImageTrail from '../bits/ImageTrail'
import './Hero.css'

// Abstract colored image placeholders for ImageTrail (replace with real screenshots later)
const TRAIL_IMAGES = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80',
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&q=80',
]

const SOCIALS = [
  { icon: <FiGithub />, href: 'https://github.com/martinbogoje', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/martinbogoje', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:bogojemartin@gmail.com', label: 'Email' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={sectionRef} className="hero" id="hero">
      <ImageTrail items={TRAIL_IMAGES}>
        <motion.div className="hero__inner" style={{ y, opacity }}>
          <div className="container">
            <div className="hero__top">
              <motion.span
                className="section-label hero__label"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Software Developer — Zagreb, Croatia
              </motion.span>

              <motion.div
                className="hero__socials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hero__social" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="hero__title-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <TextPressure
                text="MARTIN"
                flex
                weight
                width
                minFontSize={60}
                textColor="#0A0A0A"
              />
              <TextPressure
                text="BOGOJE"
                flex
                weight
                width
                stroke
                minFontSize={60}
                textColor="transparent"
                strokeColor="#A51C30"
              />
            </motion.div>

            <div className="hero__bottom">
              <motion.div
                className="hero__bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p>
                  CS Master's student at FER Zagreb.<br />
                  Software Developer at <strong>Ericsson Nikola Tesla</strong>.<br />
                  Building exceptional web experiences.
                </p>
                <div className="hero__cta">
                  <Link to="projects" smooth duration={800} offset={-70}>
                    <button className="btn btn-primary">View Work <FiArrowDown size={14} /></button>
                  </Link>
                  <Link to="contact" smooth duration={800} offset={-70}>
                    <button className="btn btn-outline">Get In Touch</button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="hero__circular"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <CircularText
                  text="AVAILABLE FOR HIRE • OPEN TO WORK • "
                  spinDuration={18}
                  onHover="speedUp"
                  radius={72}
                  fontSize={10}
                  color="#A51C30"
                />
                <div className="hero__circular-center">
                  <FiArrowDown size={20} color="#A51C30" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </ImageTrail>

      <div className="hero__scroll-line" />
    </section>
  )
}
