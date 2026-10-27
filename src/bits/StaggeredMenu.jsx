import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { cvFilename, cvPath, DEFAULT_LOCALE, LOCALES, PERSON } from '../seo/siteConfig'
import { lockScroll } from '../lib/scroll'
import './StaggeredMenu.css'

const ease = [0.22, 1, 0.36, 1]

const panel = {
  closed: { y: '-100%' },
  open: { y: 0, transition: { duration: 0.4, ease } },
  exit: { y: '-100%', transition: { duration: 0.32, ease: [0.65, 0, 0.35, 1] } },
}

const item = {
  closed: { y: '100%' },
  open: (i) => ({ y: 0, transition: { duration: 0.4, delay: 0.12 + i * 0.04, ease } }),
  exit: { y: '100%', transition: { duration: 0.18 } },
}

/**
 * Full-screen menu for narrow viewports. Every entry is a real router link,
 * so the menu adds no JS-only navigation.
 *
 * @param {{isOpen: boolean, onClose: () => void, links: {label: string, href: string}[]}} props
 */
export default function StaggeredMenu({ isOpen, onClose, links }) {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  useEffect(() => {
    lockScroll(isOpen)
    if (!isOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="smenu"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menu')}
          variants={panel}
          initial="closed"
          animate="open"
          exit="exit"
          data-theme="ink"
        >
          <button type="button" className="smenu__close" onClick={onClose} aria-label={t('nav.closeMenu')} autoFocus>
            <span />
            <span />
          </button>

          <nav className="smenu__nav">
            {links.map((link, i) => (
              <div key={link.href} className="smenu__row">
                <motion.div custom={i} variants={item} initial="closed" animate="open" exit="exit">
                  <Link to={link.href} className="smenu__link" onClick={onClose}>
                    <span className="smenu__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="smenu__label">{link.label}</span>
                  </Link>
                </motion.div>
              </div>
            ))}
          </nav>

          <div className="smenu__foot">
            <a href={`mailto:${PERSON.email}`} className="smenu__mail">
              {PERSON.email} <FiArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={cvPath(lng)} download={cvFilename(lng)} className="btn btn-outline">
              <FiDownload size={15} aria-hidden="true" /> {t('menu.cvBtn')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
