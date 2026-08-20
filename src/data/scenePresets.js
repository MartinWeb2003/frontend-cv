/**
 * Colour presets for the About section's 3D scene.
 *
 * Shared between ThreeScene (torus material, wireframe, particles, key light)
 * and the About section itself (bento icons), so picking a preset recolours
 * the whole section rather than just the model.
 */
export const SCENE_PRESETS = [
  { id: 'crimson', hex: '#A51C30', labelKey: 'about.presetCrimson' },
  { id: 'azure', hex: '#1E5FA8', labelKey: 'about.presetAzure' },
  { id: 'amber', hex: '#C9902F', labelKey: 'about.presetAmber' },
]

export const DEFAULT_PRESET = SCENE_PRESETS[0]
