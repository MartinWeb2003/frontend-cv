import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { scroller } from 'react-scroll'
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
import NotFoundPage from './pages/NotFoundPage'
import { routePatterns } from './routes'
import './App.css'

const PAGES = {
  home: HomePage,
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

/**
 * Honours `/#about` style links after a route change, and otherwise returns to
 * the top so navigating to a project does not land mid-page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // The target section only exists once the home route has rendered.
      const raf = requestAnimationFrame(() =>
        scroller.scrollTo(id, { smooth: true, duration: 600, offset: -70 }),
      )
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          {routePatterns.map(({ lng, type, pattern }) => {
            const Page = PAGES[type]
            return <Route key={`${lng}:${type}`} path={pattern} element={<Page />} />
          })}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
