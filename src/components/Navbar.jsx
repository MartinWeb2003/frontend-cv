import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { scroller } from 'react-scroll'
import StaggeredMenu from '../bits/StaggeredMenu'
import LanguageSwitcher from './LanguageSwitcher'
import './Navbar.css'

export default function Navbar() {
  const { t } = useTranslation()
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

  const scrollTo = (to) =>
    scroller.scrollTo(to, { smooth: true, duration: 700, offset: -70 })

  const links = [
    { label: t('nav.about'),      to: 'about' },
    { label: t('nav.experience'), to: 'experience' },
    { label: t('nav.education'),  to: 'obrazovanje' },
    { label: t('nav.projects'),   to: 'projekti' },
    { label: t('nav.skills'),     to: 'skills' },
    { label: t('nav.contact'),    to: 'kontakt' },
  ].map(l => ({ ...l, onClick: () => scrollTo(l.to) }))

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar__inner">
          <button
            className="navbar__logo"
            onClick={() => scrollTo('hero')}
            aria-label={t('nav.toTop')}
          >
            <img src="/logo.png" alt="Martin Bogoje" className="navbar__logo-img" />
          </button>

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
