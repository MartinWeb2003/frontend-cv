import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import usePageMeta from '../seo/usePageMeta'
import { DEFAULT_LOCALE, LOCALES, urlForLocale } from '../seo/siteConfig'

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('seo.title'),
    description: t('seo.description'),
    canonical: urlForLocale(lng),
    alternates: Object.fromEntries(LOCALES.map((l) => [l, urlForLocale(l)])),
  })

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
