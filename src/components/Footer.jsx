import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Footer.css'

const LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

const SOCIALS = [
  { icon: <FiGithub />, href: 'https://github.com/martinbogoje', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/martinbogoje', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:bogojemartin@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__line" />
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <Link to="hero" smooth duration={600} className="footer__logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">MB</span>
              <span className="logo-bracket">/&gt;</span>
            </Link>
            <p className="footer__tagline">
              Building fast, accessible, and beautiful web experiences.
            </p>
          </div>

          <nav className="footer__nav">
            {LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={700}
                offset={-70}
                className="footer__nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer__socials">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Martin Bogoje. Designed &amp; built with{' '}
            <FiHeart size={12} style={{ color: '#ff6584', display: 'inline', verticalAlign: 'middle' }} />{' '}
            using React &amp; Framer Motion.
          </p>
          <span className="footer__mono">v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
