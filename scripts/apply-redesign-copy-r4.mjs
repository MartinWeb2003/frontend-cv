/**
 * Redesign, revision 4 (October 2026): the Pelješac section loses its cutout
 * collage for a single panorama, photo credits move off the images onto the
 * privacy page, and the home projects grid no longer claims to show "all"
 * projects (one is listed on the projects index only). No em dashes.
 *
 *   node scripts/apply-redesign-copy-r4.mjs
 */
import fs from 'node:fs'

const COPY = {
  'home.indexTitle': {
    hr: 'Projekti, od koncepta do produkcije.',
    en: 'Projects, from concept to production.',
    de: 'Projekte, vom Konzept bis zum Livegang.',
    pl: 'Projekty, od koncepcji do wdrożenia.',
  },
  'home.panoramaAlt': {
    hr: 'Pogled na poluotok Pelješac i more s brda iznad obale',
    en: 'View over the Pelješac peninsula and the sea from the hills above the coast',
    de: 'Blick über die Halbinsel Pelješac und das Meer von den Hügeln über der Küste',
    pl: 'Widok na półwysep Pelješac i morze ze wzgórz nad wybrzeżem',
  },
  'privacyPage.photosTitle': { hr: 'Fotografije', en: 'Photographs', de: 'Fotos', pl: 'Zdjęcia' },
  'privacyPage.photosText': {
    hr: 'Fotografije Pelješca na ovoj stranici preuzete su s Wikimedia Commonsa pod navedenim licencama. Autori su:',
    en: 'The photographs of Pelješac on this site come from Wikimedia Commons under the licences listed. Their authors are:',
    de: 'Die Fotos von Pelješac auf dieser Website stammen von Wikimedia Commons unter den angegebenen Lizenzen. Die Urheber sind:',
    pl: 'Zdjęcia Pelješca na tej stronie pochodzą z Wikimedia Commons na wskazanych licencjach. Ich autorzy to:',
  },
}

const REMOVE = ['home.photoBy', 'home.photoNote']

function set(obj, path, value) {
  const parts = path.split('.')
  let o = obj
  for (const p of parts.slice(0, -1)) o = o[p] ??= {}
  o[parts.at(-1)] = value
}

for (const lng of ['hr', 'en', 'de', 'pl']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const [key, byLng] of Object.entries(COPY)) set(data, key, byLng[lng])
  for (const key of REMOVE) {
    const [ns, k] = key.split('.')
    delete data[ns]?.[k]
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
