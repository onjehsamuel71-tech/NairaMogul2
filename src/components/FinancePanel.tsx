import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { PlayerState } from "@/lib/gameData";
import { Banknote, Landmark, ShieldCheck, TrendingDown } from "lucide-react";

interface Props {
  state: PlayerState;
  onBorrow: (amount: number) => void;
  onRepay: (amount: number) => void;
  onInsurance: () => void;
}

const LOAN_TIERS = [
  { label: "Quick ₦250k", amount: 250_000 },
  { label: "Standard ₦1M", amount: 1_000_000 },
  { label: "Big ₦2.5M", amount: 2_500_000 },
  { label: "Max ₦5M", amount: 5_000_000 },
];

export function FinancePanel({ state, onBorrow, onRepay, onInsurance }: Props) {
  const [repayAmount, setRepayAmount] = useState("");
  const blocked = state.sapa > 70;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-emerald-900">
          <Landmark className="h-6 w-6" />
          Finance & Banking
        </h2>
        <p className="text-sm text-emerald-800/80">
          Micro-loans keep the engine running. But the Sapa Meter never forgets.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <Banknote className="h-5 w-5 text-emerald-700" />
              Take a Micro-Loan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current debt</span>
                <span className="font-bold">
                  ₦{Math.round(state.loanBalance).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">Interest rate</span>
                <span className="font-semibold">
                  {(state.loanRate * 100).toFixed(1)}% / month
                </span>
              </div>
            </div>

            {blocked && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                🚫 Bank rejected: your Sapa Meter is above 70%. Pay down debt
                first.
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {LOAN_TIERS.map((t) => (
                <Button
                  key={t.amount}
                  disabled={blocked}
                  onClick={() => onBorrow(t.amount)}
                  className={
                    blocked
                      ? ""
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                  }
                >
                  {t.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Each loan adds +8% to your Sapa Meter.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <TrendingDown className="h-5 w-5 text-emerald-700" />
              Repay Debt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repay">Amount to repay (₦)</Label>
              <Input
                id="repay"
                type="number"
                placeholder="e.g. 500000"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-emerald-200 hover:bg-emerald-50"
                onClick={() => setRepayAmount(String(Math.round(state.loanBalance)))}
              >
                Pay Full
              </Button>
              <Button
                className="flex-1 bg-emerald-700 text-white hover:bg-emerald-600"
                disabled={!repayAmount || Number(repayAmount) <= 0}
                onClick={() => {
                  onRepay(Number(repayAmount));
                  setRepayAmount("");
                }}
              >
                Repay
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Repaying reduces your Sapa Meter by 6%.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              Emergency Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm">
                Covers 50% of any event loss (fire, theft, floods, audits).
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    state.insurance
                      ? "bg-emerald-600 text-white hover:bg-emerald-600"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                  }
                >
                  {state.insurance ? "Active" : "Not active"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  One-time cost: ₦120,000
                </span>
              </div>
            </div>
            <Button
              disabled={state.insurance || state.cash < 120_000}
              onClick={onInsurance}
              className={
                state.insurance
                  ? ""
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400"
              }
            >
              {state.insurance ? "Already Insured" : "Buy Insurance"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Sapa Meter Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Risk Level</span>
              <span className="font-bold">{Math.round(state.sapa)}%</span>
            </div>
            <Progress value={state.sapa} className="mt-2 h-3" />
            <p className="mt-3 text-xs text-muted-foreground">
              {state.sapa > 70
                ? "🚨 Danger zone. Bank loans rejected. Assets may be seized."
                : state.sapa > 40
                ? "⚠️ Getting risky. Watch your cash flow."
                : "✅ You're safe. Keep the hustle clean."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}