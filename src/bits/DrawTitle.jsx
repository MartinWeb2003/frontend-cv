import { useEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView'
import './DrawTitle.css'

/** Text is laid out in SVG user units; CSS scales the result via font-size. */
const FONT_SIZE = 100
const LINE_HEIGHT = 0.88
const PAD = 10

/**
 * Outline length is roughly this multiple of a line's advance width for heavy
 * uppercase type. SVG <text> has no getTotalLength(), so the dash length has to
 * be estimated; being close matters only so the stroke travels for most of the
 * animation rather than finishing early.
 */
const OUTLINE_RATIO = 3.2

/**
 * A heading whose letterforms draw themselves the first time they scroll into
 * view, then fill in.
 *
 * The stroke animation needs real outlines, which `-webkit-text-stroke` on HTML
 * text cannot provide: only SVG strokes can be dashed and offset. So the visible
 * heading is an SVG and the accessible, indexable text sits beside it in a
 * visually hidden span.
 *
 * Degradation is deliberate. The CSS default is "fully drawn"; JS only *arms*
 * the hidden state after measuring. Without JS, or before hydration, the title
 * is simply visible rather than blank.
 *
 * @param {{text: string, fill?: boolean}[]} lines one entry per rendered line
 */
export default function DrawTitle({
  lines,
  className = '',
  as = 'span',
  duration = 2200,
  stagger = 300,
}) {
  // Capitalised local so JSX treats it as a component (and so the shared
  // no-unused-vars ignore pattern applies, since it only covers variables).
  const Tag = as

  const [viewRef, inView] = useInView({ threshold: 0.25, triggerOnce: true })
  const groupRef = useRef(null)
  const [metrics, setMetrics] = useState(null)

  const key = lines.map((l) => l.text).join('|')

  useEffect(() => {
    const g = groupRef.current
    if (!g) return

    const measure = () => {
      let bbox
      try {
        bbox = g.getBBox()
      } catch {
        return false
      }
      if (!bbox.width) return false

      const lengths = [...g.querySelectorAll('text')].map(
        (t) => t.getComputedTextLength() * OUTLINE_RATIO,
      )
      const boxHeight = bbox.height + PAD * 2
      setMetrics({
        viewBox: `${bbox.x - PAD} ${bbox.y - PAD} ${bbox.width + PAD * 2} ${boxHeight}`,
        /*
         * The viewBox is the tight glyph bbox, so sizing the SVG by line-height
         * would shrink the letterforms (uppercase cap height is well under 1em).
         * Expressing the height in em at the same scale as the layout units
         * makes 100 user units render as exactly 1em, i.e. the CSS font-size.
         */
        heightEm: boxHeight / FONT_SIZE,
        lengths,
      })
      return true
    }

    if (measure()) return

    // Webfonts can land after first paint and change the metrics.
    let raf = requestAnimationFrame(() => measure())
    document.fonts?.ready.then(() => measure())
    return () => cancelAnimationFrame(raf)
  }, [key])

  const viewBox =
    metrics?.viewBox ?? `0 0 1000 ${lines.length * FONT_SIZE * LINE_HEIGHT + PAD * 2}`

  const armed = Boolean(metrics)
  const state = [armed && 'is-armed', armed && inView && 'is-drawing'].filter(Boolean).join(' ')

  return (
    <Tag ref={viewRef} className={`drawtitle ${className} ${state}`.trim()}>
      <span className="sr-only">{lines.map((l) => l.text).join(' ')}</span>
      <svg
        className="drawtitle__svg"
        viewBox={viewBox}
        preserveAspectRatio="xMinYMid meet"
        aria-hidden="true"
        focusable="false"
        style={{
          '--drawtitle-duration': `${duration}ms`,
          height: `${metrics?.heightEm ?? lines.length * LINE_HEIGHT}em`,
        }}
      >
        <g ref={groupRef}>
          {lines.map((line, i) => (
            <text
              key={line.text + i}
              className={`drawtitle__line${line.fill ? ' drawtitle__line--fill' : ''}`}
              x="0"
              y={FONT_SIZE + i * FONT_SIZE * LINE_HEIGHT}
              fontSize={FONT_SIZE}
              vectorEffect="non-scaling-stroke"
              style={{
                '--drawtitle-delay': `${i * stagger}ms`,
                '--drawtitle-len': metrics?.lengths?.[i] ?? 3000,
              }}
            >
              {line.text}
            </text>
          ))}
        </g>
      </svg>
    </Tag>
  )
}
