import {
  ASSET_CATALOG,
  BADGES,
  CITIES,
  FLEX_CATALOG,
  GARAGE_CATALOG,
  INSURANCE_COST,
  LOAN_SAPA_PENALTY,
  MANAGER_COST,
  REPAY_SAPA_RELIEF,
  STARTING_CASH,
  STOCK_CATALOG,
  type AuctionLot,
  type CityKey,
  type GameEvent,
  type IndustryKey,
  type OwnedAsset,
  type PlayerState,
  type TitleKey,
} from "@/lib/gameData";
import { DISTRICTS, WAHALA_EVENTS } from "@/lib/districts";

const initialStockPrices: Record<string, number> = {};
for (const s of Object.values(STOCK_CATALOG)) {
  initialStockPrices[s.symbol] = s.basePrice;
}

export const initialState: PlayerState = {
  started: false,
  email: "",
  username: "",
  companyName: "",
  industry: "transport",
  city: "lagos",
  districtId: "mushin",
  title: "chief",
  cash: STARTING_CASH,
  sapa: 0,
  streetCred: 10,
  policeHeat: 0,
  legitimacy: 50,
  level: 1,
  daysPlayed: 0,
  assets: [],
  flex: [],
  garage: [],
  holdings: {},
  stockPrices: initialStockPrices,
  auctions: [],
  loanBalance: 0,
  loanRate: 0.08,
  insurance: false,
  staffWages: 0,
  ticker: [],
  pendingEvent: null,
  showCert: false,
  bankrupt: false,
  unlockedBadges: [],
  lastDelta: null,
};

export interface StartPayload {
  companyName: string;
  industry: IndustryKey;
  city: CityKey;
  title: TitleKey;
  email?: string;
  username?: string;
}

export type Action =
  | { type: "START_GAME"; payload: StartPayload }
  | { type: "TICK" }
  | { type: "GRIND" }
  | { type: "BUY_ASSET"; defId: string }
  | { type: "UPGRADE_ASSET"; id: string }
  | { type: "TRANSFORM_ASSET"; id: string }
  | { type: "TOGGLE_MANAGER"; id: string }
  | { type: "SELL_ASSET"; id: string }
  | { type: "BUY_FLEX"; defId: string }
  | { type: "BUY_GARAGE"; defId: string }
  | { type: "TRADE_STOCK"; symbol: string; amount: number; side: "buy" | "sell" }
  | { type: "BORROW"; amount: number }
  | { type: "REPAY"; amount: number }
  | { type: "BUY_INSURANCE" }
  | { type: "QUEUE_EVENT"; event: GameEvent }
  | { type: "RESOLVE_EVENT"; choiceIdx: number }
  | { type: "BID_AUCTION"; lotId: string }
  | { type: "TRAVEL"; districtId: string }
  | { type: "RESOLVE_WAHALA"; eventId: string; choiceIdx: number }
  | { type: "SAPA_RESULT"; reward: number; penalty: number; won: boolean }
  | { type: "SHOW_CERT" }
  | { type: "HIDE_CERT" }
  | { type: "DISMISS_BANKRUPT" };

export function computeNetWorth(state: PlayerState): number {
  const assetValue = state.assets.reduce((s, a) => {
    const def = ASSET_CATALOG[a.defId];
    return s + def.cost * (1 + (a.level - 1) * 0.4);
  }, 0);
  const flexValue = state.flex.reduce((s, f) => {
    const def = FLEX_CATALOG[f.defId];
    return s + def.cost * 0.85;
  }, 0);
  const garageValue = state.garage.reduce((s, g) => {
    const def = GARAGE_CATALOG[g.defId];
    return s + def.cost * 0.8;
  }, 0);
  const holdingsValue = Object.entries(state.holdings).reduce(
    (s, [symbol, qty]) => {
      const price = state.stockPrices[symbol] ?? 0;
      return s + price * qty;
    },
    0
  );
  return (
    state.cash + assetValue + flexValue + garageValue + holdingsValue - state.loanBalance
  );
}

export function getCityUnlocks(netWorth: number) {
  return (Object.keys(CITIES) as CityKey[]).map((key) => ({
    key,
    ...CITIES[key],
    unlocked: netWorth >= CITIES[key].unlockNetWorth,
  }));
}

function computeLevel(netWorth: number): number {
  if (netWorth >= 1_000_000_000) return 5;
  if (netWorth >= 100_000_000) return 4;
  if (netWorth >= 10_000_000) return 3;
  if (netWorth >= 1_000_000) return 2;
  return 1;
}

