export const BUSINESS = {
  name: "Jeffrey Danaher Property Management",
  short: "Danaher",
  owner: "Jeffrey Danaher",
  email: "danaherjeff@yahoo.com",
  phone: "(802) 343-7779",
  phoneRaw: "+18023437779",
  hours: "Everyday 8:00am – 5:00pm",
  location: "Essex, Vermont",
  region: "Chittenden County & beyond",
  yearsInBusiness: 18,
  yearsUnderFather: 15,
  tagline: "Expert property management for hassle-free ownership",
  subline:
    "Let the professionals at Jeffrey Danaher Property Management handle the hassle, so you can enjoy the benefits.",
};

export const STATS = [
  { value: "18", label: "Years in business", note: "Independently owned" },
  { value: "33", label: "Years in the trade", note: "Two generations" },
  { value: "10", label: "Services offered", note: "One single call" },
  { value: "100%", label: "Fully insured", note: "Commercial & residential" },
];

export type Service = {
  id: string;
  n: string;
  title: string;
  short: string;
  season: string;
  body: string;
  img: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "cleaning",
    n: "01",
    title: "Commercial & Residential Cleaning",
    short: "Janitorial",
    season: "Year-round",
    body:
      "A clean space isn’t just about appearance — it’s about health, safety, and creating a welcoming environment. Jeffrey Danaher Property Management provides reliable commercial and residential cleaning to ensure your home or business stays spotless, sanitized, and well-maintained. Regular professional cleaning helps prevent the spread of germs, extends the life of your property, and leaves a lasting impression on guests and customers. Let us handle the cleaning, so you can focus on what matters most.",
    img: "lobby-clean",
    bullets: ["Offices & lobbies", "Schools & facilities", "Homes & rentals", "Recurring or one-time"],
  },
  {
    id: "landscaping",
    n: "02",
    title: "Landscaping, Grass Cutting & Mulching",
    short: "Landscaping",
    season: "Spring – Fall",
    body:
      "A well-maintained landscape enhances curb appeal, boosts property value, and creates a welcoming outdoor space. Jeffrey Danaher Property Management provides expert commercial and residential landscaping, grass cutting, and mulching to keep your property looking its best year-round. Regular maintenance ensures healthy growth, prevents overgrowth, and improves the overall aesthetics of your home or business. Let us take care of your outdoor spaces, so you can enjoy a beautiful, stress-free environment.",
    img: "mulch-commercial",
    bullets: ["Weekly mowing", "Mulch & bed edging", "Planting & flower beds", "Trimming & pruning"],
  },
  {
    id: "snow",
    n: "03",
    title: "Snow Removal & Roof Shoveling",
    short: "Snow & Ice",
    season: "Winter",
    body:
      "New England winters can be tough, but Jeffrey Danaher Property Management makes snow removal and roof shoveling easy and stress-free. Our commercial and residential services keep driveways, walkways, and parking lots clear and safe while preventing ice buildup and structural damage from heavy snow. Regular snow removal ensures accessibility, reduces hazards, and protects your property all season long. Let us handle the winter work, so you can stay safe and focus on what matters.",
    img: "plow-truck",
    bullets: ["Plowing & lots", "Walkways & entries", "Roof shoveling", "Ice prevention"],
  },
  {
    id: "outdoor",
    n: "04",
    title: "All Your Outdoor Needs",
    short: "Outdoor",
    season: "Every season",
    body:
      "Vermont’s ever-changing weather can be tough on your property, but Jeffrey Danaher Property Management has you covered. From seasonal cleanups to maintaining walkways and outdoor spaces, we ensure your home or business stays safe, accessible, and looking its best year-round. No matter the season, our team is ready to handle the tough jobs so you can enjoy a worry-free outdoor space.",
    img: "walkway-beds",
    bullets: ["Spring & fall cleanups", "Walkway upkeep", "Debris & leaf removal", "Seasonal prep"],
  },
  {
    id: "pool",
    n: "05",
    title: "Pool Services",
    short: "Pools",
    season: "Summer",
    body:
      "Keep your pool clean, safe, and ready to enjoy with Jeffrey Danaher Property Management’s expert pool services. From routine maintenance and cleaning to chemical balancing and inspections, we ensure your pool stays in top condition all season long. A well-maintained pool not only looks great but also extends its lifespan and keeps swimmers safe. Let us handle the upkeep so you can focus on making the most of your pool.",
    img: "pool",
    bullets: ["Routine maintenance", "Chemical balancing", "Cleaning & skimming", "Inspections"],
  },
  {
    id: "pond",
    n: "06",
    title: "Pond Cleaning, Maintenance & Fish Stocking",
    short: "Ponds",
    season: "Spring – Fall",
    body:
      "A healthy pond enhances your property’s beauty, but without proper care, it can quickly become overgrown and unbalanced. Jeffrey Danaher Property Management provides expert pond cleaning, maintenance, and fish stocking to keep your water clear, free of debris, and thriving year-round. From algae control to aeration and seasonal cleanups, we ensure your pond remains a clean, healthy, and stunning focal point. Let us handle the maintenance so you can enjoy a beautiful, worry-free pond.",
    img: "stonewall",
    bullets: ["Algae control", "Aeration", "Fish stocking", "Seasonal cleanups"],
  },
  {
    id: "carpet",
    n: "07",
    title: "Carpet Cleaning & Upholstery",
    short: "Carpet",
    season: "Year-round",
    body:
      "Fresh, clean carpets and upholstery make a big difference in the look and feel of your home or business. Jeffrey Danaher Property Management offers professional carpet and upholstery cleaning to remove dirt, stains, and allergens, leaving your space looking and smelling fresh. Regular cleaning extends the life of your fabrics and creates a healthier environment for your family, guests, or customers. Let us restore the comfort and cleanliness of your carpets and furniture with our expert care.",
    img: "office-clean",
    bullets: ["Deep extraction", "Stain treatment", "Allergen removal", "Upholstery & furniture"],
  },
  {
    id: "floors",
    n: "08",
    title: "Hardwood Installation, Strip & Coating",
    short: "Floor care",
    season: "Year-round",
    body:
      "Floors take the most abuse of any surface in a building, and they’re the first thing people notice. Jeffrey Danaher Property Management installs hardwood flooring and strips, refinishes, and coats commercial floors to bring back the shine and protect the surface underneath. Whether it’s a new hardwood install for a home or a full strip-and-wax on a high-traffic commercial floor, we do the prep properly and finish clean.",
    img: "lobby-clean",
    bullets: ["Hardwood installation", "Strip & recoat", "High-traffic commercial", "Buffing & polishing"],
  },
  {
    id: "handyman",
    n: "09",
    title: "Handyman Services",
    short: "Handyman",
    season: "Year-round",
    body:
      "From small repairs to home improvements, Jeffrey Danaher Property Management’s handyman services have you covered. Whether it’s fixing leaks, patching drywall, installing fixtures, or tackling general maintenance, our skilled team gets the job done right. Reliable, efficient, and affordable, we help keep your home or business in top shape without the hassle. Let us handle the repairs so you can focus on what matters most.",
    img: "beds-home",
    bullets: ["Leaks & plumbing fixes", "Drywall patching", "Fixture installation", "General maintenance"],
  },
];

