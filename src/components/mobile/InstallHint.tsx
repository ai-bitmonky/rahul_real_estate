"use client";

import { useEffect, useState } from "react";
import { Ico, Mono } from "../Icons";

const KEY = "hc-a2hs-dismissed";

interface InstallEvent extends Event {
  prompt: () => Promise<void>;
}

/** One-time "Add to Home Screen" hint on the phone Home screen (never shown when already installed). */
export default function InstallHint() {
  const [show, setShow] = useState(false);
  const [evt, setEvt] = useState<InstallEvent | null>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked: just show it this time */
    }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (dismissed || standalone) return;
    setShow(true);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!show) return null;
  return (
    <div className="a2hs" role="note">
      <span className="a2hs-ic" aria-hidden="true">
        <Mono />
      </span>
      <div className="a2hs-t">
        <b>Add Highness to your Home Screen</b>
        {evt ? (
          <span>Open it like an app, in one tap.</span>
        ) : (
          <span>
            Tap <Ico name="share" className="inl" /> Share, then “Add to Home Screen”.
          </span>
        )}
        {evt && (
          <button
            type="button"
            className="a2hs-go"
            onClick={async () => {
              await evt.prompt();
              dismiss();
            }}
          >
            Install
          </button>
        )}
      </div>
      <button type="button" className="a2hs-x" aria-label="Dismiss" onClick={dismiss}>
        <Ico name="x" />
      </button>
    </div>
  );
}
