insert into public.series (id, slug, title, years, description, created_at, sort_order)
values
  ('s-moon', 'moon-vessels', 'Moon Vessels', '2019 – Present', 'Large porcelain jars thrown in two halves and joined at the belly. The seam is left to settle in the kiln, so no two profiles close in quite the same way.', '2019-06-01T00:00:00Z', 0),
  ('s-flow', 'flow', 'Flow', '2022 – Present', 'Tall forms made as a surface for glaze to travel down. Copper, iron and titanium are layered thickly at the rim and allowed to run until the kiln cools.', '2022-06-01T00:00:00Z', 1),
  ('s-tide', 'tide-bowls', 'Tide Bowls', '2016 – 2022', 'Open forms carrying celadon and ash glazes that pool where the wall thins. Each bowl records the level the glaze reached before the fire stopped it.', '2016-06-01T00:00:00Z', 2),
  ('s-ash', 'ash-and-stone', 'Ash & Stone', '2014 – 2020', 'Storage jars fired for five days in a wood kiln. No glaze is applied; the colour is fly ash from the firebox, melted onto whichever shoulder faced the flame.', '2014-06-01T00:00:00Z', 3),
  ('s-ember', 'ember', 'Ember', '2021 – Present', 'Hand-built tea bowls and small jars pulled from the kiln while still glowing. Iron reds and carbon blacks are drawn by smoke rather than brush.', '2021-06-01T00:00:00Z', 4),
  ('s-night', 'night-bowls', 'Night Bowls', '2018 – 2023', 'Tea bowls in iron-saturated black glaze. Held to the light, the surface breaks into fine brown streaks where the iron has risen and cooled.', '2018-06-01T00:00:00Z', 5),
  ('s-quiet', 'quiet-forms', 'Quiet Forms', '2020 – Present', 'Single vessels made between larger bodies of work. Each one tests a glaze, a profile or a carving before it is carried into a series.', '2020-06-01T00:00:00Z', 6)
on conflict (id) do nothing;

