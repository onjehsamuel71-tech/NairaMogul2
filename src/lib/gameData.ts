export type IndustryKey =
  | "transport"
  | "buka"
  | "pos"
  | "agro"
  | "fashion"
  | "realestate"
  | "entertainment";

export type CityKey =
  | "lagos"
  | "abuja"
  | "ph"
  | "kano"
  | "ibadan"
  | "enugu"
  | "aba"
  | "benin";

export type TitleKey = "chief" | "chairwoman" | "mogul";

export interface IndustryDef {
  name: string;
  emoji: string;
  bonus: string;
}

export const INDUSTRIES: Record<IndustryKey, IndustryDef> = {
  transport: {
    name: "Transport Empire",
    emoji: "🚐",
    bonus: "+15% speed on fleet returns",
  },
  buka: {
    name: "Buka & Street Food",
    emoji: "🍲",
    bonus: "+15% profit during events",
  },
  pos: {
    name: "POS & Financial Network",
    emoji: "💳",
    bonus: "+15% passive daily interest",
  },
  agro: {
    name: "Agro & Farming",
    emoji: "🚜",
    bonus: "+10% yield on harvests",
  },
  fashion: {
    name: "Fashion & Tailoring",
    emoji: "👟",
    bonus: "+12% margin on retail sales",
  },
  realestate: {
    name: "Real Estate & Rentals",
    emoji: "🏢",
    bonus: "+10% rent income",
  },
  entertainment: {
    name: "Music & Entertainment",
    emoji: "🎵",
    bonus: "+15% cred from shows",
  },
};

export interface CityDef {
  name: string;
  emoji: string;
  unlockNetWorth: number;
}

export const CITIES: Record<CityKey, CityDef> = {
  lagos: { name: "Lagos", emoji: "🌆", unlockNetWorth: 0 },
  abuja: { name: "Abuja", emoji: "🏛️", unlockNetWorth: 5_000_000 },
  ph: { name: "Port Harcourt", emoji: "🛢️", unlockNetWorth: 15_000_000 },
  kano: { name: "Kano", emoji: "🐪", unlockNetWorth: 30_000_000 },
  ibadan: { name: "Ibadan", emoji: "🌳", unlockNetWorth: 50_000_000 },
  enugu: { name: "Enugu", emoji: "⛰️", unlockNetWorth: 75_000_000 },
  aba: { name: "Aba", emoji: "👞", unlockNetWorth: 100_000_000 },
  benin: { name: "Benin City", emoji: "🎭", unlockNetWorth: 150_000_000 },
};

export interface TitleDef {
  label: string;
  short: string;
}

export const TITLES: Record<TitleKey, TitleDef> = {
  chief: { label: "Chief / CEO", short: "Chief" },
  chairwoman: { label: "Chairwoman / CEO", short: "Chairwoman" },
  mogul: { label: "Mogul", short: "Mogul" },
};

export interface AssetDef {
  id: string;
  name: string;
  emoji: string;
  industry: IndustryKey;
  tier: number;
  cost: number;
  baseRevenue: number;
  baseCost: number;
  flavor: string;
  upgradeTo?: string;
}

