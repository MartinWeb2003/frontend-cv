import './CurveSplit.css'

/**
 * A gently curved band sweeping across a section, acting as a colour lens:
 * wherever it passes, the background and whatever sits on top of it (here, the
 * WebGL torus) both shift colour together. Outside the band nothing changes.
 *
 * The band is a *stroked* path, not a filled region. The stroke is the shape,
 * and `mix-blend-mode: difference` on it recolours whatever is underneath at
 * composite time, so it picks up the canvas as well as the background with no
 * involvement from the Three.js code at all.
 *
 * The parent must establish containment (`position: relative` plus
 * `isolation: isolate`) so the blend cannot reach the rest of the page.
 *
 * Thickness and colour are CSS variables: `--curve-split-thickness`,
 * `--curve-split-color`, `--curve-split-blend`.
 *
 * @param {string} d curve in a 0..1 viewBox, spanning the full width
 */
export default function CurveSplit({
  d = 'M-0.02,0.46 C0.28,0.34 0.66,0.58 1.02,0.44',
  className = '',
}) {
  return (
    <div className={`curve-split ${className}`.trim()} aria-hidden="true">
      <svg
        className="curve-split__band"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path d={d} />
      </svg>
    </div>
  )
}
