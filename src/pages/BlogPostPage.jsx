import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll } from 'motion/react'
import { FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { POSTS, POST_LOCALES, postBySlug, postById } from '../data/posts'
import { serviceById } from '../data/services'
import { locationById } from '../data/locations'
import { projectBySlug } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import PageHeader from '../components/PageHeader'
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
  locationPath,
  projectPath,
  servicePath,
  servicesIndexPath,
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
  // The page's scroll moment: a reading-progress hairline under the navbar.
  const { scrollYProgress } = useScroll()

  if (!post) return <NotFoundPage />

  const k = post.key
  const tb = (field) => t(`blog.${k}${field}`)

  const service = serviceById(post.service)
  const related = post.relatedProjects.map(projectBySlug).filter(Boolean)
  const relatedPosts = (post.relatedPosts ?? []).map(postById).filter(Boolean)
  const ctaLocation = post.ctaLocation ? locationById(post.ctaLocation) : null
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

      <motion.div className="post__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <article className="pagewrap post">
        <div className="container post__container">
          <PageHeader
            crumbs={[
              { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
              { label: t('blog.crumb'), href: blogIndexPath(lng) },
              { label: tb('Title') },
            ]}
            meta={
              <>
                <time dateTime={post.date}>{dateLabel}</time>
                <span aria-hidden="true"> · </span>
                {post.tags.map((tag) => t(`blog.tags.${tag}`)).join(', ')}
              </>
            }
            title={tb('Title')}
            lead={tb('Lead')}
            size="lg"
          />

          <figure className="post__hero">
            <img
              alt={tb('Title')}
              {...imgAttrs(post.image, SIZES.hero)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="prose post__body">
            <p className="post__intro">{tb('Intro')}</p>

            {/*
              Original-research posts lead with their key findings: short,
              self-contained, quotable sentences are what search and AI
              answers lift, and each one names its own basis.
            */}
            {post.findings > 0 && (
              <section className="post__findings" aria-labelledby="findings-title">
                <h2 id="findings-title">{t('blog.findingsTitle')}</h2>
                <ul>
                  {Array.from({ length: post.findings }, (_, i) => (
                    <li key={i}>
                      <span className="post__finding-value">{tb(`F${i + 1}Value`)}</span>
                      <span className="post__finding-label">{tb(`F${i + 1}Label`)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

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

            {post.dataset && (
              <p className="post__dataset">
                <a href={post.dataset} download>
                  {t('blog.datasetLink')}
                </a>{' '}
                {t('blog.datasetNote')}
              </p>
            )}
          </div>

          {/*
            Every post feeds one money page. Usually that is its service; this
            one supports the cost guide instead.
          */}
          {post.ctaPage === 'location' && ctaLocation ? (
            <aside className="pband post__cta" data-theme="ink">
              <h2>{t(`locations.${ctaLocation.key}Name`)}</h2>
              <p>{t(`locations.${ctaLocation.key}Lead`)}</p>
              <Link
                to={locationPath(lng, ctaLocation.slug[lng])}
                className="btn btn-primary btn-lg"
              >
                {t('services.viewService')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          ) : post.ctaPage === 'pricing' ? (
            <aside className="pband post__cta" data-theme="ink">
              <h2>{t('pricingPage.title')}</h2>
              <p>{t('pricingPage.lead')}</p>
              <Link to={pagePath('pricing', lng)} className="btn btn-primary btn-lg">
                {t('services.viewService')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          ) : post.ctaPage === 'services' ? (
            <aside className="pband post__cta" data-theme="ink">
              <h2>{t('services.indexTitle')}</h2>
              <p>{t('services.indexLead')}</p>
              <Link to={servicesIndexPath(lng)} className="btn btn-primary btn-lg">
                {t('services.viewService')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          ) : service && (
            <aside className="pband post__cta" data-theme="ink">
              <h2>{t(`services.${service.key}Name`)}</h2>
              <p>{t(`services.${service.key}Lead`)}</p>
              <Link to={servicePath(lng, service.slug[lng])} className="btn btn-primary btn-lg">
                {t('services.viewService')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          )}

          {relatedPosts.length > 0 && (
            <section className="post__related">
              <h2>{t('blog.readNextTitle')}</h2>
              <ul>
                {relatedPosts.map((rp) => (
                  <li key={rp.id}>
                    <Link to={postPath(lng, rp.slug[lng])}>
                      {t(`blog.${rp.key}Title`)}
                      <span>{t(`blog.${rp.key}Lead`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
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
