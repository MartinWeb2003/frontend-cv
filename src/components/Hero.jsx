import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './Hero.css'

const SOCIALS = [
  { icon: <FiGithub />, href: 'https://github.com/martinbogoje', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/martinbogoje', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:bogojemartin@gmail.com', label: 'Email' },
]

export default function Hero() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const COUNT = Math.min(80, Math.floor((W * H) / 15000))
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particlesRef.current.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108, 99, 255, ${p.alpha})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(108, 99, 255, ${(1 - dist / 120) * 0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="container">
        <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="hero__greeting">
            <span className="mono-tag">&lt;</span>
            Hello, world!
            <span className="mono-tag"> /&gt;</span>
          </motion.span>

          <motion.h1 variants={item} className="hero__name">
            Martin <span className="gradient-text">Bogoje</span>
          </motion.h1>

          <motion.div variants={item} className="hero__role">
            <span className="role-prefix">I&apos;m a&nbsp;</span>
            <TypeAnimation
              sequence={[
                'Software Developer', 2000,
                'React Specialist', 2000,
                'Full-Stack Engineer', 2000,
                'UI/UX Enthusiast', 2000,
                'Problem Solver', 2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              className="role-typed"
            />
          </motion.div>

          <motion.p variants={item} className="hero__bio">
            CS graduate student at FER Zagreb, building high-performance web applications
            with modern stacks. Currently a Software Developer at{' '}
            <span className="highlight">Ericsson Nikola Tesla</span>.
          </motion.p>

          <motion.div variants={item} className="hero__actions">
            <Link to="projects" smooth duration={800} offset={-70}>
              <button className="btn btn-primary">
                View My Work
                <FiArrowDown size={16} />
              </button>
            </Link>
            <Link to="contact" smooth duration={800} offset={-70}>
              <button className="btn btn-outline">Get In Touch</button>
            </Link>
          </motion.div>

          <motion.div variants={item} className="hero__socials">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="scroll-line" />
          <span>scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
