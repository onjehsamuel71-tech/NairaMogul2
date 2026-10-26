import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlayerState } from "@/lib/gameData";
import { Heart, MessageCircle, Repeat2, Twitter } from "lucide-react";

interface Props {
  state: PlayerState;
}

export function NairaXFeed({ state }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-zinc-50 to-neutral-50 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-900">
          <Twitter className="h-6 w-6 text-sky-500" />
          NairaX — Live Social Feed
        </h2>
        <p className="text-sm text-slate-600">
          NPC citizens, rivals, and news outlets react to your net worth moves,
          business failures, and flexes in real time.
        </p>
      </div>

      <div className="space-y-3">
        {state.nairaX.length === 0 ? (
          <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-3xl">📭</p>
              <p className="mt-2 font-semibold">No posts yet</p>
              <p className="text-sm text-muted-foreground">
                Build your empire and the timeline will start talking.
              </p>
            </CardContent>
          </Card>
        ) : (
          state.nairaX.map((post) => (
            <Card
              key={post.id}
              className="rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-blue-100 text-xl">
                    {post.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {post.handle}
                      </span>
                      {post.verified && (
                        <Badge className="bg-sky-500 text-white hover:bg-sky-500">
                          ✓
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {post.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-800">{post.text}</p>
                    <div className="mt-3 flex gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="h-3.5 w-3.5" /> {post.reposts}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" /> {post.replies}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}