import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { scroller } from 'react-scroll'
import StaggeredMenu from '../bits/StaggeredMenu'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'O meni',     to: 'about' },
  { label: 'Iskustvo',   to: 'experience' },
  { label: 'Obrazovanje', to: 'obrazovanje' },
  { label: 'Projekti',   to: 'projekti' },
  { label: 'Vještine',   to: 'skills' },
  { label: 'Kontakt',    to: 'kontakt' },
]

export default function Navbar() {
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

  const links = NAV_LINKS.map(l => ({
    ...l,
    onClick: () => scrollTo(l.to),
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
          <button
            className="navbar__logo"
            onClick={() => scrollTo('hero')}
            aria-label="Na vrh"
          >
            <img src="/logo.png" alt="Martin Bogoje" className="navbar__logo-img" />
          </button>

          <button
            className="navbar__trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Otvori izbornik"
          >
            <span className="navbar__trigger-label">Menu</span>
            <div className="navbar__trigger-lines">
              <span /><span />
            </div>
          </button>
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