export type Shot = { img: string; title: string; meta: string; span?: "tall" | "wide" };

export const GALLERY: Shot[] = [
  { img: "mowing-commercial", title: "Commercial grounds, cut clean", meta: "Corporate campus — Chittenden County", span: "wide" },
  { img: "thank-you", title: "“Thank you Danaher”", meta: "From the kids at a local YMCA", span: "tall" },
  { img: "mulch-sidewalk", title: "Fresh mulch, full frontage", meta: "Downtown commercial — Burlington area" },
  { img: "plow-truck", title: "Plowed and salted before open", meta: "Winter contract — commercial lot", span: "wide" },
  { img: "beds-home", title: "Beds edged, baskets hung", meta: "Residential — Essex" },
  { img: "walkway-beds", title: "Walkway planting in full bloom", meta: "Residential — Chittenden County", span: "tall" },
  { img: "lobby-clean", title: "Lobby, opened spotless", meta: "Janitorial contract — commercial" },
  { img: "field-mowed", title: "Two acres, striped", meta: "Estate grounds — Vermont", span: "wide" },
  { img: "office-clean", title: "Open floor, carpets extracted", meta: "Nightly janitorial — office" },
  { img: "planter-downtown", title: "Street planter in high summer", meta: "Downtown — commercial frontage" },
  { img: "stonewall", title: "Dry-stacked stone border", meta: "Hardscape — residential" },
  { img: "garden-bed", title: "Petunias, mulched and shaped", meta: "Backyard bed — residential", span: "tall" },
  { img: "home-lawn", title: "Curb appeal, maintained weekly", meta: "Residential — Chittenden County", span: "wide" },
  { img: "planting-storefront", title: "New storefront planting", meta: "Retail frontage — commercial" },
  { img: "mulch-commercial", title: "Mulch and trim under the maples", meta: "Office park — commercial" },
  { img: "pool", title: "Pool deck, cleaned and balanced", meta: "Facility pool — commercial" },
];

