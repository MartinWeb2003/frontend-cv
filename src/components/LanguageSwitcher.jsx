import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { equivalentPath } from '../routes'
import { LOCALE_TAGS } from '../seo/siteConfig'
import './LanguageSwitcher.css'

const LANGS = [
  { code: 'hr', label: 'HR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'pl', label: 'PL' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className="lang-switcher__code">{current.label}</span>
        <svg
          className={`lang-switcher__chevron${open ? ' open' : ''}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="lang-switcher__dropdown">
          {/*
            Real anchors to the prerendered locale URLs, not JS-only language
            switches. This is the only crawlable path between /, /en/, /de/ and
            /pl/, and a full page load lands on markup already in that language.
          */}
          {LANGS.map((l) => (
            <a
              key={l.code}
              href={equivalentPath(pathname, l.code)}
              hrefLang={LOCALE_TAGS[l.code]}
              lang={l.code}
              className={`lang-switcher__option${l.code === i18n.language ? ' active' : ''}`}
              aria-current={l.code === i18n.language ? 'true' : undefined}
            >
              <span className="lang-switcher__code">{l.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
