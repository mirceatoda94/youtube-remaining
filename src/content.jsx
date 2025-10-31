import React from "react";
import { createRoot } from "react-dom/client";
import RemainingTime from "./remaining/RemainingTime.jsx";

function mount() {
  const contents = document.querySelector(
    ".ytp-time-display .ytp-time-contents"
  );
  if (!contents) return;

  if (contents.querySelector("#yt-remaining-root")) return;

  const durationEl = contents.querySelector(".ytp-time-duration");
  if (!durationEl) return;

  const container = document.createElement("span");
  container.id = "yt-remaining-root";
  container.style.display = "inline-flex";
  container.style.alignItems = "center";

  const sep = document.createElement("span");
  sep.className = "ytp-time-separator";
  sep.textContent = " | ";
  sep.style.marginLeft = "6px";
  sep.style.marginRight = "0px";
  sep.style.color = "#fff";
  container.appendChild(sep);

  const reactHost = document.createElement("span");
  reactHost.id = "yt-remaining-react-host";
  reactHost.style.color = "#fff";
  container.appendChild(reactHost);

  durationEl.insertAdjacentElement("afterend", container);

  const root = createRoot(reactHost);
  root.render(<RemainingTime />);
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
