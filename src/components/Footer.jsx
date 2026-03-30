import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Footer.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

export default function Footer() {
  const { t } = useTranslation()

  const LINKS = [
    { labelKey: 'nav.about',      to: 'about' },
    { labelKey: 'nav.experience', to: 'experience' },
    { labelKey: 'nav.projects',   to: 'projekti' },
    { labelKey: 'nav.skills',     to: 'skills' },
    { labelKey: 'nav.contact',    to: 'kontakt' },
  ]

  return (
    <motion.footer
      className="footer"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="footer__top">
        <motion.div variants={fadeUp}>
          <Link to="hero" smooth duration={600} className="footer__wordmark">MARTIN BOGOJE</Link>
        </motion.div>
        <motion.div className="footer__socials" variants={fadeUp}>
          <a href="mailto:bogojemartin@gmail.com" aria-label="Email"><FiMail /></a>
        </motion.div>
      </div>

      <motion.div className="footer__divider" variants={fadeUp} />

      <div className="footer__bottom">
        <motion.nav className="footer__nav" variants={stagger}>
          {LINKS.map(l => (
            <motion.span key={l.to} variants={fadeUp}>
              <Link to={l.to} smooth duration={700} offset={-70} className="footer__nav-link">{t(l.labelKey)}</Link>
            </motion.span>
          ))}
        </motion.nav>
        <motion.p className="footer__copy" variants={fadeUp}>
          © {new Date().getFullYear()} Martin Bogoje — {t('footer.built')}
        </motion.p>
      </div>
    </motion.footer>
  )
}
