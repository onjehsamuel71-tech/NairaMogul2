import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ARTIST_CATALOG,
  NIGHTCLUB_CATALOG,
  type PlayerState,
} from "@/lib/gameData";
import { Music, PartyPopper, Star, Wine } from "lucide-react";

interface Props {
  state: PlayerState;
  onSignArtist: (defId: string) => void;
  onDropSingle: (artistId: string) => void;
  onBuyClub: (defId: string) => void;
  onUpgradeClub: (id: string) => void;
}

export function EntertainmentHub({
  state,
  onSignArtist,
  onDropSingle,
  onBuyClub,
  onUpgradeClub,
}: Props) {
  const signedIds = new Set(state.signedArtists.map((a) => a.defId));
  const ownedClubIds = new Set(state.clubs.map((c) => c.defId));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-purple-900">
          <Music className="h-6 w-6" />
          Entertainment Empire
        </h2>
        <p className="text-sm text-purple-800/80">
          Sign underground artists, drop hit singles, and run the wildest VIP
          clubs in Victoria Island. Detty December never ends here.
        </p>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
          <Star className="h-5 w-5 text-purple-600" />
          Record Label — Sign Artists
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(ARTIST_CATALOG).map((artist) => {
            const isSigned = signedIds.has(artist.id);
            const canAfford = state.cash >= artist.signingCost;
            const owned = state.signedArtists.find((a) => a.defId === artist.id);
            return (
              <Card
                key={artist.id}
                className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  isSigned ? "border-purple-400 bg-purple-50/40" : "border-slate-200"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-100 text-3xl">
                      {artist.emoji}
                    </div>
                    {isSigned && (
                      <Badge className="bg-purple-600 text-white hover:bg-purple-600">
                        Signed
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-2 font-serif text-base">
                    {artist.name}
                  </CardTitle>
                  <p className="text-xs italic text-muted-foreground">
                    "{artist.flavor}"
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signing cost</span>
                      <span className="font-bold">
                        ₦{artist.signingCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Royalty/day</span>
                      <span className="font-semibold text-purple-700">
                        ₦{artist.baseRoyalty.toLocaleString()}
                      </span>
                    </div>
                    {owned && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hits dropped</span>
                        <span className="font-semibold">{owned.hits}</span>
                      </div>
                    )}
                  </div>
                  {isSigned ? (
                    <Button
                      onClick={() => onDropSingle(artist.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500"
                    >
                      🎵 Drop Single (₦{artist.singleCost.toLocaleString()})
                    </Button>
                  ) : (
                    <Button
                      disabled={!canAfford}
                      onClick={() => onSignArtist(artist.id)}
                      className={
                        canAfford
                          ? "w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500"
                          : "w-full"
                      }
                    >
                      {canAfford ? "Sign Artist ✍️" : "Need more cash"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
          <Wine className="h-5 w-5 text-fuchsia-600" />
          Nightclub & Lounge Empire
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(NIGHTCLUB_CATALOG).map((club) => {
            const isOwned = ownedClubIds.has(club.id);
            const canAfford = state.cash >= club.cost;
            const owned = state.clubs.find((c) => c.defId === club.id);
            return (
              <Card
                key={club.id}
                className={`flex flex-col rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  isOwned ? "border-fuchsia-400 bg-fuchsia-50/40" : "border-slate-200"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-100 to-pink-100 text-3xl">
                      {club.emoji}
                    </div>
                    {isOwned && (
                      <Badge className="bg-fuchsia-600 text-white hover:bg-fuchsia-600">
                        Owned
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-2 font-serif text-base">
                    {club.name}
                  </CardTitle>
                  <p className="text-xs italic text-muted-foreground">
                    "{club.flavor}"
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-bold">
                        ₦{club.cost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekend rev/day</span>
                      <span className="font-semibold text-fuchsia-700">
                        ₦{club.baseRevenue.toLocaleString()}
                      </span>
                    </div>
                    {owned && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-semibold">{owned.level}</span>
                      </div>
                    )}
                  </div>
                  {isOwned ? (
                    <Button
                      onClick={() => onUpgradeClub(club.id)}
                      className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500"
                    >
                      <PartyPopper className="mr-1 h-4 w-4" />
                      Upgrade VIP (₦{Math.round(club.cost * 0.5).toLocaleString()})
                    </Button>
                  ) : (
                    <Button
                      disabled={!canAfford}
                      onClick={() => onBuyClub(club.id)}
                      className={
                        canAfford
                          ? "w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500"
                          : "w-full"
                      }
                    >
                      {canAfford ? "Open Club 🍾" : "Need more cash"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}