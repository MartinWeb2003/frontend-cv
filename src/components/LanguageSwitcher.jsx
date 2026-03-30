import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LANGS = [
  { code: 'hr', label: 'HR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'pl', label: 'PL' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher__trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="Change language"
      >
          <span className="lang-switcher__code">{current.label}</span>
        <svg className={`lang-switcher__chevron${open ? ' open' : ''}`} width="10" height="10" viewBox="0 0 10 10">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="lang-switcher__dropdown">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`lang-switcher__option${l.code === i18n.language ? ' active' : ''}`}
              onClick={() => select(l.code)}
            >
              <span className="lang-switcher__code">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
