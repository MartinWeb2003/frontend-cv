import { useTranslation } from 'react-i18next'
import { FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()

  const LINKS = [
    { labelKey: 'nav.about',      to: 'about' },
    { labelKey: 'nav.experience', to: 'experience' },
    { labelKey: 'nav.projects',   to: 'projekti' },
    { labelKey: 'nav.skills',     to: 'skills' },
    { labelKey: 'nav.contact',    to: 'kontakt' },
  ]

  return (
    <footer className="footer">
      <div className="footer__top">
        <Link to="hero" smooth duration={600} className="footer__wordmark">MARTIN BOGOJE</Link>
        <div className="footer__socials">
          <a href="mailto:bogojemartin@gmail.com" aria-label="Email"><FiMail /></a>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <nav className="footer__nav">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} smooth duration={700} offset={-70} className="footer__nav-link">{t(l.labelKey)}</Link>
          ))}
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} Martin Bogoje — {t('footer.built')}</p>
      </div>
    </footer>
  )
}
