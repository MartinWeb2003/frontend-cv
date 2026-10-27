/**
 * Reads a colour token from :root and returns it as normalised [r, g, b],
 * so WebGL scenes take their palette from index.css instead of repeating hex
 * literals (CLAUDE.md, section 3). Browser-only; call it inside effects.
 *
 * @param {string} name custom property, e.g. '--accent'
 * @returns {[number, number, number]}
 */
export function cssColor(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const hex = raw.startsWith('#') ? raw.slice(1) : '000000'
  const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex
  const n = parseInt(full.slice(0, 6), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/** Same token as a `#rrggbb` string, for three.js `Color`. */
export function cssHex(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
