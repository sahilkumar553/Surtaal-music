import { useEffect, useRef, useState } from "react";

interface ToneBannerProps {
  src?: string;
}

export function ToneBanner({
  src = "/sigmamusicart-piano-background-music-484602.mp3",
}: ToneBannerProps) {
  // Resolve relative paths using Vite base so the asset works on sub-path deployments.
  const resolvedSrc = src.startsWith("http")
    ? src
    : `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hidden] = useState(false);

  useEffect(() => {
    const audio = new Audio(resolvedSrc);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const handleCanPlay = () => {
      audio.play().catch(() => {
        // Autoplay may still be blocked until user interaction.
      });
    };

    audio.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audioRef.current = null;
    };
  }, [resolvedSrc]);

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (hidden) return;
      const audio = audioRef.current;
      if (!audio) return;

      try {
        await audio.play();
      } catch (error) {
        console.error("Audio autoplay failed", error);
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hidden]);

  if (hidden) return null;

  return null; // No visible button
}