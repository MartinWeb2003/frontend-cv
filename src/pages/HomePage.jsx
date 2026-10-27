import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'
import Process from '../components/Process'
import DeviceShowcase from '../components/DeviceShowcase'
import Services from '../components/Services'
import PricingTeaser from '../components/PricingTeaser'
import Record from '../components/Record'
import WorkIndex from '../components/WorkIndex'
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

  /*
   * Motion budget for this page: the hero load and scroll hand-off, the
   * pinned 3D showcase, and the page transition. The process illustrations
   * and service covers loop gently as ambient detail. Everything else is
   * static apart from designed hover states.
   */
  return (
    <>
      <Hero />
      <Process />
      <DeviceShowcase />
      <Services />
      <PricingTeaser />
      <WorkIndex />
      <Record />
      <Contact />
    </>
  )
}
