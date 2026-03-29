import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiPlay, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Projects.css'

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA — replace placeholders with your real screenshots/videos/links
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'TaskFlow Pro',
    subtitle: 'Full-Stack Project Management Platform',
    description:
      'A comprehensive project management application with real-time collaboration, drag-and-drop boards, Kanban workflows, team assignments, and deadline tracking. Built with a React frontend, Node.js REST API, and PostgreSQL database — deployed with Docker.',
    longDescription:
      'TaskFlow Pro was built to solve the problem of fragmented task tracking across small development teams. It features a custom drag-and-drop implementation, real-time WebSocket updates, JWT-based authentication, role-based permissions, and a full analytics dashboard. The API is fully documented with Swagger and handles 500+ concurrent connections in load tests.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST API', 'WebSockets', 'Docker', 'JWT'],
    color: '#6c63ff',
    colorAlt: '#8b82ff',
    // Replace these with your actual project image paths in /public/projects/
    images: [
      '/projects/taskflow-1.png',
      '/projects/taskflow-2.png',
      '/projects/taskflow-3.png',
    ],
    // Replace with your actual demo video path (mp4 in /public/projects/)
    video: '/projects/taskflow-demo.mp4',
    // Replace with actual links
    liveUrl: 'https://taskflow.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/taskflow-pro',
    featured: true,
    number: '01',
  },
  {
    id: 2,
    title: 'ShopHub',
    subtitle: 'E-Commerce Web Application',
    description:
      'A modern, full-featured e-commerce platform with product catalogue, cart, checkout flow, user authentication, order management, and an admin dashboard. Integrates a payment gateway and features a fully responsive mobile-first design.',
    longDescription:
      'ShopHub was commissioned by a local retail client. It features a custom CMS for product management, Stripe payment integration, email notifications with templates, inventory tracking, and a customer review system. The React frontend achieves a Lighthouse performance score of 96. Product images are served via an optimized CDN pipeline.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'CSS Modules', 'REST API'],
    color: '#00d4ff',
    colorAlt: '#33ddff',
    images: [
      '/projects/shophub-1.png',
      '/projects/shophub-2.png',
      '/projects/shophub-3.png',
    ],
    video: '/projects/shophub-demo.mp4',
    liveUrl: 'https://shophub.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/shophub',
    featured: true,
    number: '02',
  },
  {
    id: 3,
    title: 'MediTrack',
    subtitle: 'Medical Records Management System',
    description:
      'A secure, HIPAA-aware web system for a private clinic to manage patient records, appointment scheduling, doctor assignments, and medical history. Features a .NET Core REST API backend and a clean, accessible React UI.',
    longDescription:
      'MediTrack replaced a paper-based system at a local medical practice. It includes patient onboarding, dynamic medical forms, appointment calendar with conflict detection, role-based access (admin, doctor, nurse, receptionist), audit logging for all data changes, and PDF report generation. The backend is written in C# with Entity Framework Core and SQL Server.',
    tags: ['React', 'C#', '.NET Core', 'SQL Server', 'REST API', 'PDF Generation'],
    color: '#ff6584',
    colorAlt: '#ff89a0',
    images: [
      '/projects/meditrack-1.png',
      '/projects/meditrack-2.png',
      '/projects/meditrack-3.png',
    ],
    video: '/projects/meditrack-demo.mp4',
    liveUrl: 'https://meditrack.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/meditrack',
    featured: false,
    number: '03',
  },
  {
    id: 4,
    title: 'DevBoard',
    subtitle: 'Real-Time Developer Analytics Dashboard',
    description:
      'A live analytics dashboard for monitoring GitHub activity, CI/CD pipeline statuses, error rates, and deployment logs across multiple projects — all in one unified view. Uses WebSockets for real-time data feeds.',
    longDescription:
      'DevBoard was built out of personal need — to track multiple client projects from a single place. It integrates with the GitHub API, fetches CI/CD data, and streams live error logs via WebSocket connections. Interactive charts are built with Recharts, and the configuration is stored in PostgreSQL. The dashboard updates without page refresh and supports dark/light theming.',
    tags: ['React', 'WebSockets', 'Node.js', 'PostgreSQL', 'GitHub API', 'Recharts'],
    color: '#ffd166',
    colorAlt: '#ffdc85',
    images: [
      '/projects/devboard-1.png',
      '/projects/devboard-2.png',
      '/projects/devboard-3.png',
    ],
    video: '/projects/devboard-demo.mp4',
    liveUrl: 'https://devboard.martinbogoje.dev',
    githubUrl: 'https://github.com/martinbogoje/devboard',
    featured: false,
    number: '04',
  },
]

