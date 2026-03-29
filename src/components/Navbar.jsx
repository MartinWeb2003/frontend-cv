import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar__inner">
        <Link to="hero" smooth duration={600} className="navbar__logo" onClick={() => setOpen(false)}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">MB</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        <nav className="navbar__links">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={700}
              offset={-70}
              spy
              onSetActive={() => setActive(link.to)}
              className={`nav-link ${active === link.to ? 'nav-link--active' : ''}`}
            >
              <span className="nav-link__num">0{i + 1}.</span>
              {link.label}
            </Link>
          ))}
          <a href="/CV-MartinB.pdf" download className="btn btn-outline nav-btn">
            Resume
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={700}
                offset={-70}
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                <span className="mobile-link__num">0{i + 1}.</span>
                {link.label}
              </Link>
            ))}
            <a href="/CV-MartinB.pdf" download className="btn btn-primary" style={{ marginTop: 16, alignSelf: 'flex-start' }}>
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
