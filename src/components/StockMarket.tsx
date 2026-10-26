import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { STOCK_CATALOG, type PlayerState } from "@/lib/gameData";
import { TrendingDown, TrendingUp, Zap } from "lucide-react";

interface Props {
  state: PlayerState;
  onTrade: (symbol: string, amount: number, side: "buy" | "sell") => void;
}

export function StockMarket({ state, onTrade }: Props) {
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [flash, setFlash] = useState<Record<string, "up" | "down" | null>>({});

  useEffect(() => {
    const id = window.setInterval(() => {
      const next: Record<string, "up" | "down" | null> = {};
      for (const s of Object.keys(STOCK_CATALOG)) {
        next[s] = Math.random() > 0.5 ? "up" : "down";
      }
      setFlash(next);
      window.setTimeout(() => setFlash({}), 600);
    }, 3_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-rose-300 bg-gradient-to-r from-rose-100 via-orange-100 to-amber-100 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-rose-900">
          <Zap className="h-6 w-6" />
          Stock Market & Crypto Gamble
        </h2>
        <p className="text-sm text-rose-800/80">
          High-risk, high-reward. Double your money — or lose it all in seconds.
          Prices move every few seconds.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(STOCK_CATALOG).map((s) => {
          const holding = state.holdings[s.symbol] ?? 0;
          const price = state.stockPrices[s.symbol] ?? s.basePrice;
          const change = ((price - s.basePrice) / s.basePrice) * 100;
          const amount = amounts[s.symbol] ?? 100_000;
          const flashState = flash[s.symbol];
          return (
            <Card
              key={s.symbol}
              className={`rounded-2xl border shadow-sm transition ${
                flashState === "up"
                  ? "border-emerald-400 bg-emerald-50/60"
                  : flashState === "down"
                  ? "border-rose-400 bg-rose-50/60"
                  : "border-slate-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 text-2xl">
                    {s.emoji}
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      change >= 0
                        ? "border-emerald-300 text-emerald-700"
                        : "border-rose-300 text-rose-700"
                    }
                  >
                    {change >= 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {change.toFixed(1)}%
                  </Badge>
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {s.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{s.symbol}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-2xl font-bold text-slate-900">
                    ₦{Math.round(price).toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Held: {holding}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Amount (₦)</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmounts((a) => ({
                        ...a,
                        [s.symbol]: Number(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={state.cash < amount || amount <= 0}
                    onClick={() => onTrade(s.symbol, amount, "buy")}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                  >
                    Buy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={holding <= 0}
                    onClick={() => onTrade(s.symbol, amount, "sell")}
                    className="flex-1 border-rose-300 text-rose-700 hover:bg-rose-50"
                  >
                    Sell
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}