export const ASSET_CATALOG: Record<string, AssetDef> = {
  keke: {
    id: "keke",
    name: "Keke Napep",
    emoji: "🛺",
    industry: "transport",
    tier: 1,
    cost: 500_000,
    baseRevenue: 18_000,
    baseCost: 4_000,
    flavor: "Three wheels, one dream.",
    upgradeTo: "danfo",
  },
  danfo: {
    id: "danfo",
    name: "Rusty Danfo",
    emoji: "🚐",
    industry: "transport",
    tier: 2,
    cost: 2_000_000,
    baseRevenue: 72_000,
    baseCost: 18_000,
    flavor: "Yellow bus, loud conductor.",
    upgradeTo: "coaster",
  },
  coaster: {
    id: "coaster",
    name: "Modern Coaster Bus",
    emoji: "🚌",
    industry: "transport",
    tier: 3,
    cost: 15_000_000,
    baseRevenue: 480_000,
    baseCost: 120_000,
    flavor: "AC on, passengers smiling.",
    upgradeTo: "interstate",
  },
  interstate: {
    id: "interstate",
    name: "Interstate Luxury Bus",
    emoji: "🚍",
    industry: "transport",
    tier: 4,
    cost: 60_000_000,
    baseRevenue: 1_800_000,
    baseCost: 480_000,
    flavor: "Lagos to Abuja in comfort.",
    upgradeTo: "truck",
  },
  truck: {
    id: "truck",
    name: "Delivery Logistics Truck",
    emoji: "🚚",
    industry: "transport",
    tier: 5,
    cost: 150_000_000,
    baseRevenue: 4_500_000,
    baseCost: 1_200_000,
    flavor: "Cargo moves, money follows.",
  },
  suya: {
    id: "suya",
    name: "Street Suya Kiosk",
    emoji: "🍢",
    industry: "buka",
    tier: 1,
    cost: 300_000,
    baseRevenue: 12_000,
    baseCost: 3_000,
    flavor: "Pepper, yaji, and profit.",
    upgradeTo: "amala",
  },
  amala: {
    id: "amala",
    name: "Roadside Amala Buka",
    emoji: "🍛",
    industry: "buka",
    tier: 2,
    cost: 1_500_000,
    baseRevenue: 60_000,
    baseCost: 15_000,
    flavor: "Ewedu on the side, please.",
    upgradeTo: "fastfood",
  },
  fastfood: {
    id: "fastfood",
    name: "Express Fast-Food Joint",
    emoji: "🍔",
    industry: "buka",
    tier: 3,
    cost: 10_000_000,
    baseRevenue: 360_000,
    baseCost: 90_000,
    flavor: "Chicken and chips, fast.",
    upgradeTo: "finedining",
  },
  finedining: {
    id: "finedining",
    name: "Fine Dining Restaurant",
    emoji: "🍽️",
    industry: "buka",
    tier: 4,
    cost: 45_000_000,
    baseRevenue: 1_500_000,
    baseCost: 400_000,
    flavor: "White tablecloth energy.",
    upgradeTo: "catering",
  },
  catering: {
    id: "catering",
    name: "Catering Franchise",
    emoji: "🥘",
    industry: "buka",
    tier: 5,
    cost: 200_000_000,
    baseRevenue: 6_000_000,
    baseCost: 1_600_000,
    flavor: "Owambe contracts on lock.",
  },
  poskiosk: {
    id: "poskiosk",
    name: "Single Kiosk POS",
    emoji: "🏧",
    industry: "pos",
    tier: 1,
    cost: 150_000,
    baseRevenue: 7_500,
    baseCost: 1_500,
    flavor: "Cash in, cash out, repeat.",
    upgradeTo: "container",
  },
  container: {
    id: "container",
    name: "Container Hub",
    emoji: "📦",
    industry: "pos",
    tier: 2,
    cost: 800_000,
    baseRevenue: 36_000,
    baseCost: 8_000,
    flavor: "Two terminals, one container.",
    upgradeTo: "multiterm",
  },
  multiterm: {
    id: "multiterm",
    name: "Market Multi-Terminal",
    emoji: "🏪",
    industry: "pos",
    tier: 3,
    cost: 5_000_000,
    baseRevenue: 220_000,
    baseCost: 55_000,
    flavor: "Every trader needs cash.",
    upgradeTo: "district",
  },
  district: {
    id: "district",
    name: "District Financial Center",
    emoji: "🏦",
    industry: "pos",
    tier: 4,
    cost: 30_000_000,
    baseRevenue: 1_200_000,
    baseCost: 320_000,
    flavor: "The bank of the people.",
  },
  poultry: {
    id: "poultry",
    name: "Poultry Farm",
    emoji: "🐔",
    industry: "agro",
    tier: 1,
    cost: 400_000,
    baseRevenue: 15_000,
    baseCost: 4_000,
    flavor: "Eggs daily, no excuses.",
    upgradeTo: "cassava",
  },
  cassava: {
    id: "cassava",
    name: "Cassava Processing Plant",
    emoji: "🌾",
    industry: "agro",
    tier: 2,
    cost: 2_500_000,
    baseRevenue: 90_000,
    baseCost: 22_000,
    flavor: "Garri for the nation.",
    upgradeTo: "ricefarm",
  },
  ricefarm: {
    id: "ricefarm",
    name: "Rice Farm Estate",
    emoji: "🌾",
    industry: "agro",
    tier: 3,
    cost: 18_000_000,
    baseRevenue: 600_000,
    baseCost: 150_000,
    flavor: "Local rice, premium price.",
  },
  tailor: {
    id: "tailor",
    name: "Tailoring Shop",
    emoji: "🧵",
    industry: "fashion",
    tier: 1,
    cost: 350_000,
    baseRevenue: 14_000,
    baseCost: 3_500,
    flavor: "Measure twice, sew once.",
    upgradeTo: "boutique",
  },
  boutique: {
    id: "boutique",
    name: "Fashion Boutique",
    emoji: "👗",
    industry: "fashion",
    tier: 2,
    cost: 3_000_000,
    baseRevenue: 110_000,
    baseCost: 28_000,
    flavor: "Aso-ebi orders galore.",
    upgradeTo: "factory",
  },
  factory: {
    id: "factory",
    name: "Garment Factory",
    emoji: "🏭",
    industry: "fashion",
    tier: 3,
    cost: 25_000_000,
    baseRevenue: 850_000,
    baseCost: 220_000,
    flavor: "Made in Nigeria, worn worldwide.",
  },
  mini_flat: {
    id: "mini_flat",
    name: "Mini Flat (Self-Contain)",
    emoji: "🏠",
    industry: "realestate",
    tier: 1,
    cost: 1_200_000,
    baseRevenue: 45_000,
    baseCost: 8_000,
    flavor: "Rent paid yearly, in advance.",
    upgradeTo: "duplex",
  },
  duplex: {
    id: "duplex",
    name: "Lekki Duplex",
    emoji: "🏡",
    industry: "realestate",
    tier: 2,
    cost: 12_000_000,
    baseRevenue: 400_000,
    baseCost: 90_000,
    flavor: "BQ included, of course.",
    upgradeTo: "estate",
  },
  estate: {
    id: "estate",
    name: "Private Estate",
    emoji: "🏘️",
    industry: "realestate",
    tier: 3,
    cost: 80_000_000,
    baseRevenue: 2_400_000,
    baseCost: 600_000,
    flavor: "Gated, guarded, gold.",
  },
  studio: {
    id: "studio",
    name: "Recording Studio",
    emoji: "🎙️",
    industry: "entertainment",
    tier: 1,
    cost: 600_000,
    baseRevenue: 22_000,
    baseCost: 6_000,
    flavor: "Afrobeats hits start here.",
    upgradeTo: "label",
  },
  label: {
    id: "label",
    name: "Record Label",
    emoji: "🎶",
    industry: "entertainment",
    tier: 2,
    cost: 6_000_000,
    baseRevenue: 220_000,
    baseCost: 60_000,
    flavor: "Sign the next Burna.",
    upgradeTo: "arena",
  },
  arena: {
    id: "arena",
    name: "Concert Arena",
    emoji: "🎤",
    industry: "entertainment",
    tier: 3,
    cost: 40_000_000,
    baseRevenue: 1_400_000,
    baseCost: 380_000,
    flavor: "Sold out in 3 minutes.",
  },
};

