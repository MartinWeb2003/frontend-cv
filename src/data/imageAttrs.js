import IMAGE_META from './imageMeta.json'

/**
 * Attributes for a responsive <img>: src, srcSet, sizes and intrinsic
 * width/height.
 *
 * The intrinsic dimensions are what stop layout shift; `srcset` + `sizes` are
 * what stop a phone downloading a 1600px file into a ~390px slot. Both matter
 * to Core Web Vitals, for CLS and LCP respectively.
 *
 * Narrow variants come from scripts/generate-srcset.mjs and are named
 * `<base>-<width>.webp`. Entries with a single width (the logo) degrade to a
 * plain src with dimensions.
 *
 * @param {string} src   e.g. '/sotto1.webp'
 * @param {string} [sizes]  CSS slot description, e.g. '(max-width: 900px) 100vw, 50vw'
 */
export function imgAttrs(src, sizes) {
  const meta = IMAGE_META[src]
  if (!meta) return { src }

  const { width, height, widths } = meta
  if (!widths || widths.length < 2) return { src, width, height }

  const base = src.replace(/\.webp$/, '')
  const srcSet = widths
    .map((w) => (w === width ? `${src} ${w}w` : `${base}-${w}.webp ${w}w`))
    .join(', ')

  return { src, srcSet, ...(sizes ? { sizes } : {}), width, height }
}

/** Common slot descriptions, kept here so they stay consistent with the CSS. */
export const SIZES = {
  /** Full-bleed half of a project row on desktop. */
  projectRow: '(max-width: 900px) 100vw, 50vw',
  /** Card in an auto-fit grid, roughly a third of the container. */
  card: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
  /** Project detail hero, container width. */
  hero: '(max-width: 1200px) 100vw, 1100px',
}
