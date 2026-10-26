import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AVATAR_ITEMS, type PlayerState } from "@/lib/gameData";
import { Sparkles, Shirt, User } from "lucide-react";

interface Props {
  state: PlayerState;
  onBuy: (defId: string) => void;
  onEquip: (defId: string) => void;
}

export function AvatarStudio({ state, onBuy, onEquip }: Props) {
  const owned = new Set(state.avatarOwned);
  const equipped = new Set(state.avatarEquipped);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 via-purple-50 to-indigo-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-fuchsia-900">
          <User className="h-6 w-6" />
          Avatar & Street Outfits
        </h2>
        <p className="text-sm text-fuchsia-800/80">
          From faded Okrika to full designer Agbada. Your look is your brand —
          dress the part as your net worth climbs.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-fuchsia-800">
          <Shirt className="h-3.5 w-3.5" />
          {equipped.size} item{equipped.size === 1 ? "" : "s"} equipped
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(AVATAR_ITEMS).map((item) => {
          const isOwned = owned.has(item.id);
          const isEquipped = equipped.has(item.id);
          const canAfford = state.cash >= item.cost;
          return (
            <Card
              key={item.id}
              className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isEquipped
                  ? "border-fuchsia-400 bg-fuchsia-50/50"
                  : isOwned
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-slate-200"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-100 to-purple-100 text-3xl">
                    {item.emoji}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className="capitalize">
                      {item.slot}
                    </Badge>
                    {isEquipped && (
                      <Badge className="bg-fuchsia-600 text-white hover:bg-fuchsia-600">
                        Worn
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-2 font-serif text-base">
                  {item.name}
                </CardTitle>
                <p className="text-xs italic text-muted-foreground">
                  "{item.flavor}"
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold">
                      ₦{item.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cred boost</span>
                    <span className="font-semibold text-amber-700">
                      +{item.credBoost}
                    </span>
                  </div>
                </div>
                {isOwned ? (
                  <Button
                    onClick={() => onEquip(item.id)}
                    variant={isEquipped ? "outline" : "default"}
                    className={
                      isEquipped
                        ? "w-full border-fuchsia-300 text-fuchsia-700"
                        : "w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:from-fuchsia-500 hover:to-purple-500"
                    }
                  >
                    {isEquipped ? "Remove" : "Wear It"}
                  </Button>
                ) : (
                  <Button
                    disabled={!canAfford}
                    onClick={() => onBuy(item.id)}
                    className={
                      canAfford
                        ? "w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:from-fuchsia-500 hover:to-purple-500"
                        : "w-full"
                    }
                  >
                    {canAfford ? (
                      <>
                        <Sparkles className="mr-1 h-4 w-4" /> Buy Outfit
                      </>
                    ) : (
                      "Need more cash"
                    )}
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