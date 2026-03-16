import { useState, useMemo } from "react";
import Head from "next/head";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CRUISES = [
  // ── ICON OF THE SEAS ──────────────────────────────────────────────────────
  {
    id: 1,
    ship: "Icon of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Eastern Caribbean & CocoCay",
    from: "Miami, FL",
    to: "St. Maarten · St. Thomas · Puerto Plata · CocoCay",
    departure: "2026-04-11",
    nights: 7,
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1199, salePrice: 699, discount: 42 },
      { type: "Ocean View", originalPrice: 1499, salePrice: 949, discount: 37 },
      { type: "Balcony", originalPrice: 1899, salePrice: 1299, discount: 32 },
      { type: "Junior Suite", originalPrice: 3499, salePrice: 2299, discount: 34 },
      { type: "Royal Suite", originalPrice: 8999, salePrice: 5999, discount: 33 },
    ],
    highlights: ["Perfect Day at CocoCay", "7 Pools + Cat6 Waterpark", "40+ Dining Venues", "AquaDome Shows"],
    badge: "HOT DEAL",
    badgeColor: "#FF4B4B",
  },
  {
    id: 2,
    ship: "Icon of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Western Caribbean & CocoCay",
    from: "Miami, FL",
    to: "Roatán · Cozumel · Costa Maya · CocoCay",
    departure: "2026-05-02",
    nights: 7,
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1099, salePrice: 749, discount: 32 },
      { type: "Ocean View", originalPrice: 1399, salePrice: 999, discount: 29 },
      { type: "Balcony", originalPrice: 1799, salePrice: 1399, discount: 22 },
      { type: "Junior Suite", originalPrice: 3299, salePrice: 2499, discount: 24 },
      { type: "Royal Suite", originalPrice: 8499, salePrice: 6299, discount: 26 },
    ],
    highlights: ["Maya Ruins in Cozumel", "Jungle Adventures Roatán", "CocoCay Private Island", "Crown Edge Thrill Ride"],
    badge: "SUMMER SALE",
    badgeColor: "#FF8C00",
  },
  {
    id: 3,
    ship: "Icon of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Eastern Caribbean",
    from: "Miami, FL",
    to: "San Juan · St. Kitts · St. Maarten · CocoCay",
    departure: "2026-06-20",
    nights: 7,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1299, salePrice: 799, discount: 38 },
      { type: "Ocean View", originalPrice: 1599, salePrice: 1049, discount: 34 },
      { type: "Balcony", originalPrice: 2099, salePrice: 1499, discount: 29 },
      { type: "Junior Suite", originalPrice: 3799, salePrice: 2699, discount: 29 },
      { type: "Ultimate Family Suite", originalPrice: 14999, salePrice: 9999, discount: 33 },
    ],
    highlights: ["Historic San Juan", "St. Kitts & Nevis", "Absolute Zero Ice Arena", "Music Hall Live Shows"],
    badge: "KIDS SAIL FREE",
    badgeColor: "#00A86B",
  },
  {
    id: 4,
    ship: "Icon of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Western Caribbean",
    from: "Miami, FL",
    to: "Cozumel · Costa Maya · Roatán · CocoCay",
    departure: "2026-08-08",
    nights: 7,
    image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6d3?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1399, salePrice: 849, discount: 39 },
      { type: "Ocean View", originalPrice: 1699, salePrice: 1099, discount: 35 },
      { type: "Balcony", originalPrice: 2199, salePrice: 1549, discount: 30 },
      { type: "Junior Suite", originalPrice: 3999, salePrice: 2849, discount: 29 },
      { type: "Icon Loft Suite", originalPrice: 11999, salePrice: 8499, discount: 29 },
    ],
    highlights: ["Snorkeling in Cozumel", "Ruins of Tulum Day Trip", "Adrenaline Peak Climbing Wall", "7 Neighborhood Zones"],
    badge: "FLASH SALE",
    badgeColor: "#9B30FF",
  },
  {
    id: 5,
    ship: "Icon of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Eastern Caribbean & Bahamas",
    from: "Miami, FL",
    to: "Nassau · CocoCay · St. Thomas · St. Maarten",
    departure: "2026-10-17",
    nights: 7,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1149, salePrice: 649, discount: 43 },
      { type: "Ocean View", originalPrice: 1449, salePrice: 899, discount: 38 },
      { type: "Balcony", originalPrice: 1949, salePrice: 1249, discount: 36 },
      { type: "Junior Suite", originalPrice: 3599, salePrice: 2299, discount: 36 },
      { type: "Owner's Suite", originalPrice: 9499, salePrice: 6299, discount: 34 },
    ],
    highlights: ["Nassau Atlantis Day Pass", "CocoCay Waterslides", "Hideaway Beach Adult-Only", "AquaTheater Shows"],
    badge: "BEST VALUE",
    badgeColor: "#0099CC",
  },
  // ── ROYAL CARIBBEAN (Other Ships) ─────────────────────────────────────────
  {
    id: 6,
    ship: "Wonder of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Western Caribbean",
    from: "Port Canaveral, FL",
    to: "Cozumel · Roatán · Costa Maya · CocoCay",
    departure: "2026-04-18",
    nights: 7,
    image: "https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 999, salePrice: 599, discount: 40 },
      { type: "Ocean View", originalPrice: 1199, salePrice: 799, discount: 33 },
      { type: "Balcony", originalPrice: 1599, salePrice: 1099, discount: 31 },
      { type: "Junior Suite", originalPrice: 2999, salePrice: 1999, discount: 33 },
    ],
    highlights: ["Central Park Neighborhood", "Ultimate Abyss Slide", "Aquatheater", "Surfing Simulator"],
    badge: "SALE",
    badgeColor: "#FF8C00",
  },
  {
    id: 7,
    ship: "Utopia of the Seas",
    line: "Royal Caribbean",
    itinerary: "3-Night Bahamas",
    from: "Port Canaveral, FL",
    to: "Nassau · CocoCay",
    departure: "2026-04-30",
    nights: 3,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 599, salePrice: 329, discount: 45 },
      { type: "Ocean View", originalPrice: 749, salePrice: 449, discount: 40 },
      { type: "Balcony", originalPrice: 999, salePrice: 649, discount: 35 },
      { type: "Suite", originalPrice: 1999, salePrice: 1299, discount: 35 },
    ],
    highlights: ["Perfect Weekend Escape", "CocoCay Private Island", "Silent Disco", "Weekend Party Vibes"],
    badge: "WEEKEND GETAWAY",
    badgeColor: "#FF4B4B",
  },
  {
    id: 8,
    ship: "Allure of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Mediterranean",
    from: "Barcelona, Spain",
    to: "Palma · Naples · Rome · Florence/Pisa · Marseille",
    departure: "2026-06-06",
    nights: 7,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1399, salePrice: 849, discount: 39 },
      { type: "Ocean View", originalPrice: 1699, salePrice: 1099, discount: 35 },
      { type: "Balcony", originalPrice: 2199, salePrice: 1499, discount: 32 },
      { type: "Junior Suite", originalPrice: 4199, salePrice: 2799, discount: 33 },
    ],
    highlights: ["Roman Colosseum Day Trip", "Barcelona Gothic Quarter", "Amalfi Coast Views", "Central Park Strolls"],
    badge: "EUROPE SPECIAL",
    badgeColor: "#1E40AF",
  },
  {
    id: 9,
    ship: "Oasis of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Eastern Caribbean",
    from: "Fort Lauderdale, FL",
    to: "St. Maarten · St. Kitts · San Juan · CocoCay",
    departure: "2026-05-23",
    nights: 7,
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1099, salePrice: 649, discount: 41 },
      { type: "Ocean View", originalPrice: 1299, salePrice: 849, discount: 35 },
      { type: "Balcony", originalPrice: 1699, salePrice: 1149, discount: 32 },
      { type: "Grand Suite", originalPrice: 5999, salePrice: 3999, discount: 33 },
    ],
    highlights: ["Zip Line Over Boardwalk", "FlowRider Surf Simulator", "Central Park", "Jazz on 4 Live Music"],
    badge: "DEAL",
    badgeColor: "#00A86B",
  },
  {
    id: 10,
    ship: "Symphony of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Western Caribbean",
    from: "Miami, FL",
    to: "Labadee · Falmouth · Cozumel · CocoCay",
    departure: "2026-07-11",
    nights: 7,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1199, salePrice: 699, discount: 42 },
      { type: "Ocean View", originalPrice: 1399, salePrice: 899, discount: 36 },
      { type: "Balcony", originalPrice: 1799, salePrice: 1199, discount: 33 },
      { type: "Sky Suite", originalPrice: 5499, salePrice: 3699, discount: 33 },
    ],
    highlights: ["Labadee Private Beach", "Falmouth Jamaica Excursions", "The Perfect Storm Slides", "Broadway Shows"],
    badge: "SUMMER SAVINGS",
    badgeColor: "#9B30FF",
  },
  {
    id: 11,
    ship: "Harmony of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Eastern Caribbean",
    from: "Port Canaveral, FL",
    to: "Labadee · San Juan · St. Maarten · CocoCay",
    departure: "2026-09-05",
    nights: 7,
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1049, salePrice: 599, discount: 43 },
      { type: "Ocean View", originalPrice: 1249, salePrice: 799, discount: 36 },
      { type: "Balcony", originalPrice: 1649, salePrice: 1099, discount: 33 },
      { type: "Junior Suite", originalPrice: 3099, salePrice: 2099, discount: 32 },
    ],
    highlights: ["Ultimate Abyss Slide", "Royal Theater", "Splashaway Bay Kids Area", "The Lime & Coconut Pool Bar"],
    badge: "FALL DEAL",
    badgeColor: "#FF8C00",
  },
  {
    id: 12,
    ship: "Independence of the Seas",
    line: "Royal Caribbean",
    itinerary: "7-Night Alaska Glacier Discovery",
    from: "Seattle, WA",
    to: "Juneau · Skagway · Glacier Bay · Ketchikan",
    departure: "2026-07-25",
    nights: 7,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    cabins: [
      { type: "Interior", originalPrice: 1499, salePrice: 949, discount: 37 },
      { type: "Ocean View", originalPrice: 1799, salePrice: 1199, discount: 33 },
      { type: "Balcony", originalPrice: 2299, salePrice: 1649, discount: 28 },
      { type: "Junior Suite", originalPrice: 3999, salePrice: 2799, discount: 30 },
    ],
    highlights: ["Glacier Bay National Park", "Dog Sledding in Skagway", "Whale Watching Excursions", "Bald Eagle Spotting"],
    badge: "ALASKA ADVENTURE",
    badgeColor: "#0099CC",
  },
];

