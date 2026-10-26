import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DISTRICTS, TIER_LABELS, type DistrictTier } from "@/lib/districts";
import { CITIES, type PlayerState } from "@/lib/gameData";
import { MapPin, ShieldAlert, TrendingUp } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
  onTravel: (districtId: string) => void;
}

export function DistrictMap({ state, netWorth, onTravel }: Props) {
  const tiers: DistrictTier[] = ["trenches", "mainland", "island"];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-emerald-900">
          <MapPin className="h-6 w-6" />
          Hustle Districts Map
        </h2>
        <p className="text-sm text-emerald-800/80">
          From the trenches to Banana Island. Each district has its own risk,
          heat, and opportunity.
        </p>
      </div>

      {tiers.map((tier) => {
        const meta = TIER_LABELS[tier];
        const districts = DISTRICTS.filter((d) => d.tier === tier);
        return (
          <div key={tier} className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-lg bg-gradient-to-r ${meta.color} px-3 py-1 text-xs font-bold uppercase tracking-widest text-white`}
              >
                {meta.emoji} {meta.label}
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {districts.map((d) => {
                const unlocked = netWorth >= d.unlockNetWorth;
                const isCurrent = state.districtId === d.id;
                return (
                  <Card
                    key={d.id}
                    className={`rounded-2xl border shadow-sm transition ${
                      isCurrent
                        ? "border-emerald-400 bg-emerald-50/60 shadow-md"
                        : unlocked
                        ? "border-slate-200 hover:-translate-y-0.5 hover:shadow-md"
                        : "border-slate-200 bg-slate-50 opacity-70"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl">
                          {d.emoji}
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            d.riskLevel === "High"
                              ? "border-rose-300 text-rose-700"
                              : d.riskLevel === "Medium"
                              ? "border-amber-300 text-amber-700"
                              : "border-emerald-300 text-emerald-700"
                          }
                        >
                          {d.riskLevel} Risk
                        </Badge>
                      </div>
                      <CardTitle className="mt-2 font-serif text-base">
                        {d.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {CITIES[d.city].emoji} {CITIES[d.city].name}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs italic text-muted-foreground">
                        "{d.flavor}"
                      </p>
                      <div className="grid grid-cols-3 gap-1 text-center text-xs">
                        <div className="rounded-lg bg-rose-50 p-1.5">
                          <p className="text-rose-700">Police</p>
                          <p className="font-bold text-rose-900">
                            {d.policeHeat}
                          </p>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-1.5">
                          <p className="text-orange-700">Agbero</p>
                          <p className="font-bold text-orange-900">
                            {d.agberoPressure}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-1.5">
                          <p className="text-slate-600">Tax</p>
                          <p className="font-bold text-slate-800">
                            {(d.taxRate * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                      {isCurrent ? (
                        <Button
                          disabled
                          className="w-full bg-emerald-600 text-white"
                        >
                          <ShieldAlert className="mr-1 h-4 w-4" />
                          Current District
                        </Button>
                      ) : unlocked ? (
                        <Button
                          onClick={() => onTravel(d.id)}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                        >
                          <TrendingUp className="mr-1 h-4 w-4" />
                          Move Here
                        </Button>
                      ) : (
                        <Button disabled className="w-full">
                          ₦{d.unlockNetWorth.toLocaleString()} needed
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}