export interface FlexDef {
  id: string;
  name: string;
  emoji: string;
  category: "garage" | "fashion" | "pets" | "aviation";
  tier: number;
  cost: number;
  credBoost: number;
  sapaRelief: number;
  flavor: string;
}

export const FLEX_CATALOG: Record<string, FlexDef> = {
  maybach: {
    id: "maybach",
    name: "Mercedes-Maybach S-Class",
    emoji: "🚘",
    category: "garage",
    tier: 1,
    cost: 120_000_000,
    credBoost: 40,
    sapaRelief: 3,
    flavor: "Chauffeur-driven, always.",
  },
  range_rover: {
    id: "range_rover",
    name: "Range Rover Autobiography",
    emoji: "🚙",
    category: "garage",
    tier: 1,
    cost: 95_000_000,
    credBoost: 32,
    sapaRelief: 2,
    flavor: "The Lekki standard.",
  },
  escalade: {
    id: "escalade",
    name: "Cadillac Escalade",
    emoji: "🚗",
    category: "garage",
    tier: 1,
    cost: 110_000_000,
    credBoost: 36,
    sapaRelief: 2,
    flavor: "Big body, big presence.",
  },
  urus: {
    id: "urus",
    name: "Lamborghini Urus",
    emoji: "🏎️",
    category: "garage",
    tier: 2,
    cost: 350_000_000,
    credBoost: 85,
    sapaRelief: 5,
    flavor: "SUV with supercar DNA.",
  },
  sf90: {
    id: "sf90",
    name: "Ferrari SF90 Stradale",
    emoji: "🏎️",
    category: "garage",
    tier: 2,
    cost: 480_000_000,
    credBoost: 110,
    sapaRelief: 6,
    flavor: "Hybrid hypercar royalty.",
  },
  gt3rs: {
    id: "gt3rs",
    name: "Porsche 911 GT3 RS",
    emoji: "🏎️",
    category: "garage",
    tier: 2,
    cost: 420_000_000,
    credBoost: 95,
    sapaRelief: 5,
    flavor: "Track weapon, street legend.",
  },
  chiron: {
    id: "chiron",
    name: "Bugatti Chiron Pur Sport",
    emoji: "🏁",
    category: "garage",
    tier: 3,
    cost: 3_500_000_000,
    credBoost: 400,
    sapaRelief: 15,
    flavor: "1,500hp of pure flex.",
  },
  boat_tail: {
    id: "boat_tail",
    name: "Rolls-Royce Boat Tail",
    emoji: "⛵",
    category: "garage",
    tier: 3,
    cost: 4_200_000_000,
    credBoost: 480,
    sapaRelief: 18,
    flavor: "Only three exist. You own one.",
  },
  huayra: {
    id: "huayra",
    name: "Pagani Huayra",
    emoji: "🏎️",
    category: "garage",
    tier: 3,
    cost: 2_800_000_000,
    credBoost: 340,
    sapaRelief: 12,
    flavor: "Art on wheels.",
  },
  jesko: {
    id: "jesko",
    name: "Koenigsegg Jesko",
    emoji: "🏎️",
    category: "garage",
    tier: 3,
    cost: 3_200_000_000,
    credBoost: 380,
    sapaRelief: 14,
    flavor: "300mph of Swedish madness.",
  },
  agbada: {
    id: "agbada",
    name: "Custom Gold-Thread Agbada & Royal Cap",
    emoji: "👑",
    category: "fashion",
    tier: 1,
    cost: 8_000_000,
    credBoost: 25,
    sapaRelief: 1,
    flavor: "Owambe royalty.",
  },
  cuban: {
    id: "cuban",
    name: "Diamond-Encrusted Cuban Link Chain",
    emoji: "💎",
    category: "fashion",
    tier: 1,
    cost: 15_000_000,
    credBoost: 35,
    sapaRelief: 1,
    flavor: "Ice so cold it hurts.",
  },
  savile: {
    id: "savile",
    name: "Bespoke Savile Row Suit",
    emoji: "🤵",
    category: "fashion",
    tier: 1,
    cost: 12_000_000,
    credBoost: 30,
    sapaRelief: 1,
    flavor: "Boardroom sharp.",
  },
  birkin: {
    id: "birkin",
    name: "Hermès Birkin 25 (Togo Leather)",
    emoji: "👜",
    category: "fashion",
    tier: 2,
    cost: 90_000_000,
    credBoost: 70,
    sapaRelief: 4,
    flavor: "Waitlist? You skip it.",
  },
  himalayan: {
    id: "himalayan",
    name: "Hermès Himalayan Crocodile Birkin",
    emoji: "👜",
    category: "fashion",
    tier: 3,
    cost: 650_000_000,
    credBoost: 220,
    sapaRelief: 10,
    flavor: "The rarest bag on earth.",
  },
  richard_mille: {
    id: "richard_mille",
    name: "Richard Mille Tourbillon",
    emoji: "⌚",
    category: "fashion",
    tier: 3,
    cost: 800_000_000,
    credBoost: 260,
    sapaRelief: 12,
    flavor: "Wristwear for the top 0.01%.",
  },
  patek: {
    id: "patek",
    name: "Patek Philippe Grandmaster Chime",
    emoji: "⌚",
    category: "fashion",
    tier: 3,
    cost: 1_200_000_000,
    credBoost: 320,
    sapaRelief: 15,
    flavor: "The ultimate horological flex.",
  },
  trunk_set: {
    id: "trunk_set",
    name: "Limited-Edition Trunk Luggage Set",
    emoji: "🧳",
    category: "fashion",
    tier: 2,
    cost: 45_000_000,
    credBoost: 45,
    sapaRelief: 3,
    flavor: "Travel like a diplomat.",
  },
  caucasian: {
    id: "caucasian",
    name: "Pedigree Caucasian Shepherd",
    emoji: "🐕",
    category: "pets",
    tier: 1,
    cost: 6_000_000,
    credBoost: 20,
    sapaRelief: 2,
    flavor: "Guards the compound, no wahala.",
  },
  doberman: {
    id: "doberman",
    name: "Imported Trained Doberman",
    emoji: "🐕‍🦺",
    category: "pets",
    tier: 1,
    cost: 4_500_000,
    credBoost: 18,
    sapaRelief: 2,
    flavor: "Obedient, alert, intimidating.",
  },
  mastiff: {
    id: "mastiff",
    name: "Tibetan Mastiff",
    emoji: "🐕",
    category: "pets",
    tier: 2,
    cost: 35_000_000,
    credBoost: 55,
    sapaRelief: 4,
    flavor: "A lion in dog form.",
  },
  panther: {
    id: "panther",
    name: "Exotic Black Panther",
    emoji: "🐆",
    category: "pets",
    tier: 3,
    cost: 250_000_000,
    credBoost: 180,
    sapaRelief: 8,
    flavor: "The ultimate status flex.",
  },
  tiger_cub: {
    id: "tiger_cub",
    name: "Tiger Cub",
    emoji: "🐯",
    category: "pets",
    tier: 3,
    cost: 180_000_000,
    credBoost: 150,
    sapaRelief: 7,
    flavor: "Cute now, king later.",
  },
  gulfstream: {
    id: "gulfstream",
    name: "Gulfstream G650ER Private Jet",
    emoji: "✈️",
    category: "aviation",
    tier: 2,
    cost: 4_500_000_000,
    credBoost: 500,
    sapaRelief: 20,
    flavor: "Lagos to London, non-stop.",
  },
  bombardier: {
    id: "bombardier",
    name: "Bombardier Global 7500",
    emoji: "✈️",
    category: "aviation",
    tier: 2,
    cost: 5_200_000_000,
    credBoost: 560,
    sapaRelief: 22,
    flavor: "The longest-range business jet.",
  },
  airbus_custom: {
    id: "airbus_custom",
    name: "Custom Boeing Business Jet (A380 Custom)",
    emoji: "🛩️",
    category: "aviation",
    tier: 3,
    cost: 25_000_000_000,
    credBoost: 1500,
    sapaRelief: 40,
    flavor: "A flying mansion.",
  },
  superyacht: {
    id: "superyacht",
    name: "150ft Luxury Superyacht",
    emoji: "🛥️",
    category: "aviation",
    tier: 3,
    cost: 12_000_000_000,
    credBoost: 900,
    sapaRelief: 30,
    flavor: "Docked at V.I. Jetty.",
  },
  banana_island: {
    id: "banana_island",
    name: "Banana Island Waterfront Estate",
    emoji: "🏝️",
    category: "aviation",
    tier: 3,
    cost: 8_000_000_000,
    credBoost: 700,
    sapaRelief: 25,
    flavor: "The address that ends all addresses.",
  },
  caribbean: {
    id: "caribbean",
    name: "Private Caribbean Island",
    emoji: "🌴",
    category: "aviation",
    tier: 3,
    cost: 30_000_000_000,
    credBoost: 1800,
    sapaRelief: 50,
    flavor: "Your own country, basically.",
  },
};

