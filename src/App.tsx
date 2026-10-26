import { useEffect, useMemo, useReducer, useState } from "react";
import { Header } from "@/components/Header";
import { Onboarding } from "@/components/Onboarding";
import { Dashboard } from "@/components/Dashboard";
import { AssetMarket } from "@/components/AssetMarket";
import { AuctionMarket } from "@/components/AuctionMarket";
import { FlexMarket } from "@/components/FlexMarket";
import { DistrictMap } from "@/components/DistrictMap";
import { WahalaPanel } from "@/components/WahalaPanel";
import { SapaMode } from "@/components/SapaMode";
import { BragCardGenerator } from "@/components/BragCardGenerator";
import { Badges } from "@/components/Badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ASSET_CATALOG,
  CITIES,
  EVENTS,
  INDUSTRIES,
  INSURANCE_COST,
  type GameEvent,
} from "@/lib/gameData";
import {
  computeNetWorth,
  gameReducer,
  initialState,
} from "@/lib/gameEngine";
import {
  Banknote,
  Building2,
  Flame,
  Gem,
  Gavel,
  LayoutDashboard,
  Map,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

type Tab =
  | "dashboard"
  | "market"
  | "auction"
  | "flex"
  | "districts"
  | "wahala"
  | "finance"
  | "brag"
  | "badges";

const TABS: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Hub", icon: LayoutDashboard },
  { key: "market", label: "Market", icon: Building2 },
  { key: "auction", label: "Auction", icon: Gavel },
  { key: "flex", label: "Flex", icon: Gem },
  { key: "districts", label: "Districts", icon: Map },
  { key: "wahala", label: "Wahala", icon: Flame },
  { key: "finance", label: "Finance", icon: Banknote },
  { key: "badges", label: "Badges", icon: Trophy },
  { key: "brag", label: "Brag", icon: Sparkles },
];

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sapaMode, setSapaMode] = useState(false);
  const [loanAmount, setLoanAmount] = useState(500_000);
  const [repayAmount, setRepayAmount] = useState(100_000);

  const netWorth = useMemo(() => computeNetWorth(state), [state]);

  const dailyRevenue = useMemo(
    () =>
      state.assets.reduce((s, a) => {
        const def = ASSET_CATALOG[a.defId];
        return s + def.baseRevenue * a.level * (a.manager ? 1.15 : 1);
      }, 0),
    [state.assets]
  );

  const dailyExpenses = useMemo(
    () =>
      state.assets.reduce((s, a) => {
        const def = ASSET_CATALOG[a.defId];
        return s + def.baseCost * a.level;
      }, 0) + state.staffWages,
    [state.assets, state.staffWages]
  );

  useEffect(() => {
    if (!state.started) return;
    const id = window.setInterval(() => dispatch({ type: "TICK" }), 5_000);
    return () => window.clearInterval(id);
  }, [state.started]);

  useEffect(() => {
    if (!state.started) return;
    const id = window.setInterval(() => {
      const ev: GameEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      dispatch({ type: "QUEUE_EVENT", event: ev });
    }, 45_000);
    return () => window.clearInterval(id);
  }, [state.started]);

  useEffect(() => {
    if (!state.started) return;
    if (state.cash < 20_000 && !sapaMode) {
      setSapaMode(true);
    }
  }, [state.cash, state.started, sapaMode]);

  if (!state.started) {
    return (
      <Onboarding
        onComplete={(payload) =>
          dispatch({ type: "START_GAME", payload })
        }
      />
    );
  }

  const district =
    state.districtId
      ? state.districtId
      : "mushin";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/40 to-amber-50/40">
      <Header
        cash={state.cash}
        netWorth={netWorth}
        sapa={state.sapa}
        cred={state.streetCred}
        level={state.level}
        company={state.companyName}
        city={CITIES[state.city].name}
        industry={INDUSTRIES[state.industry].name}
        ticker={state.ticker}
      />

      <nav className="sticky top-16 z-20 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {sapaMode ? (
          <SapaMode
            onComplete={(reward, penalty, won) => {
              dispatch({ type: "SAPA_RESULT", reward, penalty, won });
              setSapaMode(false);
            }}
            onExit={() => setSapaMode(false)}
          />
        ) : (
          <>
            {tab === "dashboard" && (
              <Dashboard
                state={state}
                netWorth={netWorth}
                dailyRevenue={dailyRevenue}
                dailyExpenses={dailyExpenses}
                onOpenMarket={() => setTab("market")}
                onOpenCert={() => setTab("brag")}
                onGrind={() => dispatch({ type: "GRIND" })}
              />
            )}

            {tab === "market" && (
              <AssetMarket
                state={state}
                onBuy={(defId) => dispatch({ type: "BUY_ASSET", defId })}
                onUpgrade={(id) => dispatch({ type: "UPGRADE_ASSET", id })}
                onTransform={(id) => dispatch({ type: "TRANSFORM_ASSET", id })}
                onToggleManager={(id) =>
                  dispatch({ type: "TOGGLE_MANAGER", id })
                }
              />
            )}

            {tab === "auction" && (
              <AuctionMarket
                state={state}
                onBid={(lotId) => dispatch({ type: "BID_AUCTION", lotId })}
                onSell={(id) => dispatch({ type: "SELL_ASSET", id })}
              />
            )}

            {tab === "flex" && (
              <FlexMarket
                state={state}
                onBuy={(defId) => dispatch({ type: "BUY_FLEX", defId })}
              />
            )}

            {tab === "districts" && (
              <DistrictMap
                state={state}
                netWorth={netWorth}
                onTravel={(districtId) =>
                  dispatch({ type: "TRAVEL", districtId })
                }
              />
            )}

            {tab === "wahala" && (
              <WahalaPanel
                state={state}
                onResolve={(eventId, choiceIdx) =>
                  dispatch({ type: "RESOLVE_WAHALA", eventId, choiceIdx })
                }
              />
            )}

            {tab === "badges" && <Badges state={state} />}

            {tab === "brag" && (
              <BragCardGenerator state={state} netWorth={netWorth} />
            )}

            {tab === "finance" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif text-xl">
                      <Banknote className="h-5 w-5 text-emerald-700" />
                      Micro-Loans
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
                      Current debt:{" "}
                      <strong>₦{Math.round(state.loanBalance).toLocaleString()}</strong>{" "}
                      at {(state.loanRate * 100).toFixed(0)}% daily interest.
                    </div>
                    <div className="space-y-2">
                      <Label>Loan Amount</Label>
                      <Input
                        type="number"
                        value={loanAmount}
                        onChange={(e) =>
                          setLoanAmount(Number(e.target.value) || 0)
                        }
                      />
                    </div>
                    <Button
                      disabled={state.sapa > 70 || loanAmount <= 0}
                      onClick={() => dispatch({ type: "BORROW", amount: loanAmount })}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                    >
                      Borrow ₦{loanAmount.toLocaleString()}
                    </Button>
                    {state.sapa > 70 && (
                      <p className="text-xs text-rose-700">
                        🚫 Loan rejected — Sapa Meter too high.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-serif text-xl">
                      <ShieldCheck className="h-5 w-5 text-emerald-700" />
                      Repay & Insurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Repay Amount</Label>
                      <Input
                        type="number"
                        value={repayAmount}
                        onChange={(e) =>
                          setRepayAmount(Number(e.target.value) || 0)
                        }
                      />
                    </div>
                    <Button
                      variant="outline"
                      disabled={state.loanBalance <= 0 || state.cash <= 0}
                      onClick={() => dispatch({ type: "REPAY", amount: repayAmount })}
                      className="w-full border-emerald-300 hover:bg-emerald-50"
                    >
                      Repay ₦{repayAmount.toLocaleString()}
                    </Button>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <p className="text-sm font-semibold text-amber-900">
                        Emergency Insurance
                      </p>
                      <p className="text-xs text-amber-800">
                        Halves all event losses for one session.
                      </p>
                      <Button
                        disabled={state.insurance || state.cash < INSURANCE_COST}
                        onClick={() => dispatch({ type: "BUY_INSURANCE" })}
                        className="mt-3 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400"
                      >
                        {state.insurance
                          ? "✅ Insured"
                          : `Buy for ₦${INSURANCE_COST.toLocaleString()}`}
                      </Button>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-600">
                        Police Heat: {Math.round(state.policeHeat)}% · Legitimacy:{" "}
                        {Math.round(state.legitimacy)}%
                      </p>
                      <Progress
                        value={state.legitimacy}
                        className="mt-2 h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </main>

      {state.pendingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl border-rose-300 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 text-3xl">
                  {state.pendingEvent.emoji}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-rose-600">
                    Breaking News
                  </p>
                  <CardTitle className="font-serif text-xl">
                    {state.pendingEvent.headline}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {state.pendingEvent.body}
              </p>
              {state.pendingEvent.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() =>
                    dispatch({ type: "RESOLVE_EVENT", choiceIdx: i })
                  }
                  className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-left transition hover:border-emerald-400 hover:bg-emerald-50"
                >
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                  <div className="mt-1 flex gap-2 text-xs">
                    {c.cash !== 0 && (
                      <span
                        className={
                          c.cash > 0 ? "text-emerald-700" : "text-rose-700"
                        }
                      >
                        {c.cash > 0 ? "+" : "-"}₦
                        {Math.abs(c.cash).toLocaleString()}
                      </span>
                    )}
                    {c.cred !== 0 && (
                      <span className="text-emerald-700">
                        Cred {c.cred > 0 ? "+" : ""}
                        {c.cred}
                      </span>
                    )}
                    {c.sapa !== 0 && (
                      <span className="text-rose-700">
                        Sapa {c.sapa > 0 ? "+" : ""}
                        {c.sapa}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {state.bankrupt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur">
          <Card className="w-full max-w-md rounded-2xl border-rose-400 shadow-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-rose-700">
                💀 SAPA HAS CAUGHT YOU
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your Sapa Meter hit 100%. Creditors are at your gate. Pay down
                debt or sell assets to recover.
              </p>
              <Button
                onClick={() => dispatch({ type: "DISMISS_BANKRUPT" })}
                className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white hover:from-rose-500 hover:to-orange-500"
              >
                Fight Back
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}