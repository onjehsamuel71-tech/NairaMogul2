import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bell, Flame, Star, TrendingUp } from "lucide-react";

interface Props {
  cash: number;
  netWorth: number;
  sapa: number;
  cred: number;
  level: number;
  company: string;
  city: string;
  industry: string;
  ticker: string[];
}

const LEVEL_LABELS = [
  "Street Hustler",
  "Small Business Owner",
  "City Player",
  "National Tycoon",
  "Continental Monopoly",
];

export function Header({
  cash,
  netWorth,
  sapa,
  cred,
  level,
  company,
  city,
  industry,
  ticker,
}: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 font-serif text-xl font-bold text-white shadow-sm">
              ₦
            </div>
            <div>
              <p className="font-serif text-lg font-bold leading-tight text-emerald-900">
                {company}
              </p>
              <p className="text-xs text-muted-foreground">
                {city} · {industry} ·{" "}
                <span className="font-semibold text-emerald-700">
                  {LEVEL_LABELS[level - 1]}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5">
              <p className="text-xs text-emerald-700">Cash</p>
              <p className="font-serif text-base font-bold text-emerald-900">
                ₦{Math.round(cash).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5">
              <p className="flex items-center gap-1 text-xs text-amber-700">
                <TrendingUp className="h-3 w-3" />
                Net Worth
              </p>
              <p className="font-serif text-base font-bold text-amber-900">
                ₦{Math.round(netWorth).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white px-3 py-1.5">
              <p className="flex items-center gap-1 text-xs text-emerald-700">
                <Star className="h-3 w-3" />
                Cred
              </p>
              <p className="font-serif text-base font-bold text-emerald-900">
                {Math.round(cred)}
              </p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5">
              <p className="flex items-center gap-1 text-xs text-rose-700">
                <Flame className="h-3 w-3" />
                Sapa
              </p>
              <p className="font-serif text-base font-bold text-rose-900">
                {Math.round(sapa)}%
              </p>
            </div>
            <button className="relative rounded-xl border border-slate-200 bg-white p-2 transition hover:bg-slate-50">
              <Bell className="h-4 w-4 text-slate-600" />
              {ticker.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                  {Math.min(ticker.length, 9)}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Sapa Meter</span>
          <Progress value={sapa} className="h-2 flex-1" />
          <Badge
            variant="outline"
            className={
              sapa > 70
                ? "border-rose-300 text-rose-700"
                : sapa > 40
                ? "border-amber-300 text-amber-700"
                : "border-emerald-300 text-emerald-700"
            }
          >
            {sapa > 70 ? "Danger" : sapa > 40 ? "Risky" : "Safe"}
          </Badge>
        </div>
      </div>
    </header>
  );
}