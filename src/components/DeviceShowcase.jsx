import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import { SHOWCASE_PROJECTS } from '../data/projects'
import { imgAttrs } from '../data/imageAttrs'
import useIsClient from '../hooks/useIsClient'
import { scrollToTarget } from '../lib/scroll'
import { DEFAULT_LOCALE, LOCALES, projectPath } from '../seo/siteConfig'
import { holdCentre, showcaseState } from './showcaseTimeline'
import './DeviceShowcase.css'

/*
 * three.js is ~500 KB. It is split into its own chunk and only requested when
 * the showcase is within a screen of the viewport, so it never competes with
 * the hero for bandwidth.
 */
const Laptop3D = lazy(() => import('./Laptop3D'))

const N = SHOWCASE_PROJECTS.length

/** Module-level so the 3D scene receives a stable array and never rebuilds. */
const SCREEN_IMAGES = SHOWCASE_PROJECTS.map((p) => p.images[0])

/*
 * Captions switch on the active project with a timed CSS transition, the
 * same way the laptop moves: scroll picks which one, time plays the change.
 * The outgoing caption leaves before the incoming one arrives.
 */
function Caption({ project, index, lng, active, onFocusCaption }) {
  const { t } = useTranslation()

  return (
    <article
      className={`showcase__caption${active ? ' is-active' : ''}`}
      onFocus={() => onFocusCaption(index)}
      aria-current={active ? 'true' : undefined}
    >
      <p className="showcase__count">
        <span className="accent">{String(index + 1).padStart(2, '0')}</span> / {String(N).padStart(2, '0')}
        <span className="showcase__year">{project.year}</span>
      </p>
      <h3 className="showcase__title">{project.title}</h3>
      <p className="showcase__sub">{t(`projects.${project.key}Subtitle`)}</p>
      <ul className="showcase__tags">
        {project.tags.slice(0, 3).map((tag) => (
          <li key={tag} className="tag">{tag}</li>
        ))}
      </ul>
      <div className="showcase__links">
        <Link to={projectPath(lng, project.slug)} className="btn btn-primary">
          {t('home.caseStudy')} <FiArrowRight size={16} aria-hidden="true" />
        </Link>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
            {t('projectPage.visitLive')} <FiArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

/*
 * Motion moment 3 of the home page, and the signature element: a pinned dark
 * chapter in which a 3D laptop opens and plays four real client sites as the
 * visitor scrolls. Scroll selects the site; each camera move is timed. The HTML captions carry all of the content and links,
 * so crawlers and screen readers get everything without WebGL.
 */
export default function DeviceShowcase() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const ref = useRef(null)
  const isClient = useIsClient()
  const reduce = useReducedMotion()
  const [near, setNear] = useState(false)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = showcaseState(p, N).active
    setActive((cur) => (cur === next ? cur : next))
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), {
      rootMargin: '100% 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Tabbing into a caption scrolls the pinned section to that project. */
  const onFocusCaption = useCallback((i) => {
    const el = ref.current
    if (!el) return
    const range = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    scrollToTarget(top + range * holdCentre(i, N), { immediate: true })
  }, [])

  const onReady = useCallback(() => setReady(true), [])

  return (
    <section
      ref={ref}
      id="work"
      className="showcase chapter-ink"
      data-theme="ink"
      style={{ '--segments': N }}
      aria-labelledby="showcase-title"
    >
      <div className="showcase__pin">
        <div className="container showcase__grid">
          <header className="showcase__head">
            <h2 id="showcase-title" className="h2 showcase__heading">{t('home.showcaseTitle')}</h2>
          </header>

          <div className="showcase__captions">
            {SHOWCASE_PROJECTS.map((p, i) => (
              <Caption
                key={p.slug}
                project={p}
                index={i}
                lng={lng}
                active={i === active}
                onFocusCaption={onFocusCaption}
              />
            ))}
          </div>

          <div className={`showcase__stage${ready ? ' is-ready' : ''}`}>
            {/* CSS device: the first paint, the no-WebGL path and the crawler view. */}
            <div className="showcase__fallback" aria-hidden="true">
              <div className="showcase__fallback-screen">
                {SHOWCASE_PROJECTS.map((p, i) => (
                  <img
                    key={p.slug}
                    {...imgAttrs(p.images[0], '(max-width: 900px) 90vw, 50vw')}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={i === active ? 'is-on' : ''}
                  />
                ))}
              </div>
              <div className="showcase__fallback-base" />
            </div>

            {isClient && near && (
              <Suspense fallback={null}>
                <Laptop3D progress={scrollYProgress} images={SCREEN_IMAGES} reduce={!!reduce} onReady={onReady} />
              </Suspense>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
