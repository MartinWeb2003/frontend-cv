import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './fonts.css'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/**
 * Production HTML is prerendered, so attach to the existing markup instead of
 * throwing it away. `npm run dev` serves an empty #root, hence the fallback.
 */
if (root.hasChildNodes()) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
