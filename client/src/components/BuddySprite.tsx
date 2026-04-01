/**
 * BuddySprite - Animated ASCII art pet display
 * Design: CRT Terminal aesthetic with phosphor glow
 */

import { useEffect, useRef, useState } from "react";
import { type BuddyResult, IDLE_SEQUENCE, renderSprite } from "@/lib/buddy-engine";

interface BuddySpriteProps {
  buddy: BuddyResult;
}

export default function BuddySprite({ buddy }: BuddySpriteProps) {
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTick(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTick((t) => t + 1);
    }, 500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [buddy]);

  const step = IDLE_SEQUENCE[tick % IDLE_SEQUENCE.length];
  let frame: number;
  let blink = false;
  if (step === -1) {
    frame = 0;
    blink = true;
  } else {
    frame = step;
  }

  let lines = renderSprite(buddy, frame);
  if (blink) {
    lines = lines.map((l) => l.replaceAll(buddy.eye, "-"));
  }

  const rarityGlowClass = {
    common: "",
    uncommon: "glow-text",
    rare: "text-crt-blue",
    epic: "text-crt-purple",
    legendary: "glow-text-amber",
  }[buddy.rarity];

  const shinyClass = buddy.shiny ? "shiny-sparkle" : "";

  return (
    <div className="relative">
      <pre
        className={`text-sm sm:text-base md:text-lg leading-tight font-mono select-none whitespace-pre ${rarityGlowClass} ${shinyClass}`}
        style={{
          textShadow:
            buddy.rarity === "rare"
              ? "0 0 4px rgba(88,166,255,0.6), 0 0 8px rgba(88,166,255,0.3)"
              : buddy.rarity === "epic"
                ? "0 0 4px rgba(175,135,255,0.6), 0 0 8px rgba(175,135,255,0.3)"
                : undefined,
        }}
      >
        {lines.join("\n")}
      </pre>
      {buddy.shiny && (
        <div className="absolute -top-1 -right-1 text-crt-gold text-xs shiny-sparkle">
          ✦ SHINY ✦
        </div>
      )}
    </div>
  );
}
