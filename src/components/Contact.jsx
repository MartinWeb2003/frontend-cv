import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiCheck } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Contact.css'

const CONTACT_INFO = [
  { icon: <FiMail />, label: 'Email', value: 'bogojemartin@gmail.com', href: 'mailto:bogojemartin@gmail.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Zagreb, Croatia', href: null },
  { icon: <FiGithub />, label: 'GitHub', value: '/martinbogoje', href: 'https://github.com/martinbogoje' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: '/in/martinbogoje', href: 'https://linkedin.com/in/martinbogoje' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
}

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1600))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }))
  }

  return (
    <section className="contact" id="contact">
      {/* Big title */}
      <div className="contact__title-row">
        <div className="mega-title">LET'S</div>
        <div className="mega-title mega-title--crimson">TALK</div>
      </div>

      <div ref={ref} className="sticky-layout">
        <div className="sticky-panel contact__left">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Get In Touch
          </motion.span>
          <motion.p className="contact__tagline" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Whether you have a project, a job opportunity, or just want to say hello — I respond promptly.
          </motion.p>

          <motion.div className="contact__info-list" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {CONTACT_INFO.map(item => (
              <div key={item.label} className="contact-info-row">
                <span className="contact-info-icon">{item.icon}</span>
                <div>
                  <span className="contact-info-label">{item.label}</span>
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-info-val contact-info-val--link">{item.value}</a>
                    : <span className="contact-info-val">{item.value}</span>
                  }
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="contact__avail" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="avail-dot" />
            <span>Available for freelance &amp; full-time roles</span>
          </motion.div>
        </div>

        <div className="scroll-panel">
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            noValidate
          >
            <div className="form-row">
              <div className={`form-group ${errors.name ? 'err' : ''}`}>
                <label className="form-label">Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Your name" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className={`form-group ${errors.email ? 'err' : ''}`}>
                <label className="form-label">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className={`form-group ${errors.message ? 'err' : ''}`}>
              <label className="form-label">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} className="form-input form-textarea" placeholder="Tell me about your project or opportunity..." rows={7} />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button type="submit" className={`btn btn-primary form-submit ${status}`} disabled={status === 'sending' || status === 'success'}>
              {status === 'idle' && <><FiSend size={13} /> Send Message</>}
              {status === 'sending' && <><span className="spinner" /> Sending...</>}
              {status === 'success' && <><FiCheck size={13} /> Sent!</>}
            </button>
            {status === 'success' && (
              <motion.p className="form-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Message received — I'll get back to you shortly.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
