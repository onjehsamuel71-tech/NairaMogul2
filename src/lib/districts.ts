import type { CityKey, IndustryKey } from "@/lib/gameData";

export type DistrictTier = "trenches" | "mainland" | "island";

export interface DistrictDef {
  id: string;
  name: string;
  city: CityKey;
  tier: DistrictTier;
  emoji: string;
  unlockNetWorth: number;
  riskLevel: "High" | "Medium" | "Low";
  flavor: string;
  industries: IndustryKey[];
  policeHeat: number;
  agberoPressure: number;
  taxRate: number;
}

export const DISTRICTS: DistrictDef[] = [
  {
    id: "mushin",
    name: "Mushin",
    city: "lagos",
    tier: "trenches",
    emoji: "🏚️",
    unlockNetWorth: 0,
    riskLevel: "High",
    flavor: "Where hustle meets survival. Watch your back.",
    industries: ["buka", "pos", "transport"],
    policeHeat: 8,
    agberoPressure: 12,
    taxRate: 0.02,
  },
  {
    id: "agege",
    name: "Agege",
    city: "lagos",
    tier: "trenches",
    emoji: "🥖",
    unlockNetWorth: 250_000,
    riskLevel: "High",
    flavor: "Agege bread, bet9ja stands, and okada runs.",
    industries: ["buka", "pos"],
    policeHeat: 10,
    agberoPressure: 14,
    taxRate: 0.02,
  },
  {
    id: "kubwa",
    name: "Kubwa",
    city: "abuja",
    tier: "trenches",
    emoji: "🏘️",
    unlockNetWorth: 500_000,
    riskLevel: "High",
    flavor: "Abuja's trenches. Big dreams, small capital.",
    industries: ["pos", "transport"],
    policeHeat: 7,
    agberoPressure: 9,
    taxRate: 0.02,
  },
  {
    id: "ikeja",
    name: "Ikeja",
    city: "lagos",
    tier: "mainland",
    emoji: "🏢",
    unlockNetWorth: 2_000_000,
    riskLevel: "Medium",
    flavor: "Corporate Lagos. POS networks and mini-imports.",
    industries: ["pos", "fashion", "agro"],
    policeHeat: 5,
    agberoPressure: 6,
    taxRate: 0.04,
  },
  {
    id: "yaba",
    name: "Yaba Tech Hub",
    city: "lagos",
    tier: "mainland",
    emoji: "💻",
    unlockNetWorth: 5_000_000,
    riskLevel: "Medium",
    flavor: "Where the coders and creators grind.",
    industries: ["entertainment", "fashion", "pos"],
    policeHeat: 4,
    agberoPressure: 4,
    taxRate: 0.05,
  },
  {
    id: "wuse",
    name: "Wuse 2",
    city: "abuja",
    tier: "mainland",
    emoji: "🏛️",
    unlockNetWorth: 8_000_000,
    riskLevel: "Medium",
    flavor: "Government contracts and political godfathers.",
    industries: ["realestate", "pos", "agro"],
    policeHeat: 6,
    agberoPressure: 3,
    taxRate: 0.06,
  },
  {
    id: "gra_ph",
    name: "GRA Phase 2",
    city: "ph",
    tier: "mainland",
    emoji: "🛢️",
    unlockNetWorth: 12_000_000,
    riskLevel: "Medium",
    flavor: "Oil money flows quietly in Port Harcourt.",
    industries: ["transport", "realestate", "entertainment"],
    policeHeat: 7,
    agberoPressure: 5,
    taxRate: 0.05,
  },
  {
    id: "vi",
    name: "Victoria Island",
    city: "lagos",
    tier: "island",
    emoji: "🌆",
    unlockNetWorth: 25_000_000,
    riskLevel: "Low",
    flavor: "Where the real money lives. VC pitches and nightlife.",
    industries: ["realestate", "entertainment", "fashion"],
    policeHeat: 3,
    agberoPressure: 2,
    taxRate: 0.08,
  },
  {
    id: "lekki",
    name: "Lekki Phase 1",
    city: "lagos",
    tier: "island",
    emoji: "🏝️",
    unlockNetWorth: 60_000_000,
    riskLevel: "Low",
    flavor: "New money paradise. Gated estates and supercars.",
    industries: ["realestate", "entertainment", "fashion"],
    policeHeat: 2,
    agberoPressure: 1,
    taxRate: 0.09,
  },
  {
    id: "banana",
    name: "Banana Island",
    city: "lagos",
    tier: "island",
    emoji: "🍌",
    unlockNetWorth: 250_000_000,
    riskLevel: "Low",
    flavor: "The address that ends all addresses.",
    industries: ["realestate", "entertainment"],
    policeHeat: 1,
    agberoPressure: 0,
    taxRate: 0.10,
  },
];

