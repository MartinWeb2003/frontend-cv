import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import hr from './locales/hr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import pl from './locales/pl.json'
import { DEFAULT_LOCALE, LOCALES } from './seo/siteConfig'

/**
 * Each locale is prerendered to its own URL (/, /en/, /de/, /pl/) with
 * <html lang> already stamped in. Booting i18next from that attribute makes the
 * client's first render identical to the server's — anything else would be a
 * hydration mismatch (e.g. German markup rehydrated as Croatian).
 */
function initialLanguage() {
  if (typeof document === 'undefined') return DEFAULT_LOCALE
  const fromHtml = document.documentElement.getAttribute('lang')
  return LOCALES.includes(fromHtml) ? fromHtml : DEFAULT_LOCALE
}

i18n.use(initReactI18next).init({
  resources: {
    hr: { translation: hr },
    en: { translation: en },
    de: { translation: de },
    pl: { translation: pl },
  },
  lng: initialLanguage(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: LOCALES,
  interpolation: { escapeValue: false },
})

export default i18n
