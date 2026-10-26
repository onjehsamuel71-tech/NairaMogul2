import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DETTY_ASSETS, type PlayerState } from "@/lib/gameData";
import { PartyPopper, Snowflake, Sparkles } from "lucide-react";

interface Props {
  state: PlayerState;
  onBuy: (defId: string) => void;
}

export function DettyDecember({ state, onBuy }: Props) {
  const owned = new Set(state.dettyAssets.map((d) => d.defId));
  const active = state.dettyActive;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-rose-900">
          <Snowflake className="h-6 w-6" />
          Detty December & Seasonal Festivals
        </h2>
        <p className="text-sm text-rose-800/80">
          Real-time event modes that trigger during holidays. Ticket prices
          skyrocket, venues generate 5x cash, and limited-time assets open up.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-rose-800">
            <PartyPopper className="h-3.5 w-3.5" />
            {active ? "DETTY DECEMBER ACTIVE — 5x revenue!" : "Seasonal mode: OFF"}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-rose-800">
            <Sparkles className="h-3.5 w-3.5" />
            {owned.size} limited asset{owned.size === 1 ? "" : "s"} owned
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(DETTY_ASSETS).map((asset) => {
          const isOwned = owned.has(asset.id);
          const canAfford = state.cash >= asset.cost;
          return (
            <Card
              key={asset.id}
              className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isOwned ? "border-rose-400 bg-rose-50/40" : "border-slate-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 text-3xl">
                    {asset.emoji}
                  </div>
                  {isOwned && (
                    <Badge className="bg-rose-600 text-white hover:bg-rose-600">
                      Owned
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {asset.name}
                </CardTitle>
                <p className="text-xs italic text-muted-foreground">
                  "{asset.flavor}"
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold">
                      ₦{asset.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Detty revenue/day</span>
                    <span className="font-semibold text-rose-700">
                      ₦{asset.baseRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  disabled={isOwned || !canAfford}
                  onClick={() => onBuy(asset.id)}
                  className={
                    !isOwned && canAfford
                      ? "w-full bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:from-rose-500 hover:to-amber-500"
                      : "w-full"
                  }
                >
                  {isOwned ? "Already Owned" : canAfford ? "Buy Asset 🎉" : "Need more cash"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}