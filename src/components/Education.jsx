import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiCalendar, FiCheckCircle, FiClock, FiBookOpen, FiAward } from 'react-icons/fi'
import useInView from '../hooks/useInView'
import './Education.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] } }),
}

const statStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const statRow = {
  hidden: { opacity: 0, x: 24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}
const tagStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
}
const tagItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function Education() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const titleX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const card1Y = useTransform(scrollYProgress, [0, 1], [70, -30])
  const card2Y = useTransform(scrollYProgress, [0, 1], [110, -60])

  return (
    <section ref={sectionRef} className="education" id="obrazovanje">
      <div className="education__title-row">
        <motion.div className="education__title-track" style={{ x: titleX }}>
          <span className="mega-title">{t('titles.education')}&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title mega-title--outline">{t('titles.education')}&nbsp;&nbsp;&nbsp;</span>
          <span className="mega-title">{t('titles.education')}&nbsp;&nbsp;&nbsp;</span>
        </motion.div>
      </div>

      <div ref={ref} className="container education__body">

        <motion.div style={{ y: card1Y }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="edu-card">
              <div className="edu-card__left">
                <div className="edu-active-badge">
                  <span className="edu-active-dot" />
                  {t('education.activeBadge')}
                </div>
                <h2 className="edu-card__title">{t('education.deg1Title')}</h2>
                <div className="edu-card__meta">
                  <span className="edu-card__school">{t('education.deg1School')}</span>
                  <span className="edu-card__spec">{t('education.deg1Spec')}</span>
                </div>
              </div>
              <motion.div className="edu-card__right" variants={statStagger} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
                <motion.div className="edu-stat" variants={statRow}>
                  <FiCalendar size={14} color="#A51C30" />
                  <span className="edu-stat__label">{t('education.labelDuration')}</span>
                  <span className="edu-stat__val">{t('education.deg1Period')}</span>
                </motion.div>
                <motion.div className="edu-stat" variants={statRow}>
                  <FiClock size={14} color="#A51C30" />
                  <span className="edu-stat__label">{t('education.labelStatus')}</span>
                  <span className="edu-stat__val">{t('education.deg1Status')}</span>
                </motion.div>
                <motion.div className="edu-stat" variants={statRow}>
                  <FiBookOpen size={14} color="#A51C30" />
                  <span className="edu-stat__label">{t('education.labelUniversity')}</span>
                  <span className="edu-stat__val">{t('education.deg1Uni')}</span>
                </motion.div>
                <motion.div className="edu-tags" variants={tagStagger}>
                  {['deg1Tag1', 'deg1Tag2', 'deg1Tag3', 'deg1Tag4'].map(k =>
                    <motion.span key={k} className="tag" variants={tagItem}>{t(`education.${k}`)}</motion.span>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: card2Y }}>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="edu-card edu-card--done">
              <div className="edu-card__left">
                <div className="edu-done-badge">
                  <FiCheckCircle size={11} />
                  {t('education.doneBadge')}
                </div>
                <h2 className="edu-card__title">{t('education.deg2Title')}</h2>
                <div className="edu-card__meta">
                  <span className="edu-card__school">{t('education.deg2School')}</span>
                  <span className="edu-card__spec">{t('education.deg2Spec')}</span>
                </div>
              </div>
              <motion.div className="edu-card__right" variants={statStagger} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
                <motion.div className="edu-stat" variants={statRow}>
                  <FiCalendar size={14} color="#A51C30" />
                  <span className="edu-stat__label">{t('education.labelAcademicYear')}</span>
                  <span className="edu-stat__val">{t('education.deg2Period')}</span>
                </motion.div>
                <motion.div className="edu-stat" variants={statRow}>
                  <FiAward size={14} color="#A51C30" />
                  <span className="edu-stat__label">{t('education.labelTitleEarned')}</span>
                  <span className="edu-stat__val">{t('education.deg2TitleEarned')}</span>
                </motion.div>
                <motion.div className="edu-stat" variants={statRow}>
                  <FiCheckCircle size={14} color="#22c55e" />
                  <span className="edu-stat__label">{t('education.labelStatus')}</span>
                  <span className="edu-stat__val edu-stat__val--green">{t('education.deg2Status')}</span>
                </motion.div>
                <motion.div className="edu-tags" variants={tagStagger}>
                  {['deg2Tag1', 'deg2Tag2', 'deg2Tag3', 'deg2Tag4'].map(k =>
                    <motion.span key={k} className="tag" variants={tagItem}>{t(`education.${k}`)}</motion.span>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
