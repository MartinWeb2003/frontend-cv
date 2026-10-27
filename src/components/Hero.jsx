import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowDown } from 'react-icons/fi'
import SectionLink from './SectionLink'
import FluidBackground from './FluidBackground'
import { PROJECTS } from '../data/projects'
import { DEFAULT_LOCALE, LOCALES, pagePath } from '../seo/siteConfig'
import './Hero.css'

/*
 * The interactive logo shares the three.js chunk with the showcase. It is
 * requested only after the page has loaded and the browser is idle, and only
 * on wide screens, so it never competes with the LCP name.
 */
const Logo3D = lazy(() => import('./Logo3D'))

function useDeferred3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(min-width: 900px)').matches) return undefined
    let id = 0
    const go = () => {
      id = (window.requestIdleCallback ?? ((f) => setTimeout(f, 200)))(() => setOk(true))
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      window.removeEventListener('load', go)
      ;(window.cancelIdleCallback ?? clearTimeout)(id)
    }
  }, [])
  return ok
}

const ease = [0.22, 1, 0.36, 1]

/*
 * Motion moment 1 of the home page: the load sequence.
 *
 * The h1 is the LCP element, so it animates transform only and is fully
 * opaque from the first paint. Supporting copy follows with a short fade.
 * Scroll then hands the hero off: the name drifts up and the ink layer moves
 * at a slower rate, which reads as depth rather than as an effect.
 */
export default function Hero() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const show3d = useDeferred3D()
  const [ready3d, setReady3d] = useState(false)
  const onReady3d = useCallback(() => setReady3d(true), [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%'])
  const inkY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%'])
  const footOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduce ? 1 : 0])

  const facts = [
    { k: t('hero.fact1Key'), v: t('hero.fact1Val') },
    { k: t('hero.fact2Key'), v: t('hero.fact2Val') },
    { k: t('hero.fact3Key', { count: PROJECTS.length }), v: t('hero.fact3Val') },
  ]

  const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease },
  })

  return (
    <section ref={ref} className="hero chapter-ink" id="hero" data-theme="ink">
      <motion.div className="hero__ink" style={{ y: inkY }}>
        <FluidBackground variant="ember" />
      </motion.div>

      {show3d && (
        <div className={`hero__3d${ready3d ? ' is-ready' : ''}`}>
          <Suspense fallback={null}>
            <Logo3D reduce={!!reduce} onReady={onReady3d} />
          </Suspense>
          <span className="hero__3d-hint" aria-hidden="true">{t('hero.dragHint')}</span>
        </div>
      )}

      <div className="container hero__frame">
        <motion.div className="hero__top" {...fadeIn(0.5)}>
          <span className="eyebrow">{t('hero.tagline')}</span>
          <span className="hero__status">
            <span className="hero__pulse" aria-hidden="true" />
            {t('hero.availability')}
          </span>
        </motion.div>

        <motion.h1 className="hero__name" style={{ y: nameY }}>
          <motion.span
            className="hero__line"
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            Martin
          </motion.span>
          <motion.span
            className="hero__line"
            initial={{ y: 72 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease }}
          >
            Bogoje<span className="hero__dot">.</span>
          </motion.span>
          <span className="sr-only">, {t('hero.tagline')}</span>
        </motion.h1>

        <motion.div className="hero__foot" style={{ opacity: footOpacity }}>
          <motion.div className="hero__pitch" {...fadeIn(0.25)}>
            <p className="hero__statement">{t('hero.statement')}</p>
            <div className="hero__cta">
              <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
                {t('hero.ctaContact')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
              <SectionLink to="work" className="btn btn-outline btn-lg">
                {t('hero.ctaProjects')} <FiArrowDown size={17} aria-hidden="true" />
              </SectionLink>
            </div>
          </motion.div>

          <motion.dl className="hero__facts" {...fadeIn(0.35)}>
            {facts.map((f) => (
              <div key={f.k} className="hero__fact">
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
