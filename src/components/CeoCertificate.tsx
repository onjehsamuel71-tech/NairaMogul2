import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BADGES, CITIES, INDUSTRIES, TITLES, type PlayerState } from "@/lib/gameData";
import { Award, Download, Share2, X } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
  onClose: () => void;
}

function pickBadge(state: PlayerState, netWorth: number): string {
  const unlocked = BADGES.filter((b) => state.unlockedBadges.includes(b.id));
  if (unlocked.length > 0) {
    return `${unlocked[unlocked.length - 1].emoji} ${unlocked[unlocked.length - 1].name}`;
  }
  if (state.industry === "transport" && netWorth >= 10_000_000) return "🚐 Lagos Transport Kingpin";
  if (state.industry === "buka" && netWorth >= 10_000_000) return "🍛 Amala Billionaire";
  if (state.industry === "pos" && netWorth >= 10_000_000) return "💳 Cash Flow Wizard";
  if (state.sapa < 10) return "🏃 Sapa Escape Artist";
  if (netWorth >= 50_000_000) return "💎 Fifty Million Flex";
  return "🌱 Rising Hustler";
}

export function CeoCertificate({ state, netWorth, onClose }: Props) {
  const badge = pickBadge(state, netWorth);
  const title = TITLES[state.title];

  const shareText = `${title.short}, I just built a ₦${Math.round(
    netWorth
  ).toLocaleString()} empire in Naira Mogul! Badge: ${badge}. Can you beat my net worth? #NairaMogul`;

  const handleShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 800, 500);
    grad.addColorStop(0, "#064e3b");
    grad.addColorStop(1, "#0f766e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 500);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 28px serif";
    ctx.fillText("NAIRA MOGUL · CEO CERTIFICATE", 40, 70);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px serif";
    ctx.fillText(state.companyName.slice(0, 26), 40, 160);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#a7f3d0";
    ctx.fillText(`${title.label} · ${CITIES[state.city].name}`, 40, 200);
    ctx.fillText(INDUSTRIES[state.industry].name, 40, 230);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 36px serif";
    ctx.fillText(`₦${Math.round(netWorth).toLocaleString()}`, 40, 310);

    ctx.fillStyle = "#ffffff";
    ctx.font = "22px sans-serif";
    ctx.fillText(`Badge: ${badge}`, 40, 370);
    ctx.fillText(`Street Cred: ${Math.round(state.streetCred)}`, 40, 405);

    ctx.fillStyle = "#a7f3d0";
    ctx.font = "16px sans-serif";
    ctx.fillText("Play Naira Mogul: Empire Builder", 40, 460);

    const link = document.createElement("a");
    link.download = `${state.companyName.replace(/\s+/g, "_")}_certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-xl overflow-hidden rounded-2xl border-amber-300 shadow-2xl">
        <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/10 p-1.5 transition hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300">
            <Award className="h-4 w-4" />
            Official CEO Certificate
          </div>
          <h2 className="mt-2 font-serif text-3xl font-bold">
            {state.companyName}
          </h2>
          <p className="mt-1 text-sm text-emerald-100">
            {title.label} · {CITIES[state.city].name} ·{" "}
            {INDUSTRIES[state.industry].name}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
              <p className="text-xs text-emerald-100">Net Worth</p>
              <p className="font-serif text-xl font-bold text-amber-300">
                ₦{Math.round(netWorth).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
              <p className="text-xs text-emerald-100">Street Cred</p>
              <p className="font-serif text-xl font-bold">
                ⭐ {Math.round(state.streetCred)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-amber-400 p-3 text-center text-amber-950">
            <p className="text-xs font-bold uppercase tracking-widest">
              Badge Awarded
            </p>
            <p className="font-serif text-lg font-bold">{badge}</p>
          </div>
        </div>

        <CardContent className="space-y-3 bg-white p-5">
          <p className="text-sm text-slate-600">
            Flex your empire on WhatsApp, X or Instagram. Screenshot or download
            the card below.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share on WhatsApp
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex-1 border-amber-300 hover:bg-amber-50"
            >
              <Download className="mr-1 h-4 w-4" />
              Download Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}