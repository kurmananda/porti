// Defaults for the artist's details. Everything in `site` can be changed from
// the admin ("Site details"); saved values are stored in data/portfolio.json
// and override what is written here.
export const site = {
  name: "Megha Goenka",
  discipline: "Ceramics",
  tagline: "Ceramic artist – installation, sculpture, drawing",
  born: "Born 1977, Chakulia, India",
  location: "Lives and works in Leudelange, Luxembourg",
  email: "goenkamegha1@yahoo.co.in",
  socials: [{ label: "Instagram", url: "https://www.instagram.com/goenkamegha" }],
  // Link to a photograph of the artist, shown on the home and about pages.
  portrait: "/placeholders/me.png",
  statements: [
    "Megha Goenka shapes porcelain, gold luster and wood into forms that carry stories and memories.",
    "Landscape, nature and architecture inspire work that brings her Indian tradition and culture into a Luxembourg context.",
  ],
  about: [
    "Megha Goenka is a ceramic artist whose work spans ceramics, wood, wall installations and sculpture.",
    "Landscape, nature, architecture and her surroundings inspire decorative forms that carry the stories and memories of her Indian tradition and culture into a Luxembourg context.",
    "Working by hand with meticulous attention to detail, she builds clay and plaster moulds, assembles hand- and wheel-formed pieces, slip casts, works with oxides and tests glazes through multiple firings. Her recent work combines porcelain, gold luster and wood. Charcoal drawing and engraving support her ceramic practice.",
  ],
  education: [
    { year: "2023–26", text: "Académie des Beaux-Arts de la Ville d'Arlon – Ceramics, Engraving, Art History (T1)" },
    { year: "2021", text: "University of Oxford – Indian Art: A History (short online course)" },
    { year: "2020", text: "Workshop with Belgian ceramist Anima Roos – image transfer and texture" },
    { year: "2014–16", text: "École d'Art Contemporain, Luxembourg – DAP2, Diploma in Fine Art" },
    { year: "1997", text: "LAD College, Nagpur, India – Diploma in Interior Design and Decoration" },
  ],
  exhibitions: [
    { year: "2026", text: "Fiat Lux, group exhibition, De Mains de Maîtres Luxembourg (DMDM) with Homo Faber, Venice. Title: RituSamhara, porcelain, gold luster and wood" },
    { year: "2026", text: "Wine Meets Art, group exhibition, Domaine Claude Benz, Luxembourg" },
    { year: "2025", text: "Biennale De Mains de Maîtres Luxembourg, 5th edition" },
    { year: "2025", text: "Révélation, Grand Palais, Paris, with De Mains de Maîtres. Mixed works in porcelain, gold luster and wood" },
    { year: "2023", text: "De Mains de Maîtres Luxembourg, 4th edition, 19 Avenue de la Liberté, Luxembourg" },
    { year: "2022", text: "Biennale Internationale de Peinture de Cattenom, Casino, Cattenom, France" },
    { year: "2022", text: "Salon des Arts – Peinture & Sculpture, Ville de Mondelange, France" },
    { year: "2022", text: "City Concorde, Académie Européenne des Arts, Luxembourg (also 2021)" },
    { year: "2019", text: "Parallax Art Fair, Kensington Town Hall, London" },
    { year: "2019", text: "Exposition FAAR, Le Royal, Metz, France" },
  ],
  press: [
    { year: "2023", text: "“Diese Kunstwerke lassen die Besucher staunen”, Luxemburger Wort, 23 November 2023 – feature on her porcelain flowers at De Mains de Maîtres" },
    { year: "2022", text: "“Dutch Ambassador opens residence doors to public for garden and art exhibition”, Chronicle.lu, 19 May 2022" },
  ],
  collections: [
    "Jindal Poly Films, New Delhi, India",
    "Private collection of Bhikam Agarwal, London",
    "Private collection of Sandeep Jalan, Luxembourg",
  ],
  memberships: [
    "Académie Européenne des Arts, Luxembourg",
    "Indian Ceramic Art Foundation, India",
    "2022–23: Led a large-scale community project designing a stage from recycled materials for Durga Puja, Hesperange commune",
  ],
};

// The CV button links here: put the file at public/cv.pdf.
export const CV_PATH = "/cv.pdf";

// How the work is made, in the artist's own terms.
export const making = [
  {
    icon: "wheel",
    title: "Form",
    text: "Clay and plaster moulds are built by hand, and hand- and wheel-formed pieces are assembled or slip cast.",
  },
  {
    icon: "trim",
    title: "Detail",
    text: "Each piece is worked by hand with meticulous attention to detail.",
  },
  {
    icon: "glaze",
    title: "Colour",
    text: "Surfaces are built up with oxides, and glazes are tested again and again.",
  },
  {
    icon: "kiln",
    title: "Fire",
    text: "Work goes through multiple firings, and recent pieces are finished with gold luster and wood.",
  },
];

export const marquee = ["Porcelain", "Gold luster", "Wood", "Oxides", "Slip cast", "Hand-built"];