export interface GarageDef {
  id: string;
  name: string;
  emoji: string;
  tier: number;
  cost: number;
  revenueBonus: number;
  credBoost: number;
  flavor: string;
}

export const GARAGE_CATALOG: Record<string, GarageDef> = {
  polo: {
    id: "polo",
    name: "Rickety Volkswagen Polo",
    emoji: "🚗",
    tier: 1,
    cost: 800_000,
    revenueBonus: 0.02,
    credBoost: 3,
    flavor: "It starts... sometimes.",
  },
  corolla: {
    id: "corolla",
    name: "Tokunbo Toyota Corolla",
    emoji: "🚙",
    tier: 1,
    cost: 3_500_000,
    revenueBonus: 0.05,
    credBoost: 8,
    flavor: "Reliable, no wahala.",
  },
  camry: {
    id: "camry",
    name: "Clean Toyota Camry",
    emoji: "🚘",
    tier: 2,
    cost: 12_000_000,
    revenueBonus: 0.09,
    credBoost: 15,
    flavor: "Smooth, quiet, respected.",
  },
  highlander: {
    id: "highlander",
    name: "Toyota Highlander",
    emoji: "🚙",
    tier: 2,
    cost: 35_000_000,
    revenueBonus: 0.14,
    credBoost: 25,
    flavor: "Family SUV, boardroom presence.",
  },
  prado: {
    id: "prado",
    name: "Toyota Land Cruiser Prado",
    emoji: "🚙",
    tier: 2,
    cost: 75_000_000,
    revenueBonus: 0.20,
    credBoost: 40,
    flavor: "The politician's choice.",
  },
  g_wagon: {
    id: "g_wagon",
    name: "Brand-New Mercedes G-Wagon",
    emoji: "🚙",
    tier: 3,
    cost: 250_000_000,
    revenueBonus: 0.30,
    credBoost: 70,
    flavor: "The ultimate statement.",
  },
  lexus_lx: {
    id: "lexus_lx",
    name: "Lexus LX 600",
    emoji: "🚘",
    tier: 3,
    cost: 180_000_000,
    revenueBonus: 0.26,
    credBoost: 60,
    flavor: "Quiet luxury, loud respect.",
  },
  bentley: {
    id: "bentley",
    name: "Bentley Bentayga",
    emoji: "🚘",
    tier: 3,
    cost: 400_000_000,
    revenueBonus: 0.38,
    credBoost: 90,
    flavor: "Handcrafted in Crewe.",
  },
};