export const ABOUT_PARAGRAPHS = [
  "I’m Jeffrey Danaher, the proud owner of Jeffrey Danaher Property Management, a fully insured property maintenance company dedicated to keeping homes and businesses in top shape. Before launching my own business 18 years ago, I gained 15 years of hands-on experience working under my father’s property management company, where I developed a strong work ethic and a deep understanding of property maintenance. With that foundation, I built Jeffrey Danaher Property Management into a trusted name, offering high-quality janitorial, landscaping, snow removal, handyman services, and more throughout Chittenden County and beyond.",
  "At Jeffrey Danaher Property Management, we believe that exceptional service starts with a dedicated team. I take a hands-on approach to management, ensuring that every job is done to the highest standard. Our employees are the backbone of our success, and we prioritize a positive work environment, competitive wages, and long-term retention to maintain a team that cares as much about your property as you do.",
  "Our goal is simple: to provide reliable, professional, and top-tier property maintenance services that exceed expectations. Whether it’s keeping commercial spaces clean, maintaining beautiful landscapes, clearing snow in Vermont’s tough winters, or tackling general repairs, my team and I are committed to delivering results that make a difference.",
  "I take great pride in the relationships we’ve built with our clients over the years and the trust they place in us to care for their properties. If you’re looking for a property management team that values quality, reliability, and customer satisfaction, Jeffrey Danaher Property Management is here for you.",
];

export const ABOUT_PULLQUOTE =
  "We take pride in our work, value our employees, and always go the extra mile to keep spaces clean, safe, and welcoming.";

export const CREDENTIALS = [
  { k: "Founded", v: "18 years ago" },
  { k: "Trained under", v: "His father, 15 years" },
  { k: "Insurance", v: "Fully insured" },
  { k: "Service area", v: "Chittenden County & beyond" },
  { k: "Based in", v: "Essex, Vermont" },
  { k: "Availability", v: "Everyday, 8–5" },
];

export const FORM_SERVICES = [
  "Commercial / Residential Cleaning",
  "Commercial / Residential Landscaping, Grass Cutting, and Mulching",
  "Commercial / Residential Snow Removal and Roof Shoveling",
  "Other Outdoor Services",
  "Pool Services",
  "Pond Cleaning and Maintenance",
  "Carpet Cleaning and Upholstery",
  "Hardwood Floor Installation",
  "Handyman Services",
  "Strip and Coating Floors",
];

export const CONSENT_MARKETING =
  "I consent to receive marketing text messages from Jeffrey Danaher Property Management at the phone number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.";

export const CONSENT_TRANSACTIONAL =
  "I consent to receive non-marketing text messages from Jeffrey Danaher Property Management about my order updates, appointment reminders etc. Message & data rates may apply.";
