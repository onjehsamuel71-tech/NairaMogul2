import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JAPA_DESTINATIONS, type PlayerState } from "@/lib/gameData";
import { Plane, ShieldCheck, TrendingUp } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
  onJapa: (defId: string) => void;
}

export function JapaPanel({ state, netWorth, onJapa }: Props) {
  const unlocked = netWorth >= 500_000_000;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-sky-900">
          <Plane className="h-6 w-6" />
          The Japa Option
        </h2>
        <p className="text-sm text-sky-800/80">
          The ultimate late-game choice. Stay and conquer the Nigerian economy —
          or spend big to Japa and unlock international investments.
        </p>
        {!unlocked && (
          <div className="mt-3 rounded-xl bg-white/70 p-3 text-sm text-sky-900">
            🔒 Unlocks at <strong>₦500,000,000</strong> net worth. You're at ₦
            {Math.round(netWorth).toLocaleString()}.
          </div>
        )}
        {state.japaDestination && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            Japa'd to {JAPA_DESTINATIONS[state.japaDestination].name}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(JAPA_DESTINATIONS).map((dest) => {
          const isCurrent = state.japaDestination === dest.id;
          const canAfford = state.cash >= dest.cost;
          return (
            <Card
              key={dest.id}
              className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isCurrent ? "border-emerald-400 bg-emerald-50/40" : "border-slate-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 text-3xl">
                    {dest.emoji}
                  </div>
                  {isCurrent && (
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                      Relocated
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {dest.name}
                </CardTitle>
                <p className="text-xs italic text-muted-foreground">
                  "{dest.flavor}"
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Migration cost</span>
                    <span className="font-bold">
                      ₦{dest.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Intl. revenue bonus</span>
                    <span className="font-semibold text-sky-700">
                      +{Math.round(dest.revenueBonus * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sapa relief</span>
                    <span className="font-semibold text-emerald-700">
                      -{dest.sapaRelief}%
                    </span>
                  </div>
                </div>
                <Button
                  disabled={!unlocked || isCurrent || !canAfford}
                  onClick={() => onJapa(dest.id)}
                  className={
                    unlocked && !isCurrent && canAfford
                      ? "w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:from-sky-500 hover:to-blue-500"
                      : "w-full"
                  }
                >
                  {isCurrent ? (
                    "Already Relocated"
                  ) : !unlocked ? (
                    "Locked"
                  ) : canAfford ? (
                    <>
                      <TrendingUp className="mr-1 h-4 w-4" /> Japa Now ✈️
                    </>
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