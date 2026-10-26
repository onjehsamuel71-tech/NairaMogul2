import type { PlayerState, IndustryKey, CityKey } from "@/lib/gameData";

export interface HeirloomDef {
  id: string;
  name: string;
  emoji: string;
  bonus: string;
  multiplier: number;
  flavor: string;
}

export const HEIRLOOMS: Record<string, HeirloomDef> = {
  gold_ring: {
    id: "gold_ring",
    name: "Grandfather's Gold Ring",
    emoji: "💍",
    bonus: "+10% all revenue",
    multiplier: 0.1,
    flavor: "Passed down three generations.",
  },
  family_ledger: {
    id: "family_ledger",
    name: "Family Business Ledger",
    emoji: "📒",
    bonus: "+15% revenue, -5% expenses",
    multiplier: 0.15,
    flavor: "Every kobo accounted for since 1962.",
  },
  ancestral_land: {
    id: "ancestral_land",
    name: "Ancestral Land Deed",
    emoji: "📜",
    bonus: "+20% revenue",
    multiplier: 0.2,
    flavor: "The land never lies.",
  },
  royal_beads: {
    id: "royal_beads",
    name: "Royal Coral Beads",
    emoji: "📿",
    bonus: "+25% revenue, +10 cred",
    multiplier: 0.25,
    flavor: "Worn by chiefs and kings.",
  },
  diamond_crown: {
    id: "diamond_crown",
    name: "Diamond-Studded Crown",
    emoji: "👑",
    bonus: "+40% revenue, +25 cred",
    multiplier: 0.4,
    flavor: "For the dynasty that never falls.",
  },
};

export interface GenerationDef {
  gen: number;
  title: string;
  multiplier: number;
  heirloomId: string;
}

export const GENERATIONS: GenerationDef[] = [
  { gen: 1, title: "1st Generation Founder", multiplier: 1.0, heirloomId: "" },
  { gen: 2, title: "2nd Generation Dynasty", multiplier: 1.25, heirloomId: "gold_ring" },
  { gen: 3, title: "3rd Generation Empire", multiplier: 1.6, heirloomId: "family_ledger" },
  { gen: 4, title: "4th Generation Legacy", multiplier: 2.0, heirloomId: "ancestral_land" },
  { gen: 5, title: "5th Generation Royalty", multiplier: 2.5, heirloomId: "royal_beads" },
  { gen: 6, title: "6th Generation Monarch", multiplier: 3.2, heirloomId: "diamond_crown" },
];

export interface PrestigeState {
  generation: number;
  heirlooms: string[];
  dynastyName: string;
  totalRetirements: number;
}

export const PRESTIGE_UNLOCK_NET_WORTH = 500_000_000;

export function getGenerationDef(gen: number): GenerationDef {
  return GENERATIONS[Math.min(gen - 1, GENERATIONS.length - 1)];
}

export function getPrestigeMultiplier(gen: number): number {
  return getGenerationDef(gen).multiplier;
}

export function canPrestige(netWorth: number, gen: number): boolean {
  return netWorth >= PRESTIGE_UNLOCK_NET_WORTH * Math.pow(2, gen - 1);
}

export function createInitialPrestige(): PrestigeState {
  return {
    generation: 1,
    heirlooms: [],
    dynastyName: "",
    totalRetirements: 0,
  };
}

