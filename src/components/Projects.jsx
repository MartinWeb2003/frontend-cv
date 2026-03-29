import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiPlay, FiX, FiChevronLeft, FiChevronRight, FiArrowUpRight } from 'react-icons/fi'
import GlareHover from '../bits/GlareHover'
import BorderGlow from '../bits/BorderGlow'
import useInView from '../hooks/useInView'
import './Projects.css'

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'TaskFlow Pro',
    subtitle: 'Project Management Platform',
    desc: 'Full-stack task management with real-time Kanban boards, WebSocket collaboration, JWT auth, role-based permissions, and analytics dashboard. Node.js REST API + PostgreSQL + Docker.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Docker', 'JWT'],
    images: ['/projects/taskflow-1.png', '/projects/taskflow-2.png', '/projects/taskflow-3.png'],
    video: '/projects/taskflow-demo.mp4',
    liveUrl: 'https://taskflow.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/taskflow-pro',
    color: '#A51C30',
    year: '2024',
  },
  {
    id: 2,
    num: '02',
    title: 'ShopHub',
    subtitle: 'E-Commerce Platform',
    desc: 'Complete e-commerce solution with product catalogue, Stripe checkout, order management, admin CMS, and email notifications. Lighthouse score: 96. Fully responsive mobile-first design.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'REST API'],
    images: ['/projects/shophub-1.png', '/projects/shophub-2.png', '/projects/shophub-3.png'],
    video: '/projects/shophub-demo.mp4',
    liveUrl: 'https://shophub.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/shophub',
    color: '#0A0A0A',
    year: '2024',
  },
  {
    id: 3,
    num: '03',
    title: 'MediTrack',
    subtitle: 'Medical Records System',
    desc: 'Secure web system for patient records, appointment scheduling, multi-role access (admin/doctor/nurse), audit logging, and PDF report generation. C# .NET Core + SQL Server backend.',
    tags: ['React', 'C#', '.NET Core', 'SQL Server', 'REST API'],
    images: ['/projects/meditrack-1.png', '/projects/meditrack-2.png', '/projects/meditrack-3.png'],
    video: '/projects/meditrack-demo.mp4',
    liveUrl: 'https://meditrack.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/meditrack',
    color: '#A51C30',
    year: '2023',
  },
  {
    id: 4,
    num: '04',
    title: 'DevBoard',
    subtitle: 'Developer Analytics Dashboard',
    desc: 'Live analytics dashboard for GitHub activity, CI/CD pipeline status, and real-time error logs across multiple projects. WebSocket data streams, Recharts visualisations, zero page-refresh updates.',
    tags: ['React', 'WebSockets', 'Node.js', 'PostgreSQL', 'GitHub API', 'Recharts'],
    images: ['/projects/devboard-1.png', '/projects/devboard-2.png', '/projects/devboard-3.png'],
    video: '/projects/devboard-demo.mp4',
    liveUrl: 'https://devboard.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/devboard',
    color: '#0A0A0A',
    year: '2024',
  },
]

function ProjectModal({ project, onClose }) {
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
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <button className="pmodal__close" onClick={onClose}><FiX /></button>

        <div className="pmodal__media">
          <AnimatePresence mode="wait">
            {showVideo
              ? <motion.video key="v" src={project.video} controls autoPlay className="pmodal__video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              : <motion.div key={imgIndex} className="pmodal__img-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <img src={project.images[imgIndex]} alt="" className="pmodal__img"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                  <div className="pmodal__placeholder" style={{ display: 'none', background: project.color + '18' }}>
                    <span style={{ color: project.color, fontSize: '1.5rem', fontWeight: 800 }}>{project.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#999' }}>Add screenshots to /public/projects/</span>
                  </div>
                </motion.div>
            }
          </AnimatePresence>

          {!showVideo && (
            <>
              <button className="pmodal__nav pmodal__nav--prev" onClick={prev}><FiChevronLeft /></button>
              <button className="pmodal__nav pmodal__nav--next" onClick={next}><FiChevronRight /></button>
              <div className="pmodal__dots">
                {project.images.map((_, i) => (
                  <button key={i} className={`pmodal__dot ${i === imgIndex ? 'active' : ''}`} onClick={() => setImgIndex(i)}
                    style={i === imgIndex ? { background: project.color } : {}} />
                ))}
              </div>
            </>
          )}
          <button className={`pmodal__video-toggle ${showVideo ? 'active' : ''}`} onClick={() => setShowVideo(!showVideo)}>
            <FiPlay size={11} /> {showVideo ? 'Screenshots' : 'Demo Video'}
          </button>
        </div>

        <div className="pmodal__body">
          <div className="pmodal__header">
            <div>
              <span className="pmodal__num" style={{ color: project.color }}>{project.num}</span>
              <h2 className="pmodal__title">{project.title}</h2>
              <p className="pmodal__subtitle">{project.subtitle}</p>
            </div>
            <div className="pmodal__links">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><FiExternalLink size={13} /> Live</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><FiGithub size={13} /> Source</a>}
            </div>
          </div>
          <p className="pmodal__desc">{project.desc}</p>
          <div className="pmodal__tags">{project.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const [modal, setModal] = useState(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] } }),
  }

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <div className="projects__title-row">
        <motion.div style={{ y: titleY }}>
          <div className="mega-title">SELECTED</div>
          <div className="mega-title mega-title--crimson">WORK</div>
        </motion.div>
      </div>

      <div ref={ref} className="container projects__body">
        <motion.p className="projects__intro" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Four projects built from scratch — real clients, real problems, real code.
          Click any card to explore in detail, watch a demo, and see the source.
        </motion.p>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <motion.div key={project.id} custom={i} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <BorderGlow glowColor="165 28 48" borderRadius={16} style={{ height: '100%' }}>
                <GlareHover
                  background="#FFFFFF"
                  borderRadius="16px"
                  borderColor="transparent"
                  glareColor={project.color}
                  glareOpacity={0.08}
                  style={{ height: '100%' }}
                >
                  <div className="proj-card" onClick={() => setModal(project)}>
                    <div className="proj-card__media">
                      <img src={project.images[0]} alt={project.title} className="proj-card__img"
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                      <div className="proj-card__placeholder" style={{ display: 'none', background: project.color + '0d' }}>
                        <div className="proj-placeholder-pattern" />
                        <span style={{ color: project.color, fontWeight: 800, fontSize: '1.1rem', zIndex: 1 }}>{project.num}</span>
                      </div>
                      <div className="proj-card__hover-overlay">
                        <FiArrowUpRight size={28} />
                        <span>Explore Project</span>
                      </div>
                    </div>

                    <div className="proj-card__body">
                      <div className="proj-card__top-row">
                        <span className="proj-card__num" style={{ color: project.color }}>{project.num}</span>
                        <span className="proj-card__year">{project.year}</span>
                        <div className="proj-card__actions" onClick={e => e.stopPropagation()}>
                          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-icon-btn"><FiGithub /></a>}
                          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-icon-btn"><FiExternalLink /></a>}
                        </div>
                      </div>
                      <h3 className="proj-card__title">{project.title}</h3>
                      <p className="proj-card__subtitle">{project.subtitle}</p>
                      <p className="proj-card__desc">{project.desc}</p>
                      <div className="proj-card__tags">
                        {project.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                        {project.tags.length > 4 && <span className="tag">+{project.tags.length - 4}</span>}
                      </div>
                    </div>
                  </div>
                </GlareHover>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  )
}
