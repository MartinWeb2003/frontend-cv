/**
 * Licensed photography of Pelješac from Wikimedia Commons, owner-approved in
 * October 2026. Landscapes and buildings only: CLAUDE.md bans stock photos
 * of people.
 *
 * CC BY requires credit, so every photo carries its author, licence and
 * source. At the owner's request the images themselves are uncaptioned; the
 * credits are listed together on the privacy page (PhotoCredits), which is
 * linked from every page's footer.
 *
 * Masters live in assets-original/photos/. Run
 * `node scripts/process-photos.mjs` after adding one here.
 */
export const PHOTOS = {
  'peljesac-panorama': {
    src: 'peljesac-panorama.jpg',
    author: 'otrow_photography',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:View_of_Peljesac_peninsula.jpg',
    place: 'Pelješac',
  },
  'kuciste-sunset': {
    src: 'kuciste-sunset.jpg',
    author: 'krysi@',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Kuciste_-_panoramio_(1).jpg',
    place: 'Kućište',
    trim: true, // the original has a thin black frame
  },
}

/** Public path, e.g. photo('stay-house') -> '/photos/stay-house.webp'. */
export const photo = (key) => `/photos/${key}.webp`