export interface StockDef {
  symbol: string;
  name: string;
  emoji: string;
  basePrice: number;
  volatility: number;
}

export const STOCK_CATALOG: Record<string, StockDef> = {
  DANGCEM: {
    symbol: "DANGCEM",
    name: "Dangote Cement",
    emoji: "🏭",
    basePrice: 450,
    volatility: 0.05,
  },
  MTNN: {
    symbol: "MTNN",
    name: "MTN Nigeria",
    emoji: "📱",
    basePrice: 220,
    volatility: 0.06,
  },
  GTCO: {
    symbol: "GTCO",
    name: "Guaranty Trust Holding",
    emoji: "🏦",
    basePrice: 45,
    volatility: 0.07,
  },
  ZENITH: {
    symbol: "ZENITH",
    name: "Zenith Bank",
    emoji: "🏛️",
    basePrice: 38,
    volatility: 0.06,
  },
  AIRTEL: {
    symbol: "AIRTEL",
    name: "Airtel Africa",
    emoji: "📡",
    basePrice: 2100,
    volatility: 0.08,
  },
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    emoji: "₿",
    basePrice: 95_000_000,
    volatility: 0.15,
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    emoji: "Ξ",
    basePrice: 5_200_000,
    volatility: 0.18,
  },
  SOL: {
    symbol: "SOL",
    name: "Solana",
    emoji: "◎",
    basePrice: 320_000,
    volatility: 0.22,
  },
  DOGE: {
    symbol: "DOGE",
    name: "Dogecoin",
    emoji: "🐕",
    basePrice: 45_000,
    volatility: 0.30,
  },
};

export interface GameEventChoice {
  label: string;
  note: string;
  cash: number;
  sapa: number;
  cred: number;
}

export interface GameEvent {
  id: string;
  headline: string;
  body: string;
  emoji: string;
  choices: GameEventChoice[];
}

export const EVENTS: GameEvent[] = [
  {
    id: "fuel",
    headline: "Fuel Scarcity Crisis",
    body: "NNPC queues stretch for miles. Fuel is now 2x the price. Your fleet needs to move.",
    emoji: "⛽",
    choices: [
      {
        label: "Pay 2x fuel cost",
        note: "Keep operating at full capacity.",
        cash: -50_000,
        sapa: 0,
        cred: 5,
      },
      {
        label: "Park vehicles for the day",
        note: "Save cash, lose revenue.",
        cash: 0,
        sapa: 5,
        cred: -3,
      },
    ],
  },
  {
    id: "blackout",
    headline: "Grid Power Outage",
    body: "NEPA has taken light again. Your operations are running on fumes.",
    emoji: "🔌",
    choices: [
      {
        label: "Buy diesel generator",
        note: "100% output maintained.",
        cash: -150_000,
        sapa: 0,
        cred: 3,
      },
      {
        label: "Work in the dark",
        note: "Sales drop 40% today.",
        cash: 0,
        sapa: 8,
        cred: -5,
      },
    ],
  },
  {
    id: "union",
    headline: "Union / Association Dues Hike",
    body: "The transport union has increased dues. Pay up or face protests.",
    emoji: "📢",
    choices: [
      {
        label: "Pay increased dues",
        note: "Keep the peace, gain credibility.",
        cash: -30_000,
        sapa: 0,
        cred: 5,
      },
      {
        label: "Refuse to pay",
        note: "Protests reduce efficiency 10%.",
        cash: 0,
        sapa: 10,
        cred: -8,
      },
    ],
  },
  {
    id: "viral",
    headline: "Viral Social Media Review",
    body: "A TikToker just posted about your business — 2M views and counting!",
    emoji: "📱",
    choices: [
      {
        label: "Capitalize with a discount",
        note: "+50% revenue for 10 mins, small promo budget.",
        cash: -20_000,
        sapa: 0,
        cred: 15,
      },
      {
        label: "Do nothing",
        note: "Ride the wave passively.",
        cash: 0,
        sapa: 0,
        cred: 5,
      },
    ],
  },
  {
    id: "rent",
    headline: "Landlord Rent Increase",
    body: "Your landlord wants 40% more rent. 'Inflation is affecting everybody,' he says.",
    emoji: "🏚️",
    choices: [
      {
        label: "Pay the new rent",
        note: "Stay put, keep customers.",
        cash: -200_000,
        sapa: 0,
        cred: 2,
      },
      {
        label: "Relocate business",
        note: "Cheaper, but 20% sales loss during move.",
        cash: -100_000,
        sapa: 5,
        cred: -5,
      },
    ],
  },
  {
    id: "audit",
    headline: "Government Regulatory Audit",
    body: "FIRS officials are at your door with a compliance checklist.",
    emoji: "📋",
    choices: [
      {
        label: "Hire tax consultant",
        note: "Full compliance, clean books.",
        cash: -80_000,
        sapa: 0,
        cred: 8,
      },
      {
        label: "Try to bribe official",
        note: "Risky — 30% chance of ₦500k fine.",
        cash: -30_000,
        sapa: 15,
        cred: -10,
      },
    ],
  },
  {
    id: "chef",
    headline: "Buka Chef Headhunted",
    body: "A rival restaurant is poaching your head chef. He wants a raise.",
    emoji: "👨‍🍳",
    choices: [
      {
        label: "Raise salary by 25%",
        note: "Keep output, higher expenses.",
        cash: -60_000,
        sapa: 0,
        cred: 5,
      },
      {
        label: "Let chef leave",
        note: "Food quality drops 30% for 3 days.",
        cash: 0,
        sapa: 8,
        cred: -6,
      },
    ],
  },
  {
    id: "pos_cash",
    headline: "POS Cash Shortage",
    body: "Your POS terminals are running low on cash. Customers are getting frustrated.",
    emoji: "💸",
    choices: [
      {
        label: "Rush cash from bank",
        note: "Small transport cost, keep customers.",
        cash: -10_000,
        sapa: 0,
        cred: 3,
      },
      {
        label: "Turn away customers",
        note: "Missed fees, damaged reputation.",
        cash: -40_000,
        sapa: 5,
        cred: -5,
      },
    ],
  },
  {
    id: "flood",
    headline: "Rainstorm Flash Flood",
    body: "Heavy rain has flooded your business area. Water is rising.",
    emoji: "🌊",
    choices: [
      {
        label: "Pay emergency repair team",
        note: "Quick fix, back to business.",
        cash: -60_000,
        sapa: 0,
        cred: 3,
      },
      {
        label: "Wait it out",
        note: "No operations for 15 minutes.",
        cash: 0,
        sapa: 10,
        cred: -4,
      },
    ],
  },
  {
    id: "inflation",
    headline: "Foreign Exchange / Inflation Surge",
    body: "The naira has weakened. Import costs are up across the board.",
    emoji: "📈",
    choices: [
      {
        label: "Increase prices by 15%",
        note: "Keep margin, risk losing 10% customers.",
        cash: 0,
        sapa: 5,
        cred: -3,
      },
      {
        label: "Keep prices the same",
        note: "Lose profit margin, keep loyalty.",
        cash: -40_000,
        sapa: 0,
        cred: 8,
      },
    ],
  },
];

