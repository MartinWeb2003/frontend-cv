import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiMail } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import SectionLink from './SectionLink'
import { equivalentPath } from '../routes'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, projectsIndexPath } from '../seo/siteConfig'
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
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  const LINKS = [
    { labelKey: 'nav.about',      to: 'about' },
    { labelKey: 'nav.experience', to: 'experience' },
    { labelKey: 'nav.projects',   to: 'projects' },
    { labelKey: 'nav.skills',     to: 'skills' },
    { labelKey: 'nav.contact',    to: 'contact' },
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
          <SectionLink to="hero" className="footer__wordmark">MARTIN BOGOJE</SectionLink>
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
              <SectionLink to={l.to} className="footer__nav-link">{t(l.labelKey)}</SectionLink>
            </motion.span>
          ))}
          <motion.span variants={fadeUp}>
            <Link to={projectsIndexPath(lng)} className="footer__nav-link">
              {t('projectPage.crumbProjects')}
            </Link>
          </motion.span>
        </motion.nav>

        {/*
          Always-rendered locale links. The navbar switcher is a dropdown that
          only exists once opened, so without these the other three language
          trees would have no crawlable inbound link at all.
        */}
        <motion.nav className="footer__langs" variants={fadeUp} aria-label="Language">
          {LOCALES.map((code) => (
            <a
              key={code}
              href={equivalentPath(pathname, code)}
              hrefLang={LOCALE_TAGS[code]}
              lang={code}
              className={`footer__lang${code === lng ? ' is-active' : ''}`}
              aria-current={code === lng ? 'true' : undefined}
            >
              {code.toUpperCase()}
            </a>
          ))}
        </motion.nav>

        <motion.p className="footer__copy" variants={fadeUp}>
          © {new Date().getFullYear()} Martin Bogoje · {t('footer.built')}
        </motion.p>
      </div>
    </motion.footer>
  )
}
