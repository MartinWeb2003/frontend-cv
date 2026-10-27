"""Fetch the 21 Croatian county boundaries from Nominatim (one request per
county, >1 s apart per the usage policy) and assign every POI to a county."""
import json, time, urllib.request, urllib.parse
from shapely.geometry import shape, Point

COUNTIES = [
    'Grad Zagreb', 'Zagrebačka županija', 'Krapinsko-zagorska županija', 'Sisačko-moslavačka županija',
    'Karlovačka županija', 'Varaždinska županija', 'Koprivničko-križevačka županija',
    'Bjelovarsko-bilogorska županija', 'Primorsko-goranska županija', 'Ličko-senjska županija',
    'Virovitičko-podravska županija', 'Požeško-slavonska županija', 'Brodsko-posavska županija',
    'Zadarska županija', 'Osječko-baranjska županija', 'Šibensko-kninska županija',
    'Vukovarsko-srijemska županija', 'Splitsko-dalmatinska županija', 'Istarska županija',
    'Dubrovačko-neretvanska županija', 'Međimurska županija',
]
H = {'User-Agent': 'bogojemartin-study/1.0 (bogojemartin@gmail.com)'}

geoms = {}
for name in COUNTIES:
    q = urllib.parse.urlencode({'q': name + ', Hrvatska', 'format': 'json', 'polygon_geojson': 1, 'limit': 3})
    data = json.load(urllib.request.urlopen(urllib.request.Request('https://nominatim.openstreetmap.org/search?' + q, headers=H)))
    hit = next((d for d in data if d.get('geojson', {}).get('type') in ('Polygon', 'MultiPolygon')), None)
    if hit:
        geoms[name] = shape(hit['geojson'])
    print(name, 'ok' if hit else 'MISSING')
    time.sleep(1.2)

rows = json.load(open('pois.json', encoding='utf8'))
for r in rows:
    pt = Point(r['lon'], r['lat'])
    r['county'] = next((n for n, g in geoms.items() if g.contains(pt)), None)
json.dump(rows, open('pois.json', 'w', encoding='utf8'), ensure_ascii=False, indent=0)