insert into public.works (id, series_id, title, description, image, created_at, sort_order)
values
  ('w-moon-1', 's-moon', 'Moon Vessel I', 'Porcelain, clear glaze. 46 × 44 cm.', '/placeholders/moon-vessel-i.jpg', '2026-06-24T00:00:00Z', 0),
  ('w-moon-2', 's-moon', 'Moon Vessel IV', 'Porcelain, warm white glaze. 41 × 40 cm.', '/placeholders/moon-vessel-iv.jpg', '2026-07-15T00:00:00Z', 1),
  ('w-moon-3', 's-moon', 'Moon Vessel VII', 'Porcelain, pale blue-grey glaze. 44 × 43 cm.', '/placeholders/moon-vessel-vii.jpg', '2026-08-05T00:00:00Z', 2),
  ('w-moon-4', 's-moon', 'Lattice Moon', 'Double-walled porcelain with pierced outer wall, celadon glaze. 38 × 40 cm.', '/placeholders/lattice-moon.jpg', '2026-08-26T00:00:00Z', 3),
  ('w-tide-5', 's-tide', 'High Water', 'Stoneware, carved exterior, celadon glaze. 9 × 21 cm.', '/placeholders/high-water.jpg', '2026-06-20T00:00:00Z', 4),
  ('w-tide-6', 's-tide', 'Slack Tide', 'Stoneware, grey celadon with iron spots. 7 × 16 cm.', '/placeholders/slack-tide.jpg', '2026-07-11T00:00:00Z', 5),
  ('w-tide-7', 's-tide', 'Estuary', 'Stoneware, olive celadon over incised lines. 8 × 18 cm.', '/placeholders/estuary.jpg', '2026-08-01T00:00:00Z', 6),
  ('w-tide-8', 's-tide', 'Kelp', 'Earthenware, moulded medallions, green lead glaze. 14 × 17 cm.', '/placeholders/kelp.jpg', '2026-08-22T00:00:00Z', 7),
  ('w-ember-9', 's-ember', 'Ember I', 'Hand-built earthenware, red raku glaze. 9 × 12 cm.', '/placeholders/ember-i.jpg', '2026-06-07T00:00:00Z', 8),
  ('w-ember-10', 's-ember', 'Ember III', 'Hand-built earthenware, red raku glaze. 9 × 12 cm.', '/placeholders/ember-iii.jpg', '2026-06-28T00:00:00Z', 9),
  ('w-ember-11', 's-ember', 'Char', 'Hand-built earthenware, black raku glaze. 8 × 11 cm.', '/placeholders/char.jpg', '2026-07-19T00:00:00Z', 10),
  ('w-ember-12', 's-ember', 'Windfall', 'Stoneware, black glaze with rust-brown splashes. 14 × 17 cm.', '/placeholders/windfall.jpg', '2026-08-09T00:00:00Z', 11),
  ('w-ember-13', 's-ember', 'Windfall, reverse', 'Stoneware, black glaze with rust-brown splashes. 14 × 17 cm.', '/placeholders/windfall-reverse.jpg', '2026-08-30T00:00:00Z', 12),
  ('w-ash-1', 's-ash', 'Ridge Jar', 'Wood-fired stoneware, natural ash glaze. 24 × 21 cm.', '/placeholders/ridge-jar.jpg', '2026-05-07T00:00:00Z', 13),
  ('w-ash-2', 's-ash', 'Lidded Jar, Rain', 'Wood-fired stoneware, ash and iron glaze, bone lid. 16 × 15 cm.', '/placeholders/lidded-jar-rain.jpg', '2026-05-28T00:00:00Z', 14),
  ('w-ash-3', 's-ash', 'Brick Jar', 'Unglazed wood-fired stoneware. 19 × 18 cm.', '/placeholders/brick-jar.jpg', '2026-06-18T00:00:00Z', 15),
  ('w-ash-4', 's-ash', 'Four Lugs', 'Stoneware, running ash glaze over iron slip. 31 × 33 cm.', '/placeholders/four-lugs.jpg', '2026-07-09T00:00:00Z', 16),
  ('w-ash-5', 's-ash', 'Moss Bottle', 'Wood-fired stoneware, green natural ash glaze. 27 × 17 cm.', '/placeholders/moss-bottle.jpg', '2026-07-30T00:00:00Z', 17),
  ('w-ash-6', 's-ash', 'Harvest Jar', 'Wood-fired stoneware, ash runs over bare clay. 42 × 34 cm.', '/placeholders/harvest-jar.jpg', '2026-08-20T00:00:00Z', 18),
  ('w-flow-7', 's-flow', 'Green Fall', 'Stoneware, streaked green and white glaze. 38 × 22 cm.', '/placeholders/green-fall.jpg', '2026-04-07T00:00:00Z', 19),
  ('w-flow-8', 's-flow', 'Oxblood Column', 'Stoneware, copper red glaze, three lugs. 52 × 17 cm.', '/placeholders/oxblood-column.jpg', '2026-04-28T00:00:00Z', 20),
  ('w-flow-9', 's-flow', 'Dusk Stem', 'Stoneware, plum and bronze glaze. 34 × 15 cm.', '/placeholders/dusk-stem.jpg', '2026-05-19T00:00:00Z', 21),
  ('w-flow-10', 's-flow', 'Iris', 'Stoneware, violet and green flowing glaze. 29 × 18 cm.', '/placeholders/iris.jpg', '2026-06-09T00:00:00Z', 22),
  ('w-flow-11', 's-flow', 'Gourd, Night', 'Stoneware, blue-black glaze with copper flashing. 17 × 21 cm.', '/placeholders/gourd-night.jpg', '2026-06-30T00:00:00Z', 23),
  ('w-flow-12', 's-flow', 'Lichen Sphere', 'Stoneware, mottled copper red and green glaze. 20 × 21 cm.', '/placeholders/lichen-sphere.jpg', '2026-07-21T00:00:00Z', 24),
  ('w-flow-13', 's-flow', 'Red Lyre', 'Earthenware, speckled red glaze, pulled handles. 23 × 14 cm.', '/placeholders/red-lyre.jpg', '2026-08-11T00:00:00Z', 25),
  ('w-flow-14', 's-flow', 'Pinched Bottle', 'Earthenware, grey-green and ochre glaze. 30 × 13 cm.', '/placeholders/pinched-bottle.jpg', '2026-09-01T00:00:00Z', 26),
  ('w-night-15', 's-night', 'Night Bowl I', 'Stoneware, iron black glaze with brown streaking. 7 × 12 cm.', '/placeholders/night-bowl-i.jpg', '2026-06-22T00:00:00Z', 27),
  ('w-night-16', 's-night', 'Night Bowl II', 'Stoneware, black glaze, rust rim. 6 × 12 cm.', '/placeholders/night-bowl-ii.jpg', '2026-07-13T00:00:00Z', 28),
  ('w-night-17', 's-night', 'Night Bowl, turned', 'Stoneware, black glaze, bare foot. 6 × 12 cm.', '/placeholders/night-bowl-turned.jpg', '2026-08-03T00:00:00Z', 29),
  ('w-night-18', 's-night', 'Night Bowl V', 'Stoneware, blue-black glaze with fine streaking. 7 × 13 cm.', '/placeholders/night-bowl-v.jpg', '2026-08-24T00:00:00Z', 30),
  ('w-quiet-19', 's-quiet', 'White Bottle', 'Porcelain, clear glaze. 31 × 16 cm.', '/placeholders/white-bottle.jpg', '2026-05-15T00:00:00Z', 31),
  ('w-quiet-20', 's-quiet', 'Tree Line', 'Stoneware, carved relief, matte tan and green glaze. 23 × 15 cm.', '/placeholders/tree-line.jpg', '2026-06-05T00:00:00Z', 32),
  ('w-quiet-21', 's-quiet', 'Rose Ash', 'Porcelain, pink crystalline glaze over carved bands. 19 × 9 cm.', '/placeholders/rose-ash.jpg', '2026-06-26T00:00:00Z', 33),
  ('w-quiet-22', 's-quiet', 'Pewter Flask', 'Porcelain, metallic black glaze, white neck. 22 × 17 cm.', '/placeholders/pewter-flask.jpg', '2026-07-17T00:00:00Z', 34),
  ('w-quiet-23', 's-quiet', 'Thrown Lines', 'Stoneware, amber and green glaze over throwing rings. 25 × 13 cm.', '/placeholders/thrown-lines.jpg', '2026-08-07T00:00:00Z', 35),
  ('w-quiet-24', 's-quiet', 'Tree Line, large', 'Stoneware, carved relief, matte tan and green glaze. 30 × 24 cm.', '/placeholders/tree-line-large.jpg', '2026-08-28T00:00:00Z', 36)
