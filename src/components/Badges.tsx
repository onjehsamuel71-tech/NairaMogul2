import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BADGES, type PlayerState } from "@/lib/gameData";
import { Award } from "lucide-react";

interface Props {
  state: PlayerState;
}

export function Badges({ state }: Props) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif text-lg">
          <Award className="h-5 w-5 text-amber-600" />
          Achievements & Titles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => {
            const unlocked = state.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`flex items-start gap-3 rounded-xl border p-3 transition ${
                  unlocked
                    ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm"
                    : "border-slate-200 bg-slate-50 opacity-70"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl ${
                    unlocked
                      ? "bg-gradient-to-br from-amber-200 to-orange-200"
                      : "bg-slate-200 grayscale"
                  }`}
                >
                  {b.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.description}
                  </p>
                  {unlocked && (
                    <p className="mt-1 text-xs font-bold text-amber-700">
                      ✓ Unlocked
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}