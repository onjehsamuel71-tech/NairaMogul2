import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { POLITICAL_OFFICES, type PlayerState } from "@/lib/gameData";
import { Landmark, Megaphone, Vote } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
  onRunCampaign: (defId: string) => void;
  onHoldOffice: (defId: string) => void;
}

export function PoliticsPanel({
  state,
  netWorth,
  onRunCampaign,
  onHoldOffice,
}: Props) {
  const unlocked = netWorth >= 1_000_000_000;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-amber-900">
          <Landmark className="h-6 w-6" />
          Political Campaign & Public Office
        </h2>
        <p className="text-sm text-amber-800/80">
          Transition from business mogul to political powerhouse. Run for
          Governor or Senator, manage public approval, and unlock government
          mega-contracts.
        </p>
        {!unlocked && (
          <div className="mt-3 rounded-xl bg-white/70 p-3 text-sm text-amber-900">
            🔒 Unlocks at <strong>₦1,000,000,000</strong> net worth. You're at ₦
            {Math.round(netWorth).toLocaleString()}.
          </div>
        )}
        {state.office && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            <Vote className="h-3.5 w-3.5" />
            Currently holding: {POLITICAL_OFFICES[state.office].name}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(POLITICAL_OFFICES).map((office) => {
          const isCurrent = state.office === office.id;
          const canAfford = state.cash >= office.campaignCost;
          const hasApproval = state.publicApproval >= office.minApproval;
          return (
            <Card
              key={office.id}
              className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isCurrent ? "border-emerald-400 bg-emerald-50/40" : "border-slate-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-3xl">
                    {office.emoji}
                  </div>
                  {isCurrent && (
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                      In Office
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {office.name}
                </CardTitle>
                <p className="text-xs italic text-muted-foreground">
                  "{office.flavor}"
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaign cost</span>
                    <span className="font-bold">
                      ₦{office.campaignCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min approval</span>
                    <span className="font-semibold text-amber-700">
                      {office.minApproval}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract bonus</span>
                    <span className="font-semibold text-emerald-700">
                      +{Math.round(office.contractBonus * 100)}%
                    </span>
                  </div>
                </div>
                {isCurrent ? (
                  <Button
                    onClick={() => onHoldOffice(office.id)}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500"
                  >
                    <Megaphone className="mr-1 h-4 w-4" />
                    Boost Approval (₦5M)
                  </Button>
                ) : (
                  <Button
                    disabled={!unlocked || !canAfford || !hasApproval}
                    onClick={() => onRunCampaign(office.id)}
                    className={
                      unlocked && canAfford && hasApproval
                        ? "w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500"
                        : "w-full"
                    }
                  >
                    {!unlocked
                      ? "Locked"
                      : !hasApproval
                      ? `Need ${office.minApproval}% approval`
                      : canAfford
                      ? "Run Campaign 🗳️"
                      : "Need more cash"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}