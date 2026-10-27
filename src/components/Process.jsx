import { useTranslation } from 'react-i18next'
import './Process.css'

/*
 * How a project runs, in four steps, each with a small geometric
 * illustration in the cover style. The illustrations loop gently (CSS, in
 * Process.css) and stop under prefers-reduced-motion via the global rule.
 * Replaced the Pelješac section: the process applies to any client anywhere,
 * and it answers the question that stops an enquiry (what happens next).
 */
const Talk = () => (
  <svg viewBox="0 0 240 150" aria-hidden="true">
    <rect className="p-ink3" x="30" y="30" width="120" height="52" rx="14" />
    <rect className="p-paper p-op" x="46" y="46" width="70" height="8" rx="4" />
    <rect className="p-paper p-op2" x="46" y="62" width="48" height="8" rx="4" />
    <g className="talk-reply">
      <rect className="p-accent" x="96" y="92" width="112" height="40" rx="14" />
      <circle className="p-paper talk-dot" cx="132" cy="112" r="5" />
      <circle className="p-paper talk-dot d2" cx="152" cy="112" r="5" />
      <circle className="p-paper talk-dot d3" cx="172" cy="112" r="5" />
    </g>
  </svg>
)

const Design = () => (
  <svg viewBox="0 0 240 150" aria-hidden="true">
    <rect className="p-stroke" x="30" y="20" width="180" height="112" rx="10" />
    <rect className="p-accent design-block b1" x="44" y="34" width="152" height="34" rx="6" />
    <rect className="p-ink3 design-block b2" x="44" y="76" width="70" height="42" rx="6" />
    <rect className="p-ink3 design-block b3" x="122" y="76" width="74" height="18" rx="6" />
    <rect className="p-lift design-block b4" x="122" y="100" width="44" height="18" rx="6" />
  </svg>
)

const Build = () => (
  <svg viewBox="0 0 240 150" aria-hidden="true">
    <polyline className="p-line" points="62,40 30,75 62,110" />
    <polyline className="p-line" points="178,40 210,75 178,110" />
    <rect className="p-lift build-line l1" x="80" y="48" width="80" height="10" rx="5" />
    <rect className="p-paper p-op build-line l2" x="92" y="66" width="64" height="10" rx="5" />
    <rect className="p-accent build-line l3" x="92" y="84" width="48" height="10" rx="5" />
    <rect className="p-paper p-op build-line l4" x="80" y="102" width="70" height="10" rx="5" />
  </svg>
)

const Launch = () => (
  <svg viewBox="0 0 240 150" aria-hidden="true">
    <rect className="p-ink3" x="30" y="28" width="180" height="94" rx="12" />
    <rect className="p-ink2" x="50" y="70" width="140" height="12" rx="6" />
    <rect className="p-accent launch-bar" x="50" y="70" width="140" height="12" rx="6" />
    <g className="launch-check">
      <circle className="p-lift" cx="120" cy="44" r="16" />
      <polyline className="p-check" points="112,44 118,50 129,38" />
    </g>
    <rect className="p-paper p-op2" x="80" y="96" width="80" height="8" rx="4" />
  </svg>
)

const STEPS = [Talk, Design, Build, Launch]

export default function Process() {
  const { t } = useTranslation()

  return (
    <section id="process" className="process section" aria-labelledby="process-title">
      <div className="container">
        <div className="process__head">
          <h2 id="process-title" className="h2">{t('home.processTitle')}</h2>
          <p className="lead">{t('home.processLead')}</p>
        </div>

        <ol className="process__steps">
          {STEPS.map((Art, i) => (
            <li key={i} className="process__step">
              <div className="process__art">
                <Art />
              </div>
              <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="process__title">{t(`home.step${i + 1}Title`)}</h3>
              <p className="process__text">{t(`home.step${i + 1}Text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
