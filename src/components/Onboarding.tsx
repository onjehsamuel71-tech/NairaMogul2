import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CITIES,
  INDUSTRIES,
  STARTING_CASH,
  type CityKey,
  type IndustryKey,
  type TitleKey,
} from "@/lib/gameData";
import type { StartPayload } from "@/lib/gameEngine";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";

interface Props {
  onComplete: (payload: StartPayload) => void;
}

const INDUSTRY_KEYS: IndustryKey[] = ["transport", "buka", "pos"];
const CITY_KEYS: CityKey[] = ["lagos", "abuja", "ph"];

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState<IndustryKey>("transport");
  const [city, setCity] = useState<CityKey>("lagos");
  const [title, setTitle] = useState<TitleKey>("chief");
  const [error, setError] = useState("");

  const handleAccount = () => {
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (username.trim().length < 2) {
      setError("Pick a username (min 2 characters).");
      return;
    }
    setError("");
    setStep(1);
  };

  const handleCompany = () => {
    if (companyName.trim().length < 3) {
      setError("Company name must be at least 3 characters.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleFinish = () => {
    onComplete({ companyName: companyName.trim(), industry, city, title });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 font-serif text-3xl font-bold text-emerald-950 shadow-lg">
            ₦
          </div>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            NAIRA MOGUL
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-amber-300">
            Empire Builder
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-emerald-100/80">
            From the trenches to Banana Island. Build your Nigerian business
            empire, dodge Sapa, and flex on the leaderboard.
          </p>
        </div>

        <Card className="w-full max-w-2xl rounded-2xl border-emerald-700/40 bg-white/95 shadow-2xl backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    i <= step ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <CardTitle className="mt-3 font-serif text-2xl">
              {step === 0 && "Create Your Account"}
              {step === 1 && "Name Your Company"}
              {step === 2 && "Choose Industry & HQ"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {step === 0 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="e.g. naijaboss01"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referral">Referral Code (optional)</Label>
                    <Input
                      id="referral"
                      placeholder="e.g. MOGUL2024"
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Guest play is saved locally in your browser. No backend
                  required.
                </p>
                {error && (
                  <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {error}
                  </p>
                )}
                <Button
                  onClick={handleAccount}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                >
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" /> Company Name
                  </Label>
                  <Input
                    id="company"
                    placeholder="e.g. Eko Express Logistics"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Your Title</Label>
                  <div className="flex flex-wrap gap-2">
                    {(["chief", "chairwoman", "mogul"] as TitleKey[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTitle(t)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition ${
                          title === t
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
                  💰 Starting capital:{" "}
                  <strong>₦{STARTING_CASH.toLocaleString()}</strong>
                </div>
                {error && (
                  <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {error}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(0)}
                    className="border-slate-300"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCompany}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
                  >
                    Continue <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Starting Industry
                  </Label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {INDUSTRY_KEYS.map((k) => {
                      const def = INDUSTRIES[k];
                      const active = industry === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setIndustry(k)}
                          className={`rounded-xl border-2 p-3 text-left transition ${
                            active
                              ? "border-emerald-500 bg-emerald-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-emerald-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{def.emoji}</span>
                            {active && (
                              <Check className="h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                          <p className="mt-1 text-sm font-semibold">
                            {def.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {def.bonus}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> Headquarters
                  </Label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {CITY_KEYS.map((k) => {
                      const def = CITIES[k];
                      const active = city === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setCity(k)}
                          className={`rounded-xl border-2 p-3 text-left transition ${
                            active
                              ? "border-emerald-500 bg-emerald-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-emerald-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{def.emoji}</span>
                            {active && (
                              <Check className="h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                          <p className="mt-1 text-sm font-semibold">
                            {def.name}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-slate-300"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleFinish}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400"
                  >
                    Start Building Empire 🚀
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}