import { useState, useMemo } from "react";
import Head from "next/head";

// ─── CRUISE LINE REGISTRY ─────────────────────────────────────────────────────
const CRUISE_LINES = {
  "Royal Caribbean": {
    logo: "⚓",
    color: "#0055A5",
    accent: "#00AEEF",
    ships: [
      "Legend of the Seas","Star of the Seas","Icon of the Seas",
      "Utopia of the Seas","Wonder of the Seas","Symphony of the Seas",
      "Harmony of the Seas","Allure of the Seas","Oasis of the Seas",
      "Independence of the Seas"
    ]
  }
};

// ─── SHIP REGISTRY ────────────────────────────────────────────────────────────
const SHIPS_INFO = {
  "Legend of the Seas": {
    year:2026, tonnage:253000, passengers:5610, class:"Icon Class",
    overall:4.9, food:4.9, service:4.9, entertainment:5.0, value:4.8, cleanliness:5.0,
    reviewCount:312, newShip:true,
    foodHighlights:["Royal Railway Dining (Silk Routes)","Supper Club – Hollywood Golden Age","Charlie & Chocolate Factory Venue","El Loco Fresh Tex-Mex","Hooked Seafood","Crown's Edge Bar"],
    reviewSummary:"Royal Caribbean's newest and third Icon Class ship. Guests rave about the brand-new Royal Railway immersive dinner experience and the Roald Dahl Charlie & the Chocolate Factory musical. Dining is next-level with the Hollywood-themed Supper Club.",
    awards:["NEW 2026","Best Dining Innovation","Best Entertainment 2026"],
    image:"https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=80",
  },
  "Star of the Seas": {
    year:2025, tonnage:250800, passengers:7600, class:"Icon Class",
    overall:4.9, food:4.8, service:4.9, entertainment:5.0, value:4.8, cleanliness:4.9,
    reviewCount:1840, newShip:true,
    foodHighlights:["Giovanni's Italian Kitchen","Hooked Seafood","Sugar Beach Ice Cream","El Loco Fresh","The Lime & Coconut Bar","Coastal Kitchen (Suite Guests)"],
    reviewSummary:"The second Icon Class ship launched in 2025. Guests say it refines everything Icon of the Seas perfected — larger waterpark, improved Surfside family neighborhood, and standout dining across 40+ venues. Families give it near-perfect scores.",
    awards:["LAUNCHED 2025","Best Family Ship 2025","Best Waterpark at Sea"],
    image:"https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=900&q=80",
  },
  "Icon of the Seas": {
    year:2024, tonnage:250800, passengers:7600, class:"Icon Class",
    overall:4.9, food:4.8, service:4.9, entertainment:5.0, value:4.7, cleanliness:4.9,
    reviewCount:5812,
    foodHighlights:["Giovanni's Italian Kitchen","Hooked Seafood","AquaDome Market","El Loco Fresh","Playmakers Sports Bar","Coastal Kitchen (Suite)"],
    reviewSummary:"The world's largest ship. Guests are blown away by the sheer scale — Cat6 waterpark, AquaDome, 7 pools. Food quality praised across 40+ venues. The pioneer of the Icon Class experience.",
    awards:["World's Largest Ship","Best New Ship 2024","Best Entertainment"],
    image:"https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=80",
  },
  "Utopia of the Seas": {
    year:2024, tonnage:236857, passengers:7000, class:"Oasis Class",
    overall:4.8, food:4.7, service:4.8, entertainment:4.8, value:4.9, cleanliness:4.9,
    reviewCount:2231,
    foodHighlights:["Hooked Seafood","Giovanni's Italian","El Loco Fresh","Chops Grille","Playmakers Bar","Izumi Sushi"],
    reviewSummary:"Built for short weekend getaways. Incredible value on 3–4 night Bahamas sailings. Food rivals Icon at a lower price point. Guests love the party atmosphere and CocoCay access on every sailing.",
    awards:["Best Value Ship 2024","Best Short Cruise","Best Weekend Ship"],
    image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
  },
  "Wonder of the Seas": {
    year:2022, tonnage:236857, passengers:6988, class:"Oasis Class",
    overall:4.8, food:4.7, service:4.8, entertainment:4.9, value:4.6, cleanliness:4.8,
    reviewCount:4102,
    foodHighlights:["Wonderland","Hooked Seafood","Jamie's Italian","El Loco Fresh","Park Café","The Grove"],
    reviewSummary:"8 distinct neighborhoods including exclusive Wonder Playhouse. Wonderland restaurant gets near-perfect ratings for creativity. Guests call the AquaTheater shows the best on any ship.",
    awards:["Best Large Ship 2022","Best Entertainment","Best Architecture at Sea"],
    image:"https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=900&q=80",
  },
  "Symphony of the Seas": {
    year:2018, tonnage:228081, passengers:6680, class:"Oasis Class",
    overall:4.7, food:4.6, service:4.7, entertainment:4.8, value:4.6, cleanliness:4.7,
    reviewCount:7243,
    foodHighlights:["Wonderland","Hooked Seafood","150 Central Park","Chops Grille","El Loco Fresh","Izumi Hibachi"],
    reviewSummary:"Broadway-quality shows and Perfect Storm waterslides dominate guest reviews. Wonderland restaurant is a fan favorite. Service scores are among the highest in the entire Royal fleet.",
    awards:["Best Entertainment 2019","Best Service","Best Broadway Shows"],
    image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
  },
  "Harmony of the Seas": {
    year:2016, tonnage:226963, passengers:6410, class:"Oasis Class",
    overall:4.7, food:4.5, service:4.6, entertainment:4.7, value:4.7, cleanliness:4.6,
    reviewCount:8914,
    foodHighlights:["150 Central Park","Wonderland","Chops Grille","Sabor Taqueria","Izumi","The Lime & Coconut"],
    reviewSummary:"Best ship for families with young children. Kids programs earn perfect scores. The Lime & Coconut pool bar is a guest favorite. Wonderland restaurant steals the dining spotlight.",
    awards:["Best Family Ship 2017","Best Kids Program","Best Pool Bar"],
    image:"https://images.unsplash.com/photo-1517823382935-51bfcb0ec6d3?w=900&q=80",
  },
  "Allure of the Seas": {
    year:2010, tonnage:225282, passengers:6318, class:"Oasis Class",
    overall:4.6, food:4.5, service:4.6, entertainment:4.7, value:4.5, cleanliness:4.5,
    reviewCount:11204,
    foodHighlights:["150 Central Park","Chops Grille","Izumi Sushi","Vintages Wine Bar","Samba Grill","Park Café"],
    reviewSummary:"The classic that still delivers. Central Park at sea remains magical after 14 years. 150 Central Park voted best specialty restaurant on any Royal Caribbean ship in multiple years.",
    awards:["Classic Favorite","Most Reviews 2023","Best Specialty Dining"],
    image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80",
  },
  "Oasis of the Seas": {
    year:2009, tonnage:225282, passengers:6296, class:"Oasis Class",
    overall:4.5, food:4.4, service:4.5, entertainment:4.6, value:4.7, cleanliness:4.4,
    reviewCount:13871,
    foodHighlights:["150 Central Park","Chops Grille","Sabor Taqueria","Izumi Sushi","Giovanni's","Park Café"],
    reviewSummary:"The original revolutionary cruise ship. 15 years on and still impressing. Budget-friendly fares with great specialty dining. Most reviewed ship in the fleet — proof of loyal fans.",
    awards:["Most Reviewed Ship","Best Value Veteran","Pioneer Award"],
    image:"https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=900&q=80",
  },
  "Independence of the Seas": {
    year:2008, tonnage:154407, passengers:3634, class:"Freedom Class",
    overall:4.3, food:4.2, service:4.4, entertainment:4.3, value:4.8, cleanliness:4.3,
    reviewCount:9340,
    foodHighlights:["Chops Grille","Giovanni's Italian","Izumi Sushi","Windjammer Buffet","Portside BBQ","Café Promenade"],
    reviewSummary:"Best value in the fleet. Classic ship with loyal following. Perfect for Alaska itineraries where size works in its favor. Chops Grille reviews are consistently exceptional.",
    awards:["Best Budget Pick","Best Alaska Ship","Best Classic Value"],
    image:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80",
  },
};

// ─── CABIN REVIEW DATA ────────────────────────────────────────────────────────
const CABIN_REVIEWS = {
  "Interior":              { comfort:3.8, cleanliness:4.6, size:2.8, value:4.8, reviewCount:15400, summary:"Compact but smart. Guests say it's perfect for those who spend most time exploring the ship and ashore. Best value cabin on any ship." },
  "Ocean View":            { comfort:4.0, cleanliness:4.7, size:3.3, value:4.5, reviewCount:7820,  summary:"Natural light is a game-changer. Most popular with couples on port-intensive itineraries. Sweet spot between budget and comfort." },
  "Balcony":               { comfort:4.4, cleanliness:4.7, size:3.8, value:4.3, reviewCount:21900, summary:"Most-reviewed cabin by far. Morning coffee with ocean views universally praised. Guests say private balcony is worth every extra dollar." },
  "Junior Suite":          { comfort:4.6, cleanliness:4.8, size:4.4, value:4.1, reviewCount:6320,  summary:"Excellent space upgrade. Families love the extra room. Priority boarding and soaking tub consistently praised. Great for longer voyages." },
  "Suite":                 { comfort:4.7, cleanliness:4.9, size:4.5, value:4.0, reviewCount:3100,  summary:"Outstanding experience. Suite Lounge access is a game-changer. Butler service exceeds expectations across all ships." },
  "Royal Suite":           { comfort:4.9, cleanliness:5.0, size:4.9, value:3.9, reviewCount:1190,  summary:"Hotel-quality experience at sea. Multi-room layout and private dining get near-perfect scores. Guests say it's worth every penny." },
  "Grand Suite":           { comfort:4.8, cleanliness:4.9, size:4.7, value:3.9, reviewCount:960,   summary:"Grand piano and private jacuzzi consistently praised. Butler attentiveness earns 5-star ratings. Best suite value on Oasis Class." },
  "Sky Suite":             { comfort:4.9, cleanliness:5.0, size:4.8, value:3.9, reviewCount:640,   summary:"Sky-high panoramic views steal the show. Priority access to all venues praised. Guests say high-deck location is unmatched on sea days." },
  "Icon Loft Suite":       { comfort:5.0, cleanliness:5.0, size:4.9, value:4.0, reviewCount:412,   summary:"Exclusive to Icon Class. Two-deck loft with floor-to-ceiling windows gets perfect scores. VIP lounge access is the ultimate perk." },
  "Owner's Suite":         { comfort:4.9, cleanliness:5.0, size:4.9, value:3.8, reviewCount:520,   summary:"Wraparound balcony is the highlight. Grand piano and jacuzzi combo is unforgettable. Butler and concierge service earn rave reviews." },
  "Ultimate Family Suite": { comfort:4.8, cleanliness:4.9, size:5.0, value:4.2, reviewCount:315,   summary:"Holy grail for families. Private slide and whirlpool score perfect from kids and parents. Concierge service makes it truly special." },
  "Ultimate Family Townhouse": { comfort:4.9, cleanliness:5.0, size:5.0, value:4.1, reviewCount:118, summary:"Brand new on Legend of the Seas — three-story townhouse layout wows every guest. Unmatched space and privacy for large families." },
};