export function performPrestige(
  state: PlayerState,
  prestige: PrestigeState,
  heirName: string
): { state: PlayerState; prestige: PrestigeState } {
  const nextGen = prestige.generation + 1;
  const genDef = getGenerationDef(nextGen);
  const newHeirlooms = genDef.heirloomId
    ? [...prestige.heirlooms, genDef.heirloomId]
    : prestige.heirlooms;

  const freshState: PlayerState = {
    ...state,
    cash: 100_000,
    sapa: 0,
    streetCred: Math.floor(state.streetCred * 0.3),
    policeHeat: 0,
    legitimacy: 50,
    level: 1,
    daysPlayed: 0,
    assets: [],
    flex: [],
    garage: [],
    holdings: {},
    auctions: [],
    loanBalance: 0,
    loanRate: 0.05,
    insurance: false,
    staffWages: 0,
    pendingEvent: null,
    showCert: false,
    bankrupt: false,
    unlockedBadges: state.unlockedBadges,
    lastDelta: null,
    signedArtists: [],
    clubs: [],
    japaDestination: null,
    office: null,
    publicApproval: 0,
    dettyAssets: [],
    dettyActive: false,
    squadName: state.squadName,
    squadMembers: state.squadMembers,
    squadAssets: [],
    avatarOwned: state.avatarOwned,
    avatarEquipped: state.avatarEquipped,
    nairaX: [
      {
        id: `prestige_${Date.now()}`,
        handle: "@NairaXNews",
        avatar: "📰",
        verified: true,
        text: `BREAKING: ${state.companyName} founder retires. ${heirName} takes over as ${genDef.title}. The dynasty continues!`,
        time: "now",
        likes: 4200,
        reposts: 890,
        replies: 312,
      },
      ...state.nairaX.slice(0, 20),
    ],
  };

  const newPrestige: PrestigeState = {
    generation: nextGen,
    heirlooms: newHeirlooms,
    dynastyName: heirName,
    totalRetirements: prestige.totalRetirements + 1,
  };

  return { state: freshState, prestige: newPrestige };
}

export function getHeirloomMultiplier(prestige: PrestigeState): number {
  let total = 0;
  for (const id of prestige.heirlooms) {
    const h = HEIRLOOMS[id];
    if (h) total += h.multiplier;
  }
  return total;
}

export function getHeirloomCredBonus(prestige: PrestigeState): number {
  let total = 0;
  for (const id of prestige.heirlooms) {
    if (id === "royal_beads") total += 10;
    if (id === "diamond_crown") total += 25;
  }
  return total;
}

export interface OwanbeState {
  loginStreak: number;
  lastLoginDay: number;
  owanbeActive: boolean;
  owanbeMultiplier: number;
  owanbeExpiresDay: number;
  celebrityContacts: string[];
}

export function createInitialOwanbe(): OwanbeState {
  return {
    loginStreak: 0,
    lastLoginDay: -1,
    owanbeActive: false,
    owanbeMultiplier: 1,
    owanbeExpiresDay: 0,
    celebrityContacts: [],
  };
}

export interface SprayOption {
  id: string;
  label: string;
  cost: number;
  credGain: number;
  multiplier: number;
  flavor: string;
}

export const SPRAY_OPTIONS: SprayOption[] = [
  {
    id: "small",
    label: "Small Spray (₦50k)",
    cost: 50_000,
    credGain: 5,
    multiplier: 1.1,
    flavor: "Modest but respectful.",
  },
  {
    id: "medium",
    label: "Medium Spray (₦500k)",
    cost: 500_000,
    credGain: 25,
    multiplier: 1.3,
    flavor: "The crowd is watching.",
  },
  {
    id: "big",
    label: "Big Boy Spray (₦5M)",
    cost: 5_000_000,
    credGain: 80,
    multiplier: 1.6,
    flavor: "Money flying everywhere!",
  },
  {
    id: "legendary",
    label: "Legendary Spray (₦50M)",
    cost: 50_000_000,
    credGain: 250,
    multiplier: 2.5,
    flavor: "They will talk about this for years.",
  },
];

export const CELEBRITY_CONTACTS = [
  "Davido",
  "Burna Boy",
  "Wizkid",
  "Tiwa Savage",
  "Rema",
  "Asake",
  "Olamide",
  "Don Jazzy",
];

export interface LoanTier {
  id: string;
  name: string;
  emoji: string;
  principal: number;
  rate: number;
  weeks: number;
  flavor: string;
}

