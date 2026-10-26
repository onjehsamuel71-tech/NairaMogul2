import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { WAHALA_EVENTS } from "@/lib/districts";
import type { PlayerState } from "@/lib/gameData";
import { Flame, Gavel, ShieldCheck, Users } from "lucide-react";

interface Props {
  state: PlayerState;
  onResolve: (eventId: string, choiceIdx: number) => void;
}

export function WahalaPanel({ state, onResolve }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-rose-900">
          <Flame className="h-6 w-6" />
          Wahala & Rep System
        </h2>
        <p className="text-sm text-rose-800/80">
          Every choice affects your Street Cred, Police Heat, and Legitimacy.
          Balance the hustle with the law.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Users className="h-4 w-4 text-emerald-700" />
              Street Cred
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-3xl font-bold text-emerald-700">
              {Math.round(state.streetCred)}
            </p>
            <p className="text-xs text-muted-foreground">
              Unlocks high-end contracts
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Flame className="h-4 w-4 text-rose-600" />
              Police Heat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-3xl font-bold text-rose-600">
              {Math.round(state.policeHeat)}%
            </p>
            <Progress value={state.policeHeat} className="mt-2 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {state.policeHeat > 60
                ? "🚨 EFCC raid imminent!"
                : state.policeHeat > 30
                ? "⚠️ Officers are watching."
                : "✅ Under the radar."}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              Legitimacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-3xl font-bold text-emerald-700">
              {Math.round(state.legitimacy)}%
            </p>
            <Progress value={state.legitimacy} className="mt-2 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {state.legitimacy > 70
                ? "🏛️ Government contracts unlocked."
                : "Build legitimacy for big deals."}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif text-lg">
            <Gavel className="h-5 w-5 text-rose-700" />
            Active Wahala Encounters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {WAHALA_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 text-2xl">
                  {ev.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{ev.headline}</p>
                  <p className="text-xs text-muted-foreground">{ev.body}</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {ev.choices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onResolve(ev.id, i)}
                    className="rounded-xl border-2 border-slate-200 bg-white p-3 text-left transition hover:border-rose-400 hover:bg-rose-50"
                  >
                    <p className="text-sm font-semibold">{c.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {c.note}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1 text-xs">
                      {c.cash !== 0 && (
                        <Badge
                          variant="outline"
                          className={
                            c.cash > 0
                              ? "border-emerald-300 text-emerald-700"
                              : "border-rose-300 text-rose-700"
                          }
                        >
                          {c.cash > 0 ? "+" : "-"}₦
                          {Math.abs(c.cash).toLocaleString()}
                        </Badge>
                      )}
                      {c.heat !== 0 && (
                        <Badge variant="outline" className="border-rose-300 text-rose-700">
                          Heat {c.heat > 0 ? "+" : ""}
                          {c.heat}
                        </Badge>
                      )}
                      {c.legitimacy !== 0 && (
                        <Badge
                          variant="outline"
                          className="border-emerald-300 text-emerald-700"
                        >
                          Legit {c.legitimacy > 0 ? "+" : ""}
                          {c.legitimacy}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}