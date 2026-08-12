import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi'
import { postsByDate, POST_LOCALES } from '../data/posts'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  SITE_ORIGIN,
  blogIndexPath,
  postPath,
} from '../seo/siteConfig'
import './BlogPage.css'

export default function BlogIndexPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('blog.indexMetaTitle'),
    description: t('blog.indexMetaDesc'),
    canonical: `${SITE_ORIGIN}${blogIndexPath(lng)}`,
    alternates: Object.fromEntries(
      POST_LOCALES.map((l) => [l, `${SITE_ORIGIN}${blogIndexPath(l)}`]),
    ),
  })

  const fmt = (d) =>
    new Intl.DateTimeFormat(LOCALE_TAGS[lng], { year: 'numeric', month: 'long', day: 'numeric' })
      .format(new Date(d))

  return (
    <div className="post post--index">
      <div className="container">
        <span className="section-label">{t('blog.crumb')}</span>
        <h1 className="post__title post__title--index">{t('blog.indexTitle')}</h1>
        <p className="post__lead">{t('blog.indexLead')}</p>

        <ul className="blog__list">
          {postsByDate().map((p) => (
            <li key={p.id}>
              <Link to={postPath(lng, p.slug[lng])} className="blog__card">
                <span className="blog__media">
                  <img
                    src={p.image}
                    alt={t(`blog.${p.key}Title`)}
                    {...imgAttrs(p.image, SIZES.card)}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="blog__body">
                  <time dateTime={p.date} className="blog__date">
                    <FiCalendar size={11} aria-hidden="true" /> {fmt(p.date)}
                  </time>
                  <h2 className="blog__card-title">{t(`blog.${p.key}Title`)}</h2>
                  <span className="blog__excerpt">{t(`blog.${p.key}Lead`)}</span>
                  <span className="blog__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </span>
                  <span className="blog__cta">
                    {t('blog.readMore')} <FiArrowUpRight size={14} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
