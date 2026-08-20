import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiArrowLeft, FiCalendar } from 'react-icons/fi'
import { POSTS, POST_LOCALES, postBySlug } from '../data/posts'
import { serviceById } from '../data/services'
import { projectBySlug } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import usePageMeta from '../seo/usePageMeta'
import NotFoundPage from './NotFoundPage'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  SITE_ORIGIN,
  blogIndexPath,
  pathForLocale,
  postPath,
  postUrl,
  projectPath,
  servicePath,
  pagePath,
} from '../seo/siteConfig'
import './BlogPage.css'

/** Section count per post; each is a heading plus one or more paragraphs. */
const SECTIONS = [1, 2, 3, 4, 5]

export default function BlogPostPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const post = postBySlug(lng, slug)

  if (!post) return <NotFoundPage />

  const k = post.key
  const tb = (field) => t(`blog.${k}${field}`)

  const service = serviceById(post.service)
  const related = post.relatedProjects.map(projectBySlug).filter(Boolean)
  const index = POSTS.findIndex((p) => p.id === post.id)
  const next = POSTS[(index + 1) % POSTS.length]

  const dateLabel = new Intl.DateTimeFormat(LOCALE_TAGS[lng], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.date))

  return (
    <>
      <PostMeta post={post} lng={lng} title={tb('MetaTitle')} description={tb('MetaDesc')} />

      <article className="post">
        <div className="container">
          <nav className="post__crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to={pathForLocale(lng)}>{t('projectPage.crumbHome')}</Link>
              </li>
              <li>
                <Link to={blogIndexPath(lng)}>{t('blog.crumb')}</Link>
              </li>
              <li aria-current="page">{tb('Title')}</li>
            </ol>
          </nav>

          <header className="post__header">
            <div className="post__meta">
              <time dateTime={post.date}>
                <FiCalendar size={12} aria-hidden="true" /> {dateLabel}
              </time>
              <span className="post__tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </span>
            </div>
            <h1 className="post__title">{tb('Title')}</h1>
            <p className="post__lead">{tb('Lead')}</p>
          </header>

          <figure className="post__hero">
            <img
              src={post.image}
              alt={tb('Title')}
              {...imgAttrs(post.image, SIZES.hero)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="post__body">
            <p className="post__intro">{tb('Intro')}</p>

            {SECTIONS.map((n) => (
              <section key={n}>
                <h2>{tb(`S${n}Title`)}</h2>
                <p>{tb(`S${n}A`)}</p>
                <p>{tb(`S${n}B`)}</p>
              </section>
            ))}

            <section className="post__checklist">
              <h2>{tb('ListTitle')}</h2>
              <ul>
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n}>
                    <FiCheck size={15} aria-hidden="true" />
                    <span>{tb(`L${n}`)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>{tb('CloseTitle')}</h2>
              <p>{tb('Close')}</p>
            </section>
          </div>

          {/*
            Every post feeds one money page. Usually that is its service; this
            one supports the cost guide instead.
          */}
          {post.ctaPricing ? (
            <aside className="post__cta">
              <span className="post__cta-label">{t('blog.ctaLabel')}</span>
              <h2>{t('pricingPage.title')}</h2>
              <p>{t('pricingPage.lead')}</p>
              <Link to={pagePath('pricing', lng)} className="btn btn-primary">
                {t('services.viewService')} <FiArrowRight size={13} />
              </Link>
            </aside>
          ) : service && (
            <aside className="post__cta">
              <span className="post__cta-label">{t('blog.ctaLabel')}</span>
              <h2>{t(`services.${service.key}Name`)}</h2>
              <p>{t(`services.${service.key}Lead`)}</p>
              <Link to={servicePath(lng, service.slug[lng])} className="btn btn-primary">
                {t('services.viewService')} <FiArrowRight size={13} />
              </Link>
            </aside>
          )}

          {related.length > 0 && (
            <section className="post__related">
              <h2>{t('blog.relatedTitle')}</h2>
              <ul>
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to={projectPath(lng, p.slug)}>
                      {p.title}
                      <span>{t(`projects.${p.key}Subtitle`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav className="post__pager">
            <Link to={blogIndexPath(lng)} className="post__pager-link">
              <FiArrowLeft size={14} /> {t('blog.allPosts')}
            </Link>
            <Link to={postPath(lng, next.slug[lng])} className="post__pager-link post__pager-link--next">
              {t('blog.nextPost')} <FiArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </article>
    </>
  )
}

/** Separated so hook order stays stable when the slug is unknown. */
function PostMeta({ post, lng, title, description }) {
  usePageMeta({
    title,
    description,
    canonical: postUrl(lng, post.slug[lng]),
    alternates: Object.fromEntries(
      POST_LOCALES.map((l) => [l, `${SITE_ORIGIN}${postPath(l, post.slug[l])}`]),
    ),
    image: post.image,
  })
  return null
}