export const TIER_LABELS: Record<DistrictTier, { label: string; emoji: string; color: string }> = {
  trenches: { label: "The Trenches", emoji: "🏚️", color: "from-rose-500 to-orange-500" },
  mainland: { label: "Mainland Hustle", emoji: "🏢", color: "from-amber-500 to-yellow-500" },
  island: { label: "Island Flex", emoji: "🌆", color: "from-emerald-500 to-teal-500" },
};

export interface WahalaEvent {
  id: string;
  headline: string;
  body: string;
  emoji: string;
  choices: {
    label: string;
    note: string;
    cash: number;
    sapa: number;
    cred: number;
    heat: number;
    legitimacy: number;
  }[];
}

export const WAHALA_EVENTS: WahalaEvent[] = [
  {
    id: "agbero",
    headline: "Agbero & Area Boys Visit",
    body: "The area boys are at your shop. 'Oga, na small thing we dey ask for.'",
    emoji: "🚧",
    choices: [
      {
        label: "Pay protection money",
        note: "Keep the peace, lose some cash.",
        cash: -75_000,
        sapa: 0,
        cred: 5,
        heat: -5,
        legitimacy: -3,
      },
      {
        label: "Hire your own bouncers",
        note: "Expensive but permanent safety.",
        cash: -200_000,
        sapa: 0,
        cred: 15,
        heat: -10,
        legitimacy: 5,
      },
      {
        label: "Refuse them",
        note: "Risk random shop raids.",
        cash: 0,
        sapa: 15,
        cred: -10,
        heat: 20,
        legitimacy: 0,
      },
    ],
  },
  {
    id: "efcc",
    headline: "EFCC Is Knocking!",
    body: "Your cash jumped too fast. EFCC wants to see your books.",
    emoji: "🚔",
    choices: [
      {
        label: "Pay heavy fine & cooperate",
        note: "Lose 30% of net worth, but stay free.",
        cash: -500_000,
        sapa: 5,
        cred: -5,
        heat: -30,
        legitimacy: 20,
      },
      {
        label: "Hire top SAN lawyer",
        note: "Expensive but clean reputation.",
        cash: -1_500_000,
        sapa: 0,
        cred: 10,
        heat: -40,
        legitimacy: 25,
      },
      {
        label: "Flee the country briefly",
        note: "Lose 30% of net worth, heat resets.",
        cash: -2_000_000,
        sapa: 20,
        cred: -15,
        heat: -50,
        legitimacy: -10,
      },
    ],
  },
  {
    id: "godfather",
    headline: "Political Godfather Offer",
    body: "A senator wants you to sponsor his campaign. In return: government contracts.",
    emoji: "🎩",
    choices: [
      {
        label: "Accept the deal",
        note: "Huge cash boost, but scandal risk.",
        cash: 5_000_000,
        sapa: 0,
        cred: 30,
        heat: 25,
        legitimacy: -30,
      },
      {
        label: "Decline politely",
        note: "Stay clean, miss the bag.",
        cash: 0,
        sapa: 0,
        cred: 5,
        heat: -5,
        legitimacy: 15,
      },
    ],
  },
  {
    id: "sars",
    headline: "SARS Checkpoint Wahala",
    body: "Officers stop your convoy. 'Wetin dey inside the boot?'",
    emoji: "🛑",
    choices: [
      {
        label: "Settle them quietly",
        note: "Quick exit, small cash loss.",
        cash: -50_000,
        sapa: 0,
        cred: -3,
        heat: -5,
        legitimacy: -5,
      },
      {
        label: "Call your lawyer",
        note: "Slow but principled.",
        cash: -150_000,
        sapa: 0,
        cred: 10,
        heat: -15,
        legitimacy: 15,
      },
    ],
  },
];

export interface SapaMiniGame {
  id: string;
  title: string;
  emoji: string;
  description: string;
  reward: number;
  penalty: number;
  durationMs: number;
  targetTaps: number;
}

export const SAPA_MINIGAMES: SapaMiniGame[] = [
  {
    id: "landlord",
    title: "Running From Landlord",
    emoji: "🏃",
    description: "Your landlord is at the gate for rent arrears. Tap fast to escape!",
    reward: 25_000,
    penalty: 15_000,
    durationMs: 8_000,
    targetTaps: 20,
  },
  {
    id: "conductor",
    title: "Danfo Conductor Fast-Taps",
    emoji: "🚐",
    description: "Match exact change under pressure. 'Keep your change o!'",
    reward: 30_000,
    penalty: 10_000,
    durationMs: 8_000,
    targetTaps: 25,
  },
  {
    id: "bet9ja",
    title: "Bet9ja Ticket Rush",
    emoji: "🎫",
    description: "Customers are rushing your ticket stand. Serve them all!",
    reward: 20_000,
    penalty: 8_000,
    durationMs: 8_000,
    targetTaps: 18,
  },
];

export interface BragCard {
  title: string;
  netWorth: number;
  car: string;
  mansion: string;
  district: string;
  badge: string;
}