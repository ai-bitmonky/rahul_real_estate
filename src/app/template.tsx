"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isDetailPath } from "@/lib/shell";

/** Re-mounts on every navigation: detail screens slide in, tab screens fade (phone app shell only, see globals.css). */
export default function Template({ children }: { children: ReactNode }) {
  const path = usePathname();
  return <div className={isDetailPath(path) ? "scr-in scr-d" : "scr-in scr-t"}>{children}</div>;
}
