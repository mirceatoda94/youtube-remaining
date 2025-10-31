import React, { useEffect, useState } from "react";

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
    const video = document.querySelector("video");
    if (!video) return;

    const handler = () => {
      const r = (video.duration || 0) - video.currentTime;
      setRemaining(r);
    };

    video.addEventListener("timeupdate", handler);
    handler();

    return () => video.removeEventListener("timeupdate", handler);
  }, []);

  return (
    <span style={{ marginLeft: "6px", opacity: 0.8 }}>
      -{formatTime(remaining)}
    </span>
  );
}