function pushTicker(state: PlayerState, msg: string): string[] {
  return [msg, ...state.ticker].slice(0, 8);
}

function checkBadges(state: PlayerState): string[] {
  const netWorth = computeNetWorth(state);
  const ctx = {
    netWorth,
    cash: state.cash,
    sapa: state.sapa,
    assets: state.assets.length,
    cred: state.streetCred,
    daysPlayed: state.daysPlayed,
    industry: state.industry,
  };
  const newly = BADGES.filter(
    (b) => !state.unlockedBadges.includes(b.id) && b.check(ctx)
  ).map((b) => b.id);
  return [...state.unlockedBadges, ...newly];
}

function spawnAuction(state: PlayerState): AuctionLot | null {
  if (state.auctions.length >= 3) return null;
  const defIds = Object.keys(ASSET_CATALOG);
  const defId = defIds[Math.floor(Math.random() * defIds.length)];
  const def = ASSET_CATALOG[defId];
  const cities = Object.keys(CITIES) as CityKey[];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const names = [
    "Chief Balogun Ventures",
    "Mama Risi Foods",
    "SwiftPay Ltd",
    "Delta Haulage",
    "Aba Shoe Co.",
    "Eko Express",
    "Naija Agro Group",
  ];
  return {
    id: `lot_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    assetDefId: defId,
    companyName: names[Math.floor(Math.random() * names.length)],
    city,
    industry: def.industry,
    discount: 0.3 + Math.random() * 0.2,
  };
}

function driftStockPrices(
  prices: Record<string, number>
): Record<string, number> {
  const next: Record<string, number> = {};
  for (const def of Object.values(STOCK_CATALOG)) {
    const current = prices[def.symbol] ?? def.basePrice;
    const change = (Math.random() - 0.5) * 2 * def.volatility;
    const updated = Math.max(def.basePrice * 0.2, current * (1 + change));
    next[def.symbol] = updated;
  }
  return next;
}

export function gameReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case "START_GAME": {
      const { companyName, industry, city, title, email, username } =
        action.payload;
      const district = DISTRICTS.find((d) => d.city === city) ?? DISTRICTS[0];
      return {
        ...initialState,
        started: true,
        email: email ?? "",
        username: username ?? "",
        companyName,
        industry,
        city,
        districtId: district.id,
        title,
        ticker: [
          `🏁 ${companyName} registered in ${CITIES[city].name}.`,
          `💼 Industry: ${industry.toUpperCase()}. Starting capital ₦100,000.`,
        ],
      };
    }

    case "TICK": {
      const district =
        DISTRICTS.find((d) => d.id === state.districtId) ?? DISTRICTS[0];
      const garageBonus = state.garage.reduce((s, g) => {
        const def = GARAGE_CATALOG[g.defId];
        return s + def.revenueBonus;
      }, 0);

      const revenue =
        state.assets.reduce((s, a) => {
          const def = ASSET_CATALOG[a.defId];
          return s + def.baseRevenue * a.level * (a.manager ? 1.15 : 1);
        }, 0) *
        (1 + garageBonus);

      const expenses =
        state.assets.reduce((s, a) => {
          const def = ASSET_CATALOG[a.defId];
          return s + def.baseCost * a.level;
        }, 0) + state.staffWages;

      const interest = state.loanBalance * state.loanRate;
      const tax = revenue * district.taxRate;
      const net = revenue - expenses - interest - tax;
      const newCash = state.cash + net;

      let sapa = state.sapa;
      if (state.loanBalance > 0) sapa = Math.min(100, sapa + 1);
      else sapa = Math.max(0, sapa - 2);

      const policeHeat = Math.max(
        0,
        Math.min(100, state.policeHeat + district.policeHeat * 0.05 - 1)
      );
      const legitimacy = Math.max(0, Math.min(100, state.legitimacy + 0.5));

      const days = state.daysPlayed + 1;
      const next: PlayerState = {
        ...state,
        cash: newCash,
        sapa,
        policeHeat,
        legitimacy,
        daysPlayed: days,
        loanBalance: state.loanBalance + interest,
        stockPrices: driftStockPrices(state.stockPrices),
        ticker: pushTicker(
          state,
          `📅 Day ${days}: ${net >= 0 ? "+" : "-"}₦${Math.abs(
            Math.round(net)
          ).toLocaleString()} net.`
        ),
        lastDelta: {
          amount: Math.round(net),
          reason: `Day ${days} operations`,
        },
      };

      if (Math.random() < 0.25) {
        const lot = spawnAuction(next);
        if (lot) {
          next.auctions = [...next.auctions, lot];
          next.ticker = pushTicker(
            next,
            `🔨 AUCTION ALERT: ${lot.companyName} liquidating ${ASSET_CATALOG[lot.assetDefId].name}!`
          );
        }
      }

      const netWorth = computeNetWorth(next);
      next.level = computeLevel(netWorth);
      next.unlockedBadges = checkBadges(next);

      if (next.sapa >= 100 && !next.bankrupt) {
        next.bankrupt = true;
      }

      return next;
    }

    case "GRIND": {
      const bonus = 1 + state.streetCred / 500;
      const earned = Math.round(8_000 * bonus);
      const next: PlayerState = {
        ...state,
        cash: state.cash + earned,
        streetCred: state.streetCred + 1,
        ticker: pushTicker(
          state,
          `💪 Grind complete: +₦${earned.toLocaleString()} (cred +1)`
        ),
        lastDelta: { amount: earned, reason: "Active hustle" },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "BUY_ASSET": {
      const def = ASSET_CATALOG[action.defId];
      if (!def || state.cash < def.cost) return state;
      const asset: OwnedAsset = {
        id: `a_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        defId: def.id,
        level: 1,
        manager: false,
      };
      const next: PlayerState = {
        ...state,
        cash: state.cash - def.cost,
        assets: [...state.assets, asset],
        streetCred: state.streetCred + 5,
        ticker: pushTicker(state, `🚀 Acquired ${def.name}!`),
        lastDelta: { amount: -def.cost, reason: `Bought ${def.name}` },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "UPGRADE_ASSET": {
      const asset = state.assets.find((a) => a.id === action.id);
      if (!asset) return state;
      const def = ASSET_CATALOG[asset.defId];
      const cost = Math.round(def.cost * 0.6 * asset.level);
      if (state.cash < cost) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash - cost,
        assets: state.assets.map((a) =>
          a.id === action.id ? { ...a, level: a.level + 1 } : a
        ),
        ticker: pushTicker(
          state,
          `⬆️ ${def.name} upgraded to Lv${asset.level + 1}`
        ),
        lastDelta: { amount: -cost, reason: `Upgraded ${def.name}` },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "TRANSFORM_ASSET": {
      const asset = state.assets.find((a) => a.id === action.id);
      if (!asset) return state;
      const def = ASSET_CATALOG[asset.defId];
      if (!def.upgradeTo) return state;
      const target = ASSET_CATALOG[def.upgradeTo];
      const cost = Math.round(target.cost * 0.8);
      if (state.cash < cost) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash - cost,
        assets: state.assets.map((a) =>
          a.id === action.id ? { ...a, defId: target.id, level: 1 } : a
        ),
        ticker: pushTicker(state, `🏗️ Transformed into ${target.name}!`),
        lastDelta: { amount: -cost, reason: `Transformed to ${target.name}` },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "TOGGLE_MANAGER": {
      const asset = state.assets.find((a) => a.id === action.id);
      if (!asset) return state;
      if (asset.manager) {
        return {
          ...state,
          assets: state.assets.map((a) =>
            a.id === action.id ? { ...a, manager: false } : a
          ),
          ticker: pushTicker(
            state,
            `👋 Manager fired from ${ASSET_CATALOG[asset.defId].name}`
          ),
        };
      }
      if (state.cash < MANAGER_COST) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash - MANAGER_COST,
        assets: state.assets.map((a) =>
          a.id === action.id ? { ...a, manager: true } : a
        ),
        ticker: pushTicker(
          state,
          `🤖 Auto-Manager hired for ${ASSET_CATALOG[asset.defId].name}`
        ),
        lastDelta: { amount: -MANAGER_COST, reason: "Hired auto-manager" },
      };
      return next;
    }

    case "SELL_ASSET": {
      const asset = state.assets.find((a) => a.id === action.id);
      if (!asset) return state;
      const def = ASSET_CATALOG[asset.defId];
      const payout = Math.round(def.cost * (1 + (asset.level - 1) * 0.4) * 0.75);
      const next: PlayerState = {
        ...state,
        cash: state.cash + payout,
        assets: state.assets.filter((a) => a.id !== action.id),
        ticker: pushTicker(
          state,
          `💸 Sold ${def.name} for ₦${payout.toLocaleString()}`
        ),
        lastDelta: { amount: payout, reason: `Sold ${def.name}` },
      };
      return next;
    }

    case "BUY_FLEX": {
      const def = FLEX_CATALOG[action.defId];
      if (!def || state.cash < def.cost) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash - def.cost,
        flex: [
          ...state.flex,
          {
            id: `f_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            defId: def.id,
          },
        ],
        streetCred: state.streetCred + def.credBoost,
        sapa: Math.max(0, state.sapa - def.sapaRelief),
        ticker: pushTicker(state, `💎 Flex acquired: ${def.name}!`),
        lastDelta: { amount: -def.cost, reason: `Bought ${def.name}` },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "BUY_GARAGE": {
      const def = GARAGE_CATALOG[action.defId];
      if (!def || state.cash < def.cost) return state;
      if (state.garage.some((g) => g.defId === def.id)) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash - def.cost,
        garage: [
          ...state.garage,
          {
            id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            defId: def.id,
          },
        ],
        streetCred: state.streetCred + def.credBoost,
        ticker: pushTicker(state, `🚗 New ride: ${def.name}!`),
        lastDelta: { amount: -def.cost, reason: `Bought ${def.name}` },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "TRADE_STOCK": {
      const def = STOCK_CATALOG[action.symbol];
      if (!def) return state;
      const price = state.stockPrices[action.symbol] ?? def.basePrice;
      if (action.side === "buy") {
        if (state.cash < action.amount || action.amount <= 0) return state;
        const qty = action.amount / price;
        const next: PlayerState = {
          ...state,
          cash: state.cash - action.amount,
          holdings: {
            ...state.holdings,
            [action.symbol]: (state.holdings[action.symbol] ?? 0) + qty,
          },
          ticker: pushTicker(
            state,
            `📈 Bought ₦${action.amount.toLocaleString()} of ${def.symbol}`
          ),
          lastDelta: { amount: -action.amount, reason: `Bought ${def.symbol}` },
        };
        return next;
      }
      const held = state.holdings[action.symbol] ?? 0;
      const qty = Math.min(held, action.amount / price);
      if (qty <= 0) return state;
      const proceeds = qty * price;
      const next: PlayerState = {
        ...state,
        cash: state.cash + proceeds,
        holdings: {
          ...state.holdings,
          [action.symbol]: held - qty,
        },
        ticker: pushTicker(
          state,
          `📉 Sold ${def.symbol} for ₦${Math.round(proceeds).toLocaleString()}`
        ),
        lastDelta: {
          amount: Math.round(proceeds),
          reason: `Sold ${def.symbol}`,
        },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "BORROW": {
      if (state.sapa > 70) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash + action.amount,
        loanBalance: state.loanBalance + action.amount,
        sapa: Math.min(100, state.sapa + LOAN_SAPA_PENALTY),
        ticker: pushTicker(
          state,
          `🏦 Loan approved: +₦${action.amount.toLocaleString()} (Sapa +${LOAN_SAPA_PENALTY}%)`
        ),
        lastDelta: { amount: action.amount, reason: "Micro-loan disbursed" },
      };
      return next;
    }

    case "REPAY": {
      const amount = Math.min(action.amount, state.cash, state.loanBalance);
      if (amount <= 0) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash - amount,
        loanBalance: state.loanBalance - amount,
        sapa: Math.max(0, state.sapa - REPAY_SAPA_RELIEF),
        ticker: pushTicker(
          state,
          `✅ Repaid ₦${amount.toLocaleString()} (Sapa -${REPAY_SAPA_RELIEF}%)`
        ),
        lastDelta: { amount: -amount, reason: "Loan repayment" },
      };
      return next;
    }

    case "BUY_INSURANCE": {
      if (state.insurance || state.cash < INSURANCE_COST) return state;
      return {
        ...state,
        cash: state.cash - INSURANCE_COST,
        insurance: true,
        ticker: pushTicker(state, "🛡️ Emergency insurance activated!"),
        lastDelta: { amount: -INSURANCE_COST, reason: "Insurance premium" },
      };
    }

    case "QUEUE_EVENT": {
      if (state.pendingEvent) return state;
      return { ...state, pendingEvent: action.event };
    }

    case "RESOLVE_EVENT": {
      const ev = state.pendingEvent;
      if (!ev) return state;
      const choice = ev.choices[action.choiceIdx];
      if (!choice) return state;

      let cash = state.cash + choice.cash;
      if (choice.cash < 0 && state.insurance) {
        cash = state.cash + Math.round(choice.cash * 0.5);
      }

      if (ev.id === "audit" && action.choiceIdx === 1 && Math.random() < 0.3) {
        cash -= 500_000;
      }

      const next: PlayerState = {
        ...state,
        cash,
        sapa: Math.max(0, Math.min(100, state.sapa + choice.sapa)),
        streetCred: Math.max(0, state.streetCred + choice.cred),
        pendingEvent: null,
        ticker: pushTicker(state, `📰 ${ev.headline}: ${choice.label}`),
        lastDelta: {
          amount: choice.cash,
          reason: `${ev.headline} — ${choice.label}`,
        },
      };

      if (next.sapa >= 100 && !next.bankrupt) next.bankrupt = true;
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "BID_AUCTION": {
      const lot = state.auctions.find((l) => l.id === action.lotId);
      if (!lot) return state;
      const def = ASSET_CATALOG[lot.assetDefId];
      const price = Math.round(def.cost * (1 - lot.discount));
      if (state.cash < price) return state;
      const asset: OwnedAsset = {
        id: `a_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        defId: def.id,
        level: 1,
        manager: false,
      };
      const next: PlayerState = {
        ...state,
        cash: state.cash - price,
        assets: [...state.assets, asset],
        auctions: state.auctions.filter((l) => l.id !== action.lotId),
        streetCred: state.streetCred + 10,
        ticker: pushTicker(
          state,
          `🔨 Won auction: ${def.name} for ₦${price.toLocaleString()}!`
        ),
        lastDelta: { amount: -price, reason: `Auction win: ${def.name}` },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "TRAVEL": {
      const district = DISTRICTS.find((d) => d.id === action.districtId);
      if (!district) return state;
      const netWorth = computeNetWorth(state);
      if (netWorth < district.unlockNetWorth) return state;
      const travelCost = 50_000;
      if (state.cash < travelCost) return state;
      return {
        ...state,
        cash: state.cash - travelCost,
        districtId: district.id,
        city: district.city,
        ticker: pushTicker(
          state,
          `🚚 Moved HQ to ${district.name} (₦${travelCost.toLocaleString()} relocation)`
        ),
        lastDelta: { amount: -travelCost, reason: `Moved to ${district.name}` },
      };
    }

    case "RESOLVE_WAHALA": {
      const ev = WAHALA_EVENTS.find((e) => e.id === action.eventId);
      if (!ev) return state;
      const choice = ev.choices[action.choiceIdx];
      if (!choice) return state;
      const next: PlayerState = {
        ...state,
        cash: state.cash + choice.cash,
        sapa: Math.max(0, Math.min(100, state.sapa + choice.sapa)),
        streetCred: Math.max(0, state.streetCred + choice.cred),
        policeHeat: Math.max(0, Math.min(100, state.policeHeat + choice.heat)),
        legitimacy: Math.max(
          0,
          Math.min(100, state.legitimacy + choice.legitimacy)
        ),
        ticker: pushTicker(state, `⚖️ ${ev.headline}: ${choice.label}`),
        lastDelta: {
          amount: choice.cash,
          reason: `${ev.headline} — ${choice.label}`,
        },
      };
      if (next.sapa >= 100 && !next.bankrupt) next.bankrupt = true;
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "SAPA_RESULT": {
      const delta = action.won ? action.reward : -action.penalty;
      const next: PlayerState = {
        ...state,
        cash: state.cash + delta,
        sapa: Math.max(0, state.sapa - (action.won ? 5 : 0)),
        ticker: pushTicker(
          state,
          action.won
            ? `🎉 Sapa mini-game won: +₦${action.reward.toLocaleString()}`
            : `😭 Sapa mini-game lost: -₦${action.penalty.toLocaleString()}`
        ),
        lastDelta: {
          amount: delta,
          reason: action.won ? "Sapa mini-game win" : "Sapa mini-game loss",
        },
      };
      next.unlockedBadges = checkBadges(next);
      return next;
    }

    case "SHOW_CERT":
      return { ...state, showCert: true };

    case "HIDE_CERT":
      return { ...state, showCert: false };

    case "DISMISS_BANKRUPT":
      return { ...state, bankrupt: false };

    default:
      return state;
  }
}