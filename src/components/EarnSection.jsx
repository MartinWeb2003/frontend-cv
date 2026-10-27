import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { FiArrowUpRight } from 'react-icons/fi'
import { CURRENCY_SYMBOL, EARNINGS, commissionPaid, priceById } from '../data/pricing'
import { LOCALE_TAGS } from '../seo/siteConfig'
import './EarnSection.css'

/*
 * What a website earns its owner, directly (commission kept on direct
 * bookings) and indirectly (speed, findability). Every figure is published
 * research with its source linked beside it; nothing here is a promise or a
 * client result (CLAUDE.md section 0.7). The calculator only multiplies the
 * visitor's own numbers.
 */
const STATS = [
  { n: 1, source: 'https://www.ttgmedia.com/news/which-says-avoid-otas-when-booking-hotels-21546' },
  { n: 2, source: 'https://web.dev/case-studies/milliseconds-make-millions' },
  { n: 3, source: 'https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/' },
  { n: 4, source: 'https://www.brightlocal.com/research/local-consumer-review-survey-2023/' },
]

const COMMISSIONS = [15, 18, 20, 25]

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/**
 * A number that counts toward `target` over `ms` milliseconds whenever the
 * target changes. With `fromZero`, the first run starts at 0, triggered when
 * `ref` first scrolls into view. Server render and reduced motion both show
 * the final value, so crawlers and every visitor always get the real figure.
 */
function useCountTo(target, { ms = 700, fromZero = false, ref } = {}) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(target)
  const shown = useRef(target)
  const [armed, setArmed] = useState(!fromZero)

  // Wait for the element to enter the viewport before the first count.
  useEffect(() => {
    if (armed || !ref?.current) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        shown.current = 0
        setArmed(true)
        io.disconnect()
      },
      { threshold: 0.4 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [armed, ref])

  useEffect(() => {
    if (!armed || reduce) return undefined
    const from = shown.current
    const start = performance.now()
    let raf = 0
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms)
      const v = from + (target - from) * easeOut(t)
      shown.current = v
      setValue(v)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, armed, ms, reduce])

  return reduce ? target : Math.round(value)
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

function Calculator() {
  const { t, i18n } = useTranslation()
  const id = useId()
  // Starts on the Croatian average, so the first result matches the headline.
  const [revenue, setRevenue] = useState(EARNINGS.avgRevenue)
  const [share, setShare] = useState(30)
  const [commission, setCommission] = useState(15)

  const fmt = new Intl.NumberFormat(LOCALE_TAGS[i18n.language] ?? 'hr-HR', { maximumFractionDigits: 0 })
  const kept = Math.round(revenue * (share / 100) * (commission / 100))
  const sitePrice = priceById('presentation').price
  const months = kept > 0 ? (sitePrice / kept) * 12 : null
  const keptShown = useCountTo(kept, { ms: 450 })

  return (
    <div className="earn__calc">
      <h3 className="earn__calc-title">{t('pricingPage.calcTitle')}</h3>

      <label className="earn__field" htmlFor={`${id}-rev`}>
        <span>{t('pricingPage.calcRevenue')}</span>
        <span className="earn__input">
          <input
            id={`${id}-rev`}
            type="number"
            inputMode="numeric"
            min="0"
            step="1000"
            value={revenue}
            onChange={(e) => setRevenue(Math.max(0, Number(e.target.value) || 0))}
          />
          <span aria-hidden="true">{CURRENCY_SYMBOL}</span>
        </span>
      </label>

      <label className="earn__field" htmlFor={`${id}-share`}>
        <span>
          {t('pricingPage.calcShare')} <strong>{share} %</strong>
        </span>
        <input
          id={`${id}-share`}
          type="range"
          min="5"
          max="80"
          step="5"
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          style={{ '--fill': `${((share - 5) / 75) * 100}%` }}
        />
      </label>

      <fieldset className="earn__field">
        <legend>{t('pricingPage.calcCommission')}</legend>
        <div className="earn__chips">
          {COMMISSIONS.map((c) => (
            <button
              key={c}
              type="button"
              className={c === commission ? 'is-on' : undefined}
              aria-pressed={c === commission}
              onClick={() => setCommission(c)}
            >
              {c} %
            </button>
          ))}
        </div>
      </fieldset>

      <div className="earn__result" aria-live="polite">
        <span className="earn__result-label">{t('pricingPage.calcResult')}</span>
        <span className="earn__result-value">
          {fmt.format(keptShown)} {CURRENCY_SYMBOL}
        </span>
        {months !== null && (
          <span className="earn__payback">
            {t('pricingPage.calcPayback', { price: fmt.format(sitePrice) })}{' '}
            <strong>
              {months < 1
                ? t('pricingPage.calcUnderMonth')
                : t('pricingPage.calcMonths', { months: fmt.format(Math.ceil(months)) })}
            </strong>
          </span>
        )}
      </div>
      <p className="earn__note">{t('pricingPage.calcNote')}</p>
    </div>
  )
}

