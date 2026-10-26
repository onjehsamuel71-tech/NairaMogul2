import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ASSET_CATALOG,
  CITIES,
  GARAGE_CATALOG,
  INDUSTRIES,
  type PlayerState,
} from "@/lib/gameData";
import { DISTRICTS } from "@/lib/districts";
import {
  Banknote,
  Car,
  Coins,
  Flame,
  HandCoins,
  MapPin,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
  dailyRevenue: number;
  dailyExpenses: number;
  onOpenMarket: () => void;
  onOpenCert: () => void;
  onGrind: () => void;
}

export function Dashboard({
  state,
  netWorth,
  dailyRevenue,
  dailyExpenses,
  onOpenMarket,
  onOpenCert,
  onGrind,
}: Props) {
  const district =
    DISTRICTS.find((d) => d.id === state.districtId) ?? DISTRICTS[0];
  const net = dailyRevenue - dailyExpenses;
  const garageBonus = state.garage.reduce((s, g) => {
    const def = GARAGE_CATALOG[g.defId];
    return s + def.revenueBonus;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
                Liquid Cash
              </p>
              <Coins className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-bold text-emerald-900">
              ₦{Math.round(state.cash).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
                Net Worth
              </p>
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-bold text-amber-900">
              ₦{Math.round(netWorth).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                Daily Net
              </p>
              {net >= 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-rose-600" />
              )}
            </div>
            <p
              className={`mt-2 font-serif text-2xl font-bold ${
                net >= 0 ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {net >= 0 ? "+" : "-"}₦
              {Math.abs(Math.round(net)).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-rose-700">
                Sapa Meter
              </p>
              <Flame className="h-4 w-4 text-rose-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-bold text-rose-900">
              {Math.round(state.sapa)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <MapPin className="h-5 w-5 text-emerald-700" />
              {district.emoji} {district.name}
              <Badge variant="outline" className="ml-1">
                {CITIES[state.city].name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-0 h-16 w-8 rounded-t bg-emerald-400" />
                <div className="absolute bottom-0 left-10 h-24 w-10 rounded-t bg-emerald-300" />
                <div className="absolute bottom-0 left-24 h-14 w-8 rounded-t bg-teal-400" />
                <div className="absolute bottom-0 left-36 h-20 w-10 rounded-t bg-emerald-500" />
                <div className="absolute bottom-0 right-8 h-28 w-12 rounded-t bg-teal-300" />
                <div className="absolute bottom-0 right-24 h-16 w-10 rounded-t bg-emerald-400" />
              </div>
              <div className="relative">
                <p className="text-xs uppercase tracking-widest text-emerald-200">
                  Active Operations
                </p>
                <p className="mt-1 font-serif text-3xl font-bold text-white">
                  {state.assets.length} asset
                  {state.assets.length === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-sm text-emerald-100">
                  {INDUSTRIES[state.industry].emoji}{" "}
                  {INDUSTRIES[state.industry].name}
                </p>
              </div>
            </div>

            {state.assets.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-3xl">🏚️</p>
                <p className="mt-2 font-semibold">No assets yet</p>
                <p className="text-sm text-muted-foreground">
                  Head to the Market to acquire your first business.
                </p>
                <Button
                  onClick={onOpenMarket}
                  className="mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                >
                  Open Market
                </Button>
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {state.assets.slice(0, 6).map((a) => {
                  const def = ASSET_CATALOG[a.defId];
                  const rev = def.baseRevenue * a.level * (a.manager ? 1.15 : 1);
                  return (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <span className="text-2xl">{def.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {def.name}
                        </p>
                        <p className="text-xs text-emerald-700">
                          +₦{Math.round(rev).toLocaleString()}/day
                        </p>
                      </div>
                      {a.manager && (
                        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                          🤖
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-2xl border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-serif text-base">
                <HandCoins className="h-4 w-4 text-amber-700" />
                Active Hustle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Tap to grind micro-tasks for instant cash. Cred boosts your
                earnings.
              </p>
              <Button
                onClick={onGrind}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 py-6 font-serif text-lg font-bold text-white hover:from-amber-400 hover:to-orange-400 active:scale-95"
              >
                💪 TAP TO GRIND
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-serif text-base">
                <Car className="h-4 w-4 text-emerald-700" />
                Garage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.garage.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No rides yet. Visit the Garage tab.
                </p>
              ) : (
                state.garage.slice(0, 4).map((g) => {
                  const def = GARAGE_CATALOG[g.defId];
                  return (
                    <div
                      key={g.id}
                      className="flex items-center gap-2 rounded-lg bg-slate-50 p-2"
                    >
                      <span className="text-xl">{def.emoji}</span>
                      <p className="truncate text-xs font-medium">
                        {def.name}
                      </p>
                    </div>
                  );
                })
              )}
              <div className="rounded-lg bg-emerald-50 p-2 text-xs font-semibold text-emerald-800">
                Fleet bonus: +{Math.round(garageBonus * 100)}%
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-serif text-base">
                <Banknote className="h-4 w-4 text-emerald-700" />
                Cashflow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revenue/day</span>
                <span className="font-semibold text-emerald-700">
                  +₦{Math.round(dailyRevenue).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expenses/day</span>
                <span className="font-semibold text-rose-700">
                  -₦{Math.round(dailyExpenses).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Net</span>
                <span
                  className={`font-bold ${
                    net >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {net >= 0 ? "+" : "-"}₦
                  {Math.abs(Math.round(net)).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={onOpenCert}
            className="w-full bg-gradient-to-r from-emerald-700 to-teal-700 text-white hover:from-emerald-600 hover:to-teal-600"
          >
            <Sparkles className="mr-1 h-4 w-4" />
            Generate CEO Certificate
          </Button>
        </div>
      </div>

      {state.ticker.length > 0 && (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-base">📰 Live Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {state.ticker.map((t, i) => (
              <p
                key={i}
                className={`text-sm ${
                  i === 0 ? "font-medium text-slate-900" : "text-muted-foreground"
                }`}
              >
                {t}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}