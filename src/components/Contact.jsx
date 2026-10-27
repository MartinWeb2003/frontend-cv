import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiDownload, FiMapPin } from 'react-icons/fi'
import FluidBackground from './FluidBackground'
import { cvFilename, cvPath, DEFAULT_LOCALE, LOCALES, PERSON, pagePath } from '../seo/siteConfig'
import './Contact.css'

/*
 * The closing dark chapter. The site has one job, an email enquiry, so this is
 * the largest call to action on the page. The ink returns from the hero so
 * the page ends where it began.
 */
export default function Contact() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  return (
    <section id="contact" className="contact chapter-ink" data-theme="ink" aria-labelledby="contact-title">
      <FluidBackground variant="ink" />
      <div className="container contact__inner">
        <h2 id="contact-title" className="contact__title">
          {t('home.contactTitle')}
        </h2>
        <p className="lead contact__lead">
          {t('contact.tagline1')} {t('contact.tagline2')}
        </p>

        <div className="contact__actions">
          <a href={`mailto:${PERSON.email}`} className="contact__mail">
            <span className="contact__mail-text">{PERSON.email}</span>
            <span className="contact__mail-go" aria-hidden="true">
              <FiArrowUpRight size={26} />
            </span>
          </a>
        </div>

        <div className="contact__meta">
          <span className="contact__where">
            <FiMapPin size={15} aria-hidden="true" /> {t('contact.location')}
          </span>
          <Link to={pagePath('contact', lng)} className="link-draw">
            {t('home.contactPage')} <FiArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <a href={cvPath(lng)} download={cvFilename(lng)} className="link-draw">
            <FiDownload size={15} aria-hidden="true" /> {t('contact.cvBtn')}
          </a>
        </div>
      </div>
    </section>
  )
}
