import { useCallback, useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import StaggeredMenu from '../bits/StaggeredMenu'
import { hasServices } from '../routes'
import LanguageSwitcher from './LanguageSwitcher'
import IMAGE_META from '../data/imageMeta.json'
import {
  DEFAULT_LOCALE,
  LOCALES,
  blogIndexPath,
  pagePath,
  pathForLocale,
  projectsIndexPath,
  servicesIndexPath,
} from '../seo/siteConfig'
import './Navbar.css'

/** The y coordinate, in px from the top, that decides which theme the bar takes. */
const PROBE_Y = 36

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [onInk, setOnInk] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prevY = useRef(0)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  /*
   * One rAF-throttled scroll listener does three jobs: the scrolled state, the
   * hide-on-scroll-down behaviour, and picking light or dark chrome depending
   * on whether a `[data-theme="ink"]` chapter sits under the bar.
   */
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > prevY.current && y > 480)
      prevY.current = y

      let ink = false
      for (const el of document.querySelectorAll('[data-theme="ink"]')) {
        const r = el.getBoundingClientRect()
        if (r.top <= PROBE_Y && r.bottom >= PROBE_Y) {
          ink = true
          break
        }
      }
      setOnInk(ink)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const home = pathForLocale(lng)

  /*
   * Real routes, not home-page anchors: every entry is a crawlable link to a
   * standalone page. Services leads where it exists, because it is the
   * highest commercial-intent page on the site.
   */
  const links = [
    { label: t('home.footerHome'), href: home, end: true },
    ...(hasServices(lng) ? [{ label: t('services.crumbServices'), href: servicesIndexPath(lng) }] : []),
    { label: t('projectPage.crumbProjects'), href: projectsIndexPath(lng) },
    ...(hasServices(lng)
      ? [
          { label: t('pricingPage.label'), href: pagePath('pricing', lng) },
          { label: t('blog.crumb'), href: blogIndexPath(lng) },
        ]
      : []),
    { label: t('aboutPage.label'), href: pagePath('about', lng) },
  ]
  const contact = { label: t('contactPage.label'), href: pagePath('contact', lng) }

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' is-scrolled' : ''}${onInk ? ' is-ink' : ''}`}
        initial={false}
        animate={{ y: hidden && !menuOpen ? -96 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      >
        <div className="navbar__inner">
          <Link to={home} className="navbar__brand" aria-label={t('nav.toTop')}>
            <img
              src="/logo.webp"
              alt=""
              className="navbar__mark"
              {...IMAGE_META['/logo.webp']}
              loading="eager"
              decoding="async"
            />
            <span className="navbar__wordmark">Martin Bogoje</span>
          </Link>

          <nav className="navbar__links" aria-label={t('nav.primary')}>
            {links.map((l) => (
              <NavLink key={l.href} to={l.href} end={l.end} className="navbar__link">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__right">
            <LanguageSwitcher />
            <Link to={contact.href} className="navbar__cta">
              {contact.label}
              <FiArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="navbar__trigger"
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.menu')}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <StaggeredMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        links={[...links, contact]}
      />
    </>
  )
}
