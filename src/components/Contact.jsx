import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiMail, FiGithub, FiDownload, FiArrowUpRight, FiMapPin } from 'react-icons/fi'
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
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section ref={sectionRef} className="contact section-dark" id="kontakt">
      <ImageTrail items={TRAIL_IMAGES}>
        <div className="contact__trail-inner">

          {/* Mega title with scroll parallax */}
          <div className="contact__title-row">
            <motion.div style={{ y: titleY }} className="contact__title-mover">
              <div className="mega-title contact__mega">RAZGOVARAJMO</div>
            </motion.div>
          </div>

          {/* CTA body */}
          <div ref={ref} className="container contact__body">

            <motion.p className="contact__tagline" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              Povežimo se. Dostupan sam za freelance upite i stalne angažmane.<br />
              Za detalje o suradnji i brzu komunikaciju, pišite mi na email.
            </motion.p>

            <motion.div className="contact__location" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <FiMapPin size={13} />
              Zagreb, Hrvatska · Remote friendly
              <span className="contact__avail-dot" />
              <span className="contact__avail-text">Dostupan</span>
            </motion.div>

            <motion.div className="contact__cta" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <a href="https://mail.google.com/mail/?view=cm&to=bogojemartin@gmail.com" target="_blank" rel="noopener noreferrer" className="contact__btn contact__btn--primary">
                <FiMail size={18} />
                <span>Pošalji email</span>
                <FiArrowUpRight size={16} className="contact__btn-arrow" />
              </a>
            </motion.div>

            <motion.div className="contact__secondary" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <a href="https://github.com/martinbogoje" target="_blank" rel="noopener noreferrer" className="contact__link">
                <FiGithub size={14} /> GitHub
              </a>
              <span className="contact__link-sep">·</span>
              <a href="/Martin_Bogoje_CV.pdf" download className="contact__link">
                <FiDownload size={14} /> Preuzmi CV
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