export interface BadgeDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  check: (ctx: {
    netWorth: number;
    cash: number;
    sapa: number;
    assets: number;
    cred: number;
    daysPlayed: number;
    industry: IndustryKey;
  }) => boolean;
}

export const BADGES: BadgeDef[] = [
  {
    id: "first_million",
    name: "First Millionaire",
    emoji: "💵",
    description: "Reach ₦1,000,000 net worth.",
    check: (c) => c.netWorth >= 1_000_000,
  },
  {
    id: "sapa_survivor",
    name: "Sapa Survivor",
    emoji: "🏃",
    description: "Keep Sapa Meter under 10% for 5 days.",
    check: (c) => c.sapa < 10 && c.daysPlayed >= 5,
  },
  {
    id: "lekki_landlord",
    name: "Lekki Landlord",
    emoji: "🏘️",
    description: "Reach ₦50,000,000 net worth.",
    check: (c) => c.netWorth >= 50_000_000,
  },
  {
    id: "transport_king",
    name: "Lagos Transport Kingpin",
    emoji: "🚐",
    description: "Own 3+ transport assets.",
    check: (c) => c.industry === "transport" && c.assets >= 3,
  },
  {
    id: "amala_billionaire",
    name: "Amala Billionaire",
    emoji: "🍛",
    description: "Reach ₦1B net worth in the food business.",
    check: (c) => c.industry === "buka" && c.netWorth >= 1_000_000_000,
  },
  {
    id: "cred_king",
    name: "Street Cred King",
    emoji: "⭐",
    description: "Reach 200 Street Cred.",
    check: (c) => c.cred >= 200,
  },
  {
    id: "empire_builder",
    name: "Empire Builder",
    emoji: "🏗️",
    description: "Own 10+ assets.",
    check: (c) => c.assets >= 10,
  },
  {
    id: "billionaire",
    name: "Naira Billionaire",
    emoji: "💎",
    description: "Reach ₦1,000,000,000 net worth.",
    check: (c) => c.netWorth >= 1_000_000_000,
  },
  {
    id: "trillionaire",
    name: "Trillion Naira Titan",
    emoji: "👑",
    description: "Reach ₦1,000,000,000,000 net worth.",
    check: (c) => c.netWorth >= 1_000_000_000_000,
  },
];

export interface OwnedAsset {
  id: string;
  defId: string;
  level: number;
  manager: boolean;
}

export interface OwnedFlex {
  id: string;
  defId: string;
}

export interface OwnedGarage {
  id: string;
  defId: string;
}

export interface AuctionLot {
  id: string;
  assetDefId: string;
  companyName: string;
  city: CityKey;
  industry: IndustryKey;
  discount: number;
}

export interface ArtistDef {
  id: string;
  name: string;
  emoji: string;
  signingCost: number;
  baseRoyalty: number;
  singleCost: number;
  flavor: string;
}

