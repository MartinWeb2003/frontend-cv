import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      ringRef.current?.classList.add('cursor-ring--hover')
      dotRef.current?.classList.add('cursor-dot--hover')
    }
    const onLeaveLink = () => {
      ringRef.current?.classList.remove('cursor-ring--hover')
      dotRef.current?.classList.remove('cursor-dot--hover')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