// ─── COUNTRY DATA ─────────────────────────────────────────────────────────────
const COUNTRY_DATA = {
  "🇺🇸 United States":      { flag:"🇺🇸", info:"Major departure hubs — Miami, Fort Lauderdale, Port Canaveral, Seattle, San Diego.", ports:["Miami, FL","Fort Lauderdale, FL","Port Canaveral, FL","Seattle, WA","San Diego, CA"] },
  "🇧🇸 Bahamas":            { flag:"🇧🇸", info:"Crystal waters, white sand, and CocoCay Royal Beach Club private island.", ports:["Nassau","CocoCay","Royal Beach Club"] },
  "🇲🇽 Mexico":             { flag:"🇲🇽", info:"Ancient Maya ruins, turquoise reefs, Royal Beach Club Cozumel opening Dec 2026.", ports:["Cozumel","Costa Maya","Ensenada"] },
  "🇵🇷 Puerto Rico":        { flag:"🇵🇷", info:"Historic Old San Juan, El Morro fortress, and tropical beaches.", ports:["San Juan"] },
  "🇸🇽 St. Maarten":        { flag:"🇸🇽", info:"Half French, half Dutch island — beaches and duty-free shopping.", ports:["St. Maarten"] },
  "🇻🇮 St. Thomas":         { flag:"🇻🇮", info:"US Virgin Islands with world-class snorkeling and shopping.", ports:["St. Thomas"] },
  "🇭🇳 Honduras":           { flag:"🇭🇳", info:"Second-largest barrier reef, zip lines, world-class diving.", ports:["Roatán"] },
  "🇯🇲 Jamaica":            { flag:"🇯🇲", info:"Reggae vibes, Dunn's River Falls, and incredible jerk cuisine.", ports:["Falmouth"] },
  "🇰🇳 St. Kitts":          { flag:"🇰🇳", info:"Brimstone Hill Fortress, rainforest hikes, pristine beaches.", ports:["St. Kitts"] },
  "🇩🇴 Dominican Republic": { flag:"🇩🇴", info:"Amber Coast, merengue music, lush tropical landscapes.", ports:["Puerto Plata"] },
  "🇪🇸 Spain":              { flag:"🇪🇸", info:"Gaudí architecture, tapas, and Balearic island beaches.", ports:["Barcelona","Palma"] },
  "🇮🇹 Italy":              { flag:"🇮🇹", info:"Colosseum, Amalfi Coast, Tuscan hills, world-class cuisine.", ports:["Naples","Rome (Civitavecchia)","Florence/Pisa (Livorno)"] },
  "🇫🇷 France":             { flag:"🇫🇷", info:"Calanques National Park, Provence lavender fields, French Riviera.", ports:["Marseille"] },
  "🇬🇷 Greece":             { flag:"🇬🇷", info:"Santorini sunsets, Acropolis, and the stunning Aegean islands.", ports:["Athens (Piraeus)","Santorini","Mykonos"] },
  "🇭🇷 Croatia":            { flag:"🇭🇷", info:"Dubrovnik's old town, crystal Adriatic waters, and island hopping.", ports:["Dubrovnik","Split"] },
  "🏔️ Alaska (US)":         { flag:"🏔️", info:"Glaciers, bald eagles, whale watching, and dog sledding.", ports:["Juneau","Skagway","Ketchikan","Glacier Bay"] },
};

