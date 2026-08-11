import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'
import StaggeredMenu from '../bits/StaggeredMenu'
import LanguageSwitcher from './LanguageSwitcher'
import IMAGE_META from '../data/imageMeta.json'
import { DEFAULT_LOCALE, LOCALES, pathForLocale } from '../seo/siteConfig'
import './Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled]   = useState(false)
  const [hidden, setHidden]       = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const prevScrollY               = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > prevScrollY.current && y > 120) {
        setHidden(true)
        setMenuOpen(false)
      } else {
        setHidden(false)
      }
      prevScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const home = pathForLocale(lng)
  const onHome = pathname === home || pathname === home.replace(/\/$/, '')

  /**
   * Menu entries are real `<a href="/#section">` links so crawlers can follow
   * them; the handler keeps smooth scrolling when already on the home page.
   */
  const links = [
    { label: t('nav.about'),      to: 'about' },
    { label: t('nav.experience'), to: 'experience' },
    { label: t('nav.education'),  to: 'education' },
    { label: t('nav.projects'),   to: 'projects' },
    { label: t('nav.skills'),     to: 'skills' },
    { label: t('nav.contact'),    to: 'contact' },
  ].map((l) => ({
    ...l,
    href: `${home}#${l.to}`,
    onClick: (e) => {
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return
      e?.preventDefault()
      if (onHome) {
        scroller.scrollTo(l.to, { smooth: true, duration: 700, offset: -70 })
      } else {
        navigate(`${home}#${l.to}`)
      }
    },
  }))

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar__inner">
          <Link
            to={home}
            className="navbar__logo"
            aria-label={t('nav.toTop')}
          >
            <img
              src="/logo.webp"
              alt="Martin Bogoje"
              className="navbar__logo-img"
              {...IMAGE_META['/logo.webp']}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          <div className="navbar__right">
            <LanguageSwitcher />
            <button
              className="navbar__trigger"
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.menu')}
            >
              <span className="navbar__trigger-label">{t('nav.menu')}</span>
              <div className="navbar__trigger-lines">
                <span /><span />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <StaggeredMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </>
  )
}