on conflict (id) do nothing;

insert into public.site_settings (id, settings)
values (
  1,
  $site$
  {
    "name": "Megha Goenka",
    "discipline": "Ceramics",
    "tagline": "Ceramic artist – installation, sculpture, drawing",
    "born": "Born 1977, Chakulia, India",
    "location": "Lives and works in Leudelange, Luxembourg",
    "email": "goenkamegha1@yahoo.co.in",
    "socials": [{"label": "Instagram", "url": "https://www.instagram.com/goenkamegha"}],
    "portrait": "/placeholders/me.png",
    "statements": [
      "Megha Goenka shapes porcelain, gold luster and wood into forms that carry stories and memories.",
      "Landscape, nature and architecture inspire work that brings her Indian tradition and culture into a Luxembourg context."
    ],
    "about": [
      "Megha Goenka is a ceramic artist whose work spans ceramics, wood, wall installations and sculpture.",
      "Landscape, nature, architecture and her surroundings inspire decorative forms that carry the stories and memories of her Indian tradition and culture into a Luxembourg context.",
      "Working by hand with meticulous attention to detail, she builds clay and plaster moulds, assembles hand- and wheel-formed pieces, slip casts, works with oxides and tests glazes through multiple firings. Her recent work combines porcelain, gold luster and wood. Charcoal drawing and engraving support her ceramic practice."
    ],
    "making": [
      {"icon": "wheel", "title": "Form", "text": "Clay and plaster moulds are built by hand, and hand- and wheel-formed pieces are assembled or slip cast."},
      {"icon": "trim", "title": "Detail", "text": "Each piece is worked by hand with meticulous attention to detail."},
      {"icon": "glaze", "title": "Colour", "text": "Surfaces are built up with oxides, and glazes are tested again and again."},
      {"icon": "kiln", "title": "Fire", "text": "Work goes through multiple firings, and recent pieces are finished with gold luster and wood."}
    ],
    "education": [
      {"year": "2023–26", "text": "Académie des Beaux-Arts de la Ville d'Arlon – Ceramics, Engraving, Art History (T1)"},
      {"year": "2021", "text": "University of Oxford – Indian Art: A History (short online course)"},
      {"year": "2020", "text": "Workshop with Belgian ceramist Anima Roos – image transfer and texture"},
      {"year": "2014–16", "text": "École d'Art Contemporain, Luxembourg – DAP2, Diploma in Fine Art"},
      {"year": "1997", "text": "LAD College, Nagpur, India – Diploma in Interior Design and Decoration"}
    ],
    "press": [
      {"year": "2023", "text": "“Diese Kunstwerke lassen die Besucher staunen”, Luxemburger Wort, 23 November 2023 – feature on her porcelain flowers at De Mains de Maîtres"},
      {"year": "2022", "text": "“Dutch Ambassador opens residence doors to public for garden and art exhibition”, Chronicle.lu, 19 May 2022"}
    ],
    "collections": [
      "Jindal Poly Films, New Delhi, India",
      "Private collection of Bhikam Agarwal, London",
      "Private collection of Sandeep Jalan, Luxembourg"
    ],
    "memberships": [
      "Académie Européenne des Arts, Luxembourg",
      "Indian Ceramic Art Foundation, India",
      "2022–23: Led a large-scale community project designing a stage from recycled materials for Durga Puja, Hesperange commune"
    ]
  }
  $site$::jsonb
)
on conflict (id) do nothing;

