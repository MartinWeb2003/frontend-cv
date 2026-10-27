import { useTranslation } from 'react-i18next'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { equivalentPath, hasServices, hasLocations } from '../routes'
import { LOCATIONS } from '../data/locations'
import { SERVICES } from '../data/services'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  PERSON,
  pagePath,
  pathForLocale,
  phoneHref,
  projectsIndexPath,
  servicesIndexPath,
  servicePath,
  locationPath,
  blogIndexPath,
} from '../seo/siteConfig'
import './Footer.css'

/*
 * Static furniture: no entrance animation. Every standalone page gets a
 * crawlable link from here, so nothing on the site is an orphan.
 */
export default function Footer() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const services = hasServices(lng)

  const pages = [
    { href: pathForLocale(lng), label: t('home.footerHome') },
    ...(services ? [{ href: servicesIndexPath(lng), label: t('services.crumbServices') }] : []),
    { href: projectsIndexPath(lng), label: t('projectPage.crumbProjects') },
    ...(services
      ? [
          { href: pagePath('pricing', lng), label: t('pricingPage.label') },
          { href: blogIndexPath(lng), label: t('blog.crumb') },
        ]
      : []),
    { href: pagePath('about', lng), label: t('aboutPage.label') },
    { href: pagePath('contact', lng), label: t('contactPage.label') },
  ]

  const offer = [
    ...(services
      ? SERVICES.map((s) => ({ href: servicePath(lng, s.slug[lng]), label: t(`services.${s.key}Name`) }))
      : []),
    // Location pages carry local commercial intent, so they get a sitewide link.
    ...(hasLocations(lng)
      ? LOCATIONS.map((l) => ({ href: locationPath(lng, l.slug[lng]), label: t(`locations.${l.key}Name`) }))
      : []),
  ]

  return (
    <footer className="footer chapter-ink" data-theme="ink">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__intro">
            <p className="footer__pitch">{t('home.footerPitch')}</p>
            <a href={`mailto:${PERSON.email}`} className="link-draw footer__mail">
              {PERSON.email} <FiArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <nav className="footer__col" aria-label={t('home.footerPages')}>
            <h2 className="footer__label">{t('home.footerPages')}</h2>
            <ul>
              {pages.map((l) => (
                <li key={l.href}><Link to={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {offer.length > 0 && (
            <nav className="footer__col" aria-label={t('services.crumbServices')}>
              <h2 className="footer__label">{t('services.crumbServices')}</h2>
              <ul>
                {offer.map((l) => (
                  <li key={l.href}><Link to={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          )}

          {/*
            `rel="me"` plus the matching schema.org sameAs is what ties this
            site to those accounts as one identity, for search engines and for
            AI assistants resolving who "Martin Bogoje" is.
          */}
          <div className="footer__col">
            <h2 className="footer__label">{t('home.footerProfiles')}</h2>
            <ul>
              {PERSON.linkedin && (
                <li><a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me">LinkedIn</a></li>
              )}
              {PERSON.github && (
                <li><a href={PERSON.github} target="_blank" rel="noopener noreferrer me">GitHub</a></li>
              )}
              {PERSON.phone && <li><a href={phoneHref()}>{PERSON.phone}</a></li>}
            </ul>
            {/*
              Always-rendered locale links: the navbar switcher only exists
              once opened, so without these the other language trees would
              have no crawlable inbound link.
            */}
            <nav className="footer__langs" aria-label="Language">
              {LOCALES.map((code) => (
                <a
                  key={code}
                  href={equivalentPath(pathname, code)}
                  hrefLang={LOCALE_TAGS[code]}
                  lang={code}
                  className={code === lng ? 'is-active' : undefined}
                  aria-current={code === lng ? 'true' : undefined}
                >
                  {code.toUpperCase()}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="footer__wordmark" aria-hidden="true">Martin Bogoje</p>

        <div className="footer__base">
          <span>© {new Date().getFullYear()} Martin Bogoje</span>
          <Link to={pagePath('privacy', lng)}>{t('privacyPage.title')}</Link>
          <span>{t('footer.built')}</span>
        </div>
      </div>
    </footer>
  )
}
