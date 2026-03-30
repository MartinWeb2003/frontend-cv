import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  SiReact, SiJavascript, SiNodedotjs, SiPython,
  SiGit, SiPostgresql, SiCplusplus, SiTypescript,
  SiDocker, SiWordpress, SiCss, SiHtml5
} from 'react-icons/si'
import './FloatingIcons.css'

const ICONS = [
  { Icon: SiReact,       color: '#61DAFB', size: 36, top: '18%', left: '7%',  speedY: 0.08, speedX: 0.04, delay: 0 },
  { Icon: SiJavascript,  color: '#F7DF1E', size: 28, top: '72%', left: '5%',  speedY: 0.12, speedX: 0.06, delay: 0.5 },
  { Icon: SiNodedotjs,   color: '#339933', size: 32, top: '30%', left: '88%', speedY: 0.07, speedX: 0.03, delay: 1 },
  { Icon: SiPython,      color: '#3776AB', size: 26, top: '78%', left: '91%', speedY: 0.10, speedX: 0.05, delay: 0.3 },
  { Icon: SiGit,         color: '#F05032', size: 30, top: '55%', left: '3%',  speedY: 0.06, speedX: 0.08, delay: 0.8 },
  { Icon: SiPostgresql,  color: '#4169E1', size: 24, top: '12%', left: '82%', speedY: 0.14, speedX: 0.04, delay: 0.2 },
  { Icon: SiCplusplus,   color: '#00599C', size: 22, top: '88%', left: '50%', speedY: 0.09, speedX: 0.07, delay: 1.2 },
  { Icon: SiTypescript,  color: '#3178C6', size: 26, top: '45%', left: '93%', speedY: 0.11, speedX: 0.03, delay: 0.6 },
  { Icon: SiDocker,      color: '#2496ED', size: 28, top: '22%', left: '15%', speedY: 0.05, speedX: 0.09, delay: 1.5 },
  { Icon: SiWordpress,   color: '#21759B', size: 22, top: '65%', left: '75%', speedY: 0.13, speedX: 0.06, delay: 0.4 },
  { Icon: SiCss,         color: '#1572B6', size: 24, top: '40%', left: '2%',  speedY: 0.08, speedX: 0.05, delay: 0.9 },
  { Icon: SiHtml5,       color: '#E34F26', size: 26, top: '8%',  left: '55%', speedY: 0.10, speedX: 0.04, delay: 1.1 },
]

function FloatIcon({ Icon, color, size, top, left, speedY, speedX, delay }) {
  return (
    <motion.div
      className="float-icon"
      style={{ top, left, color, fontSize: size }}
      animate={{
        y: [0, -18, 0, 12, 0],
        x: [0, 8, -6, 4, 0],
        rotate: [0, 8, -4, 6, 0],
        opacity: [0.15, 0.35, 0.2, 0.3, 0.15],
      }}
      transition={{
        duration: 8 + delay * 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay,
      }}
    >
      <Icon />
    </motion.div>
  )
}

export default function FloatingIcons({ scrollRef }) {
  return (
    <div className="floating-icons" aria-hidden>
      {ICONS.map((props, i) => (
        <FloatIcon key={i} {...props} />
      ))}
    </div>
  )
}