export const ARTIST_CATALOG: Record<string, ArtistDef> = {
  street_rapper: {
    id: "street_rapper",
    name: "Street Rapper (Agege)",
    emoji: "🎤",
    signingCost: 500_000,
    baseRoyalty: 25_000,
    singleCost: 150_000,
    flavor: "Bars so hard, they cut.",
  },
  afro_fusion: {
    id: "afro_fusion",
    name: "Afro-Fusion Singer",
    emoji: "🎶",
    signingCost: 2_500_000,
    baseRoyalty: 120_000,
    singleCost: 500_000,
    flavor: "Melodies that travel.",
  },
  amapiano_dj: {
    id: "amapiano_dj",
    name: "Amapiano DJ",
    emoji: "🎧",
    signingCost: 8_000_000,
    baseRoyalty: 400_000,
    singleCost: 1_200_000,
    flavor: "Log drums for days.",
  },
  afrobeats_star: {
    id: "afrobeats_star",
    name: "Afrobeats Superstar",
    emoji: "🌟",
    signingCost: 40_000_000,
    baseRoyalty: 2_000_000,
    singleCost: 5_000_000,
    flavor: "Grammy nominations incoming.",
  },
  global_icon: {
    id: "global_icon",
    name: "Global Music Icon",
    emoji: "🏆",
    signingCost: 250_000_000,
    baseRoyalty: 12_000_000,
    singleCost: 25_000_000,
    flavor: "Sells out stadiums worldwide.",
  },
};

export interface OwnedArtist {
  id: string;
  defId: string;
  hits: number;
}

export interface NightclubDef {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  baseRevenue: number;
  flavor: string;
}

export const NIGHTCLUB_CATALOG: Record<string, NightclubDef> = {
  lounge: {
    id: "lounge",
    name: "Rooftop Lounge",
    emoji: "🍸",
    cost: 5_000_000,
    baseRevenue: 180_000,
    flavor: "Cocktails and city views.",
  },
  vip_club: {
    id: "vip_club",
    name: "VIP Nightclub (V.I.)",
    emoji: "🍾",
    cost: 40_000_000,
    baseRevenue: 1_400_000,
    flavor: "Bottles, beats, and big boys.",
  },
  mega_club: {
    id: "mega_club",
    name: "Mega Club & Concert Hall",
    emoji: "🎉",
    cost: 250_000_000,
    baseRevenue: 8_000_000,
    flavor: "Detty December headquarters.",
  },
};

export interface OwnedClub {
  id: string;
  defId: string;
  level: number;
}

export interface JapaDef {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  revenueBonus: number;
  sapaRelief: number;
  flavor: string;
}

export const JAPA_DESTINATIONS: Record<string, JapaDef> = {
  uk: {
    id: "uk",
    name: "United Kingdom",
    emoji: "🇬🇧",
    cost: 500_000_000,
    revenueBonus: 0.25,
    sapaRelief: 20,
    flavor: "London, here we come.",
  },
  canada: {
    id: "canada",
    name: "Canada",
    emoji: "🇨🇦",
    cost: 600_000_000,
    revenueBonus: 0.30,
    sapaRelief: 25,
    flavor: "Maple syrup and peace of mind.",
  },
  usa: {
    id: "usa",
    name: "United States",
    emoji: "🇺🇸",
    cost: 800_000_000,
    revenueBonus: 0.40,
    sapaRelief: 30,
    flavor: "The American dream, Naija edition.",
  },
};

export interface PoliticalOfficeDef {
  id: string;
  name: string;
  emoji: string;
  campaignCost: number;
  minApproval: number;
  contractBonus: number;
  flavor: string;
}

export const POLITICAL_OFFICES: Record<string, PoliticalOfficeDef> = {
  councillor: {
    id: "councillor",
    name: "Local Government Councillor",
    emoji: "🏛️",
    campaignCost: 50_000_000,
    minApproval: 30,
    contractBonus: 0.15,
    flavor: "Start from the grassroots.",
  },
  senator: {
    id: "senator",
    name: "Senator",
    emoji: "🎖️",
    campaignCost: 500_000_000,
    minApproval: 50,
    contractBonus: 0.35,
    flavor: "Red chamber, big contracts.",
  },
  governor: {
    id: "governor",
    name: "State Governor",
    emoji: "👔",
    campaignCost: 2_000_000_000,
    minApproval: 70,
    contractBonus: 0.60,
    flavor: "Executive power, mega deals.",
  },
};

export interface DettyAssetDef {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  baseRevenue: number;
  flavor: string;
}

export const DETTY_ASSETS: Record<string, DettyAssetDef> = {
  concert_stage: {
    id: "concert_stage",
    name: "Detty December Concert Stage",
    emoji: "🎪",
    cost: 15_000_000,
    baseRevenue: 900_000,
    flavor: "Sold out in 3 minutes.",
  },
  beach_party: {
    id: "beach_party",
    name: "Beach Party Arena",
    emoji: "🏖️",
    cost: 8_000_000,
    baseRevenue: 500_000,
    flavor: "Sand, sun, and sound systems.",
  },
  vip_lounge: {
    id: "vip_lounge",
    name: "Detty VIP Lounge",
    emoji: "🥂",
    cost: 25_000_000,
    baseRevenue: 1_500_000,
    flavor: "Bottles for the big boys.",
  },
  carnival_float: {
    id: "carnival_float",
    name: "Carnival Float Sponsorship",
    emoji: "🎭",
    cost: 5_000_000,
    baseRevenue: 320_000,
    flavor: "Your brand on every float.",
  },
};

export interface SquadAssetDef {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  baseRevenue: number;
  flavor: string;
}