// ─────────────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const prev = () => setImgIndex(i => (i - 1 + project.images.length) % project.images.length)
  const next = () => setImgIndex(i => (i + 1) % project.images.length)

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ '--modal-color': project.color }}
      >
        <button className="modal__close" onClick={onClose}><FiX /></button>

        <div className="modal__media">
          <AnimatePresence mode="wait">
            {showVideo ? (
              <motion.div
                key="video"
                className="modal__video-wrap"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <video
                  src={project.video}
                  controls
                  autoPlay
                  className="modal__video"
                  poster={project.images[0]}
                />
              </motion.div>
            ) : (
              <motion.div
                key={imgIndex}
                className="modal__img-wrap"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={project.images[imgIndex]}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  className="modal__img"
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                />
                <div className="modal__img-placeholder" style={{ display: 'none' }}>
                  <span style={{ color: project.color }}>Screenshot {imgIndex + 1}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Add images to /public/projects/
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="modal__media-controls">
            {!showVideo && project.images.length > 1 && (
              <>
                <button className="media-nav media-nav--prev" onClick={prev}><FiChevronLeft /></button>
                <button className="media-nav media-nav--next" onClick={next}><FiChevronRight /></button>
                <div className="modal__dots">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      className={`modal__dot ${i === imgIndex ? 'active' : ''}`}
                      onClick={() => setImgIndex(i)}
                    />
                  ))}
                </div>
              </>
            )}
            <button
              className={`modal__video-btn ${showVideo ? 'active' : ''}`}
              onClick={() => setShowVideo(!showVideo)}
            >
              <FiPlay size={12} />
              {showVideo ? 'Screenshots' : 'Watch Demo'}
            </button>
          </div>
        </div>

        <div className="modal__body">
          <div className="modal__header">
            <div>
              <span className="modal__number" style={{ color: project.color }}>{project.number}</span>
              <h2 className="modal__title">{project.title}</h2>
              <p className="modal__subtitle">{project.subtitle}</p>
            </div>
            <div className="modal__links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FiExternalLink size={14} /> Live Site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <FiGithub size={14} /> Source
                </a>
              )}
            </div>
          </div>

          <p className="modal__desc">{project.longDescription}</p>

          <div className="modal__tags">
            {project.tags.map(t => (
              <span key={t} className="tag" style={{ borderColor: `${project.color}40`, color: project.color }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <>
      <motion.div
        className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ '--proj-color': project.color, '--proj-color-alt': project.colorAlt }}
        onClick={() => setModalOpen(true)}
        data-cursor
      >
        <div className="project-card__num">{project.number}</div>

        <div className="project-card__media">
          <img
            src={project.images[0]}
            alt={project.title}
            className="project-card__img"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="project-card__placeholder" style={{ display: 'none' }}>
            <div className="placeholder-pattern" />
            <span className="placeholder-label">{project.title}</span>
          </div>
          <motion.div
            className="project-card__overlay"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <FiPlay size={24} />
            <span>View Project</span>
          </motion.div>
        </div>

        <div className="project-card__body">
          <div className="project-card__top">
            <h3 className="project-card__title">{project.title}</h3>
            <div className="project-card__actions">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  onClick={e => e.stopPropagation()}
                >
                  <FiGithub />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  onClick={e => e.stopPropagation()}
                >
                  <FiExternalLink />
                </a>
              )}
            </div>
          </div>

          <p className="project-card__subtitle">{project.subtitle}</p>
          <p className="project-card__desc">{project.description}</p>

          <div className="project-card__tags">
            {project.tags.slice(0, 4).map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
            {project.tags.length > 4 && (
              <span className="tag tag--more">+{project.tags.length - 4}</span>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
  }

  return (
    <section className="projects section-padding" id="projects" ref={ref}>
      <div className="projects__bg-glow" />
      <div className="container">
        <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          What I&apos;ve Built
        </motion.span>
        <motion.h2 className="section-title" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p className="projects__intro" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          A selection of projects I&apos;ve designed, built, and shipped — each solving a real problem
          with clean code and thoughtful UX. Click any card to explore in detail.
        </motion.p>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
