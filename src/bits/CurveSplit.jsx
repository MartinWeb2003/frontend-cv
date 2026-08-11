import './CurveSplit.css'

/**
 * A gentle curve drawn across a section, where everything on one side of it
 * renders in inverted colour: the background and whatever sits on top of it
 * (here, the WebGL torus) both shift together.
 *
 * The recolour is a `mix-blend-mode: difference` layer clipped to the region
 * below the curve, rather than two separately-coloured copies of the scene.
 * Blending happens at composite time, so it picks up the canvas as well as the
 * background with no involvement from the Three.js code at all.
 *
 * The parent must establish containment (`position: relative` plus
 * `isolation: isolate`) so the blend cannot reach the rest of the page.
 *
 * @param {string} id unique per instance; clipPath references are global
 * @param {string} d  curve in objectBoundingBox units (0..1 on both axes)
 */
export default function CurveSplit({
  id = 'curve-split',
  d = 'M0,0.66 C0.28,0.57 0.66,0.78 1,0.65',
  className = '',
}) {
  const region = `${d} L1,1 L0,1 Z`

  return (
    <div className={`curve-split ${className}`.trim()} aria-hidden="true">
      <svg className="curve-split__defs" width="0" height="0" focusable="false">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={region} />
          </clipPath>
        </defs>
      </svg>

      <div className="curve-split__tint" style={{ clipPath: `url(#${id})` }} />

      <svg
        className="curve-split__line"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path d={d} />
      </svg>
    </div>
  )
}
