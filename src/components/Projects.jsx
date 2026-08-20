import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiExternalLink, FiGithub, FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import { PROJECTS, FEATURED_PROJECTS, PLACEHOLDER_BG, PLACEHOLDER_ACCENT } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import DrawTitle from '../bits/DrawTitle'
import { DEFAULT_LOCALE, LOCALES, projectPath, projectsIndexPath } from '../seo/siteConfig'
import './Projects.css'

/* ─── Single project row ─── */
function ProjectRow({ project, lng }) {
  const { t } = useTranslation()
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start 0.95', 'start 0.2'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [40, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const href = projectPath(lng, project.slug)

  return (
    <motion.div
      ref={rowRef}
      className="proj-row"
      style={{ '--accent': PLACEHOLDER_ACCENT[project.id] }}
    >
      {/* Ghost number */}
      <motion.span className="proj-row__ghost" style={{ opacity: ghostOpacity }}>
        {project.num}
      </motion.span>

      {/* Image column */}
      <motion.div
        className="proj-row__media"
        style={{ background: PLACEHOLDER_BG[project.id], opacity: imgOpacity }}
      >
        <motion.div className="proj-row__media-inner" style={{ scale: imgScale }}>
          <img
            src={project.images[0]}
            alt={`${project.title}, ${t(`projects.${project.key}Subtitle`)}`}
            className="proj-row__img"
            {...imgAttrs(project.images[0], SIZES.projectRow)}
            loading="lazy"
            decoding="async"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </motion.div>
        <div className="proj-row__hover-overlay">
          <FiArrowUpRight size={32} />
          <span>{t('projects.liveBtn')}</span>
        </div>
      </motion.div>

      {/* Content column */}
      <motion.div className="proj-row__body" style={{ y: textY, opacity: textOpacity }}>
        <div className="proj-row__meta">
          <span className="proj-row__num">
            {project.num} / 0{PROJECTS.length}
          </span>
          <span className="proj-row__year">{project.year}</span>
        </div>
        <h3 className="proj-row__title">
          {/* Stretched link: covers the whole row, so the card is one real <a href>. */}
          <Link to={href} className="proj-row__link">
            {project.title}
          </Link>
        </h3>
        <p className="proj-row__sub">{t(`projects.${project.key}Subtitle`)}</p>
        <p className="proj-row__desc">{t(`projects.${project.key}Desc`)}</p>
        <div className="proj-row__tags">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {project.tags.length > 4 && <span className="tag">+{project.tags.length - 4}</span>}
        </div>
        <div className="proj-row__actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline proj-btn"
            >
              <FiGithub size={13} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary proj-btn"
            >
              <FiExternalLink size={13} /> {t('projectPage.visitLive')}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main component ─── */
export default function Projects() {
  const { t, i18n } = useTranslation()
  const headerRef = useRef(null)
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  })
  const titleY = useTransform(headerScroll, [0, 1], [60, -60])

  return (
    <section id="projects" className="projects-wrap">
      {/* ── Header ── */}
      <div ref={headerRef} className="projects-header">
        <motion.div style={{ y: titleY }}>
          <DrawTitle
            as="h2"
            className="projects-header__title"
            lines={[
              { text: t('titles.projectsLine1'), fill: true },
              { text: t('titles.projectsLine2'), fill: false },
            ]}
          />
        </motion.div>
        <motion.p
          className="projects-header__sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t('projects.sectionIntro')}
        </motion.p>
      </div>

      {/*
        Only the featured projects get a full-width row here. The rest live on
        the projects index, which keeps the home page from turning into an
        endless scroll as the list grows.
      */}
      <div className="projects-list">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} lng={lng} />
        ))}
      </div>

      <div className="projects-all">
        <Link to={projectsIndexPath(lng)} className="projects-all__link">
          {t('projects.viewAll', { count: PROJECTS.length })} <FiArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
