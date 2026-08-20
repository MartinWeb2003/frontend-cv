import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { FiMail, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import SectionLink from './SectionLink'
import { equivalentPath, hasServices } from '../routes'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  PERSON,
  pagePath,
  phoneHref,
  projectsIndexPath,
  servicesIndexPath,
  blogIndexPath,
} from '../seo/siteConfig'
import './Footer.css'

/*
 * One fade for the whole footer. It previously staggered every link, divider
 * and social icon separately, which is a lot of animation for furniture nobody
 * scrolls down to admire.
 */
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
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
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="footer__top">
        <div>
          <SectionLink to="hero" className="footer__wordmark">MARTIN BOGOJE</SectionLink>
        </div>
        {/*
          Sitewide profile links. `rel="me"` plus the matching schema.org
          sameAs is what ties this site to those accounts as one identity.
          Each entry disappears if its config value is empty.
        */}
        <div className="footer__socials">
          <a href={`mailto:${PERSON.email}`} aria-label="Email"><FiMail /></a>
          {PERSON.github && (
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer me" aria-label="GitHub">
              <FiGithub />
            </a>
          )}
          {PERSON.linkedin && (
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          )}
          {PERSON.phone && (
            <a href={phoneHref()} aria-label={PERSON.phone}><FiPhone /></a>
          )}
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <nav className="footer__nav">
          {LINKS.map(l => (
            <span key={l.to}>
              <SectionLink to={l.to} className="footer__nav-link">{t(l.labelKey)}</SectionLink>
            </span>
          ))}
          {/* Standalone pages, so they get crawlable links from every page. */}
          {hasServices(lng) && (
            <span>
              <Link to={servicesIndexPath(lng)} className="footer__nav-link">
                {t('services.crumbServices')}
              </Link>
            </span>
          )}
          {hasServices(lng) && (
            <span>
              <Link to={pagePath('pricing', lng)} className="footer__nav-link">
                {t('pricingPage.label')}
              </Link>
            </span>
          )}
          {hasServices(lng) && (
            <span>
              <Link to={blogIndexPath(lng)} className="footer__nav-link">
                {t('blog.crumb')}
              </Link>
            </span>
          )}
          <span>
            <Link to={projectsIndexPath(lng)} className="footer__nav-link">
              {t('projectPage.crumbProjects')}
            </Link>
          </span>
          <span>
            <Link to={pagePath('about', lng)} className="footer__nav-link">
              {t('aboutPage.label')}
            </Link>
          </span>
          <span>
            <Link to={pagePath('contact', lng)} className="footer__nav-link">
              {t('contactPage.label')}
            </Link>
          </span>
          <span>
            <Link to={pagePath('privacy', lng)} className="footer__nav-link footer__nav-link--muted">
              {t('privacyPage.title')}
            </Link>
          </span>
        </nav>

        {/*
          Always-rendered locale links. The navbar switcher is a dropdown that
          only exists once opened, so without these the other three language
          trees would have no crawlable inbound link at all.
        */}
        <nav className="footer__langs" aria-label="Language">
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
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Martin Bogoje · {t('footer.built')}
        </p>
      </div>
    </motion.footer>
  )
}
