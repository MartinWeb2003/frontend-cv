import { useInView as useInViewOG } from 'react-intersection-observer'

export default function useInView(options = {}) {
  const [ref, inView] = useInViewOG({
    threshold: 0.15,
    triggerOnce: true,
    ...options,
  })
  return [ref, inView]
}
