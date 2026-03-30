import { useInView as useInViewOG } from 'react-intersection-observer'

export default function useInView(options = {}) {
  const [ref, inView] = useInViewOG({
    threshold: 0.12,
    triggerOnce: false, // re-triggers every time element enters viewport
    ...options,
  })
  return [ref, inView]
}
