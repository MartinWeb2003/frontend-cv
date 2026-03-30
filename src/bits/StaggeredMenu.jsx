import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './StaggeredMenu.css'

const itemVariants = {
  closed: { opacity: 0, y: 40, skewY: 4 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.55,
      delay: 0.1 + i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i) => ({
    opacity: 0,
    y: -24,
    skewY: -3,
    transition: {
      duration: 0.3,
      delay: i * 0.04,
      ease: [0.4, 0, 1, 1],
    },
  }),
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.4, delay: 0.15, ease: 'easeIn' } },
}

const panelVariants = {
  closed: { x: '100%' },
  open: { x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.4, ease: [0.4, 0, 0.6, 1] } },
}

export default function StaggeredMenu({ isOpen, onClose, links }) {
  const { t } = useTranslation()

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="smenu-backdrop"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="smenu-panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            {/* Close button */}
            <button className="smenu-close" onClick={onClose} aria-label="Zatvori">
              <span />
              <span />
            </button>

            {/* Nav links */}
            <nav className="smenu-nav">
              {links.map((link, i) => (
                <div key={link.to} className="smenu-item-wrap" style={{ overflow: 'hidden' }}>
                  <motion.div
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="exit"
                  >
                    <button
                      className="smenu-link"
                      onClick={() => { link.onClick(); onClose() }}
                    >
                      <span className="smenu-link__num">0{i + 1}</span>
                      <span className="smenu-link__label">{link.label}</span>
                    </button>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              className="smenu-footer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.4 } }}
              exit={{ opacity: 0 }}
            >
              <a href="/Martin_Bogoje-CV.pdf" download="Martin_Bogoje-CV.pdf" className="btn btn-primary smenu-resume">
                {t('menu.cvBtn')}
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