// ─── CRUISE DATA ──────────────────────────────────────────────────────────────
const CRUISES = [
  { id:1, ship:"Legend of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Western Mediterranean", from:"Barcelona, Spain",
    countries:["🇪🇸 Spain","🇮🇹 Italy","🇫🇷 France","🇬🇷 Greece"],
    ports:["Barcelona","Palma","Naples","Rome (Civitavecchia)","Marseille","Athens (Piraeus)"],
    departure:"2026-07-11", nights:7,
    image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    badge:"NEW SHIP 2026", badgeColor:"#9B30FF",
    highlights:["Royal Railway Dinner Show","Charlie & Chocolate Factory Musical","Supper Club – Golden Age of Hollywood","Crown's Edge Thrill Ride"],
    cabins:[
      {type:"Interior",             originalPrice:1599, salePrice:999,  discount:38, sqft:150,  stars:2, features:["2 twin or 1 king","Smart TV","Private bathroom","No window"]},
      {type:"Ocean View",           originalPrice:1899, salePrice:1249, discount:34, sqft:180,  stars:3, features:["Ocean window","Natural daylight","Work desk","2 twin or 1 king"]},
      {type:"Balcony",              originalPrice:2299, salePrice:1599, discount:30, sqft:210,  stars:3, features:["Private balcony","Mediterranean views","Outdoor seating","Sea breeze"]},
      {type:"Junior Suite",         originalPrice:4199, salePrice:2899, discount:31, sqft:350,  stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
      {type:"Ultimate Family Townhouse",originalPrice:18999,salePrice:12999,discount:32,sqft:2100,stars:5,features:["3-story townhouse","Private slide","6 bedrooms","Butler service","Rooftop terrace"]},
    ],
  },
  { id:2, ship:"Legend of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Eastern Caribbean", from:"Fort Lauderdale, FL",
    countries:["🇺🇸 United States","🇸🇽 St. Maarten","🇻🇮 St. Thomas","🇰🇳 St. Kitts","🇧🇸 Bahamas"],
    ports:["Fort Lauderdale, FL","St. Maarten","St. Thomas","St. Kitts","CocoCay"],
    departure:"2026-11-09", nights:7,
    image:"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    badge:"NEW 2026 · FIRST US SAIL", badgeColor:"#9B30FF",
    highlights:["Royal Railway – Legend Station","Silk Routes Dining Experience","Crown's Edge Ropes Course","AquaDome Shows","Surfside Family Neighborhood"],
    cabins:[
      {type:"Interior",         originalPrice:1499, salePrice:899,  discount:40, sqft:150,  stars:2, features:["2 twin or 1 king","Smart TV","Private bathroom","No window"]},
      {type:"Ocean View",       originalPrice:1799, salePrice:1099, discount:39, sqft:180,  stars:3, features:["Ocean window","Natural daylight","Work desk","2 twin or 1 king"]},
      {type:"Balcony",          originalPrice:2199, salePrice:1449, discount:34, sqft:210,  stars:3, features:["Private balcony","Caribbean views","Outdoor seating","Sea breeze"]},
      {type:"Junior Suite",     originalPrice:3999, salePrice:2699, discount:33, sqft:350,  stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
      {type:"Icon Loft Suite",  originalPrice:13999,salePrice:9499, discount:32, sqft:1300, stars:5, features:["Two-deck loft","Floor-to-ceiling windows","Rain shower","VIP lounge"]},
    ],
  },
  { id:3, ship:"Star of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Eastern Caribbean & CocoCay", from:"Port Canaveral, FL",
    countries:["🇺🇸 United States","🇵🇷 Puerto Rico","🇸🇽 St. Maarten","🇻🇮 St. Thomas","🇧🇸 Bahamas"],
    ports:["Port Canaveral, FL","San Juan","St. Maarten","St. Thomas","CocoCay"],
    departure:"2026-04-04", nights:7,
    image:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    badge:"2025 ICON CLASS", badgeColor:"#FF4B4B",
    highlights:["6 Record-Breaking Waterslides","Surfside Family Neighborhood","17 Complimentary Dining Spots","Perfect Day at CocoCay Every Sail"],
    cabins:[
      {type:"Interior",     originalPrice:1299, salePrice:799,  discount:38, sqft:150,  stars:2, features:["2 twin or 1 king","Private bathroom","Smart TV","No window"]},
      {type:"Ocean View",   originalPrice:1599, salePrice:999,  discount:38, sqft:180,  stars:3, features:["Ocean window","Natural daylight","Work desk","2 twin or 1 king"]},
      {type:"Balcony",      originalPrice:1999, salePrice:1349, discount:33, sqft:210,  stars:3, features:["Private balcony","Outdoor seating","Sea breeze","Panoramic views"]},
      {type:"Junior Suite", originalPrice:3799, salePrice:2499, discount:34, sqft:350,  stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
      {type:"Royal Suite",  originalPrice:9499, salePrice:6299, discount:34, sqft:1574, stars:5, features:["Multi-room suite","Butler service","Private dining","Exclusive lounge"]},
    ],
  },
  { id:4, ship:"Star of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Western Caribbean & CocoCay", from:"Port Canaveral, FL",
    countries:["🇺🇸 United States","🇲🇽 Mexico","🇭🇳 Honduras","🇧🇸 Bahamas"],
    ports:["Port Canaveral, FL","Cozumel","Costa Maya","Roatán","CocoCay"],
    departure:"2026-06-13", nights:7,
    image:"https://images.unsplash.com/photo-1517823382935-51bfcb0ec6d3?w=800&q=80",
    badge:"HOT DEAL", badgeColor:"#FF4B4B",
    highlights:["Largest Waterpark at Sea","Maya Ruins Day Trip","Perfect Day at CocoCay","AquaDome Entertainment"],
    cabins:[
      {type:"Interior",             originalPrice:1199, salePrice:749,  discount:38, sqft:150,  stars:2, features:["2 twin or 1 king","Private bathroom","Smart TV","No window"]},
      {type:"Ocean View",           originalPrice:1499, salePrice:949,  discount:37, sqft:180,  stars:3, features:["Ocean window","Natural daylight","Work desk","2 twin or 1 king"]},
      {type:"Balcony",              originalPrice:1899, salePrice:1299, discount:32, sqft:210,  stars:3, features:["Private balcony","Outdoor seating","Sea breeze","Panoramic views"]},
      {type:"Junior Suite",         originalPrice:3599, salePrice:2399, discount:33, sqft:350,  stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
      {type:"Ultimate Family Suite",originalPrice:15999,salePrice:10499,discount:34, sqft:1823, stars:5, features:["2-story suite","Slide & whirlpool","4 bedrooms","Dedicated concierge"]},
    ],
  },
  { id:5, ship:"Icon of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Eastern Caribbean & CocoCay", from:"Miami, FL",
    countries:["🇺🇸 United States","🇸🇽 St. Maarten","🇻🇮 St. Thomas","🇩🇴 Dominican Republic","🇧🇸 Bahamas"],
    ports:["Miami, FL","St. Maarten","St. Thomas","Puerto Plata","CocoCay"],
    departure:"2026-04-11", nights:7,
    image:"https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    badge:"HOT DEAL", badgeColor:"#FF8C00",
    highlights:["Cat6 Waterpark","7 Pools","40+ Dining Venues","AquaDome Shows"],
    cabins:[
      {type:"Interior",     originalPrice:1199, salePrice:699,  discount:42, sqft:150,  stars:2, features:["2 twin or 1 king","Private bathroom","Smart TV","No window"]},
      {type:"Ocean View",   originalPrice:1499, salePrice:949,  discount:37, sqft:180,  stars:3, features:["Ocean window","Natural daylight","2 twin or 1 king","Work desk"]},
      {type:"Balcony",      originalPrice:1899, salePrice:1299, discount:32, sqft:210,  stars:3, features:["Private balcony","Outdoor seating","Sea breeze","Panoramic views"]},
      {type:"Junior Suite", originalPrice:3499, salePrice:2299, discount:34, sqft:350,  stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
      {type:"Royal Suite",  originalPrice:8999, salePrice:5999, discount:33, sqft:1574, stars:5, features:["Multi-room suite","Butler service","Private dining","Exclusive lounge"]},
    ],
  },
  { id:6, ship:"Icon of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Western Caribbean & CocoCay", from:"Miami, FL",
    countries:["🇺🇸 United States","🇭🇳 Honduras","🇲🇽 Mexico","🇧🇸 Bahamas"],
    ports:["Miami, FL","Roatán","Cozumel","Costa Maya","CocoCay"],
    departure:"2026-05-02", nights:7,
    image:"https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
    badge:"BEST SELLER", badgeColor:"#00A86B",
    highlights:["Maya Ruins in Cozumel","Jungle Adventures Roatán","CocoCay Private Island","Crown Edge Thrill Ride"],
    cabins:[
      {type:"Interior",       originalPrice:1099, salePrice:749,  discount:32, sqft:150,  stars:2, features:["2 twin or 1 king","Private bathroom","Smart TV","No window"]},
      {type:"Ocean View",     originalPrice:1399, salePrice:999,  discount:29, sqft:180,  stars:3, features:["Ocean window","Natural daylight","2 twin or 1 king","Work desk"]},
      {type:"Balcony",        originalPrice:1799, salePrice:1399, discount:22, sqft:210,  stars:3, features:["Private balcony","Outdoor seating","Sea breeze","Panoramic views"]},
      {type:"Junior Suite",   originalPrice:3299, salePrice:2499, discount:24, sqft:350,  stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
      {type:"Icon Loft Suite",originalPrice:11999,salePrice:7999, discount:33, sqft:1300, stars:5, features:["Two-deck loft","Floor-to-ceiling windows","Rain shower","VIP lounge"]},
    ],
  },
  { id:7, ship:"Utopia of the Seas", line:"Royal Caribbean",
    itinerary:"3-Night Bahamas Weekend", from:"Port Canaveral, FL",
    countries:["🇺🇸 United States","🇧🇸 Bahamas"],
    ports:["Port Canaveral, FL","Nassau","CocoCay"],
    departure:"2026-04-30", nights:3,
    image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    badge:"WEEKEND GETAWAY", badgeColor:"#FF4B4B",
    highlights:["Perfect Weekend Escape","CocoCay Private Island","Silent Disco","Party Atmosphere"],
    cabins:[
      {type:"Interior",  originalPrice:599,  salePrice:329,  discount:45, sqft:148, stars:2, features:["2 twin or 1 king","Private bathroom","Smart TV","No window"]},
      {type:"Ocean View",originalPrice:749,  salePrice:449,  discount:40, sqft:175, stars:3, features:["Ocean window","Blackout curtains","Natural light","Work desk"]},
      {type:"Balcony",   originalPrice:999,  salePrice:649,  discount:35, sqft:205, stars:3, features:["Private balcony","Hammock chair","Outdoor seating","Sunset views"]},
      {type:"Suite",     originalPrice:1999, salePrice:1299, discount:35, sqft:380, stars:4, features:["Wraparound balcony","Living room","Priority boarding","Concierge desk"]},
    ],
  },
  { id:8, ship:"Utopia of the Seas", line:"Royal Caribbean",
    itinerary:"4-Night Bahamas & Perfect Day", from:"Port Canaveral, FL",
    countries:["🇺🇸 United States","🇧🇸 Bahamas"],
    ports:["Port Canaveral, FL","Nassau","Royal Beach Club","CocoCay"],
    departure:"2026-05-21", nights:4,
    image:"https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
    badge:"FLASH SALE", badgeColor:"#9B30FF",
    highlights:["Royal Beach Club Nassau","CocoCay Hideaway Beach","Playmakers Bar","Silent Disco Night"],
    cabins:[
      {type:"Interior",  originalPrice:699,  salePrice:399,  discount:43, sqft:148, stars:2, features:["2 twin or 1 king","Private bathroom","Smart TV","No window"]},
      {type:"Ocean View",originalPrice:899,  salePrice:549,  discount:39, sqft:175, stars:3, features:["Ocean window","Natural light","Work desk","Blackout curtains"]},
      {type:"Balcony",   originalPrice:1199, salePrice:749,  discount:38, sqft:205, stars:3, features:["Private balcony","Sunset views","Outdoor seating","Sea breeze"]},
      {type:"Suite",     originalPrice:2299, salePrice:1499, discount:35, sqft:380, stars:4, features:["Wraparound balcony","Butler service","Priority boarding","Concierge"]},
    ],
  },
  { id:9, ship:"Wonder of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Western Caribbean", from:"Port Canaveral, FL",
    countries:["🇺🇸 United States","🇲🇽 Mexico","🇭🇳 Honduras","🇧🇸 Bahamas"],
    ports:["Port Canaveral, FL","Cozumel","Roatán","Costa Maya","CocoCay"],
    departure:"2026-04-18", nights:7,
    image:"https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=800&q=80",
    badge:"SALE", badgeColor:"#FF8C00",
    highlights:["Central Park Neighborhood","Ultimate Abyss Slide","Aquatheater","Surfing Simulator"],
    cabins:[
      {type:"Interior",     originalPrice:999,  salePrice:599,  discount:40, sqft:152, stars:2, features:["2 twin or 1 king","Private bathroom","Vanity","No window"]},
      {type:"Ocean View",   originalPrice:1199, salePrice:799,  discount:33, sqft:179, stars:3, features:["Ocean window","Sitting area","Natural light","Work desk"]},
      {type:"Balcony",      originalPrice:1599, salePrice:1099, discount:31, sqft:202, stars:3, features:["Private balcony","Floor-to-ceiling glass","Sea breeze","2 twin or 1 king"]},
      {type:"Junior Suite", originalPrice:2999, salePrice:1999, discount:33, sqft:340, stars:4, features:["Large balcony","Separate lounge","Priority check-in","Soaking tub"]},
    ],
  },
  { id:10, ship:"Symphony of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Western Caribbean", from:"Miami, FL",
    countries:["🇺🇸 United States","🇯🇲 Jamaica","🇲🇽 Mexico","🇧🇸 Bahamas"],
    ports:["Miami, FL","Falmouth","Cozumel","Costa Maya","CocoCay"],
    departure:"2026-07-11", nights:7,
    image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    badge:"SUMMER SAVINGS", badgeColor:"#9B30FF",
    highlights:["Broadway Shows","Jamaica Excursions","The Perfect Storm Slides","Wonderland Dining"],
    cabins:[
      {type:"Interior",  originalPrice:1199, salePrice:699,  discount:42, sqft:152, stars:2, features:["2 twin or 1 king","Private bathroom","TV & safe","No window"]},
      {type:"Ocean View",originalPrice:1399, salePrice:899,  discount:36, sqft:179, stars:3, features:["Ocean-facing window","Natural daylight","Private bathroom","Work desk"]},
      {type:"Balcony",   originalPrice:1799, salePrice:1199, discount:33, sqft:202, stars:3, features:["Private balcony","Outdoor seating","Sea views","2 twin or 1 king"]},
      {type:"Sky Suite", originalPrice:5499, salePrice:3699, discount:33, sqft:722, stars:5, features:["Sky-high panoramic views","Butler & concierge","Luxury bedding","Priority all venues"]},
    ],
  },
  { id:11, ship:"Harmony of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Eastern Caribbean", from:"Port Canaveral, FL",
    countries:["🇺🇸 United States","🇵🇷 Puerto Rico","🇸🇽 St. Maarten","🇧🇸 Bahamas"],
    ports:["Port Canaveral, FL","San Juan","St. Maarten","CocoCay"],
    departure:"2026-09-05", nights:7,
    image:"https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    badge:"FALL DEAL", badgeColor:"#FF8C00",
    highlights:["Ultimate Abyss Slide","Royal Theater","Splashaway Bay Kids","The Lime & Coconut Bar"],
    cabins:[
      {type:"Interior",     originalPrice:1049, salePrice:599,  discount:43, sqft:150, stars:2, features:["2 twin or 1 king","Private bathroom","TV & safe","No window"]},
      {type:"Ocean View",   originalPrice:1249, salePrice:799,  discount:36, sqft:180, stars:3, features:["Ocean window","Natural daylight","2 twin or 1 king","Private bathroom"]},
      {type:"Balcony",      originalPrice:1649, salePrice:1099, discount:33, sqft:202, stars:3, features:["Private balcony","Outdoor furniture","2 twin or 1 king","Ocean views"]},
      {type:"Junior Suite", originalPrice:3099, salePrice:2099, discount:32, sqft:345, stars:4, features:["Large balcony","Separate lounge","Priority boarding","Soaking tub"]},
    ],
  },
  { id:12, ship:"Allure of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Mediterranean", from:"Barcelona, Spain",
    countries:["🇪🇸 Spain","🇮🇹 Italy","🇫🇷 France","🇭🇷 Croatia"],
    ports:["Barcelona","Palma","Naples","Rome (Civitavecchia)","Florence/Pisa (Livorno)","Marseille"],
    departure:"2026-06-06", nights:7,
    image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    badge:"EUROPE SPECIAL", badgeColor:"#1E40AF",
    highlights:["Roman Colosseum Day Trip","Barcelona Gothic Quarter","Amalfi Coast Views","150 Central Park Restaurant"],
    cabins:[
      {type:"Interior",     originalPrice:1399, salePrice:849,  discount:39, sqft:150, stars:2, features:["2 twin or 1 king","Private bathroom","European outlets","No window"]},
      {type:"Ocean View",   originalPrice:1699, salePrice:1099, discount:35, sqft:180, stars:3, features:["Porthole/window","Natural daylight","2 twin or 1 king","Private bathroom"]},
      {type:"Balcony",      originalPrice:2199, salePrice:1499, discount:32, sqft:212, stars:3, features:["Private balcony","Mediterranean views","Sitting area","2 twin or 1 king"]},
      {type:"Junior Suite", originalPrice:4199, salePrice:2799, discount:33, sqft:360, stars:4, features:["Large balcony","Separate lounge","Priority embarkation","Luxury amenities"]},
    ],
  },
  { id:13, ship:"Independence of the Seas", line:"Royal Caribbean",
    itinerary:"7-Night Alaska Glacier Discovery", from:"Seattle, WA",
    countries:["🇺🇸 United States","🏔️ Alaska (US)"],
    ports:["Seattle, WA","Juneau","Skagway","Glacier Bay","Ketchikan"],
    departure:"2026-07-25", nights:7,
    image:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    badge:"ALASKA ADVENTURE", badgeColor:"#0099CC",
    highlights:["Glacier Bay National Park","Dog Sledding Skagway","Whale Watching","Bald Eagle Spotting"],
    cabins:[
      {type:"Interior",     originalPrice:1499, salePrice:949,  discount:37, sqft:152, stars:2, features:["2 twin or 1 king","Private bathroom","Blackout curtains","No window"]},
      {type:"Ocean View",   originalPrice:1799, salePrice:1199, discount:33, sqft:179, stars:3, features:["Glacier-view window","Natural daylight","2 twin or 1 king","Private bathroom"]},
      {type:"Balcony",      originalPrice:2299, salePrice:1649, discount:28, sqft:202, stars:3, features:["Private balcony","Glacier panorama","Binoculars included","Outdoor seating"]},
      {type:"Junior Suite", originalPrice:3999, salePrice:2799, discount:30, sqft:350, stars:4, features:["Large balcony","Separate area","Priority boarding","Soaking tub"]},
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt      = n => `$${n.toLocaleString()}`;
const minPrice = c => Math.min(...c.cabins.map(x => x.salePrice));
const maxDisc  = c => Math.max(...c.cabins.map(x => x.discount));
const fmtDate  = s => new Date(s).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const rColor   = r => r >= 4.7 ? "#2D7A5F" : r >= 4.4 ? "#D97757" : r >= 4.0 ? "#C4613E" : "#C0392B";

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ count, max=5, size=13 }) {
  return (
    <span style={{ fontSize:size, letterSpacing:.5, lineHeight:1 }}>
      {Array.from({length:max},(_,i) => (
        <span key={i} style={{ color: i < Math.round(count) ? "#D97757" : "#E0D9CF" }}>★</span>
      ))}
    </span>
  );
}

function RatingBar({ label, value }) {
  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
        <span style={{ fontSize:11, color:"#4A4640" }}>{label}</span>
        <span style={{ fontSize:12, fontWeight:700, color:rColor(value) }}>{value.toFixed(1)}</span>
      </div>
      <div style={{ height:5, background:"#E8E2D8", borderRadius:4, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${(value/5)*100}%`, background:rColor(value), borderRadius:4, transition:"width .5s ease" }}/>
      </div>
    </div>
  );
}

// ─── CASCADING FILTER COMPONENT ───────────────────────────────────────────────
function CascadeFilter({ selLine, selShip, onLineChange, onShipChange }) {
  const lineKeys = Object.keys(CRUISE_LINES);

  // Ships available for selected line
  const availableShips = selLine && selLine !== "All Lines"
    ? CRUISE_LINES[selLine].ships
    : [];

  return (
    <div className="cascade-wrap">
      <div className="cascade-row">
        {/* ── STEP 1: Cruise Line dropdown ── */}
        <div className="cascade-field">
          <label className="cascade-label">
            <span className="cascade-step-badge">1</span>
            Cruise Company
          </label>
          <div className="cascade-select-wrap">
            <select
              className="cascade-select"
              value={selLine}
              onChange={e => { onLineChange(e.target.value); onShipChange("All Ships"); }}
            >
              <option value="All Lines">— All Cruise Lines —</option>
              {lineKeys.map(name => (
                <option key={name} value={name}>
                  {CRUISE_LINES[name].logo} {name}
                </option>
              ))}
            </select>
            <span className="cascade-chevron">▾</span>
          </div>
          {selLine !== "All Lines" && (
            <div className="cascade-selected-badge" style={{ background: CRUISE_LINES[selLine]?.color }}>
              {CRUISE_LINES[selLine]?.logo} {selLine}
            </div>
          )}
        </div>

        {/* ── Arrow connector ── */}
        <div className={`cascade-arrow${selLine !== "All Lines" ? " cascade-arrow--active" : ""}`}>→</div>

        {/* ── STEP 2: Ship dropdown (only enabled after line selected) ── */}
        <div className="cascade-field">
          <label className="cascade-label">
            <span className="cascade-step-badge" style={{ opacity: selLine === "All Lines" ? .4 : 1 }}>2</span>
            Ship Model
          </label>
          <div className="cascade-select-wrap">
            <select
              className="cascade-select"
              value={selShip}
              disabled={selLine === "All Lines"}
              onChange={e => onShipChange(e.target.value)}
              style={{ opacity: selLine === "All Lines" ? .45 : 1, cursor: selLine === "All Lines" ? "not-allowed" : "pointer" }}
            >
              <option value="All Ships">
                {selLine === "All Lines" ? "— Select a company first —" : `— All ${selLine} Ships —`}
              </option>
              {availableShips.map(name => {
                const si = SHIPS_INFO[name];
                return (
                  <option key={name} value={name}>
                    {si?.newShip ? `★ ${name} (${si.year})` : name}
                  </option>
                );
              })}
            </select>
            <span className="cascade-chevron" style={{ opacity: selLine === "All Lines" ? .3 : 1 }}>▾</span>
          </div>
          {selShip !== "All Ships" && (
            <div className="cascade-selected-badge" style={{ background:"rgba(0,172,193,.35)", border:"1px solid rgba(0,229,255,.4)" }}>
              🚢 {selShip}
              {SHIPS_INFO[selShip]?.newShip && (
                <span style={{ background:"#9B30FF", borderRadius:50, padding:"1px 6px", fontSize:8, marginLeft:6, fontWeight:800 }}>
                  {SHIPS_INFO[selShip].year}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Ship quick-info strip (shows when ship selected) ── */}
      {selShip !== "All Ships" && SHIPS_INFO[selShip] && (() => {
        const si = SHIPS_INFO[selShip];
        return (
          <div className="ship-info-strip">
            <div className="sis-col">
              <Stars count={si.overall} size={14}/>
              <span className="sis-num" style={{ color:rColor(si.overall) }}>{si.overall}</span>
              <span className="sis-lbl">Overall</span>
            </div>
            <div className="sis-divider"/>
            <div className="sis-col">
              <span className="sis-num" style={{ color:rColor(si.food) }}>🍽️ {si.food}</span>
              <span className="sis-lbl">Food</span>
            </div>
            <div className="sis-divider"/>
            <div className="sis-col">
              <span className="sis-num" style={{ color:"#00e5ff" }}>{si.tonnage.toLocaleString()} GT</span>
              <span className="sis-lbl">Tonnage</span>
            </div>
            <div className="sis-divider"/>
            <div className="sis-col">
              <span className="sis-num" style={{ color:"#f9a825" }}>{si.year}</span>
              <span className="sis-lbl">Built</span>
            </div>
            <div className="sis-divider"/>
            <div className="sis-col">
              <span className="sis-num">{si.class}</span>
              <span className="sis-lbl">Class</span>
            </div>
            <div className="sis-divider"/>
            <div className="sis-col">
              <span className="sis-num">{si.reviewCount.toLocaleString()}</span>
              <span className="sis-lbl">Reviews</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── SHIP RATINGS PANEL ───────────────────────────────────────────────────────
function ShipRatingsPanel({ onClose, initialShip }) {
  const [active, setActive] = useState(initialShip || "Legend of the Seas");
  const info = SHIPS_INFO[active];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--wide" onClick={e => e.stopPropagation()}>
        <div className="modal-hdr">
          <div>
            <h2 className="modal-title">⭐ Ship Ratings & Food Reviews</h2>
            <p className="modal-sub">Full breakdown of guest ratings — overall, food, service, entertainment & cabin scores</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="cabin-tabs" style={{ overflowX:"auto", gap:6 }}>
          {Object.keys(SHIPS_INFO).map(name => {
            const s = SHIPS_INFO[name];
            return (
              <button key={name} className={`ctab${active===name?" ctab--on":""}`} onClick={() => setActive(name)} style={{ position:"relative" }}>
                {s.newShip && <span style={{ position:"absolute", top:-6, right:-4, background:"#D97757", color:"#fff", fontSize:8, fontWeight:700, padding:"1px 5px", borderRadius:50 }}>NEW</span>}
                <Stars count={Math.round(s.overall)} size={10}/>&nbsp;{name.split(" of")[0]}
              </button>
            );
          })}
        </div>
        <div className="ship-panel-body">
          <div className="ship-panel-left">
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                {info.newShip && <span style={{ background:"#D97757", color:"#fff", fontSize:9, fontWeight:700, padding:"2px 10px", borderRadius:50, letterSpacing:.5 }}>{info.year===2026?"NEW 2026":"LAUNCHED 2025"}</span>}
                <span style={{ background:"#F5F0EB", border:"1px solid #E0D9CF", color:"#4A4640", fontSize:9, fontWeight:600, padding:"2px 10px", borderRadius:50, letterSpacing:.5 }}>{info.class}</span>
              </div>
              <h3 style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:700, color:"#1A1A18", marginBottom:6 }}>{active}</h3>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <Stars count={Math.round(info.overall)} size={16}/>
                <span style={{ fontSize:26, fontWeight:700, color:"#D97757", fontFamily:"'Lora',serif" }}>{info.overall}</span>
                <span style={{ fontSize:12, color:"#8A847C" }}>/ 5.0 · {info.reviewCount.toLocaleString()} reviews</span>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
                {(info.awards||[]).map(a => (
                  <span key={a} style={{ background:"#FDF0EA", border:"1px solid #F0C4AD", borderRadius:50, padding:"3px 10px", fontSize:10, color:"#C4613E", fontWeight:600 }}>🏆 {a}</span>
                ))}
              </div>
              <p style={{ fontSize:13, color:"#4A4640", lineHeight:1.7, borderLeft:"3px solid #D97757", paddingLeft:14, fontStyle:"italic" }}>"{info.reviewSummary}"</p>
            </div>
            <div style={{ background:"#F5F0EB", border:"1px solid #E0D9CF", borderRadius:12, padding:16, marginBottom:14 }}>
              <p style={{ fontSize:9, letterSpacing:2.5, textTransform:"uppercase", color:"#8A847C", marginBottom:12, fontWeight:600 }}>GUEST RATINGS BREAKDOWN</p>
              <RatingBar label="⭐ Overall Experience" value={info.overall}/>
              <RatingBar label="🍽️ Food & Dining"     value={info.food}/>
              <RatingBar label="👋 Service & Staff"   value={info.service}/>
              <RatingBar label="🎭 Entertainment"     value={info.entertainment}/>
              <RatingBar label="✨ Cleanliness"       value={info.cleanliness}/>
              <RatingBar label="💰 Value for Money"   value={info.value}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[["Year Built",String(info.year)],["Gross Tonnage",`${info.tonnage.toLocaleString()} GT`],["Passengers",info.passengers.toLocaleString()],["Reviews",info.reviewCount.toLocaleString()]].map(([k,v]) => (
                <div key={k} style={{ background:"#FFFFFF", border:"1px solid #E8E2D8", borderRadius:8, padding:"10px 14px" }}>
                  <div style={{ fontSize:9, letterSpacing:1.5, textTransform:"uppercase", color:"#8A847C", marginBottom:4, fontWeight:600 }}>{k}</div>
                  <div style={{ fontSize:16, fontWeight:700, color:"#D97757" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ship-panel-right">
            <div style={{ background:"#F5F0EB", border:"1px solid #E0D9CF", borderRadius:12, padding:16, marginBottom:14 }}>
              <p style={{ fontSize:9, letterSpacing:2.5, textTransform:"uppercase", color:"#8A847C", marginBottom:12, fontWeight:600 }}>🍽️ TOP DINING VENUES</p>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <span style={{ fontSize:26, fontWeight:700, color:"#D97757", fontFamily:"'Lora',serif" }}>{info.food}</span>
                <div><Stars count={Math.round(info.food)} size={14}/><div style={{ fontSize:10, color:"#8A847C", marginTop:2 }}>Food Rating</div></div>
              </div>
              {info.foodHighlights.map((f,i) => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:i<info.foodHighlights.length-1?"1px solid #E8E2D8":"none" }}>
                  <span style={{ width:22, height:22, borderRadius:6, background:"#FDF0EA", border:"1px solid #F0C4AD", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#D97757", flexShrink:0, fontWeight:700 }}>{i+1}</span>
                  <span style={{ fontSize:13, fontWeight:500, flex:1, color:"#1A1A18" }}>{f}</span>
                  <Stars count={Math.min(5,Math.round(info.food))} size={10}/>
                </div>
              ))}
            </div>
            <div style={{ background:"#F5F0EB", border:"1px solid #E0D9CF", borderRadius:12, padding:16 }}>
              <p style={{ fontSize:9, letterSpacing:2.5, textTransform:"uppercase", color:"#8A847C", marginBottom:12, fontWeight:600 }}>🛏️ CABIN RATINGS BY TYPE</p>
              {["Interior","Ocean View","Balcony","Junior Suite","Suite"].map(type => {
                const r = CABIN_REVIEWS[type]; if(!r) return null;
                return (
                  <div key={type} style={{ marginBottom:12, paddingBottom:12, borderBottom:"1px solid #E8E2D8" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                      <span style={{ fontSize:13, fontWeight:600, color:"#1A1A18" }}>{type}</span>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <Stars count={Math.round(r.comfort)} size={11}/>
                        <span style={{ fontSize:13, fontWeight:700, color:"#D97757" }}>{r.comfort}</span>
                      </div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:4, marginBottom:6 }}>
                      {[["Comfort",r.comfort],["Clean",r.cleanliness],["Size",r.size],["Value",r.value]].map(([k,v]) => (
                        <div key={k} style={{ textAlign:"center" }}>
                          <div style={{ fontSize:13, fontWeight:700, color:"#D97757" }}>{v}</div>
                          <div style={{ fontSize:9, color:"#8A847C", letterSpacing:.5 }}>{k}</div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize:11, color:"#4A4640", lineHeight:1.6, fontStyle:"italic" }}>"{r.summary.substring(0,95)}..."</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARE MODAL ────────────────────────────────────────────────────────────
const ALL_TYPES = ["Interior","Ocean View","Balcony","Junior Suite","Suite","Royal Suite","Grand Suite","Sky Suite","Icon Loft Suite","Owner's Suite","Ultimate Family Suite","Ultimate Family Townhouse"];

function CompareModal({ cruises, onClose }) {
  const [activeCabin, setActiveCabin] = useState("Interior");
  const avail = useMemo(() => { const s=new Set(); cruises.forEach(c=>c.cabins.forEach(x=>s.add(x.type))); return ALL_TYPES.filter(t=>s.has(t)); }, [cruises]);
  const getCab = (c,t) => c.cabins.find(x=>x.type===t);
  const bestId = useMemo(() => { let best=null,id=null; cruises.forEach(c=>{const cab=getCab(c,activeCabin);if(cab&&(best===null||cab.salePrice<best)){best=cab.salePrice;id=c.id;}}); return id; }, [cruises,activeCabin]);
  const cabRev = CABIN_REVIEWS[activeCabin]||CABIN_REVIEWS["Balcony"];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--wide" onClick={e=>e.stopPropagation()}>
        <div className="modal-hdr">
          <div><h2 className="modal-title">⚖️ Compare Cabins Side-by-Side</h2><p className="modal-sub">Prices, stars, food scores & features across {cruises.length} cruises</p></div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="cabin-tabs">
          {avail.map(t=>(
            <button key={t} className={`ctab${activeCabin===t?" ctab--on":""}`} onClick={()=>setActiveCabin(t)}>
              <Stars count={cruises[0]?.cabins.find(c=>c.type===t)?.stars||2} size={10}/>&nbsp;{t}
            </button>
          ))}
        </div>
        <div style={{ margin:"0 24px 10px", background:"#FDF0EA", border:"1px solid #F0C4AD", borderRadius:10, padding:"10px 16px", display:"flex", gap:18, flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#8A847C", fontWeight:600 }}>Guest Reviews · {activeCabin}</span>
          {[["Comfort",cabRev.comfort],["Cleanliness",cabRev.cleanliness],["Size",cabRev.size],["Value",cabRev.value]].map(([k,v])=>(
            <div key={k} style={{ textAlign:"center" }}><div style={{ fontSize:16, fontWeight:700, color:"#D97757" }}>{v}</div><div style={{ fontSize:9, color:"#8A847C" }}>{k}</div></div>
          ))}
          <p style={{ fontSize:11, color:"#4A4640", maxWidth:340, lineHeight:1.5, borderLeft:"2px solid #D97757", paddingLeft:10, fontStyle:"italic" }}>"{cabRev.summary.substring(0,110)}..."</p>
          <span style={{ fontSize:10, color:"#8A847C", marginLeft:"auto" }}>{cabRev.reviewCount.toLocaleString()} reviews</span>
        </div>
        <div className="cmp-scroll">
          <table className="cmp-table">
            <thead>
              <tr>
                <th className="cmp-lbl-th"></th>
                {cruises.map(c=>{const si=SHIPS_INFO[c.ship];return(
                  <th key={c.id} className={`cmp-col${bestId===c.id?" cmp-col--best":""}`}>
                    {bestId===c.id&&<div className="best-tag">✦ BEST PRICE</div>}
                    {si?.newShip&&<div style={{fontSize:9,fontWeight:700,color:"#D97757",letterSpacing:.5,marginBottom:4}}>★ NEW {si.year}</div>}
                    <div className="cmp-shipname">{c.ship}</div>
                    <div style={{margin:"3px 0"}}><Stars count={Math.round(si?.overall||4)} size={12}/></div>
                    <div style={{fontSize:10,color:rColor(si?.food||4),fontWeight:700,marginBottom:3}}>🍽️ Food {si?.food} · 👋 {si?.service}</div>
                    <div className="cmp-itin">{c.itinerary}</div>
                    <div className="cmp-dep">📅 {fmtDate(c.departure)}</div>
                  </th>
                );})}
              </tr>
            </thead>
            <tbody>
              {[
                ["Cabin Stars",    c=>{const cab=getCab(c,activeCabin);return cab?<Stars count={cab.stars} size={18}/>:<span className="na">N/A</span>;}],
                ["Food Rating",    c=>{const si=SHIPS_INFO[c.ship];return<span style={{color:rColor(si?.food||4),fontWeight:800,fontSize:16}}>🍽️ {si?.food}</span>;}],
                ["Service",        c=>{const si=SHIPS_INFO[c.ship];return<span style={{color:rColor(si?.service||4),fontWeight:800,fontSize:16}}>👋 {si?.service}</span>;}],
                ["Entertainment",  c=>{const si=SHIPS_INFO[c.ship];return<span style={{color:rColor(si?.entertainment||4),fontWeight:800,fontSize:15}}>🎭 {si?.entertainment}</span>;}],
              ].map(([lbl,fn])=>(
                <tr key={lbl}><td className="cmp-row-lbl">{lbl}</td>{cruises.map(c=><td key={c.id} className="cmp-cell">{fn(c)}</td>)}</tr>
              ))}
              <tr className="cmp-hl">
                <td className="cmp-row-lbl">Sale Price</td>
                {cruises.map(c=>{const cab=getCab(c,activeCabin);return<td key={c.id} className={`cmp-cell${bestId===c.id?" cmp-cell--best":""}`}>{cab?<><span className="cmp-price">{fmt(cab.salePrice)}</span><span className="cmp-pp">/pp</span></>:<span className="na">N/A</span>}</td>;})}
              </tr>
              {[
                ["Was",       c=>{const cab=getCab(c,activeCabin);return cab?<span className="cmp-was">{fmt(cab.originalPrice)}</span>:<span className="na">N/A</span>;}],
                ["Discount",  c=>{const cab=getCab(c,activeCabin);return cab?<span className="cmp-disc">-{cab.discount}%</span>:<span className="na">N/A</span>;}],
                ["You Save",  c=>{const cab=getCab(c,activeCabin);return cab?<span className="cmp-save">{fmt(cab.originalPrice-cab.salePrice)}</span>:<span className="na">N/A</span>;}],
                ["Cabin Size",c=>{const cab=getCab(c,activeCabin);return cab?<span className="cmp-sqft">{cab.sqft} sqft</span>:<span className="na">N/A</span>;}],
                ["Ship Built",c=><span className="cmp-year">{SHIPS_INFO[c.ship]?.year}</span>],
                ["Ship Size", c=><span className="cmp-tons">{(SHIPS_INFO[c.ship]?.tonnage||0).toLocaleString()} GT</span>],
              ].map(([lbl,fn])=>(
                <tr key={lbl}><td className="cmp-row-lbl">{lbl}</td>{cruises.map(c=><td key={c.id} className="cmp-cell">{fn(c)}</td>)}</tr>
              ))}
              <tr>
                <td className="cmp-row-lbl cmp-row-lbl--top">Features</td>
                {cruises.map(c=>{const cab=getCab(c,activeCabin);return<td key={c.id} className="cmp-cell cmp-cell--feat">{cab?cab.features.map(f=><div key={f} className="cmp-feat">✓ {f}</div>):<span className="na">N/A</span>}</td>;})}
              </tr>
              <tr>
                <td className="cmp-row-lbl"></td>
                {cruises.map(c=><td key={c.id} className="cmp-cell"><a href="https://www.royalcaribbean.com" target="_blank" rel="noopener noreferrer" className="cmp-book">Book ↗</a></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── CABIN TABLE ──────────────────────────────────────────────────────────────
function CabinTable({ cabins }) {
  const [openType, setOpenType] = useState(null);
  return (
    <div className="cabin-table">
      <div className="cabin-header"><span>Type</span><span>Stars</span><span>Size</span><span>Was</span><span>Now</span><span>Save</span></div>
      {cabins.map(c => {
        const rev = CABIN_REVIEWS[c.type];
        const open = openType === c.type;
        return (
          <div key={c.type}>
            <div className="cabin-row" style={{ cursor:"pointer" }} onClick={() => setOpenType(open?null:c.type)}>
              <span className="cabin-type">{c.type}</span>
              <span><Stars count={c.stars} size={11}/></span>
              <span className="cabin-sqft">{c.sqft} sqft</span>
              <span className="cabin-was">{fmt(c.originalPrice)}</span>
              <span className="cabin-now">{fmt(c.salePrice)}</span>
              <span className="cabin-save">-{c.discount}%</span>
            </div>
            {open && rev && (
              <div className="cabin-review-drop">
                <div className="crv-scores">
                  {[["Comfort",rev.comfort],["Clean",rev.cleanliness],["Size",rev.size],["Value",rev.value]].map(([k,v])=>(
                    <div key={k} className="crv-score"><div className="crv-num" style={{color:rColor(v)}}>{v}</div><div className="crv-lbl">{k}</div></div>
                  ))}
                  <span className="crv-count">{rev.reviewCount.toLocaleString()} reviews</span>
                </div>
                <p className="crv-summary">"{rev.summary}"</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── CRUISE CARD ──────────────────────────────────────────────────────────────
function CruiseCard({ cruise, expanded, onToggle, onCompare, isCompared, compareCount, onShowShipRating }) {
  const cheapest = minPrice(cruise);
  const big      = maxDisc(cruise);
  const si       = SHIPS_INFO[cruise.ship] || {};
  return (
    <div className={`card${expanded?" card--open":""}${isCompared?" card--compared":""}`}>
      <div className="card-img-wrap">
        <img src={cruise.image} alt={cruise.itinerary} className="card-img"/>
        <div className="card-badge" style={{ background:cruise.badgeColor }}>{cruise.badge}</div>
        {si.newShip && <div className="new-ship-ribbon">★ {si.year===2026?"NEW 2026":"NEW 2025"}</div>}
        <div className="card-disc-bubble"><span className="disc-pct">-{big}%</span><span className="disc-lbl">UP TO</span></div>
        <button className={`cmp-btn${isCompared?" cmp-btn--on":""}`} onClick={()=>onCompare(cruise)} disabled={!isCompared&&compareCount>=3}>
          {isCompared?"✓ Added":"+ Compare"}
        </button>
      </div>
      <div className="card-body">
        <button className="ship-row" onClick={()=>onShowShipRating(cruise.ship)}>
          <Stars count={Math.round(si.overall||4)} size={13}/>
          <span className="ship-meta">{si.class} · Built {si.year} · {(si.tonnage||0).toLocaleString()} GT</span>
          <span className="ship-food-badge">🍽️ {si.food}</span>
          <span className="ship-row-tap">View Reviews ›</span>
        </button>
        <div className="card-top-row">
          <div>
            <p className="card-nights">{cruise.nights} NIGHTS</p>
            <h2 className="card-title">{cruise.itinerary}</h2>
          </div>
          <div className="price-block">
            <span className="price-from">FROM</span>
            <span className="price-big">{fmt(cheapest)}</span>
            <span className="price-pp">/ person</span>
          </div>
        </div>
        <div className="card-route">
          <span className="route-from">🚢 {cruise.from}</span>
          <span className="route-arrow">→</span>
          <span className="route-to">{cruise.ports.slice(1).join(" · ")}</span>
        </div>
        <div className="card-meta">
          <span>📅 {fmtDate(cruise.departure)}</span>
          <span className="flags">{cruise.countries.slice(0,4).map(c=>c.split(" ")[0]).join(" ")}</span>
        </div>
        <div className="card-highlights">
          {cruise.highlights.map(h=><span key={h} className="hl-tag">✦ {h}</span>)}
        </div>
        <button className="card-toggle-btn" onClick={onToggle}>
          {expanded?"▲ Hide Cabin Prices":"▼ View All Cabins, Stars & Reviews"}
        </button>
        {expanded && (
          <div className="card-expanded">
            <h3 className="cabin-section-title">🛏 Cabin Prices, Stars & Guest Reviews <span style={{fontSize:10,opacity:.5}}>(tap row to expand)</span></h3>
            <CabinTable cabins={cruise.cabins}/>
            <a href="https://www.royalcaribbean.com" target="_blank" rel="noopener noreferrer" className="book-btn">
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
  // Cascading filter state
  const [selLine,    setSelLine]    = useState("All Lines");
  const [selShip,    setSelShip]    = useState("All Ships");

  // Other filters
  const [selCountry, setSelCountry] = useState("All Countries");
  const [duration,   setDuration]   = useState("Any Duration");
  const [sortBy,     setSortBy]     = useState("newest");
  const [maxPrice,   setMaxPrice]   = useState(10000);
  const [minRating,  setMinRating]  = useState(0);
  const [minFoodRating, setMinFoodRating] = useState(0);

  // UI state
  const [expandedId, setExpandedId]         = useState(null);
  const [compareList, setCompareList]       = useState([]);
  const [showCompare, setShowCompare]       = useState(false);
  const [showShipRatings, setShowShipRatings] = useState(false);
  const [activeShipPanel, setActiveShipPanel] = useState(null);
  const [iconOnly,   setIconOnly]           = useState(false);
  const [newOnly,    setNewOnly]            = useState(false);

  const COUNTRIES = ["All Countries", ...Object.keys(COUNTRY_DATA)];

  const filtered = useMemo(() => {
    let list = [...CRUISES];
    // Cascading filters take priority
    if (selLine !== "All Lines") list = list.filter(c => c.line === selLine);
    if (selShip !== "All Ships") list = list.filter(c => c.ship === selShip);
    // Toggle filters (only apply if cascade not active)
    if (selLine === "All Lines" && selShip === "All Ships") {
      if (iconOnly) list = list.filter(c => ["Icon of the Seas","Star of the Seas","Legend of the Seas"].includes(c.ship));
      if (newOnly)  list = list.filter(c => SHIPS_INFO[c.ship]?.newShip);
    }
    if (selCountry !== "All Countries") list = list.filter(c => c.countries.includes(selCountry));
    if (duration !== "Any Duration")    list = list.filter(c => c.nights === parseInt(duration));
    list = list.filter(c => minPrice(c) <= maxPrice);
    list = list.filter(c => (SHIPS_INFO[c.ship]?.overall||0) >= minRating);
    list = list.filter(c => (SHIPS_INFO[c.ship]?.food||0)    >= minFoodRating);

    if      (sortBy==="newest")     list.sort((a,b)=>(SHIPS_INFO[b.ship]?.year||0)-(SHIPS_INFO[a.ship]?.year||0));
    else if (sortBy==="oldest")     list.sort((a,b)=>(SHIPS_INFO[a.ship]?.year||0)-(SHIPS_INFO[b.ship]?.year||0));
    else if (sortBy==="biggest")    list.sort((a,b)=>(SHIPS_INFO[b.ship]?.tonnage||0)-(SHIPS_INFO[a.ship]?.tonnage||0));
    else if (sortBy==="smallest")   list.sort((a,b)=>(SHIPS_INFO[a.ship]?.tonnage||0)-(SHIPS_INFO[b.ship]?.tonnage||0));
    else if (sortBy==="rating")     list.sort((a,b)=>(SHIPS_INFO[b.ship]?.overall||0)-(SHIPS_INFO[a.ship]?.overall||0));
    else if (sortBy==="food")       list.sort((a,b)=>(SHIPS_INFO[b.ship]?.food||0)-(SHIPS_INFO[a.ship]?.food||0));
    else if (sortBy==="discount")   list.sort((a,b)=>maxDisc(b)-maxDisc(a));
    else if (sortBy==="price-asc")  list.sort((a,b)=>minPrice(a)-minPrice(b));
    else if (sortBy==="price-desc") list.sort((a,b)=>minPrice(b)-minPrice(a));
    else if (sortBy==="date")       list.sort((a,b)=>new Date(a.departure)-new Date(b.departure));
    return list;
  }, [selLine, selShip, selCountry, duration, sortBy, iconOnly, newOnly, maxPrice, minRating, minFoodRating]);

  const cheapestDeal = useMemo(()=>CRUISES.reduce((m,c)=>minPrice(c)<minPrice(m)?c:m,CRUISES[0]),[]);
  const biggestDeal  = useMemo(()=>CRUISES.reduce((m,c)=>maxDisc(c)>maxDisc(m)?c:m,CRUISES[0]),[]);

  const toggleCompare = cruise => setCompareList(prev =>
    prev.find(c=>c.id===cruise.id) ? prev.filter(c=>c.id!==cruise.id)
    : prev.length<3 ? [...prev,cruise] : prev
  );

  const cInfo = selCountry !== "All Countries" ? COUNTRY_DATA[selCountry] : null;

  return (
    <>
      <Head>
        <title>Royal Caribbean 2026 Cruise Deals | Icon · Star · Legend of the Seas</title>
        <meta name="description" content="Best Royal Caribbean cruise deals 2026 including new Legend of the Seas, Star of the Seas, Icon of the Seas."/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#FAF9F7;
          --bg2:#F5F0EB;
          --bg3:#EDE8E0;
          --border:#E0D9CF;
          --border2:#D0C8BC;
          --ink:#1A1A18;
          --ink2:#4A4640;
          --ink3:#8A847C;
          --accent:#D97757;
          --accent2:#C4613E;
          --accent-bg:#FDF0EA;
          --accent-border:#F0C4AD;
          --green:#2D7A5F;
          --green-bg:#EAF5EF;
          --red:#C0392B;
          --red-bg:#FDECEA;
          --card-bg:#FFFFFF;
          --card-border:#E8E2D8;
          --shadow:0 2px 12px rgba(80,60,40,.08);
          --shadow-lg:0 8px 32px rgba(80,60,40,.12);
          --radius:14px;
        }
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;
          background-image:radial-gradient(ellipse 70% 40% at 50% 0%,rgba(217,119,87,.06) 0%,transparent 60%);
          background-attachment:fixed}

        /* ── HERO ── */
        .hero{padding:48px 24px 36px;text-align:center;position:relative;overflow:hidden;
          background:linear-gradient(180deg,rgba(217,119,87,.07) 0%,transparent 100%);
          border-bottom:1px solid var(--border)}
        .hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=60') center/cover;opacity:.04;pointer-events:none}
        .hero-eyebrow{font-size:10px;letter-spacing:4px;color:var(--accent);text-transform:uppercase;font-weight:600;margin-bottom:14px;position:relative;z-index:1}
        .hero-title{font-family:'Lora',serif;font-size:clamp(30px,5vw,58px);font-weight:700;line-height:1.08;margin-bottom:10px;position:relative;z-index:1;color:var(--ink)}
        .hero-title span{color:var(--accent)}
        .hero-sub{font-size:15px;color:var(--ink2);max-width:500px;margin:0 auto;line-height:1.7;font-weight:400;position:relative;z-index:1}

        /* ── CASCADE FILTER ── */
        .cascade-wrap{max-width:1280px;margin:0 auto;padding:32px 24px 0}
        .cascade-row{display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap}
        .cascade-field{display:flex;flex-direction:column;gap:8px;flex:1;min-width:220px}
        .cascade-label{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ink3);font-weight:600}
        .cascade-step-badge{width:22px;height:22px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0}
        .cascade-select-wrap{position:relative}
        .cascade-select{width:100%;background:var(--card-bg);border:1.5px solid var(--border);border-radius:10px;color:var(--ink);padding:13px 40px 13px 16px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-appearance:none;transition:border .2s,box-shadow .2s;box-shadow:var(--shadow)}
        .cascade-select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(217,119,87,.12)}
        .cascade-select:hover:not(:disabled){border-color:var(--border2)}
        .cascade-select:disabled{background:var(--bg2);color:var(--ink3);box-shadow:none}
        .cascade-select option{background:var(--card-bg);color:var(--ink)}
        .cascade-chevron{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:12px;pointer-events:none;color:var(--ink3)}
        .cascade-selected-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 13px;border-radius:50px;font-size:11px;font-weight:600;background:var(--accent-bg);border:1px solid var(--accent-border);color:var(--accent2);animation:fadeIn .2s ease}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
        .cascade-arrow{font-size:20px;color:var(--border2);margin-top:40px;transition:color .3s,transform .3s;flex-shrink:0}
        .cascade-arrow--active{color:var(--accent);transform:scale(1.2)}

        /* Ship info strip */
        .ship-info-strip{display:flex;align-items:center;background:var(--accent-bg);border:1px solid var(--accent-border);border-radius:12px;padding:14px 20px;margin-top:14px;flex-wrap:wrap;animation:fadeIn .3s ease}
        .sis-col{display:flex;flex-direction:column;align-items:center;gap:3px;padding:0 18px}
        .sis-num{font-size:15px;font-weight:700;color:var(--ink)}
        .sis-lbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink3)}
        .sis-divider{width:1px;height:32px;background:var(--border);flex-shrink:0}

        /* ── COUNTRY SELECTOR ── */
        .country-section{max-width:1280px;margin:0 auto;padding:24px 24px 0}
        .section-label{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--ink3);font-weight:600;margin-bottom:10px}
        .country-grid{display:flex;flex-wrap:wrap;gap:7px}
        .cbtn{background:var(--card-bg);border:1.5px solid var(--border);border-radius:50px;padding:7px 15px;cursor:pointer;color:var(--ink2);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;transition:all .2s;white-space:nowrap;box-shadow:var(--shadow)}
        .cbtn:hover{border-color:var(--accent);color:var(--accent)}
        .cbtn.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 4px 14px rgba(217,119,87,.3)}
        .country-banner{max-width:1280px;margin:12px 24px 0;background:var(--accent-bg);border:1px solid var(--accent-border);border-radius:14px;padding:18px 22px;display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap}
        .cb-flag{font-size:36px;line-height:1;flex-shrink:0}
        .cb-body{flex:1;min-width:180px}
        .cb-name{font-family:'Lora',serif;font-size:20px;font-weight:700;margin-bottom:3px;color:var(--ink)}
        .cb-info{font-size:12px;color:var(--ink2);margin-bottom:8px}
        .cb-ports{display:flex;flex-wrap:wrap;gap:5px}
        .cb-port{background:#fff;border:1px solid var(--accent-border);border-radius:50px;padding:2px 10px;font-size:10px;color:var(--accent2)}
        .cb-stat{text-align:right;flex-shrink:0}
        .cb-num{font-family:'Lora',serif;font-size:30px;font-weight:700;color:var(--accent);display:block}
        .cb-lbl{font-size:10px;color:var(--ink3)}

        /* ── FILTERS BAR ── */
        .filters-bar{background:rgba(250,249,247,.95);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 24px;backdrop-filter:blur(14px);position:sticky;top:0;z-index:100;margin-top:16px}
        .filters-inner{max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}
        .fg{display:flex;flex-direction:column;gap:4px}
        .fl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--ink3);font-weight:600}
        select{background:var(--card-bg);border:1.5px solid var(--border);border-radius:8px;color:var(--ink);padding:7px 30px 7px 11px;font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;outline:none;transition:border .2s;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238A847C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;box-shadow:var(--shadow)}
        select:focus{border-color:var(--accent);outline:none}
        select option{background:var(--card-bg);color:var(--ink)}
        .slider-wrap{display:flex;flex-direction:column;gap:4px}
        .slider-row{display:flex;align-items:center;gap:8px}
        input[type=range]{-webkit-appearance:none;width:110px;height:4px;background:var(--bg3);border-radius:4px;outline:none}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent);cursor:pointer;box-shadow:0 2px 6px rgba(217,119,87,.4)}
        .price-val{font-size:12px;font-weight:700;color:var(--accent);min-width:56px}
        .rating-val{font-size:12px;font-weight:700;min-width:28px;color:var(--ink2)}
        .res-count{margin-left:auto;font-size:12px;color:var(--ink3);white-space:nowrap}
        .res-count strong{color:var(--accent);font-size:14px;font-weight:700}
        .filter-toggle{background:var(--card-bg);border:1.5px solid var(--border);border-radius:50px;padding:6px 14px;cursor:pointer;color:var(--ink2);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;transition:all .2s;white-space:nowrap;box-shadow:var(--shadow)}
        .filter-toggle:hover{border-color:var(--accent);color:var(--accent)}
        .filter-toggle--on{background:var(--accent-bg);border-color:var(--accent);color:var(--accent2);font-weight:600}
        .filter-divider{width:1px;height:28px;background:var(--border);flex-shrink:0;align-self:center}
        .filter-ratings-btn{background:var(--ink);border:none;border-radius:50px;padding:7px 14px;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap}
        .filter-ratings-btn:hover{background:var(--ink2)}

        /* ── GRID ── */
        .grid-section{max-width:1280px;margin:0 auto;padding:28px 18px 130px}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
        @media(max-width:440px){.grid{grid-template-columns:1fr}}
        .no-results{grid-column:1/-1;text-align:center;padding:80px 24px;color:var(--ink3)}

        /* ── CARD ── */
        .card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius);overflow:hidden;transition:transform .25s,box-shadow .25s,border-color .25s;box-shadow:var(--shadow)}
        .card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);border-color:var(--border2)}
        .card--open{border-color:var(--accent)}
        .card--compared{border-color:var(--accent);box-shadow:0 0 0 3px rgba(217,119,87,.15)}
        .card-img-wrap{position:relative;height:190px;overflow:hidden}
        .card-img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
        .card:hover .card-img{transform:scale(1.04)}
        .card-badge{position:absolute;top:12px;left:12px;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 11px;border-radius:50px;color:#fff}
        .new-ship-ribbon{position:absolute;top:12px;left:12px;background:var(--accent);font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 11px;border-radius:50px;color:#fff;box-shadow:0 3px 10px rgba(217,119,87,.45)}
        .card-disc-bubble{position:absolute;top:12px;right:64px;background:var(--ink);border-radius:8px;padding:5px 9px;text-align:center;line-height:1}
        .disc-pct{display:block;font-size:17px;font-weight:800;color:#fff}
        .disc-lbl{font-size:8px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.7)}
        .cmp-btn{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.88);backdrop-filter:blur(6px);border:1px solid var(--border);border-radius:50px;padding:4px 12px;font-size:10px;font-weight:600;color:var(--ink);cursor:pointer;transition:all .2s}
        .cmp-btn:hover:not(:disabled){background:var(--accent-bg);border-color:var(--accent);color:var(--accent)}
        .cmp-btn--on{background:var(--accent-bg)!important;border-color:var(--accent)!important;color:var(--accent)!important}
        .cmp-btn:disabled{opacity:.35;cursor:not-allowed}
        .card-body{padding:14px 16px 16px}
        .ship-row{display:flex;align-items:center;gap:7px;margin-bottom:9px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:7px 11px;cursor:pointer;transition:all .2s;width:100%;text-align:left}
        .ship-row:hover{background:var(--accent-bg);border-color:var(--accent-border)}
        .ship-meta{font-size:10px;color:var(--ink3);flex:1}
        .ship-food-badge{font-size:11px;font-weight:700;color:var(--accent);flex-shrink:0}
        .ship-row-tap{font-size:9px;color:var(--accent);letter-spacing:.3px;flex-shrink:0}
        .card-top-row{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px;gap:8px}
        .card-nights{font-size:10px;letter-spacing:2px;color:var(--accent);text-transform:uppercase;margin-bottom:3px;font-weight:600}
        .card-title{font-family:'Lora',serif;font-size:16px;font-weight:700;line-height:1.25;max-width:185px;color:var(--ink)}
        .price-block{text-align:right;flex-shrink:0}
        .price-from{display:block;font-size:8px;letter-spacing:2px;color:var(--ink3);text-transform:uppercase}
        .price-big{display:block;font-family:'Lora',serif;font-size:24px;font-weight:700;color:var(--accent);line-height:1.1}
        .price-pp{font-size:10px;color:var(--ink3)}
        .card-route{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--ink3);margin-bottom:7px;flex-wrap:wrap}
        .route-from{color:var(--ink);font-weight:600}
        .route-arrow{color:var(--accent)}
        .route-to{color:var(--ink3)}
        .card-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;font-size:10px;color:var(--ink3)}
        .flags{font-size:13px;letter-spacing:2px}
        .card-highlights{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px}
        .hl-tag{font-size:10px;background:var(--bg2);border:1px solid var(--border);border-radius:50px;padding:2px 9px;color:var(--ink2)}
        .card-toggle-btn{width:100%;background:var(--bg2);border:1.5px solid var(--border);border-radius:8px;color:var(--ink2);padding:9px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .2s}
        .card-toggle-btn:hover{background:var(--accent-bg);border-color:var(--accent);color:var(--accent)}
        .card-expanded{margin-top:12px}
        .cabin-section-title{font-family:'Lora',serif;font-size:13px;margin-bottom:8px;color:var(--ink);font-weight:600}

        /* Cabin table */
        .cabin-table{border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:12px}
        .cabin-header,.cabin-row{display:grid;grid-template-columns:2fr 1.3fr 1fr 1fr 1fr .9fr;padding:7px 10px;font-size:10px;gap:4px;align-items:center}
        .cabin-header{background:var(--bg2);font-size:8.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink3)}
        .cabin-row{border-top:1px solid var(--border);transition:background .15s}
        .cabin-row:hover{background:var(--bg2)}
        .cabin-type{font-weight:600;color:var(--ink);font-size:10px}
        .cabin-sqft{color:var(--ink3);font-size:9px}
        .cabin-was{color:var(--ink3);text-decoration:line-through;font-size:10px}
        .cabin-now{color:var(--accent);font-weight:700;font-size:11px}
        .cabin-save{background:var(--accent-bg);color:var(--accent2);border:1px solid var(--accent-border);border-radius:4px;padding:1px 5px;font-weight:700;font-size:9px;text-align:center}
        .cabin-review-drop{background:var(--accent-bg);border:1px solid var(--accent-border);border-top:none;padding:10px 12px;border-radius:0 0 8px 8px}
        .crv-scores{display:flex;align-items:center;gap:14px;margin-bottom:7px;flex-wrap:wrap}
        .crv-score{text-align:center}
        .crv-num{font-size:15px;font-weight:800;color:var(--ink)}
        .crv-lbl{font-size:9px;color:var(--ink3);letter-spacing:.5px}
        .crv-count{font-size:10px;color:var(--ink3);margin-left:auto}
        .crv-summary{font-size:11px;color:var(--ink2);line-height:1.6;font-style:italic}
        .book-btn{display:block;text-align:center;background:var(--accent);color:#fff;text-decoration:none;padding:12px;border-radius:10px;font-weight:600;font-size:13px;transition:all .2s;box-shadow:0 4px 14px rgba(217,119,87,.35)}
        .book-btn:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 6px 20px rgba(217,119,87,.4)}

        /* ── COMPARE BAR ── */
        .compare-bar{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(250,249,247,.97);border-top:1px solid var(--border);padding:12px 22px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;backdrop-filter:blur(14px);box-shadow:0 -4px 24px rgba(80,60,40,.1)}
        .cbar-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ink3)}
        .cbar-ships{display:flex;gap:7px;flex-wrap:wrap}
        .cbar-chip{background:var(--accent-bg);border:1px solid var(--accent-border);border-radius:50px;padding:5px 14px;font-size:11px;font-weight:500;display:flex;align-items:center;gap:7px;color:var(--accent2)}
        .cbar-x{cursor:pointer;color:var(--accent);font-weight:700;font-size:14px;line-height:1}
        .cbar-clear{background:var(--red-bg);border:1px solid #F0C0BC;border-radius:50px;padding:7px 14px;color:var(--red);font-family:'DM Sans',sans-serif;font-size:11px;cursor:pointer;transition:all .2s}
        .cbar-go{margin-left:auto;background:var(--accent);border:none;border-radius:50px;padding:10px 24px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(217,119,87,.35);transition:all .2s}
        .cbar-go:hover{background:var(--accent2);transform:translateY(-1px)}

        /* ── MODAL ── */
        .modal-overlay{position:fixed;inset:0;background:rgba(26,26,24,.5);z-index:500;display:flex;align-items:center;justify-content:center;padding:14px;backdrop-filter:blur(4px)}
        .modal{background:var(--bg);border:1px solid var(--border);border-radius:20px;width:100%;max-width:860px;max-height:93vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(80,60,40,.18)}
        .modal--wide{max-width:1020px}
        .modal-hdr{display:flex;justify-content:space-between;align-items:flex-start;padding:22px 26px 14px;border-bottom:1px solid var(--border);flex-shrink:0;background:var(--bg)}
        .modal-title{font-family:'Lora',serif;font-size:22px;font-weight:700;margin-bottom:2px;color:var(--ink)}
        .modal-sub{font-size:11px;color:var(--ink3)}
        .modal-close{background:var(--bg2);border:1px solid var(--border);border-radius:50%;width:32px;height:32px;color:var(--ink2);font-size:14px;cursor:pointer;transition:all .2s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
        .modal-close:hover{background:var(--red-bg);color:var(--red);border-color:#F0C0BC}
        .ship-panel-body{display:grid;grid-template-columns:1fr 1fr;gap:20px;overflow-y:auto;flex:1;padding:18px 26px 26px;background:var(--bg)}
        @media(max-width:680px){.ship-panel-body{grid-template-columns:1fr}}
        .ship-panel-left,.ship-panel-right{display:flex;flex-direction:column;gap:0}
        .cabin-tabs{display:flex;gap:6px;flex-wrap:wrap;padding:12px 26px;border-bottom:1px solid var(--border);flex-shrink:0;overflow-x:auto;background:var(--bg)}
        .ctab{background:var(--card-bg);border:1.5px solid var(--border);border-radius:50px;padding:5px 13px;cursor:pointer;color:var(--ink2);font-family:'DM Sans',sans-serif;font-size:11px;display:flex;align-items:center;gap:5px;transition:all .2s;white-space:nowrap;flex-shrink:0}
        .ctab:hover{border-color:var(--accent);color:var(--accent)}
        .ctab--on{background:var(--accent);border-color:var(--accent);color:#fff}
        .cmp-scroll{overflow:auto;flex:1;padding:0 24px 24px;background:var(--bg)}
        .cmp-table{width:100%;border-collapse:collapse;margin-top:12px;min-width:460px}
        .cmp-table th,.cmp-table td{padding:10px 12px;text-align:center;border-bottom:1px solid var(--border)}
        .cmp-lbl-th{text-align:left!important;width:110px}
        .cmp-col{background:var(--card-bg);padding:14px 12px!important;position:relative;min-width:160px;border-radius:10px;border:1px solid var(--border)}
        .cmp-col--best{background:var(--accent-bg)!important;border:1.5px solid var(--accent-border)!important}
        .best-tag{background:var(--accent);color:#fff;font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:50px;margin-bottom:6px;display:inline-block}
        .cmp-shipname{font-family:'Lora',serif;font-size:13px;font-weight:700;margin-bottom:2px;color:var(--ink)}
        .cmp-itin{font-size:10px;color:var(--ink3);margin-top:3px}
        .cmp-dep{font-size:9px;color:var(--ink3);margin-top:2px}
        .cmp-row-lbl{text-align:left!important;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink3);white-space:nowrap;padding-left:0!important}
        .cmp-row-lbl--top{vertical-align:top}
        .cmp-cell{font-size:12px;vertical-align:middle;color:var(--ink)}
        .cmp-cell--best{background:rgba(217,119,87,.04)}
        .cmp-cell--feat{text-align:left!important;vertical-align:top}
        .cmp-hl td{background:var(--bg2)}
        .cmp-price{font-family:'Lora',serif;font-size:20px;font-weight:700;color:var(--accent)}
        .cmp-pp{font-size:10px;color:var(--ink3);margin-left:2px}
        .cmp-was{font-size:11px;color:var(--ink3);text-decoration:line-through}
        .cmp-disc{color:var(--red);font-weight:700;font-size:14px}
        .cmp-save{color:var(--green);font-weight:700;font-size:12px}
        .cmp-sqft{color:var(--ink2);font-weight:600}
        .cmp-year,.cmp-tons{color:var(--ink3);font-size:11px}
        .cmp-feat{font-size:10px;color:var(--ink2);margin-bottom:3px}
        .cmp-feat::before{content:'✓ ';color:var(--green)}
        .cmp-book{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;padding:7px 16px;border-radius:7px;font-size:11px;font-weight:600;transition:all .2s}
        .cmp-book:hover{background:var(--accent2)}
        .na{color:var(--ink3);font-size:11px}
        .footer{border-top:1px solid var(--border);text-align:center;padding:28px 22px;color:var(--ink3);font-size:11px;line-height:1.8;background:var(--bg2)}
        .footer a{color:var(--accent);text-decoration:none}
        .footer strong{color:var(--ink)}
      `}</style>

      {/* ── HERO ── */}
      <header className="hero">
        <p className="hero-eyebrow">⚓ Royal Caribbean Fleet · Deals Updated Daily</p>
        <h1 className="hero-title">
          Royal Caribbean<br/>
          <span>Cruise Deals 2026</span>
        </h1>
        <p className="hero-sub">
          Now featuring the brand-new Legend of the Seas (July 2026), Star of the Seas (2025), and Icon of the Seas. Select your cruise line and ship below to find your perfect sailing.
        </p>
      </header>

      {/* ── CASCADING FILTER ── */}
      <CascadeFilter
        selLine={selLine}
        selShip={selShip}
        onLineChange={line => { setSelLine(line); setIconOnly(false); setNewOnly(false); }}
        onShipChange={setSelShip}
      />

      {/* ── COUNTRY SELECTOR ── */}
      <div className="country-section">
        <div className="section-label">🌍 Filter by Country / Destination</div>
        <div className="country-grid">
          {COUNTRIES.map(c => (
            <button key={c} className={`cbtn${selCountry===c?" active":""}`} onClick={() => setSelCountry(c)}>{c}</button>
          ))}
        </div>
      </div>

      {cInfo && (
        <div className="country-banner">
          <div className="cb-flag">{cInfo.flag}</div>
          <div className="cb-body">
            <div className="cb-name">{selCountry.replace(/^[^\s]+\s/,"")}</div>
            <div className="cb-info">{cInfo.info}</div>
            <div className="cb-ports">{cInfo.ports.map(p=><span key={p} className="cb-port">⚓ {p}</span>)}</div>
          </div>
          <div className="cb-stat">
            <span className="cb-num">{filtered.length}</span>
            <span className="cb-lbl">Cruises Found</span>
          </div>
        </div>
      )}

      {/* ── FILTERS BAR ── */}
      <div className="filters-bar">
        <div className="filters-inner">
          {/* Toggle pills */}
          <button className={`filter-toggle${iconOnly?" filter-toggle--on":""}`}
            onClick={() => { setIconOnly(!iconOnly); setNewOnly(false); setSelLine("All Lines"); setSelShip("All Ships"); }}>
            🚢 Icon Class Only
          </button>
          <button className={`filter-toggle${newOnly?" filter-toggle--on":""}`}
            onClick={() => { setNewOnly(!newOnly); setIconOnly(false); setSelLine("All Lines"); setSelShip("All Ships"); }}>
            ✨ New Ships (2025-26)
          </button>
          <div className="filter-divider"/>
          <div className="fg">
            <span className="fl">Duration</span>
            <select value={duration} onChange={e => setDuration(e.target.value)}>
              {["Any Duration","3 nights","4 nights","7 nights"].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg">
            <span className="fl">Sort By</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="newest">Ship: Newest First ★</option>
              <option value="oldest">Ship: Oldest First</option>
              <option value="biggest">Ship: Biggest First</option>
              <option value="smallest">Ship: Smallest First</option>
              <option value="rating">Ship: Top Overall Rating</option>
              <option value="food">Ship: Top Food Rating 🍽️</option>
              <option value="discount">Biggest Discount</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="date">Soonest Departure</option>
            </select>
          </div>
          <div className="slider-wrap">
            <span className="fl">Max Price / Person</span>
            <div className="slider-row">
              <input type="range" min="300" max="13000" step="100" value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)}/>
              <span className="price-val">{fmt(maxPrice)}</span>
            </div>
          </div>
          <div className="slider-wrap">
            <span className="fl">Min Ship Rating ⭐</span>
            <div className="slider-row">
              <input type="range" min="0" max="5" step="0.1" value={minRating} onChange={e=>setMinRating(+e.target.value)}/>
              <span className="rating-val" style={{ color:rColor(minRating||4.5) }}>{minRating>0?minRating.toFixed(1):"Any"}</span>
            </div>
          </div>
          <div className="slider-wrap">
            <span className="fl">Min Food Rating 🍽️</span>
            <div className="slider-row">
              <input type="range" min="0" max="5" step="0.1" value={minFoodRating} onChange={e=>setMinFoodRating(+e.target.value)}/>
              <span className="rating-val" style={{ color:rColor(minFoodRating||4.5) }}>{minFoodRating>0?minFoodRating.toFixed(1):"Any"}</span>
            </div>
          </div>
          <div className="filter-divider"/>
          <button className="filter-ratings-btn"
            onClick={() => { setShowShipRatings(true); setActiveShipPanel("Legend of the Seas"); }}>
            ⭐ Ship Ratings
          </button>
          <span className="res-count"><strong>{filtered.length}</strong> deals found</span>
          {compareList.length >= 2 && (
            <button className="cbar-go" style={{ marginLeft:"auto", padding:"7px 16px", fontSize:12 }} onClick={() => setShowCompare(true)}>
              ⚖️ Compare {compareList.length}
            </button>
          )}
        </div>
      </div>

      {/* ── GRID ── */}
      <main className="grid-section">
        <div className="grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <p style={{fontSize:44,marginBottom:12}}>🌊</p>
              <p style={{fontSize:18}}>No cruises match your filters.</p>
              <p style={{fontSize:13,marginTop:8,opacity:.5}}>Try adjusting your selection or clearing the ship filter.</p>
            </div>
          ) : filtered.map(cruise => (
            <CruiseCard
              key={cruise.id}
              cruise={cruise}
              expanded={expandedId === cruise.id}
              onToggle={() => setExpandedId(expandedId===cruise.id?null:cruise.id)}
              onCompare={toggleCompare}
              isCompared={!!compareList.find(c=>c.id===cruise.id)}
              compareCount={compareList.length}
              onShowShipRating={name => { setActiveShipPanel(name); setShowShipRatings(true); }}
            />
          ))}
        </div>
      </main>

      {/* ── COMPARE BAR ── */}
      {compareList.length > 0 && (
        <div className="compare-bar">
          <span className="cbar-label">Comparing:</span>
          <div className="cbar-ships">
            {compareList.map(c=>(
              <div key={c.id} className="cbar-chip">
                🚢 {c.ship.split(" of")[0]}
                <span className="cbar-x" onClick={()=>toggleCompare(c)}>×</span>
              </div>
            ))}
          </div>
          <button className="cbar-clear" onClick={()=>setCompareList([])}>Clear All</button>
          <button className="cbar-go" onClick={()=>setShowCompare(true)} disabled={compareList.length<2}>
            ⚖️ Compare Cabins Now →
          </button>
        </div>
      )}

      {/* ── MODALS ── */}
      {showCompare && compareList.length >= 2 && (
        <CompareModal cruises={compareList} onClose={() => setShowCompare(false)}/>
      )}
      {showShipRatings && (
        <ShipRatingsPanel onClose={() => setShowShipRatings(false)} initialShip={activeShipPanel}/>
      )}

      <footer className="footer">
        <p><strong>CruiseDeals.io</strong> — Independent Royal Caribbean price comparison · Includes Legend of the Seas 2026</p>
        <p style={{marginTop:4}}>Per person, double occupancy. Taxes & fees not included. Verify at <a href="https://www.royalcaribbean.com" target="_blank" rel="noopener noreferrer">royalcaribbean.com</a>.</p>
      </footer>
    </>
  );
}
