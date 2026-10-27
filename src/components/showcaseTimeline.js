/**
 * The device showcase timeline, shared by the 3D scene and the HTML captions
 * so the screen and the text beside it can never drift apart.
 *
 * Scroll only *selects* state: whether the laptop is open, and which project
 * is active. It never drives the motion directly. Every move then plays out
 * over time with a critically damped spring (see Laptop3D), so a fast flick
 * of the wheel glides to the latest project instead of whipping the camera
 * through every pose in between.
 */

/** Scroll progress at which the lid opens. */
const OPEN_AT = 0.02
/** Share of the pinned scroll spent on the open laptop before project 2. */
const INTRO = 0.12

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/**
 * @param {number} p scroll progress across the pinned section, 0..1
 * @param {number} n number of projects
 * @returns {{open: boolean, active: number}}
 */
export function showcaseState(p, n) {
  const slot = Math.floor(((p - INTRO) / (1 - INTRO)) * n)
  return { open: p > OPEN_AT, active: clamp(p < INTRO ? 0 : slot, 0, n - 1) }
}

/** Scroll progress at the middle of project `i`'s slot, for keyboard focus. */
export function holdCentre(i, n) {
  return INTRO + ((i + 0.5) / n) * (1 - INTRO)
}

/*
 * One resting pose per project, so each site is framed differently:
 *   1  near front-on, the camera close
 *   2  turned to show the left flank, camera slightly raised
 *   3  low hero angle from the right, looking up
 *   4  front-on and closest: the composed final frame
 * A slow idle drift is layered on top while a pose holds.
 *   ry yaw   rx pitch   rz roll   x sideways   zoom 0..1 dolly   crane camera height
 */
const POSES = [
  { ry: 0.22, rx: 0.08, rz: 0, x: 0, zoom: 0.35, crane: 0 },
  { ry: -0.45, rx: 0.12, rz: -0.02, x: -0.1, zoom: 0.2, crane: 0.2 },
  { ry: 0.42, rx: -0.06, rz: 0.02, x: -0.1, zoom: 0.4, crane: -0.45 },
  { ry: 0, rx: 0.04, rz: 0, x: 0, zoom: 0.55, crane: 0 },
]

/** The closed, pre-intro pose. */
export const CLOSED_POSE = { ry: -0.6, rx: 0.5, rz: 0, x: 0, zoom: 0, crane: 0 }

export const poseFor = (i) => POSES[i % POSES.length]
