import { useEffect, useState } from "react";
import { playSound, randomHype, type SoundName } from "@/lib/sound";

export interface HypeMessage {
  id: number;
  text: string;
  sound: SoundName;
}

interface Props {
  message: HypeMessage | null;
}

export function HypeToast({ message }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    playSound(message.sound);
    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), 2_800);
    return () => window.clearTimeout(id);
  }, [message]);

  if (!message || !visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-center shadow-2xl">
        <p className="font-serif text-base font-bold text-white">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export function useHype() {
  const [message, setMessage] = useState<HypeMessage | null>(null);
  const fire = (text: string, sound: SoundName) => {
    setMessage({ id: Date.now(), text, sound });
  };
  const fireRandom = (sound: SoundName = "hype") => {
    fire(randomHype(), sound);
  };
  return { message, fire, fireRandom };
}