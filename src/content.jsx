import React from "react";
import { createRoot } from "react-dom/client";
import RemainingTime from "./remaining/RemainingTime.jsx";

function mount() {
  const display = document.querySelector(".ytp-time-display");
  if (!display) return;

  display.style.display = "flex";
  display.style.alignItems = "center";
  display.style.gap = "4px";

  if (display.querySelector("#yt-remaining-root")) return;

  const container = document.createElement("span");
  container.id = "yt-remaining-root";
  display.appendChild(container);

  const root = createRoot(container);
  root.render(
    <>
      <span style={{ opacity: 0.5, margin: "0 4px" }}>|</span>
      <RemainingTime />
    </>
  );
}

const observer = new MutationObserver(mount);
observer.observe(document.body, { childList: true, subtree: true });

let last = location.href;
setInterval(() => {
  if (location.href !== last) {
    last = location.href;
    setTimeout(mount, 1200);
  }
}, 800);

mount();
