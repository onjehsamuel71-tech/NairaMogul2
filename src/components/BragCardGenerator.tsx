import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FLEX_CATALOG, type PlayerState } from "@/lib/gameData";
import { DISTRICTS } from "@/lib/districts";
import { Download, Share2, Sparkles } from "lucide-react";

interface Props {
  state: PlayerState;
  netWorth: number;
}

const TITLE_OPTIONS = [
  "Chief",
  "Chief Dr.",
  "Chief Dr. Senator",
  "Alhaji",
  "Chief (Mrs.)",
  "Baba Nla",
];

export function BragCardGenerator({ state, netWorth }: Props) {
  const [title, setTitle] = useState("Chief");
  const [customTitle, setCustomTitle] = useState("");

  const district = DISTRICTS.find((d) => d.id === state.districtId) ?? DISTRICTS[0];
  const topCar = [...state.flex]
    .map((f) => FLEX_CATALOG[f.defId])
    .filter((d) => d.category === "garage")
    .sort((a, b) => b.cost - a.cost)[0];
  const topMansion = [...state.flex]
    .map((f) => FLEX_CATALOG[f.defId])
    .filter((d) => d.category === "aviation")
    .sort((a, b) => b.cost - a.cost)[0];

  const displayTitle = customTitle || title;
  const car = topCar ? `${topCar.emoji} ${topCar.name}` : "🚶 Still trekking";
  const mansion = topMansion
    ? `${topMansion.emoji} ${topMansion.name}`
    : "🏠 Still renting";

  const shareText = `${displayTitle} ${state.companyName} — Net Worth ₦${Math.round(
    netWorth
  ).toLocaleString()} | ${car} | ${mansion} | Based in ${district.name}. Can you beat my flex? #NairaMogul`;

  const handleShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
    grad.addColorStop(0, "#064e3b");
    grad.addColorStop(0.5, "#0f766e");
    grad.addColorStop(1, "#b45309");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(60, 60, 960, 1800);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 40px serif";
    ctx.fillText("NAIRA MOGUL · NET WORTH BRAG", 100, 180);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 72px serif";
    ctx.fillText(displayTitle, 100, 320);

    ctx.font = "bold 64px serif";
    ctx.fillText(state.companyName.slice(0, 22), 100, 420);

    ctx.fillStyle = "#a7f3d0";
    ctx.font = "32px sans-serif";
    ctx.fillText(`${district.emoji} ${district.name}`, 100, 490);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 120px serif";
    ctx.fillText(`₦${Math.round(netWorth).toLocaleString()}`, 100, 700);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px serif";
    ctx.fillText("MY FLEX:", 100, 850);

    ctx.font = "40px sans-serif";
    ctx.fillText(car.slice(0, 30), 100, 940);
    ctx.fillText(mansion.slice(0, 30), 100, 1010);

    ctx.fillStyle = "#a7f3d0";
    ctx.font = "32px sans-serif";
    ctx.fillText(`Street Cred: ${Math.round(state.streetCred)}`, 100, 1120);
    ctx.fillText(`Sapa Meter: ${Math.round(state.sapa)}%`, 100, 1170);
    ctx.fillText(`Legitimacy: ${Math.round(state.legitimacy)}%`, 100, 1220);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 36px serif";
    ctx.fillText("Can you beat my flex?", 100, 1400);

    ctx.fillStyle = "#ffffff";
    ctx.font = "28px sans-serif";
    ctx.fillText("Play Naira Mogul: Empire Builder", 100, 1460);

    const link = document.createElement("a");
    link.download = `${state.companyName.replace(/\s+/g, "_")}_brag.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 p-5">
        <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-amber-900">
          <Sparkles className="h-6 w-6" />
          Net Worth Brag Generator
        </h2>
        <p className="text-sm text-amber-900/80">
          Generate a gorgeous flex card for Instagram Stories, TikTok, and
          WhatsApp Status.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="space-y-4 p-5">
            <div className="space-y-2">
              <Label>Choose Your Title</Label>
              <div className="flex flex-wrap gap-2">
                {TITLE_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTitle(t);
                      setCustomTitle("");
                    }}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      title === t && !customTitle
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom">Or Custom Title</Label>
              <Input
                id="custom"
                placeholder="e.g. Chief Dr. Senator Baba Nla"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
              >
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1 border-amber-300 hover:bg-amber-50"
              >
                <Download className="mr-1 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl border-amber-300 shadow-lg">
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-700 p-6 text-white">
            <p className="text-xs uppercase tracking-widest text-amber-300">
              Net Worth Brag
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold">
              {displayTitle}
            </h3>
            <p className="font-serif text-2xl">{state.companyName}</p>
            <p className="mt-1 text-sm text-emerald-100">
              {district.emoji} {district.name}
            </p>

            <p className="mt-5 font-serif text-4xl font-bold text-amber-300">
              ₦{Math.round(netWorth).toLocaleString()}
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <p>
                <span className="text-emerald-200">Car:</span> {car}
              </p>
              <p>
                <span className="text-emerald-200">Mansion:</span> {mansion}
              </p>
              <p>
                <span className="text-emerald-200">Street Cred:</span>{" "}
                {Math.round(state.streetCred)}
              </p>
              <p>
                <span className="text-emerald-200">Legitimacy:</span>{" "}
                {Math.round(state.legitimacy)}%
              </p>
            </div>

            <p className="mt-6 font-serif text-lg font-bold text-amber-300">
              Can you beat my flex?
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}