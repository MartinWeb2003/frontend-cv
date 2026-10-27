import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import HomePage from './pages/HomePage'
import ProjectsIndexPage from './pages/ProjectsIndexPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import ServicesIndexPage from './pages/ServicesIndexPage'
import ServicePage from './pages/ServicePage'
import PricingPage from './pages/PricingPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import LocationPage from './pages/LocationPage'
import NotFoundPage from './pages/NotFoundPage'
import { routePatterns } from './routes'
import { scrollToTarget, startSmoothScroll, stopSmoothScroll } from './lib/scroll'
import './App.css'

const PAGES = {
  home: HomePage,
  location: LocationPage,
  projects: ProjectsIndexPage,
  project: ProjectPage,
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  services: ServicesIndexPage,
  service: ServicePage,
  pricing: PricingPage,
  blog: BlogIndexPage,
  post: BlogPostPage,
}

/*
 * The page transition, counted as one motion moment on every page. Opacity
 * plus a short translate, under 400ms in total. `initial={false}` on the
 * presence means the first, prerendered page is never faded in, so LCP is
 * untouched; only client-side navigations animate.
 */
const pageVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
}

function scrollAfterNavigation(hash) {
  if (!hash) {
    scrollToTarget(0, { immediate: true })
    return
  }
  // The target section only exists once the incoming page has rendered.
  requestAnimationFrame(() => scrollToTarget(hash.slice(1)))
}

export default function App() {
  const location = useLocation()
  const { t } = useTranslation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    startSmoothScroll()
    return stopSmoothScroll
  }, [])

  // Same-page hash changes (/#projects while already home) have no transition.
  useEffect(() => {
    if (prevPath.current === location.pathname && location.hash) {
      scrollToTarget(location.hash.slice(1))
    }
    prevPath.current = location.pathname
  }, [location.pathname, location.hash])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">{t('nav.skip')}</a>
      <CustomCursor />
      <Navbar />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => scrollAfterNavigation(window.location.hash)}
      >
        <motion.main
          key={location.pathname}
          id="main"
          className="page"
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Routes location={location}>
            {routePatterns.map(({ lng, type, pattern }) => {
              const Page = PAGES[type]
              return <Route key={`${lng}:${type}`} path={pattern} element={<Page />} />
            })}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