const SHIPS = ["All Ships", "Icon of the Seas", "Wonder of the Seas", "Utopia of the Seas", "Allure of the Seas", "Oasis of the Seas", "Symphony of the Seas", "Harmony of the Seas", "Independence of the Seas"];
const DESTINATIONS = ["All Destinations", "Caribbean", "Bahamas", "Mediterranean", "Alaska"];
const DURATIONS = ["Any Duration", "3 nights", "7 nights"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => `$${n.toLocaleString()}`;
const minPrice = (cruise) => Math.min(...cruise.cabins.map((c) => c.salePrice));
const maxDiscount = (cruise) => Math.max(...cruise.cabins.map((c) => c.discount));

function formatDate(str) {
  return new Date(str).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getDestCategory(cruise) {
  const dest = cruise.to + cruise.from;
  if (dest.includes("Mediterranean") || dest.includes("Barcelona") || dest.includes("Rome") || dest.includes("Naples")) return "Mediterranean";
  if (dest.includes("Alaska") || dest.includes("Juneau") || dest.includes("Seattle")) return "Alaska";
  if (dest.includes("Bahamas") || dest.includes("Nassau") || dest.includes("CocoCay")) return "Bahamas";
  return "Caribbean";
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function StarRating() {
  return (
    <span className="stars">{"★★★★★"}</span>
  );
}

function CabinTable({ cabins }) {
  return (
    <div className="cabin-table">
      <div className="cabin-header">
        <span>Cabin Type</span>
        <span>Was</span>
        <span>Now</span>
        <span>Save</span>
      </div>
      {cabins.map((c) => (
        <div key={c.type} className="cabin-row">
          <span className="cabin-type">{c.type}</span>
          <span className="cabin-was">{fmt(c.originalPrice)}</span>
          <span className="cabin-now">{fmt(c.salePrice)}</span>
          <span className="cabin-save">-{c.discount}%</span>
        </div>
      ))}
    </div>
  );
}

function CruiseCard({ cruise, expanded, onToggle }) {
  const cheapest = minPrice(cruise);
  const biggestDiscount = maxDiscount(cruise);

  return (
    <div className={`card ${expanded ? "card--open" : ""}`}>
      {/* Image */}
      <div className="card-img-wrap">
        <img src={cruise.image} alt={cruise.itinerary} className="card-img" />
        <div className="card-badge" style={{ background: cruise.badgeColor }}>{cruise.badge}</div>
        <div className="card-ship-tag">{cruise.ship}</div>
        <div className="card-discount-bubble">
          <span className="discount-pct">-{biggestDiscount}%</span>
          <span className="discount-label">UP TO OFF</span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-top-row">
          <div>
            <p className="card-nights">{cruise.nights} NIGHTS</p>
            <h2 className="card-title">{cruise.itinerary}</h2>
          </div>
          <div className="card-price-block">
            <span className="price-from">FROM</span>
            <span className="price-big">{fmt(cheapest)}</span>
            <span className="price-pp">/ person</span>
          </div>
        </div>

        <div className="card-route">
          <span className="route-from">🚢 {cruise.from}</span>
          <span className="route-arrow">→</span>
          <span className="route-to">{cruise.to}</span>
        </div>

        <div className="card-meta">
          <span className="meta-date">📅 Departs {formatDate(cruise.departure)}</span>
          <StarRating />
        </div>

        <div className="card-highlights">
          {cruise.highlights.map((h) => (
            <span key={h} className="highlight-tag">✦ {h}</span>
          ))}
        </div>

        {/* Expand/Collapse */}
        <button className="card-toggle-btn" onClick={onToggle}>
          {expanded ? "▲ Hide Cabin Prices" : "▼ View All Cabin Prices"}
        </button>

        {expanded && (
          <div className="card-expanded">
            <h3 className="cabin-section-title">All Cabin Categories & Prices</h3>
            <CabinTable cabins={cruise.cabins} />
            <a
              href={`https://www.royalcaribbean.com/cruises?search=ship%3AIC`}
              target="_blank"
              rel="noopener noreferrer"
              className="book-btn"
            >
              Book Now on Royal Caribbean ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [shipFilter, setShipFilter] = useState("All Ships");
  const [destFilter, setDestFilter] = useState("All Destinations");
  const [durationFilter, setDurationFilter] = useState("Any Duration");
  const [sortBy, setSortBy] = useState("discount");
  const [iconOnly, setIconOnly] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [priceRange, setPriceRange] = useState(10000);

  const filtered = useMemo(() => {
    let list = [...CRUISES];

    if (iconOnly) list = list.filter((c) => c.ship === "Icon of the Seas");
    if (shipFilter !== "All Ships") list = list.filter((c) => c.ship === shipFilter);
    if (destFilter !== "All Destinations") list = list.filter((c) => getDestCategory(c) === destFilter);
    if (durationFilter !== "Any Duration") {
      const nights = parseInt(durationFilter);
      list = list.filter((c) => c.nights === nights);
    }
    list = list.filter((c) => minPrice(c) <= priceRange);

    if (sortBy === "discount") list.sort((a, b) => maxDiscount(b) - maxDiscount(a));
    else if (sortBy === "price-asc") list.sort((a, b) => minPrice(a) - minPrice(b));
    else if (sortBy === "price-desc") list.sort((a, b) => minPrice(b) - minPrice(a));
    else if (sortBy === "date") list.sort((a, b) => new Date(a.departure) - new Date(b.departure));

    return list;
  }, [shipFilter, destFilter, durationFilter, sortBy, iconOnly, priceRange]);

  const cheapestDeal = useMemo(() => {
    return CRUISES.reduce((min, c) => (minPrice(c) < minPrice(min) ? c : min), CRUISES[0]);
  }, []);

  const biggestDiscount = useMemo(() => {
    return CRUISES.reduce((max, c) => (maxDiscount(c) > maxDiscount(max) ? c : max), CRUISES[0]);
  }, []);

  return (
    <>
      <Head>
        <title>Royal Caribbean Cruise Deals | Icon of the Seas</title>
        <meta name="description" content="Find the best Royal Caribbean cruise deals — Icon of the Seas and more. Discounts up to 45% off." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #0a1628;
          --ocean: #0d3b6e;
          --wave: #1565c0;
          --sky: #0288d1;
          --teal: #00acc1;
          --gold: #f9a825;
          --coral: #ff5252;
          --mint: #00e5ff;
          --white: #ffffff;
          --offwhite: #f0f6ff;
          --card-bg: rgba(255,255,255,0.04);
          --card-border: rgba(255,255,255,0.1);
          --glass: rgba(13,59,110,0.6);
          --text-light: rgba(255,255,255,0.65);
          --radius: 18px;
          --shadow: 0 8px 40px rgba(0,0,0,0.4);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--navy);
          color: var(--white);
          min-height: 100vh;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(21,101,192,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,172,193,0.15) 0%, transparent 60%);
          background-attachment: fixed;
        }

        /* ── HERO ── */
        .hero {
          padding: 60px 24px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=60') center/cover no-repeat;
          opacity: 0.08;
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 4px;
          color: var(--teal);
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.05;
          color: var(--white);
          margin-bottom: 8px;
        }
        .hero-title span { color: var(--gold); }
        .hero-sub {
          font-size: 17px;
          color: var(--text-light);
          max-width: 560px;
          margin: 0 auto 36px;
          line-height: 1.6;
          font-weight: 300;
        }

        /* ── STAT PILLS ── */
        .hero-stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .stat-pill {
          background: var(--glass);
          border: 1px solid var(--card-border);
          border-radius: 50px;
          padding: 10px 22px;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(12px);
        }
        .stat-number { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--gold); }
        .stat-label { font-size: 12px; color: var(--text-light); }

        /* ── TOP DEAL BANNERS ── */
        .top-deals {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 820px;
          margin: 0 auto 44px;
          padding: 0 16px;
          position: relative;
          z-index: 1;
        }
        @media(max-width: 600px) { .top-deals { grid-template-columns: 1fr; } }
        .top-deal-card {
          background: linear-gradient(135deg, rgba(21,101,192,0.5), rgba(0,172,193,0.3));
          border: 1px solid rgba(0,229,255,0.25);
          border-radius: 14px;
          padding: 18px 22px;
          backdrop-filter: blur(10px);
        }
        .td-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--mint); margin-bottom: 6px; }
        .td-deal { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 2px; }
        .td-meta { font-size: 12px; color: var(--text-light); }
        .td-price { font-size: 28px; font-weight: 700; color: var(--gold); }

        /* ── ICON TOGGLE ── */
        .icon-toggle-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .icon-toggle-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #1a237e, #0288d1);
          border: 2px solid var(--teal);
          border-radius: 50px;
          padding: 12px 28px;
          cursor: pointer;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.25s;
          box-shadow: 0 0 30px rgba(0,172,193,0.2);
        }
        .icon-toggle-btn.active {
          background: linear-gradient(135deg, #0288d1, #00acc1);
          box-shadow: 0 0 40px rgba(0,229,255,0.35);
        }
        .icon-toggle-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,172,193,0.4); }
        .toggle-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: background 0.2s;
        }
        .icon-toggle-btn.active .toggle-dot { background: var(--gold); }

        /* ── FILTERS ── */
        .filters-section {
          background: rgba(10,22,40,0.7);
          border-top: 1px solid var(--card-border);
          border-bottom: 1px solid var(--card-border);
          padding: 20px 24px;
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .filters-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .filter-group { display: flex; flex-direction: column; gap: 4px; }
        .filter-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-light); }
        select {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          color: white;
          padding: 8px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          outline: none;
          transition: border 0.2s;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff88' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 32px;
        }
        select:focus { border-color: var(--teal); }
        select option { background: #0d3b6e; }

        .price-slider-wrap { display: flex; flex-direction: column; gap: 4px; }
        .price-slider-row { display: flex; align-items: center; gap: 10px; }
        input[type=range] {
          -webkit-appearance: none;
          width: 140px;
          height: 4px;
          background: linear-gradient(to right, var(--teal), var(--sky));
          border-radius: 4px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: var(--gold);
          cursor: pointer;
        }
        .price-val { font-size: 13px; font-weight: 600; color: var(--gold); min-width: 60px; }

        .results-count {
          margin-left: auto;
          font-size: 13px;
          color: var(--text-light);
          white-space: nowrap;
        }
        .results-count strong { color: var(--teal); }

        /* ── GRID ── */
        .grid-section { max-width: 1280px; margin: 0 auto; padding: 36px 20px 80px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
        @media(max-width: 480px) { .grid { grid-template-columns: 1fr; } }

        .no-results {
          grid-column: 1/-1;
          text-align: center;
          padding: 80px 24px;
          color: var(--text-light);
          font-size: 18px;
        }

        /* ── CARD ── */
        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          backdrop-filter: blur(8px);
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
          border-color: rgba(0,172,193,0.3);
        }
        .card--open { border-color: var(--teal); }

        .card-img-wrap { position: relative; height: 210px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
        .card:hover .card-img { transform: scale(1.04); }

        .card-badge {
          position: absolute;
          top: 14px; left: 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 50px;
          color: white;
        }
        .card-ship-tag {
          position: absolute;
          bottom: 14px; left: 14px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 50px;
          color: var(--mint);
        }
        .card-discount-bubble {
          position: absolute;
          top: 14px; right: 14px;
          background: var(--coral);
          border-radius: 12px;
          padding: 6px 12px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(255,82,82,0.4);
          line-height: 1;
        }
        .discount-pct { display: block; font-size: 20px; font-weight: 800; color: white; }
        .discount-label { font-size: 8px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.8); }

        .card-body { padding: 20px; }
        .card-top-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 10px; }
        .card-nights { font-size: 11px; letter-spacing: 2px; color: var(--teal); text-transform: uppercase; margin-bottom: 4px; }
        .card-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; line-height: 1.25; max-width: 200px; }

        .card-price-block { text-align: right; flex-shrink: 0; }
        .price-from { display: block; font-size: 9px; letter-spacing: 2px; color: var(--text-light); text-transform: uppercase; }
        .price-big { display: block; font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900; color: var(--gold); line-height: 1.1; }
        .price-pp { font-size: 10px; color: var(--text-light); }

        .card-route {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-light);
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .route-from { color: white; font-weight: 500; }
        .route-arrow { color: var(--teal); }
        .route-to { color: rgba(255,255,255,0.7); }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 12px;
          color: var(--text-light);
        }
        .stars { color: var(--gold); font-size: 11px; letter-spacing: 1px; }

        .card-highlights { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .highlight-tag {
          font-size: 11px;
          background: rgba(0,172,193,0.12);
          border: 1px solid rgba(0,172,193,0.2);
          border-radius: 50px;
          padding: 3px 10px;
          color: var(--mint);
        }

        .card-toggle-btn {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          color: white;
          padding: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .card-toggle-btn:hover { background: rgba(0,172,193,0.15); border-color: var(--teal); }

        /* ── EXPANDED ── */
        .card-expanded { margin-top: 16px; }
        .cabin-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          margin-bottom: 12px;
          color: var(--mint);
        }

        .cabin-table { border: 1px solid var(--card-border); border-radius: 10px; overflow: hidden; margin-bottom: 16px; }
        .cabin-header, .cabin-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 9px 14px;
          font-size: 12px;
          gap: 8px;
          align-items: center;
        }
        .cabin-header {
          background: rgba(0,172,193,0.15);
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-light);
        }
        .cabin-row { border-top: 1px solid rgba(255,255,255,0.05); transition: background 0.15s; }
        .cabin-row:hover { background: rgba(255,255,255,0.04); }
        .cabin-type { font-weight: 500; color: white; }
        .cabin-was { color: var(--text-light); text-decoration: line-through; }
        .cabin-now { color: var(--gold); font-weight: 700; font-size: 13px; }
        .cabin-save {
          background: rgba(255,82,82,0.2);
          color: #ff7070;
          border-radius: 4px;
          padding: 2px 6px;
          font-weight: 700;
          font-size: 11px;
          text-align: center;
        }

        .book-btn {
          display: block;
          text-align: center;
          background: linear-gradient(135deg, var(--wave), var(--teal));
          color: white;
          text-decoration: none;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(2,136,209,0.3);
        }
        .book-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid var(--card-border);
          text-align: center;
          padding: 30px 24px;
          color: var(--text-light);
          font-size: 12px;
          line-height: 1.8;
        }
        .footer a { color: var(--teal); text-decoration: none; }
        .footer strong { color: white; }
      `}</style>

      {/* HERO */}
      <header className="hero">
        <p className="hero-eyebrow">⚓ Official Partner Deals · Updated Daily</p>
        <h1 className="hero-title">
          Royal Caribbean<br />
          <span>Cruise Deals</span>
        </h1>
        <p className="hero-sub">
          Exclusive discounts on Icon of the Seas and the full Royal Caribbean fleet — up to 45% off. Any departure, any destination.
        </p>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-number">{CRUISES.length}</span>
            <span className="stat-label">Live Deals</span>
          </div>
          <div className="stat-pill">
            <span className="stat-number">45%</span>
            <span className="stat-label">Max Discount</span>
          </div>
          <div className="stat-pill">
            <span className="stat-number">{fmt(minPrice(cheapestDeal))}</span>
            <span className="stat-label">Lowest Price</span>
          </div>
          <div className="stat-pill">
            <span className="stat-number">270+</span>
            <span className="stat-label">Destinations</span>
          </div>
        </div>

        {/* Top Deal Banners */}
        <div className="top-deals">
          <div className="top-deal-card">
            <div className="td-label">🔥 Cheapest Deal Right Now</div>
            <div className="td-deal">{cheapestDeal.itinerary}</div>
            <div className="td-meta">{cheapestDeal.ship} · {formatDate(cheapestDeal.departure)}</div>
            <div className="td-price">{fmt(minPrice(cheapestDeal))}<span style={{fontSize:12,fontWeight:400,opacity:.7}}>/pp</span></div>
          </div>
          <div className="top-deal-card">
            <div className="td-label">🏷️ Biggest Discount</div>
            <div className="td-deal">{biggestDiscount.itinerary}</div>
            <div className="td-meta">{biggestDiscount.ship} · {formatDate(biggestDiscount.departure)}</div>
            <div className="td-price">UP TO {maxDiscount(biggestDiscount)}% OFF</div>
          </div>
        </div>

        {/* Icon of the Seas Toggle */}
        <div className="icon-toggle-wrap">
          <button
            className={`icon-toggle-btn ${iconOnly ? "active" : ""}`}
            onClick={() => { setIconOnly(!iconOnly); setShipFilter("All Ships"); }}
          >
            <span className="toggle-dot" />
            🚢 Icon of the Seas Only
            {iconOnly && <span style={{background: "rgba(255,255,255,0.2)", borderRadius:50, padding:"2px 10px", fontSize:11}}>ACTIVE</span>}
          </button>
        </div>
      </header>

      {/* FILTERS */}
      <div className="filters-section">
        <div className="filters-inner">
          {!iconOnly && (
            <div className="filter-group">
              <span className="filter-label">Ship</span>
              <select value={shipFilter} onChange={e => setShipFilter(e.target.value)}>
                {SHIPS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div className="filter-group">
            <span className="filter-label">Destination</span>
            <select value={destFilter} onChange={e => setDestFilter(e.target.value)}>
              {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Duration</span>
            <select value={durationFilter} onChange={e => setDurationFilter(e.target.value)}>
              {DURATIONS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Sort By</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="discount">Biggest Discount</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date">Soonest Departure</option>
            </select>
          </div>
          <div className="price-slider-wrap">
            <span className="filter-label">Max Price / Person</span>
            <div className="price-slider-row">
              <input
                type="range" min="500" max="10000" step="100"
                value={priceRange}
                onChange={e => setPriceRange(+e.target.value)}
              />
              <span className="price-val">{fmt(priceRange)}</span>
            </div>
          </div>
          <span className="results-count"><strong>{filtered.length}</strong> deals found</span>
        </div>
      </div>

      {/* GRID */}
      <main className="grid-section">
        <div className="grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <p>No cruises match your filters.</p>
              <p style={{fontSize:14, marginTop:8}}>Try adjusting your price range or removing filters.</p>
            </div>
          ) : (
            filtered.map((cruise) => (
              <CruiseCard
                key={cruise.id}
                cruise={cruise}
                expanded={expandedId === cruise.id}
                onToggle={() => setExpandedId(expandedId === cruise.id ? null : cruise.id)}
              />
            ))
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p><strong>CruiseDeals.io</strong> — Independent price comparison for Royal Caribbean cruises</p>
        <p style={{marginTop:6}}>Prices shown are estimates based on publicly available data. Always verify on <a href="https://www.royalcaribbean.com" target="_blank" rel="noopener noreferrer">royalcaribbean.com</a> before booking.</p>
        <p style={{marginTop:6}}>All prices per person, double occupancy. Taxes & fees not included. Subject to availability.</p>
      </footer>
    </>
  );
}
