import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'
import { DEFAULT_LOCALE, LOCALES, pathForLocale } from '../seo/siteConfig'

/**
 * A section anchor that is a real, crawlable <a href>.
 *
 * The previous navbar used <button> + programmatic scrolling, which gave search
 * engines no link graph at all. This renders `/#about` (or `/en/#about`), so the
 * markup is a genuine link, while the click handler keeps the smooth-scroll
 * behaviour when the visitor is already on the home page.
 */
export default function SectionLink({ to, className, children, onNavigate }) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const home = pathForLocale(lng)
  const href = `${home}#${to}`
  const onHome = pathname === home || pathname === home.replace(/\/$/, '')

  const handleClick = (e) => {
    // Let modified clicks fall through to the browser (new tab, download, ...).
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onNavigate?.()

    if (onHome) {
      scroller.scrollTo(to, { smooth: true, duration: 700, offset: -70 })
      window.history.replaceState(null, '', href)
    } else {
      navigate(href)
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