export const LOAN_TIERS: LoanTier[] = [
  {
    id: "micro",
    name: "Micro-Loan (Bank App)",
    emoji: "📱",
    principal: 500_000,
    rate: 0.08,
    weeks: 2,
    flavor: "Quick cash, quick repayment.",
  },
  {
    id: "sme",
    name: "SME Business Loan",
    emoji: "🏦",
    principal: 5_000_000,
    rate: 0.12,
    weeks: 4,
    flavor: "For the growing enterprise.",
  },
  {
    id: "shark",
    name: "Shark Loan (High Interest)",
    emoji: "🦈",
    principal: 50_000_000,
    rate: 0.25,
    weeks: 6,
    flavor: "Fast money, sharp teeth.",
  },
  {
    id: "syndicate",
    name: "Syndicate Loan",
    emoji: "💼",
    principal: 500_000_000,
    rate: 0.35,
    weeks: 8,
    flavor: "The big boys are watching.",
  },
];

export interface SoundEffect {
  id: string;
  name: string;
  emoji: string;
  trigger: string;
}

export const SOUND_EFFECTS: SoundEffect[] = [
  { id: "cash", name: "Cha-Ching!", emoji: "💰", trigger: "Buy asset" },
  { id: "generator", name: "Generator Chug", emoji: "🔊", trigger: "NEPA takes light" },
  { id: "hype", name: "Poco Lee Hype", emoji: "🔥", trigger: "Milestone reached" },
  { id: "sapa", name: "Sapa Alert", emoji: "😰", trigger: "Sapa meter high" },
  { id: "loan", name: "Loan Approved", emoji: "✅", trigger: "Loan taken" },
  { id: "seize", name: "Asset Seized", emoji: "🚨", trigger: "Loan default" },
];

export function playSound(id: string): void {
  try {
    const AudioCtx =
      (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    switch (id) {
      case "cash":
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      case "generator":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.3);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
      case "hype":
        osc.type = "square";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(660, now + 0.1);
        osc.frequency.setValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      case "sapa":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      case "loan":
        osc.type = "sine";
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.1);
        osc.frequency.setValueAtTime(784, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      case "seize":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.5);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
      default:
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    }
  } catch {
    // Audio not available — silently ignore
  }
}

export function getMilestoneSound(netWorth: number): string | null {
  const milestones = [
    100_000_000,
    1_000_000_000,
    10_000_000_000,
    100_000_000_000,
    1_000_000_000_000,
  ];
  for (const m of milestones) {
    if (netWorth >= m && netWorth < m * 1.5) return "hype";
  }
  return null;
}

export function getDynastyTitle(gen: number, companyName: string): string {
  const def = getGenerationDef(gen);
  return `${def.title} of ${companyName}`;
}

export function getHeirloomList(prestige: PrestigeState): HeirloomDef[] {
  return prestige.heirlooms
    .map((id) => HEIRLOOMS[id])
    .filter((h): h is HeirloomDef => Boolean(h));
}

export function getPrestigeSummary(prestige: PrestigeState): string {
  const def = getGenerationDef(prestige.generation);
  const heirloomCount = prestige.heirlooms.length;
  return `Generation ${prestige.generation} — ${def.title} (${heirloomCount} heirloom${heirloomCount === 1 ? "" : "s"})`;
}

export function getNextPrestigeRequirement(gen: number): number {
  return PRESTIGE_UNLOCK_NET_WORTH * Math.pow(2, gen - 1);
}

export function getTotalMultiplier(
  prestige: PrestigeState,
  owanbe: OwanbeState,
  industry: IndustryKey,
  city: CityKey
): number {
  let mult = getPrestigeMultiplier(prestige.generation);
  mult += getHeirloomMultiplier(prestige);
  if (owanbe.owanbeActive) mult *= owanbe.owanbeMultiplier;
  return mult;
}