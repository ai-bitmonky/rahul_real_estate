"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { Ico } from "../Icons";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Bottom sheet built on <dialog>: drag handle, slides up, closes on backdrop tap,
 * swipe down on the handle, Esc or the close button. Locks body scroll while open.
 */
export default function Sheet({ open, onClose, title, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const drag = useRef<{ y: number; dy: number } | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setClosing(false);
      d.style.transform = "";
      d.showModal();
      document.body.classList.add("lock");
      return;
    }
    if (!open && d.open) {
      setClosing(true);
      const t = setTimeout(() => {
        d.close();
        setClosing(false);
        d.style.transform = "";
      }, reduced() ? 0 : 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const onClosed = () => {
      if (!document.querySelector("dialog.sheet[open]")) document.body.classList.remove("lock");
    };
    d.addEventListener("cancel", onCancel);
    d.addEventListener("close", onClosed);
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("close", onClosed);
    };
  }, [onClose]);

  // Unmount safety: never leave the page scroll-locked.
  useEffect(() => () => document.body.classList.remove("lock"), []);

  const down = (e: RPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { y: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (ref.current) ref.current.style.transition = "none";
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const g = drag.current;
    const d = ref.current;
    if (!g || !d) return;
    g.dy = Math.max(0, e.clientY - g.y);
    d.style.transform = `translateY(${g.dy}px)`;
  };
  const up = () => {
    const g = drag.current;
    const d = ref.current;
    drag.current = null;
    if (!g || !d) return;
    d.style.transition = "";
    if (g.dy > 80) onClose();
    else d.style.transform = "";
  };

  return (
    <dialog
      ref={ref}
      className={`sheet${closing ? " closing" : ""}`}
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet-in">
        <div className="sheet-top" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <i className="grab" aria-hidden="true"></i>
          <div className="sheet-head">
            <h2>{title}</h2>
            <button type="button" className="sheet-x" aria-label="Close" onClick={onClose}>
              <Ico name="x" />
            </button>
          </div>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </dialog>
  );
}
