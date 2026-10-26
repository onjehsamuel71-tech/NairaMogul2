let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.08,
  delay = 0
) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(c.destination);
  const start = c.currentTime + delay;
  osc.start(start);
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.stop(start + duration);
}

export type SoundName =
  | "chaChing"
  | "generator"
  | "crowd"
  | "hype"
  | "loss"
  | "levelUp";

export function playSound(name: SoundName) {
  switch (name) {
    case "chaChing":
      tone(880, 0.12, "square", 0.06, 0);
      tone(1320, 0.18, "square", 0.06, 0.09);
      break;
    case "generator":
      tone(60, 0.5, "sawtooth", 0.05, 0);
      tone(55, 0.4, "sawtooth", 0.04, 0.3);
      break;
    case "crowd":
      tone(220, 0.6, "triangle", 0.04, 0);
      tone(330, 0.5, "triangle", 0.04, 0.1);
      tone(440, 0.4, "triangle", 0.03, 0.2);
      break;
    case "hype":
      tone(440, 0.1, "square", 0.05, 0);
      tone(660, 0.1, "square", 0.05, 0.1);
      tone(880, 0.15, "square", 0.05, 0.2);
      break;
    case "loss":
      tone(300, 0.2, "sawtooth", 0.05, 0);
      tone(200, 0.3, "sawtooth", 0.05, 0.15);
      break;
    case "levelUp":
      tone(523, 0.15, "sine", 0.07, 0);
      tone(659, 0.15, "sine", 0.07, 0.12);
      tone(784, 0.25, "sine", 0.07, 0.24);
      break;
  }
}

export const HYPE_LINES = [
  "Chai! You dey ball o!",
  "Omo, money dey talk!",
  "Na you be the real Mogul!",
  "Sapa no fit catch you today!",
  "E choke! E don choke!",
  "You too much, Chairman!",
  "See money wey you dey make!",
  "Ah! Na so the empire dey grow!",
];

export function randomHype(): string {
  return HYPE_LINES[Math.floor(Math.random() * HYPE_LINES.length)];
}