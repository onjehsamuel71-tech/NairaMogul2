import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GameEvent } from "@/lib/gameData";
import { AlertTriangle } from "lucide-react";

interface Props {
  event: GameEvent;
  onChoose: (choiceIdx: number) => void;
}

export function EventModal({ event, onChoose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg animate-in rounded-2xl border-amber-300 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400 text-3xl">
              {event.emoji}
            </div>
            <div>
              <p className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-800">
                <AlertTriangle className="h-3 w-3" />
                Breaking News
              </p>
              <CardTitle className="font-serif text-xl text-amber-950">
                {event.headline}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <p className="text-sm text-slate-700">{event.body}</p>
          <div className="space-y-2">
            {event.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => onChoose(i)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-left transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                <p className="font-semibold text-slate-900">{c.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.note}</p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  {c.cash !== 0 && (
                    <span
                      className={
                        c.cash > 0 ? "text-emerald-700" : "text-rose-700"
                      }
                    >
                      {c.cash > 0 ? "+" : "-"}₦
                      {Math.abs(c.cash).toLocaleString()}
                    </span>
                  )}
                  {c.sapa !== 0 && (
                    <span className="text-amber-700">
                      Sapa {c.sapa > 0 ? "+" : ""}
                      {c.sapa}%
                    </span>
                  )}
                  {c.cred !== 0 && (
                    <span className="text-emerald-700">
                      Cred {c.cred > 0 ? "+" : ""}
                      {c.cred}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}