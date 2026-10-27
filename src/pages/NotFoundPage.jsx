import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FluidBackground from '../components/FluidBackground'
import { DEFAULT_LOCALE, LOCALES, pathForLocale, projectsIndexPath } from '../seo/siteConfig'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  return (
    <div className="notfound">
      <FluidBackground variant="paper" />
      <div className="container">
        <span className="notfound__code" aria-hidden="true">
          404<span>.</span>
        </span>
        <h1 className="notfound__title">{t('notFound.title')}</h1>
        <p className="notfound__text">{t('notFound.text')}</p>
        <div className="notfound__actions">
          <Link to={pathForLocale(lng)} className="btn btn-primary btn-lg">
            {t('projectPage.crumbHome')}
          </Link>
          <Link to={projectsIndexPath(lng)} className="btn btn-outline btn-lg">
            {t('projectPage.crumbProjects')}
          </Link>
        </div>
      </div>
    </div>
  )
}
