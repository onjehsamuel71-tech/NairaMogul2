import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ASSET_CATALOG, CITIES, type PlayerState } from "@/lib/gameData";
import { Gavel, Hammer, TrendingDown } from "lucide-react";

interface Props {
  state: PlayerState;
  onBid: (lotId: string) => void;
  onSell: (id: string) => void;
}

export function AuctionMarket({ state, onBid, onSell }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-100 to-orange-100 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-amber-900">
          <Gavel className="h-6 w-6" />
          Auction House
        </h2>
        <p className="text-sm text-amber-900/80">
          Distressed companies are liquidating assets at a discount. Bid fast —
          lots expire.
        </p>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif text-lg">
            <Hammer className="h-5 w-5 text-amber-600" />
            Live Lots ({state.auctions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {state.auctions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-3xl">🔨</p>
              <p className="mt-2 font-semibold">No active auctions</p>
              <p className="text-sm text-muted-foreground">
                New lots appear randomly as you play.
              </p>
            </div>
          ) : (
            state.auctions.map((lot) => {
              const def = ASSET_CATALOG[lot.assetDefId];
              const price = Math.round(def.cost * (1 - lot.discount));
              const canAfford = state.cash >= price;
              return (
                <div
                  key={lot.id}
                  className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-3xl shadow-sm">
                    {def.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{def.name}</p>
                      <Badge className="bg-rose-600 text-white hover:bg-rose-600">
                        -{Math.round(lot.discount * 100)}% OFF
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      From {lot.companyName} · {CITIES[lot.city].emoji}{" "}
                      {CITIES[lot.city].name}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs">
                      <span className="text-slate-500 line-through">
                        ₦{def.cost.toLocaleString()}
                      </span>
                      <span className="font-bold text-amber-900">
                        ₦{price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    disabled={!canAfford}
                    onClick={() => onBid(lot.id)}
                    className={
                      canAfford
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400"
                        : ""
                    }
                  >
                    Bid Now 🔨
                  </Button>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif text-lg">
            <TrendingDown className="h-5 w-5 text-rose-600" />
            Sell Your Assets (75% Value)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {state.assets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have no assets to sell.
            </p>
          ) : (
            state.assets.map((a) => {
              const def = ASSET_CATALOG[a.defId];
              const payout = Math.round(
                def.cost * (1 + (a.level - 1) * 0.4) * 0.75
              );
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                >
                  <span className="text-2xl">{def.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{def.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Level {a.level}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSell(a.id)}
                    className="border-rose-300 text-rose-700 hover:bg-rose-50"
                  >
                    Sell ₦{payout.toLocaleString()}
                  </Button>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}