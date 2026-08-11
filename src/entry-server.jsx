import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import App from './App.jsx'

/**
 * Renders one route to static HTML for one locale.
 * Consumed by scripts/prerender.mjs at build time, never shipped to browsers.
 *
 * @param {string} lng one of LOCALES
 * @param {string} url pathname to render, e.g. "/en/projects/sottomonte/"
 * @returns {Promise<string>} markup for #root
 */
export async function render(lng, url) {
  await i18n.changeLanguage(lng)

  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </I18nextProvider>
    </StrictMode>,
  )
}