export const SQUAD_ASSETS: Record<string, SquadAssetDef> = {
  shipping_dock: {
    id: "shipping_dock",
    name: "Shipping Dock",
    emoji: "🚢",
    cost: 500_000_000,
    baseRevenue: 15_000_000,
    flavor: "Containers in, naira out.",
  },
  private_airport: {
    id: "private_airport",
    name: "Private Airport Terminal",
    emoji: "🛫",
    cost: 2_000_000_000,
    baseRevenue: 60_000_000,
    flavor: "Your own runway.",
  },
  oil_bloc: {
    id: "oil_bloc",
    name: "Oil Bloc (Joint Venture)",
    emoji: "🛢️",
    cost: 5_000_000_000,
    baseRevenue: 150_000_000,
    flavor: "Black gold, shared profits.",
  },
};

export interface AvatarItemDef {
  id: string;
  name: string;
  emoji: string;
  slot: "top" | "bottom" | "shoes" | "accessory";
  cost: number;
  credBoost: number;
  flavor: string;
}

export const AVATAR_ITEMS: Record<string, AvatarItemDef> = {
  okrika_shirt: {
    id: "okrika_shirt",
    name: "Faded Okrika Shirt",
    emoji: "👕",
    slot: "top",
    cost: 5_000,
    credBoost: 1,
    flavor: "Second-hand, first-class hustle.",
  },
  ankara_top: {
    id: "ankara_top",
    name: "Ankara Print Top",
    emoji: "👚",
    slot: "top",
    cost: 50_000,
    credBoost: 5,
    flavor: "Local fabric, global style.",
  },
  agbada_full: {
    id: "agbada_full",
    name: "Full Agbada Set",
    emoji: "🥻",
    slot: "top",
    cost: 2_000_000,
    credBoost: 25,
    flavor: "Three-piece royalty.",
  },
  designer_suit: {
    id: "designer_suit",
    name: "Designer Italian Suit",
    emoji: "🤵",
    slot: "top",
    cost: 8_000_000,
    credBoost: 40,
    flavor: "Milan to Lagos, non-stop.",
  },
  jeans: {
    id: "jeans",
    name: "Faded Denim Jeans",
    emoji: "👖",
    slot: "bottom",
    cost: 15_000,
    credBoost: 2,
    flavor: "Comfortable and street-ready.",
  },
  tailored_trousers: {
    id: "tailored_trousers",
    name: "Tailored Trousers",
    emoji: "👖",
    slot: "bottom",
    cost: 300_000,
    credBoost: 10,
    flavor: "Sharp crease, sharp mind.",
  },
  sneakers: {
    id: "sneakers",
    name: "Designer Sneakers",
    emoji: "👟",
    slot: "shoes",
    cost: 1_500_000,
    credBoost: 20,
    flavor: "Fresh kicks, fresh deals.",
  },
  leather_shoes: {
    id: "leather_shoes",
    name: "Italian Leather Shoes",
    emoji: "👞",
    slot: "shoes",
    cost: 5_000_000,
    credBoost: 30,
    flavor: "Handmade, hand-stitched.",
  },
  gold_chain: {
    id: "gold_chain",
    name: "Gold Chain",
    emoji: "📿",
    slot: "accessory",
    cost: 3_000_000,
    credBoost: 35,
    flavor: "Heavy on the neck, heavy on the flex.",
  },
  luxury_watch: {
    id: "luxury_watch",
    name: "Luxury Wristwatch",
    emoji: "⌚",
    slot: "accessory",
    cost: 20_000_000,
    credBoost: 60,
    flavor: "Time is money, literally.",
  },
  designer_sunglasses: {
    id: "designer_sunglasses",
    name: "Designer Sunglasses",
    emoji: "🕶️",
    slot: "accessory",
    cost: 800_000,
    credBoost: 15,
    flavor: "Cool under pressure.",
  },
};

export interface NairaXPost {
  id: string;
  handle: string;
  avatar: string;
  verified: boolean;
  text: string;
  time: string;
  likes: number;
  reposts: number;
  replies: number;
}

export interface PlayerState {
  started: boolean;
  email: string;
  username: string;
  companyName: string;
  industry: IndustryKey;
  city: CityKey;
  districtId: string;
  title: TitleKey;
  cash: number;
  sapa: number;
  streetCred: number;
  policeHeat: number;
  legitimacy: number;
  level: number;
  daysPlayed: number;
  assets: OwnedAsset[];
  flex: OwnedFlex[];
  garage: OwnedGarage[];
  holdings: Record<string, number>;
  stockPrices: Record<string, number>;
  auctions: AuctionLot[];
  loanBalance: number;
  loanRate: number;
  insurance: boolean;
  staffWages: number;
  ticker: string[];
  pendingEvent: GameEvent | null;
  showCert: boolean;
  bankrupt: boolean;
  unlockedBadges: string[];
  lastDelta: { amount: number; reason: string } | null;
  signedArtists: OwnedArtist[];
  clubs: OwnedClub[];
  japaDestination: string | null;
  office: string | null;
  publicApproval: number;
  dettyAssets: { id: string; defId: string }[];
  dettyActive: boolean;
  squadName: string | null;
  squadMembers: number;
  squadAssets: { id: string; defId: string }[];
  avatarOwned: string[];
  avatarEquipped: string[];
  nairaX: NairaXPost[];
}

export const STARTING_CASH = 100_000;
export const MANAGER_COST = 250_000;
export const INSURANCE_COST = 500_000;
export const LOAN_SAPA_PENALTY = 12;
export const REPAY_SAPA_RELIEF = 8;