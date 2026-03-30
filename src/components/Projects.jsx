import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiExternalLink, FiGithub, FiArrowUpRight, FiX, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Projects.css'

const PROJECTS = [
  {
    id: 1, num: '01', year: '2024',
    title: 'Sottomonte',
    subtitleKey: 'projects.p1Subtitle',
    descKey: 'projects.p1Desc',
    tags: ['WordPress', 'Web dizajn', 'SEO', 'Responzivan dizajn'],
    images: ['/sotto1.png', '/sotto2.png', '/sotto3.png', '/sotto4.png'],
    video: null,
    liveUrl: 'https://www.sottomonte.hr',
    githubUrl: null,
  },
  {
    id: 2, num: '02', year: '2024',
    title: 'Visit Eva Orebić',
    subtitleKey: 'projects.p2Subtitle',
    descKey: 'projects.p2Desc',
    tags: ['WordPress', 'Web dizajn', 'SEO', 'Turizam'],
    images: ['/eva1.png', '/eva2.png', '/eva3.png', '/eva4.png'],
    video: null,
    liveUrl: 'https://www.visit-eva-orebic.com',
    githubUrl: null,
  },
  {
    id: 3, num: '03', year: '2024',
    title: 'Sabioncello',
    subtitleKey: 'projects.p3Subtitle',
    descKey: 'projects.p3Desc',
    tags: ['WordPress', 'Web dizajn', 'SEO', 'Turizam'],
    images: ['/sabioncello1.png', '/sabioncello2.png', '/sabioncello3.png', '/sabioncello4.png'],
    video: null,
    liveUrl: 'https://sabioncello.org',
    githubUrl: null,
  },
  {
    id: 4, num: '04', year: '2025',
    title: 'Sabioncello Grafika',
    subtitleKey: 'projects.p4Subtitle',
    descKey: 'projects.p4Desc',
    tags: ['React', 'Web dizajn', 'U izradi'],
    images: ['/grafica1.png', '/grafica2.png', '/grafica3.png', '/grafica4.png'],
    video: null,
    liveUrl: null,
    githubUrl: null,
  },
]

const PLACEHOLDER_BG = { 1: '#1a0a0c', 2: '#0a0e1a', 3: '#0a1210', 4: '#0e0a1a' }
const PLACEHOLDER_ACCENT = { 1: '#3d0f17', 2: '#0f1a3d', 3: '#0f3d2a', 4: '#1a0f3d' }

/* ─── Modal ─── */
function ProjectModal({ project, onClose }) {
  const { t } = useTranslation()
  const [imgIndex, setImgIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const next = () => setImgIndex(i => (i + 1) % project.images.length)
  const prev = () => setImgIndex(i => (i - 1 + project.images.length) % project.images.length)

  return (
    <motion.div className="pmodal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="pmodal"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <button className="pmodal__close" onClick={onClose}><FiX /></button>
        <div className="pmodal__media">
          <AnimatePresence mode="wait">
            {showVideo
              ? <motion.video key="v" src={project.video} controls autoPlay className="pmodal__video"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              : <motion.div key={imgIndex} className="pmodal__img-wrap"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <img src={project.images[imgIndex]} alt="" className="pmodal__img"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                  <div className="pmodal__placeholder" style={{ display: 'none', background: PLACEHOLDER_BG[project.id] }}>
                    <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>{project.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#555' }}>Dodaj screenshot u /public/projects/</span>
                  </div>
                </motion.div>
            }
          </AnimatePresence>
          {!showVideo && (
            <>
              <button className="pmodal__nav pmodal__nav--prev" onClick={prev}><FiChevronLeft /></button>
              <button className="pmodal__nav pmodal__nav--next" onClick={next}><FiChevronRight /></button>
            </>
          )}
          {project.video && (
            <button className={`pmodal__video-toggle ${showVideo ? 'active' : ''}`} onClick={() => setShowVideo(!showVideo)}>
              <FiPlay size={11} /> {showVideo ? 'Screenshoti' : 'Demo video'}
            </button>
          )}
        </div>
        <div className="pmodal__body">
          <div className="pmodal__header">
            <div>
              <span className="pmodal__num">{project.num}</span>
              <h2 className="pmodal__title">{project.title}</h2>
              <p className="pmodal__subtitle">{t(project.subtitleKey)}</p>
            </div>
            <div className="pmodal__links">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><FiExternalLink size={13} /> Live</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><FiGithub size={13} /> Kod</a>}
            </div>
          </div>
          <p className="pmodal__desc">{t(project.descKey)}</p>
          <div className="pmodal__tags">{project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Single project row ─── */
function ProjectRow({ project, i, onClick }) {
  const { t } = useTranslation()
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start 0.95', 'start 0.2'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [40, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <motion.div
      ref={rowRef}
      className="proj-row"
      onClick={onClick}
      style={{ '--accent': PLACEHOLDER_ACCENT[project.id] }}
    >
      {/* Ghost number */}
      <span className="proj-row__ghost">{project.num}</span>

      {/* Image column */}
      <motion.div
        className="proj-row__media"
        style={{ background: PLACEHOLDER_BG[project.id], opacity: imgOpacity }}
      >
        <motion.div className="proj-row__media-inner" style={{ scale: imgScale }}>
          <img
            src={project.images[0]}
            alt={project.title}
            className="proj-row__img"
            onError={e => e.target.style.display = 'none'}
          />
          <div className="proj-row__pattern" style={{ background: PLACEHOLDER_ACCENT[project.id] }} />
        </motion.div>
        <div className="proj-row__hover-overlay">
          <FiArrowUpRight size={32} />
          <span>{t('projects.liveBtn')}</span>
        </div>
      </motion.div>

      {/* Content column */}
      <motion.div className="proj-row__body" style={{ y: textY, opacity: textOpacity }}>
        <div className="proj-row__meta">
          <span className="proj-row__num">{project.num} / 0{PROJECTS.length}</span>
          <span className="proj-row__year">{project.year}</span>
        </div>
        <h2 className="proj-row__title">{project.title}</h2>
        <p className="proj-row__sub">{t(project.subtitleKey)}</p>
        <p className="proj-row__desc">{t(project.descKey)}</p>
        <div className="proj-row__tags">
          {project.tags.slice(0, 4).map(tag => <span key={tag} className="tag">{tag}</span>)}
          {project.tags.length > 4 && <span className="tag">+{project.tags.length - 4}</span>}
        </div>
        <div className="proj-row__actions" onClick={e => e.stopPropagation()}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline proj-btn">
              <FiGithub size={13} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary proj-btn">
              <FiExternalLink size={13} /> {t('projects.liveBtn')}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main component ─── */
export default function Projects() {
  const { t } = useTranslation()
  const headerRef = useRef(null)
  const [modal, setModal] = useState(null)

  const { scrollYProgress: headerScroll } = useScroll({ target: headerRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(headerScroll, [0, 1], [60, -60])

  return (
    <section id="projekti" className="projects-wrap">

      {/* ── Header ── */}
      <div ref={headerRef} className="projects-header">
        <motion.div className="projects-header__title" style={{ y: titleY }}>
          <span className="projects-mega-line projects-mega-line--white">MOJI</span>
          <span className="projects-mega-line projects-mega-line--stroke">PROJEKTI</span>
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

      {/* ── Project list ── */}
      <div className="projects-list">
        {PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            i={i}
            onClick={() => setModal(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  )
}
