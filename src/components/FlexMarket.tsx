import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FLEX_CATALOG, type PlayerState } from "@/lib/gameData";
import { Gem, Sparkles } from "lucide-react";

interface Props {
  state: PlayerState;
  onBuy: (defId: string) => void;
}

const CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: "garage", label: "Luxury Garage", emoji: "🏎️" },
  { key: "fashion", label: "Haute Couture", emoji: "👗" },
  { key: "pets", label: "Exotic Pets", emoji: "🐆" },
  { key: "aviation", label: "Aviation & Estates", emoji: "🛩️" },
];

export function FlexMarket({ state, onBuy }: Props) {
  const [active, setActive] = useState("garage");

  const items = Object.values(FLEX_CATALOG)
    .filter((d) => d.category === active)
    .sort((a, b) => a.cost - b.cost);

  const ownedIds = new Set(state.flex.map((f) => f.defId));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-amber-900">
          <Gem className="h-6 w-6" />
          Flex Market
        </h2>
        <p className="text-sm text-amber-900/80">
          Status symbols that boost Street Cred and cool your Sapa Meter.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              active === c.key
                ? "border-amber-500 bg-amber-500 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((def) => {
          const canAfford = state.cash >= def.cost;
          const owned = ownedIds.has(def.id);
          return (
            <Card
              key={def.id}
              className="flex flex-col rounded-2xl border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-rose-100 text-3xl">
                    {def.emoji}
                  </div>
                  <Badge variant="outline">Tier {def.tier}</Badge>
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
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-bold">
                      ₦{def.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Street Cred</span>
                    <span className="font-semibold text-emerald-700">
                      +{def.credBoost}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sapa Relief</span>
                    <span className="font-semibold text-amber-700">
                      -{def.sapaRelief}%
                    </span>
                  </div>
                </div>
                <Button
                  disabled={!canAfford || owned}
                  onClick={() => onBuy(def.id)}
                  className={
                    owned
                      ? "w-full"
                      : canAfford
                      ? "w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-400 hover:to-rose-400"
                      : "w-full"
                  }
                >
                  {owned ? (
                    <>
                      <Sparkles className="mr-1 h-4 w-4" />
                      Owned
                    </>
                  ) : canAfford ? (
                    "Flex It 💎"
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