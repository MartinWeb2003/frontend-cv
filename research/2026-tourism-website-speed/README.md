# Croatian tourism website speed study (October 2026)

Source of the blog post `web-speed-study` (b9) and of
`public/data/croatian-tourism-websites-2026.csv`.

Run in order, from this folder, with the Geofabrik Croatia extract
(`croatia.osm.pbf`, 26 Oct 2026) next to the scripts:

1. `python extract.py`    every tourism business / estate agent with a website (OSM tags)
2. `python counties.py`   county boundaries from Nominatim, one request per county
3. dedupe by domain, drop Facebook/Booking/etc. profiles, keep 7 Adriatic counties -> `sites.json`
4. `node survey.mjs`      homepage fetch: status, HTTPS, viewport, platform, booking engine
5. `node recheck.mjs`     retry failures at the root domain (https, www, http)
6. `node lh.mjs`          Lighthouse 13.5.0 mobile, seeded random sample of 400 (seed 2026),
                          one CLI process per site (in-process concurrency corrupts results)
7. `node analyze.mjs`     `results.json` + the anonymised CSV

`results.json` holds the exact numbers quoted in the article. Raw files with
domains (`sites.json`, `survey.json`, `lh.jsonl`) are deliberately not
committed: the study publishes aggregates and an anonymised table only.
Needs `npm i lighthouse@13.5.0` and `pip install osmium shapely`.
