import React, { useEffect, useState } from "react";

// 4:40 -> 280
function toSeconds(str) {
  if (!str) return 0;
  const parts = str.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 3) {
    // h:m:s
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    // m:s
    return parts[0] * 60 + parts[1];
  }

  return parseInt(str, 10) || 0;
}

function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mm = h ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");

  return (h ? `${h}:` : "") + `${mm}:${ss}`;
}

export default function RemainingTime() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEl = document.querySelector(".ytp-time-current");
      const durationEl = document.querySelector(".ytp-time-duration");
      if (!currentEl || !durationEl) return;

      const currentSec = toSeconds(currentEl.textContent?.trim());
      const durationSec = toSeconds(durationEl.textContent?.trim());
      const rem = durationSec - currentSec;
      setRemaining(rem);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <span style={{ color: "#fff" }}>-{formatTime(remaining)}</span>;
}
