import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GARAGE_CATALOG, type PlayerState } from "@/lib/gameData";
import { Car, Gauge, Sparkles } from "lucide-react";

interface Props {
  state: PlayerState;
  onBuy: (defId: string) => void;
}

export function Garage({ state, onBuy }: Props) {
  const owned = new Set(state.garage.map((g) => g.defId));
  const catalog = Object.values(GARAGE_CATALOG).sort((a, b) => a.cost - b.cost);

  const totalBonus = state.garage.reduce((s, g) => {
    const def = GARAGE_CATALOG[g.defId];
    return s + def.revenueBonus;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-emerald-900">
          <Car className="h-6 w-6" />
          The Garage
        </h2>
        <p className="text-sm text-emerald-800/80">
          From a rickety Polo to a brand-new G-Wagon. Every ride adds passive
          revenue bonuses and shows off on your dashboard.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Gauge className="h-3.5 w-3.5" />
          Total fleet bonus: +{Math.round(totalBonus * 100)}% revenue
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((def) => {
          const isOwned = owned.has(def.id);
          const canAfford = state.cash >= def.cost;
          return (
            <Card
              key={def.id}
              className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isOwned ? "border-emerald-400 bg-emerald-50/40" : "border-slate-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-3xl">
                    {def.emoji}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline">Tier {def.tier}</Badge>
                    {isOwned && (
                      <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                        Owned
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {def.name}
                </CardTitle>
                <p className="text-xs italic text-muted-foreground">
                  "{def.flavor}"
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold">
                      ₦{def.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue bonus</span>
                    <span className="font-semibold text-emerald-700">
                      +{Math.round(def.revenueBonus * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cred boost</span>
                    <span className="font-semibold text-amber-700">
                      +{def.credBoost}
                    </span>
                  </div>
                </div>
                <Button
                  disabled={isOwned || !canAfford}
                  onClick={() => onBuy(def.id)}
                  className={
                    !isOwned && canAfford
                      ? "w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                      : "w-full"
                  }
                >
                  {isOwned ? (
                    <>
                      <Sparkles className="mr-1 h-4 w-4" /> In Your Garage
                    </>
                  ) : canAfford ? (
                    "Buy Ride 🚗"
                  ) : (
                    "Need more cash"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}