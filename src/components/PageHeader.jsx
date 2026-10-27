import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import '../pages/page.css'

const ease = [0.22, 1, 0.36, 1]

/*
 * The opening of every standalone page: breadcrumbs, H1, lead. No section
 * label above the H1: the breadcrumb already says where the visitor is.
 *
 * This is the page's entrance moment. The H1 rises by transform only, so it
 * is opaque from the first paint and never delays LCP; the supporting copy
 * follows with a short fade. Counted once in each page's motion budget.
 *
 * @param {{
 *   crumbs?: {label: string, href?: string}[],
 *   meta?: React.ReactNode,   facts about the page (a post's date), not a section label
 *   title: React.ReactNode,
 *   lead?: React.ReactNode,
 *   size?: 'xl' | 'lg',
 *   children?: React.ReactNode,
 * }} props
 */
export default function PageHeader({ crumbs, meta, title, lead, size = 'xl', children }) {
  return (
    <header className="phead">
      {crumbs?.length > 0 && (
        <nav className="phead__crumbs" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((c, i) => (
              <li key={i} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
                {c.href && i < crumbs.length - 1 ? <Link to={c.href}>{c.label}</Link> : c.label}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {meta && <p className="phead__meta">{meta}</p>}

      <motion.h1
        className={`phead__title phead__title--${size}`}
        initial={{ y: 32 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        {title}
      </motion.h1>

      {(lead || children) && (
        <motion.div
          className="phead__rest"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease }}
        >
          {lead && <p className="lead phead__lead">{lead}</p>}
          {children}
        </motion.div>
      )}
    </header>
  )
}
