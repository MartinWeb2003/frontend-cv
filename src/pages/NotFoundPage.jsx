import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { DEFAULT_LOCALE, LOCALES, pathForLocale, projectsIndexPath } from '../seo/siteConfig'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  return (
    <div className="notfound">
      <div className="container notfound__inner">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">{t('notFound.title')}</h1>
        <p className="notfound__text">{t('notFound.text')}</p>
        <div className="notfound__actions">
          <Link to={pathForLocale(lng)} className="btn btn-primary">
            {t('projectPage.crumbHome')}
          </Link>
          <Link to={projectsIndexPath(lng)} className="btn btn-outline">
            {t('projectPage.crumbProjects')}
          </Link>
        </div>
      </div>
    </div>
  )
}
