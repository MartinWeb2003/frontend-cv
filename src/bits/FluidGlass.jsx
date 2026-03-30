import { useRef } from 'react'
import './FluidGlass.css'

export default function FluidGlass({ children, className = '', style = {} }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.current.style.setProperty('--mx', `${x}%`)
    ref.current.style.setProperty('--my', `${y}%`)
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--mx', '50%')
    ref.current.style.setProperty('--my', '50%')
  }

  return (
    <div
      ref={ref}
      className={`fluid-glass ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="fluid-glass__bg" />
      <div className="fluid-glass__noise" />
      <div className="fluid-glass__border" />
      <div className="fluid-glass__content">{children}</div>
    </div>
  )
}