insert into public.exhibitions (year, title, sort_order)
select seed.year, seed.title, seed.sort_order
from (
  values
    ('2026', 'Fiat Lux, group exhibition, De Mains de Maîtres Luxembourg (DMDM) with Homo Faber, Venice. Title: RituSamhara, porcelain, gold luster and wood', 0),
    ('2026', 'Wine Meets Art, group exhibition, Domaine Claude Benz, Luxembourg', 1),
    ('2025', 'Biennale De Mains de Maîtres Luxembourg, 5th edition', 2),
    ('2025', 'Révélation, Grand Palais, Paris, with De Mains de Maîtres. Mixed works in porcelain, gold luster and wood', 3),
    ('2023', 'De Mains de Maîtres Luxembourg, 4th edition, 19 Avenue de la Liberté, Luxembourg', 4),
    ('2022', 'Biennale Internationale de Peinture de Cattenom, Casino, Cattenom, France', 5),
    ('2022', 'Salon des Arts – Peinture & Sculpture, Ville de Mondelange, France', 6),
    ('2022', 'City Concorde, Académie Européenne des Arts, Luxembourg (also 2021)', 7),
    ('2019', 'Parallax Art Fair, Kensington Town Hall, London', 8),
    ('2019', 'Exposition FAAR, Le Royal, Metz, France', 9)
) as seed(year, title, sort_order)
where not exists (select 1 from public.exhibitions);
