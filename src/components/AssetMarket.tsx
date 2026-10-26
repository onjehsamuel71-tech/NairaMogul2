import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ASSET_CATALOG,
  INDUSTRIES,
  MANAGER_COST,
  type PlayerState,
} from "@/lib/gameData";
import { Bot, Sparkles, TrendingUp, Wrench } from "lucide-react";

interface Props {
  state: PlayerState;
  onBuy: (defId: string) => void;
  onUpgrade: (id: string) => void;
  onTransform: (id: string) => void;
  onToggleManager: (id: string) => void;
}

export function AssetMarket({
  state,
  onBuy,
  onUpgrade,
  onTransform,
  onToggleManager,
}: Props) {
  const [tab, setTab] = useState<"buy" | "manage">("buy");

  const catalog = Object.values(ASSET_CATALOG).sort((a, b) => a.cost - b.cost);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-emerald-900">
          <Sparkles className="h-6 w-6" />
          Asset Market
        </h2>
        <p className="text-sm text-emerald-800/80">
          Buy, upgrade, and transform your empire. Hire auto-managers to earn
          while you sleep.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("buy")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            tab === "buy"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
          }`}
        >
          Buy New
        </button>
        <button
          onClick={() => setTab("manage")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            tab === "manage"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
          }`}
        >
          Manage ({state.assets.length})
        </button>
      </div>

      {tab === "buy" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((def) => {
            const canAfford = state.cash >= def.cost;
            const industryMatch = def.industry === state.industry;
            return (
              <Card
                key={def.id}
                className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  industryMatch ? "border-emerald-300" : "border-slate-200"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-3xl">
                      {def.emoji}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline">Tier {def.tier}</Badge>
                      {industryMatch && (
                        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                          Your Industry
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="mt-2 font-serif text-base">
                    {def.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {INDUSTRIES[def.industry].emoji}{" "}
                    {INDUSTRIES[def.industry].name}
                  </p>
                  <p className="text-xs italic text-muted-foreground">
                    "{def.flavor}"
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost</span>
                      <span className="font-bold">
                        ₦{def.cost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue/day</span>
                      <span className="font-semibold text-emerald-700">
                        +₦{def.baseRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upkeep/day</span>
                      <span className="font-semibold text-rose-700">
                        -₦{def.baseCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    disabled={!canAfford}
                    onClick={() => onBuy(def.id)}
                    className={
                      canAfford
                        ? "w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                        : "w-full"
                    }
                  >
                    {canAfford ? "Acquire 🚀" : "Need more cash"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {state.assets.length === 0 ? (
            <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-3xl">🏚️</p>
              <p className="mt-2 font-semibold">No assets yet</p>
              <p className="text-sm text-muted-foreground">
                Switch to "Buy New" to acquire your first business.
              </p>
            </Card>
          ) : (
            state.assets.map((a) => {
              const def = ASSET_CATALOG[a.defId];
              const upgradeCost = Math.round(def.cost * 0.6 * a.level);
              const transformTarget = def.upgradeTo
                ? ASSET_CATALOG[def.upgradeTo]
                : null;
              const transformCost = transformTarget
                ? Math.round(transformTarget.cost * 0.8)
                : 0;
              const rev = def.baseRevenue * a.level * (a.manager ? 1.15 : 1);
              return (
                <Card
                  key={a.id}
                  className="rounded-2xl border-slate-200 shadow-sm"
                >
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-3xl">
                      {def.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{def.name}</p>
                        <Badge variant="outline">Lv {a.level}</Badge>
                        {a.manager && (
                          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                            🤖 Auto
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Revenue: ₦{Math.round(rev).toLocaleString()}/day ·
                        Upkeep: ₦{(def.baseCost * a.level).toLocaleString()}/day
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={state.cash < upgradeCost}
                        onClick={() => onUpgrade(a.id)}
                        className="border-emerald-300 hover:bg-emerald-50"
                      >
                        <TrendingUp className="mr-1 h-3.5 w-3.5" />
                        Upgrade ₦{upgradeCost.toLocaleString()}
                      </Button>
                      {transformTarget && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={state.cash < transformCost}
                          onClick={() => onTransform(a.id)}
                          className="border-amber-300 hover:bg-amber-50"
                        >
                          <Wrench className="mr-1 h-3.5 w-3.5" />
                          Transform → {transformTarget.emoji}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant={a.manager ? "default" : "outline"}
                        disabled={!a.manager && state.cash < MANAGER_COST}
                        onClick={() => onToggleManager(a.id)}
                        className={
                          a.manager
                            ? "bg-emerald-700 text-white hover:bg-emerald-600"
                            : "border-slate-300 hover:bg-slate-50"
                        }
                      >
                        <Bot className="mr-1 h-3.5 w-3.5" />
                        {a.manager
                          ? "Fire Manager"
                          : `Hire ₦${MANAGER_COST.toLocaleString()}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}