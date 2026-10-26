import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GRIND_COOLDOWN_MS } from "@/lib/gameData";
import { Zap } from "lucide-react";

interface Props {
  onGrind: () => void;
}

export function GrindButton({ onGrind }: Props) {
  const [cooldown, setCooldown] = useState(false);
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (cooldown) return;
    onGrind();
    setCooldown(true);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 300);
    timerRef.current = window.setTimeout(
      () => setCooldown(false),
      GRIND_COOLDOWN_MS
    );
  };

  return (
    <Button
      onClick={handleClick}
      disabled={cooldown}
      className={`w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md transition hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 ${
        pulse ? "scale-95" : "scale-100"
      }`}
    >
      <Zap className="mr-2 h-4 w-4" />
      {cooldown ? "Catching breath..." : "Tap to Grind (+₦8k)"}
    </Button>
  );
}