import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiCheck, FiAlertCircle } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Contact.css'

const CONTACT_INFO = [
  { icon: <FiMail />, label: 'Email', value: 'bogojemartin@gmail.com', href: 'mailto:bogojemartin@gmail.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Zagreb, Croatia', href: null },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/martinbogoje', href: 'https://github.com/martinbogoje' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/martinbogoje', href: 'https://linkedin.com/in/martinbogoje' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')

    // Simulate sending — replace this with your actual form endpoint (e.g. Formspree, EmailJS)
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }))
  }

  return (
    <section className="contact section-padding" id="contact" ref={ref}>
      <div className="contact__glow" />
      <div className="container">
        <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Get In Touch
        </motion.span>
        <motion.h2 className="section-title" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Let&apos;s <span className="gradient-text">Work Together</span>
        </motion.h2>
        <motion.p className="contact__intro" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          Whether you have a project in mind, a job opportunity, or just want to say hello —
          my inbox is always open. I&apos;ll do my best to get back to you quickly.
        </motion.p>

        <div className="contact__grid">
          <motion.div className="contact__info" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <h3 className="contact__info-title">Contact Details</h3>
            <div className="contact__info-list">
              {CONTACT_INFO.map(item => (
                <div key={item.label} className="contact-info-item">
                  <span className="contact-info-icon">{item.icon}</span>
                  <div>
                    <span className="contact-info-label">{item.label}</span>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-info-value contact-info-value--link">{item.value}</a>
                      : <span className="contact-info-value">{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__availability">
              <div className="availability-dot" />
              <span>Available for freelance &amp; full-time roles</span>
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            noValidate
          >
            <div className="form-row">
              <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your full name"
                  autoComplete="name"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="What's this about?"
              />
            </div>

            <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Tell me about your project or idea..."
                rows={6}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary form-submit ${status}`}
              disabled={status === 'sending' || status === 'success'}
            >
              {status === 'idle' && <><FiSend size={14} /> Send Message</>}
              {status === 'sending' && <><span className="spinner" /> Sending...</>}
              {status === 'success' && <><FiCheck size={14} /> Message Sent!</>}
              {status === 'error' && <><FiAlertCircle size={14} /> Try Again</>}
            </button>

            {status === 'success' && (
              <motion.p
                className="form-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thanks! I&apos;ll get back to you as soon as possible.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
