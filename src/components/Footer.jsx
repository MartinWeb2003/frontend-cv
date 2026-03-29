import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Footer.css'

const LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Link to="hero" smooth duration={600} className="footer__wordmark">MARTIN BOGOJE</Link>
        <div className="footer__socials">
          <a href="https://github.com/martinbogoje" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href="https://linkedin.com/in/martinbogoje" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="mailto:bogojemartin@gmail.com" aria-label="Email"><FiMail /></a>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <nav className="footer__nav">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} smooth duration={700} offset={-70} className="footer__nav-link">{l.label}</Link>
          ))}
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} Martin Bogoje — Built with React &amp; Framer Motion</p>
      </div>
    </footer>
  )
}
