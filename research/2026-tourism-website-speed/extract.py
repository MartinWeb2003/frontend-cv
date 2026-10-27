"""Extract tourism businesses and estate agents with a website from the
Geofabrik Croatia extract, and assign each to its county (admin_level 6)."""
import json, re, sys
import osmium
from shapely import wkb as shp_wkb
from shapely.geometry import Point
from shapely.strtree import STRtree

PBF = 'croatia.osm.pbf'
TOURISM = {'apartment', 'guest_house', 'hotel', 'camp_site', 'chalet', 'hostel', 'motel'}
wkbfab = osmium.geom.WKBFactory()

class Counties(osmium.SimpleHandler):
    def __init__(self):
        super().__init__()
        self.items = []
    def area(self, a):
        t = a.tags
        if t.get('boundary') == 'administrative' and t.get('admin_level') == '6' and not a.from_way():
            try:
                g = shp_wkb.loads(wkbfab.create_multipolygon(a), hex=True)
                self.items.append((t.get('name'), g))
            except Exception as e:
                pass

class Pois(osmium.SimpleHandler):
    def __init__(self):
        super().__init__()
        self.rows = []
    def take(self, kind, oid, tags, lon, lat):
        site = tags.get('website') or tags.get('contact:website') or tags.get('url')
        if not site:
            return
        typ = tags.get('tourism')
        if typ not in TOURISM:
            typ = 'estate_agent' if tags.get('office') == 'estate_agent' else None
        if not typ:
            return
        self.rows.append({'osm': f'{kind}/{oid}', 'type': typ, 'website': site.strip(), 'lon': lon, 'lat': lat})
    def node(self, n):
        if n.location.valid():
            self.take('node', n.id, n.tags, n.location.lon, n.location.lat)
    def area(self, a):
        try:
            g = shp_wkb.loads(wkbfab.create_multipolygon(a), hex=True)
        except Exception:
            return
        c = g.representative_point()
        kind = 'way' if a.from_way() else 'relation'
        self.take(kind, a.orig_id(), a.tags, c.x, c.y)

c = Counties()
c.apply_file(PBF, locations=True)
print('counties', len(c.items), file=sys.stderr)
p = Pois()
p.apply_file(PBF, locations=True)
print('pois', len(p.rows), file=sys.stderr)

geoms = [g for _, g in c.items]
tree = STRtree(geoms)
for r in p.rows:
    pt = Point(r['lon'], r['lat'])
    r['county'] = None
    for i in tree.query(pt):
        if geoms[i].contains(pt):
            r['county'] = c.items[i][0]
            break
json.dump(p.rows, open('pois.json', 'w', encoding='utf8'), ensure_ascii=False, indent=0)
