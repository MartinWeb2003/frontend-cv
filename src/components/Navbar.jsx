import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar__inner">
        <Link to="hero" smooth duration={600} className="navbar__logo">
          MB
        </Link>

        <nav className="navbar__links">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.to} to={link.to} smooth duration={700} offset={-70} className="nav-link">
              {link.label}
            </Link>
          ))}
          <a href="/CV-MartinB.pdf" download className="btn btn-primary navbar__resume">
            Résumé
          </a>
        </nav>

        <button className={`navbar__burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} smooth duration={700} offset={-70} className="mobile-link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <a href="/CV-MartinB.pdf" download className="btn btn-primary" style={{ marginTop: 20, alignSelf: 'flex-start' }}>
              Download Résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
