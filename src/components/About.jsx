import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiCode, FiLayers, FiCpu, FiGlobe, FiAward } from 'react-icons/fi'
import MagicBento from '../bits/MagicBento'
import CountUp from '../bits/CountUp'
import ThreeScene from './ThreeScene'
import useInView from '../hooks/useInView'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function About() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [ref, inView] = useInView()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 1.2', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 0.25], [30, 0])
  const sceneY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textY  = useTransform(scrollYProgress, [0, 1], [20, -20])

  const STATS = [
    { value: 3,  suffix: '+', labelKey: 'about.statExperience' },
    { value: 10, suffix: '+', labelKey: 'about.statProjects' },
    { value: 16, suffix: '+', labelKey: 'about.statTech' },
    { value: 2,  suffix: '',  labelKey: 'about.statDegrees' },
  ]

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="about__title-row">
        <motion.div style={{ y: titleY }} className="about__title-inner">
          <span className="mega-title">O&nbsp;</span>
          <span className="mega-title mega-title--outline">MENI</span>
        </motion.div>
      </div>

      <div ref={ref} className="sticky-layout">

        <div className="sticky-panel about__sticky">
          <motion.span className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {t('about.sectionLabel')}
          </motion.span>
          <motion.h2 className="about__heading" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {t('about.heading')}
          </motion.h2>
          <motion.p className="about__para" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {t('about.para1')}
          </motion.p>
          <motion.p className="about__para" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {t('about.para2')}
          </motion.p>
          <motion.ul className="about__list" custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <li><strong>{t('about.service1Title')}:</strong> {t('about.service1Desc')}</li>
            <li><strong>{t('about.service2Title')}:</strong> {t('about.service2Desc')}</li>
          </motion.ul>
          <motion.div className="about__stats" custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {STATS.map((s, i) => (
              <div key={s.labelKey} className="about__stat">
                <span className="about__stat-value">
                  <CountUp to={s.value} duration={1.8} delay={i * 0.15} suffix={s.suffix} />
                </span>
                <span className="about__stat-label">{t(s.labelKey)}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="scroll-panel about__right">
          <motion.div className="about__3d" style={{ y: sceneY }}>
            <ThreeScene />
            <div className="about__3d-label">
              <span>{t('about.hint3d')}</span>
            </div>
          </motion.div>

          <motion.div style={{ y: textY }}>
            <MagicBento className="about__bento">
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiCode size={26} color="#A51C30" />
                  <h3>{t('about.bento1Title')}</h3>
                  <p>{t('about.bento1Desc')}</p>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiLayers size={26} color="#A51C30" />
                  <h3>{t('about.bento2Title')}</h3>
                  <p>{t('about.bento2Desc')}</p>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-wide">
                <div className="bento-inner bento-inner--row">
                  <FiCpu size={30} color="#A51C30" />
                  <div>
                    <h3>{t('about.bento3Title')}</h3>
                    <p>{t('about.bento3Desc')}</p>
                  </div>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiGlobe size={26} color="#A51C30" />
                  <h3>{t('about.bento4Title')}</h3>
                  <p>{t('about.bento4Desc')}</p>
                </div>
              </MagicBento.Card>
              <MagicBento.Card className="bento-tall">
                <div className="bento-inner">
                  <FiAward size={26} color="#A51C30" />
                  <h3>{t('about.bento5Title')}</h3>
                  <p>{t('about.bento5Desc')}</p>
                </div>
              </MagicBento.Card>
            </MagicBento>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
