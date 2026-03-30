import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiMail, FiDownload, FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import ImageTrail from '../bits/ImageTrail'
import useInView from '../hooks/useInView'
import './Contact.css'

const TRAIL_IMAGES = [
  '/sotto1.png', '/sotto2.png', '/sotto3.png', '/sotto4.png',
  '/eva1.png', '/eva2.png', '/eva3.png', '/eva4.png',
  '/sabioncello1.png', '/sabioncello2.png',
  '/grafica1.png', '/grafica2.png',
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section ref={sectionRef} className="contact section-dark" id="kontakt">
      <ImageTrail items={TRAIL_IMAGES}>
        <div className="contact__trail-inner">

          <div className="contact__title-row">
            <motion.div style={{ y: titleY }} className="contact__title-mover">
              <div className="mega-title contact__mega">{t('titles.contact')}</div>
            </motion.div>
          </div>

          <div ref={ref} className="container contact__body">

            <motion.p className="contact__tagline" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              {t('contact.tagline1')}<br />
              {t('contact.tagline2')}
            </motion.p>

            <motion.div className="contact__location" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <FiMapPin size={13} />
              {t('contact.location')}
              <span className="contact__avail-dot" />
              <span className="contact__avail-text">{t('contact.available')}</span>
            </motion.div>

            <motion.div className="contact__cta" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <a href="https://mail.google.com/mail/?view=cm&to=bogojemartin@gmail.com" target="_blank" rel="noopener noreferrer" className="contact__btn contact__btn--primary">
                <FiMail size={18} />
                <span>{t('contact.emailBtn')}</span>
                <FiArrowUpRight size={16} className="contact__btn-arrow" />
              </a>
            </motion.div>

            <motion.div className="contact__secondary" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <a href="/Martin_Bogoje-CV.pdf" download="Martin_Bogoje-CV.pdf" className="contact__link">
                <FiDownload size={14} /> {t('contact.cvBtn')}
              </a>
              <span className="contact__link-sep">·</span>
              <span className="contact__link contact__link--plain">bogojemartin@gmail.com</span>
            </motion.div>

          </div>
        </div>
      </ImageTrail>
    </section>
  )
}
