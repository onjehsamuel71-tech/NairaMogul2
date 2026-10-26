import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SQUAD_ASSETS, type PlayerState } from "@/lib/gameData";
import { Crown, Users, UsersRound } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
  onCreateSquad: (name: string) => void;
  onJoinSquad: (name: string) => void;
  onBuySquadAsset: (defId: string) => void;
}

export function HustleSquad({
  state,
  netWorth,
  onCreateSquad,
  onJoinSquad,
  onBuySquadAsset,
}: Props) {
  const [name, setName] = useState("");
  const owned = new Set(state.squadAssets.map((s) => s.defId));
  const squadNetWorth = netWorth + state.squadMembers * 5_000_000;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-indigo-900">
          <UsersRound className="h-6 w-6" />
          Hustle Squads (Clan System)
        </h2>
        <p className="text-sm text-indigo-800/80">
          Form or join a squad with friends. Combine net worth to buy massive
          syndicate assets and compete on squad leaderboards.
        </p>
      </div>

      {!state.squadName ? (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              Create or Join a Squad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="squad">Squad Name</Label>
              <Input
                id="squad"
                placeholder="e.g. Eko Money Boys"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                disabled={name.trim().length < 3}
                onClick={() => onCreateSquad(name.trim())}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500"
              >
                <Crown className="mr-1 h-4 w-4" /> Create Squad
              </Button>
              <Button
                variant="outline"
                disabled={name.trim().length < 3}
                onClick={() => onJoinSquad(name.trim())}
                className="flex-1 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              >
                <Users className="mr-1 h-4 w-4" /> Join Squad
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="rounded-2xl border-indigo-200 bg-indigo-50/40 shadow-sm">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-indigo-700">
                  Your Squad
                </p>
                <p className="font-serif text-2xl font-bold text-indigo-900">
                  {state.squadName}
                </p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">Members</p>
                  <p className="font-serif text-xl font-bold">
                    {state.squadMembers}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Squad Net Worth</p>
                  <p className="font-serif text-xl font-bold text-indigo-700">
                    ₦{Math.round(squadNetWorth).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="mb-3 font-serif text-lg font-bold text-slate-900">
              Syndicate Assets
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(SQUAD_ASSETS).map((asset) => {
                const isOwned = owned.has(asset.id);
                const canAfford = state.cash >= asset.cost;
                return (
                  <Card
                    key={asset.id}
                    className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      isOwned ? "border-indigo-400 bg-indigo-50/40" : "border-slate-200"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 text-3xl">
                          {asset.emoji}
                        </div>
                        {isOwned && (
                          <Badge className="bg-indigo-600 text-white hover:bg-indigo-600">
                            Owned
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="mt-2 font-serif text-base">
                        {asset.name}
                      </CardTitle>
                      <p className="text-xs italic text-muted-foreground">
                        "{asset.flavor}"
                      </p>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between gap-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-bold">
                            ₦{asset.cost.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue/day</span>
                          <span className="font-semibold text-indigo-700">
                            ₦{asset.baseRevenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        disabled={isOwned || !canAfford}
                        onClick={() => onBuySquadAsset(asset.id)}
                        className={
                          !isOwned && canAfford
                            ? "w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500"
                            : "w-full"
                        }
                      >
                        {isOwned ? "Already Owned" : canAfford ? "Buy Syndicate Asset" : "Need more cash"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}