/*
 * The headline: one huge, sourced number, then what it means. It is the
 * commission an average Croatian rental pays platforms each year, which is
 * the money a direct-booking site can keep; deliberately the conservative
 * end of the commission range.
 */
function Headline() {
  const { t, i18n } = useTranslation()
  const fmt = new Intl.NumberFormat(LOCALE_TAGS[i18n.language] ?? 'hr-HR', { maximumFractionDigits: 0 })
  const ref = useRef(null)
  const figure = useCountTo(commissionPaid(), { ms: 1600, fromZero: true, ref })
  return (
    <div className="earn__hero" ref={ref}>
      <p className="earn__hero-kicker">{t('pricingPage.earnHeroKicker')}</p>
      <p className="earn__hero-figure">
        {fmt.format(figure)}
        <span className="earn__hero-unit"> {CURRENCY_SYMBOL}</span>
      </p>
      <p className="earn__hero-label">{t('pricingPage.earnHeroLabel')}</p>
      <p className="earn__hero-text">
        {t('pricingPage.earnHeroText', {
          revenue: fmt.format(EARNINGS.avgRevenue),
          percent: Math.round(EARNINGS.commission * 100),
          amount: fmt.format(commissionPaid()),
        })}
      </p>
      <p className="earn__hero-sources">
        <a href={EARNINGS.revenueSource} target="_blank" rel="noopener noreferrer">
          {t('pricingPage.earnHeroSource1')} <FiArrowUpRight size={12} aria-hidden="true" />
        </a>
        <a href={EARNINGS.commissionSource} target="_blank" rel="noopener noreferrer">
          {t('pricingPage.earn1Source')} <FiArrowUpRight size={12} aria-hidden="true" />
        </a>
      </p>
    </div>
  )
}

export default function EarnSection() {
  const { t } = useTranslation()

  return (
    <section className="earn" aria-labelledby="earn-title" data-theme="ink">
      <Headline />

      <div className="earn__head">
        <h2 id="earn-title" className="earn__title">{t('pricingPage.earnTitle')}</h2>
        <p className="earn__lead">{t('pricingPage.earnLead')}</p>
      </div>

      <div className="earn__body">
        <ol className="earn__stats">
          {STATS.map((s, i) => (
            <motion.li
              key={s.n}
              className="earn__stat"
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="earn__value">{t(`pricingPage.earn${s.n}Value`)}</span>
              <span className="earn__stat-title">{t(`pricingPage.earn${s.n}Title`)}</span>
              <p className="earn__stat-text">{t(`pricingPage.earn${s.n}Text`)}</p>
              <a className="earn__source" href={s.source} target="_blank" rel="noopener noreferrer">
                {t(`pricingPage.earn${s.n}Source`)} <FiArrowUpRight size={12} aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </ol>
        <motion.div variants={reveal} custom={2} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <Calculator />
        </motion.div>
      </div>
    </section>
  )
}
