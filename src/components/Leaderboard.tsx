import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CITIES, INDUSTRIES, TITLES, type PlayerState } from "@/lib/gameData";
import { Crown, MapPin, Share2, Trophy } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
}

interface Rival {
  name: string;
  city: keyof typeof CITIES;
  industry: keyof typeof INDUSTRIES;
  netWorth: number;
  emoji: string;
}

const RIVALS: Rival[] = [
  { name: "Chief Adebayo Holdings", city: "lagos", industry: "transport", netWorth: 850_000_000, emoji: "🚐" },
  { name: "Mama Nkechi Foods Ltd", city: "enugu", industry: "buka", netWorth: 420_000_000, emoji: "🍲" },
  { name: "SwiftCash POS Network", city: "abuja", industry: "pos", netWorth: 310_000_000, emoji: "💳" },
  { name: "Delta Star Logistics", city: "ph", industry: "transport", netWorth: 180_000_000, emoji: "🚚" },
  { name: "Kano Agro Kings", city: "kano", industry: "agro", netWorth: 95_000_000, emoji: "🚜" },
  { name: "Aba Shoe Empire", city: "aba", industry: "fashion", netWorth: 62_000_000, emoji: "👟" },
  { name: "Ibadan Realty Group", city: "ibadan", industry: "realestate", netWorth: 48_000_000, emoji: "🏢" },
  { name: "Benin Sound Studios", city: "benin", industry: "entertainment", netWorth: 22_000_000, emoji: "🎵" },
];

export function Leaderboard({ state, netWorth }: Props) {
  const all = [
    ...RIVALS,
    {
      name: `${state.companyName} (You)`,
      city: state.city,
      industry: state.industry,
      netWorth,
      emoji: INDUSTRIES[state.industry].emoji,
    },
  ].sort((a, b) => b.netWorth - a.netWorth);

  const rank = all.findIndex((r) => r.name.includes("(You)")) + 1;
  const title = TITLES[state.title];

  const shareText = `${title.short}, I just built a ₦${Math.round(
    netWorth
  ).toLocaleString()} empire in Naira Mogul! Can you beat my net worth? #NairaMogul`;

  const handleShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-amber-900">
              <Trophy className="h-6 w-6" />
              National Leaderboard
            </h2>
            <p className="text-sm text-amber-900/80">
              You are ranked <strong>#{rank}</strong> of {all.length} CEOs
              nationwide.
            </p>
          </div>
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
          >
            <Share2 className="mr-1 h-4 w-4" />
            Share on WhatsApp
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif text-lg">
            <Crown className="h-5 w-5 text-amber-500" />
            Top CEOs — Highest Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {all.map((r, i) => {
            const isYou = r.name.includes("(You)");
            return (
              <div
                key={r.name}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                  isYou
                    ? "border-emerald-400 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-sm"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold ${
                    i === 0
                      ? "bg-amber-400 text-amber-950"
                      : i === 1
                      ? "bg-slate-300 text-slate-800"
                      : i === 2
                      ? "bg-orange-300 text-orange-900"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-2xl">{r.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {CITIES[r.city].name} · {INDUSTRIES[r.industry].name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-sm font-bold">
                    ₦{Math.round(r.netWorth).toLocaleString()}
                  </p>
                  {isYou && (
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                      You
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Regional Kings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {(["lagos", "abuja", "ph", "kano"] as const).map((city) => {
              const top = all
                .filter((r) => r.city === city)
                .sort((a, b) => b.netWorth - a.netWorth)[0];
              return (
                <div
                  key={city}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="flex items-center gap-2">
                    <span>{CITIES[city].emoji}</span>
                    <span className="font-medium">{CITIES[city].name}</span>
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {top ? top.name : "—"}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Industry Leaders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {(["transport", "buka", "pos", "agro"] as const).map((ind) => {
              const top = all
                .filter((r) => r.industry === ind)
                .sort((a, b) => b.netWorth - a.netWorth)[0];
              return (
                <div
                  key={ind}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="flex items-center gap-2">
                    <span>{INDUSTRIES[ind].emoji}</span>
                    <span className="font-medium">{INDUSTRIES[ind].name}</span>
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {top ? top.name : "—"}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}