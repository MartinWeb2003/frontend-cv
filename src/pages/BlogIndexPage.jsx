import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { postsByDate, POST_LOCALES } from '../data/posts'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import PageHeader from '../components/PageHeader'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  SITE_ORIGIN,
  blogIndexPath,
  pathForLocale,
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

  const posts = postsByDate()

  return (
    <div className="pagewrap blogindex">
      <div className="container">
        <PageHeader
          crumbs={[
            { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
            { label: t('blog.crumb') },
          ]}
          title={t('blog.indexTitle')}
          lead={t('blog.indexLead')}
        />

        <ul className="blogindex__list">
          {posts.map((p, i) => (
            <li key={p.id} className={i === 0 ? 'blogindex__item--lead' : undefined}>
              <Link to={postPath(lng, p.slug[lng])} className="blogcard">
                <span className="blogcard__media">
                  <img
                    alt={t(`blog.${p.key}Title`)}
                    {...imgAttrs(p.image, i === 0 ? SIZES.projectRow : SIZES.card)}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </span>
                <span className="blogcard__body">
                  <span className="blogcard__meta">
                    <time dateTime={p.date}>{fmt(p.date)}</time>
                    <span>{p.tags.map((tag) => t(`blog.tags.${tag}`)).join(' · ')}</span>
                  </span>
                  <h2 className="blogcard__title">{t(`blog.${p.key}Title`)}</h2>
                  <span className="blogcard__excerpt">{t(`blog.${p.key}Lead`)}</span>
                  <span className="pcard__go">
                    {t('blog.readMore')} <FiArrowUpRight size={15} aria-hidden="true" />
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
