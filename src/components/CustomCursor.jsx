import { useEffect, useRef } from 'react'
import './CustomCursor.css'

const INTERACTIVE = 'a, button, [data-cursor], input, select, textarea, summary'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    /*
     * `pointer: coarse` is the right test, not a width breakpoint: it catches
     * touch devices at any size and leaves small windows on a desktop alone.
     * `hover: none` covers stylus and TV inputs.
     */
    if (window.matchMedia('(pointer: coarse), (hover: none)').matches) return

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

    const setHover = (on) => {
      ringRef.current?.classList.toggle('cursor-ring--hover', on)
      dotRef.current?.classList.toggle('cursor-dot--hover', on)
    }

    /*
     * Event delegation, replacing a MutationObserver that re-queried the whole
     * document and rebound mouseenter/mouseleave on every matching element each
     * time the DOM changed. Two document-level listeners now do the same job:
     * no observer, no per-element listeners, and no burst of main-thread work
     * on every route change, which is what INP actually measures.
     *
     * mouseover/mouseout bubble (mouseenter/mouseleave do not), so delegation
     * is only possible with this pair plus a relatedTarget check.
     */
    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) setHover(true)
    }
    const onOut = (e) => {
      const from = e.target.closest?.(INTERACTIVE)
      if (from && !from.contains(e.relatedTarget)) setHover(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
