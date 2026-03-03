import { useEffect, useRef, useState } from "react";

interface ToneBannerProps {
  src?: string;
}

export function ToneBanner({ 
  src = "/sigmamusicart-piano-background-music-484602.mp3" 
}: ToneBannerProps) {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3; // optional: set background volume
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const handleFirstClick = async () => {
      if (hidden) return;
      const audio = audioRef.current;
      if (!audio) return;

      try {
        await audio.play();
      } catch (error) {
        console.error("Audio autoplay failed", error);
      }
    };

    window.addEventListener("pointerdown", handleFirstClick, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstClick);
    };
  }, [hidden]);

  if (hidden) return null;

  return null; // No visible button anymore
}