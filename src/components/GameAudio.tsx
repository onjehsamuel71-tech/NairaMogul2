import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, VolumeX } from "lucide-react";

export function GameAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/theme.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log("Audio play blocked by browser:", e);
          setIsPlaying(false);
        });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleMusic}
      className="border-emerald-200 bg-white/70 text-emerald-800 hover:bg-emerald-50"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <>
          <VolumeX className="mr-1 h-4 w-4" />
          Mute
        </>
      ) : (
        <>
          <Music className="mr-1 h-4 w-4" />
          Music
        </>
      )}
    </Button>
  );
}