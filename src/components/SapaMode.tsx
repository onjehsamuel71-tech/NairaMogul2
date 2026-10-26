import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SAPA_MINIGAMES, type SapaMiniGame } from "@/lib/districts";
import { AlertTriangle, Zap } from "lucide-react";

interface Props {
  onComplete: (reward: number, penalty: number, won: boolean) => void;
  onExit: () => void;
}

export function SapaMode({ onComplete, onExit }: Props) {
  const [game, setGame] = useState<SapaMiniGame | null>(null);
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!game) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const id = window.setTimeout(() => setTimeLeft((t) => t - 100), 100);
    return () => window.clearTimeout(id);
  }, [game, timeLeft]);

  const startGame = (g: SapaMiniGame) => {
    setGame(g);
    setTaps(0);
    setTimeLeft(g.durationMs);
    setFinished(false);
  };

  const handleTap = () => {
    if (!game || finished) return;
    setTaps((t) => t + 1);
  };

  const handleFinish = () => {
    if (!game) return;
    const won = taps >= game.targetTaps;
    onComplete(won ? game.reward : 0, won ? 0 : game.penalty, won);
    setGame(null);
  };

  if (!game) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-rose-300 bg-gradient-to-r from-rose-100 via-orange-100 to-amber-100 p-5">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-rose-900">
            <AlertTriangle className="h-6 w-6" />
            SAPA MODE ACTIVATED
          </h2>
          <p className="text-sm text-rose-800/80">
            Cash is low. Time to survive. Pick a mini-game to grind your way
            back.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {SAPA_MINIGAMES.map((g) => (
            <Card
              key={g.id}
              className="rounded-2xl border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 text-3xl">
                  {g.emoji}
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {g.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  {g.description}
                </p>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-700">
                    Win: +₦{g.reward.toLocaleString()}
                  </span>
                  <span className="text-rose-700">
                    Lose: -₦{g.penalty.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={() => startGame(g)}
                  className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white hover:from-rose-500 hover:to-orange-500"
                >
                  <Zap className="mr-1 h-4 w-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={onExit}
          className="border-slate-300 hover:bg-slate-50"
        >
          Exit Sapa Mode
        </Button>
      </div>
    );
  }

  const progress = (timeLeft / game.durationMs) * 100;
  const tapProgress = Math.min(100, (taps / game.targetTaps) * 100);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-2xl border-rose-300 shadow-lg">
        <div className="bg-gradient-to-r from-rose-700 via-orange-600 to-amber-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-rose-100">
                Sapa Mini-Game
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold">
                {game.emoji} {game.title}
              </h2>
            </div>
            <div className="rounded-xl bg-white/15 p-3 text-center backdrop-blur">
              <p className="text-xs text-rose-100">Time</p>
              <p className="font-serif text-2xl font-bold">
                {(timeLeft / 1000).toFixed(1)}s
              </p>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <CardContent className="space-y-5 p-6">
          <p className="text-center text-sm text-muted-foreground">
            {game.description}
          </p>

          <div className="text-center">
            <p className="font-serif text-5xl font-bold text-rose-700">
              {taps}
            </p>
            <p className="text-xs text-muted-foreground">
              of {game.targetTaps} taps needed
            </p>
            <Progress value={tapProgress} className="mt-3 h-3" />
          </div>

          {!finished ? (
            <button
              onClick={handleTap}
              className="w-full rounded-2xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 py-12 font-serif text-3xl font-bold text-white shadow-lg transition active:scale-95 hover:from-rose-500 hover:via-orange-500 hover:to-amber-400"
            >
              TAP! TAP! TAP!
            </button>
          ) : (
            <div className="space-y-3 text-center">
              <p className="font-serif text-2xl font-bold">
                {taps >= game.targetTaps
                  ? "🎉 You survived!"
                  : "😭 Sapa caught you!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {taps >= game.targetTaps
                  ? `You earned ₦${game.reward.toLocaleString()}`
                  : `You lost ₦${game.penalty.toLocaleString()}`}
              </p>
              <Button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
              >
                Claim Result
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}