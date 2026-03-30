import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ImageTrail from '../bits/ImageTrail'
import TextPressure from '../bits/TextPressure'
import './ImageTrailSection.css'

// Replace with your actual project screenshots
const TRAIL_IMAGES = [
  '/projects/taskflow-1.png',
  '/projects/shophub-1.png',
  '/projects/meditrack-1.png',
  '/projects/devboard-1.png',
  '/projects/taskflow-2.png',
  '/projects/shophub-2.png',
  '/projects/meditrack-2.png',
  '/projects/devboard-2.png',
]

// Fallback colours shown when images aren't loaded yet
const FALLBACK = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80',
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=80',
  'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&q=80',
]

export default function ImageTrailSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="trail-section" id="trail">
      <motion.div className="trail-section__bg" style={{ opacity: bgOpacity }} />

      <div className="trail-section__header">
        <motion.div style={{ y: titleY }}>
          <TextPressure
            text="POKRET"
            flex weight width
            minFontSize={80}
            textColor="#ffffff"
          />
          <TextPressure
            text="MIŠEM"
            flex weight stroke
            minFontSize={80}
            textColor="transparent"
            strokeColor="#A51C30"
          />
        </motion.div>
        <motion.p
          className="trail-section__hint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Premjesti miš po ekranu
        </motion.p>
      </div>

      <ImageTrail items={FALLBACK}>
        <div className="trail-section__inner" />
      </ImageTrail>
    </section>
  )
}
