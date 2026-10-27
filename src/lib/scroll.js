/**
 * One owner for page scrolling.
 *
 * Lenis drives inertial wheel scrolling on desktop. It moves the real document
 * scroll position every frame, so `position: sticky`, IntersectionObserver and
 * motion's `useScroll` keep working unchanged. Touch devices keep native
 * scrolling (Lenis default), and reduced-motion visitors never get Lenis.
 *
 * Everything that scrolls programmatically goes through `scrollToTarget` so a
 * jump never fights an in-flight Lenis animation.
 */
import Lenis from 'lenis'

let lenis = null

const NAV_OFFSET = -72

export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    autoRaf: true,
  })
  return lenis
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

/** Pause while a modal or menu is open; resumes where it left off. */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/**
 * @param {string|number|HTMLElement} target element id, y position or element
 * @param {{immediate?: boolean}} [opts]
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  const el =
    typeof target === 'string' ? document.getElementById(target) : target
  if (el == null) return

  if (lenis) {
    lenis.scrollTo(el, {
      offset: typeof el === 'number' ? 0 : NAV_OFFSET,
      immediate,
      duration: immediate ? 0 : 1.2,
    })
    return
  }

  const top =
    typeof el === 'number'
      ? el
      : el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: immediate || reduce ? 'auto' : 'smooth' })
}
