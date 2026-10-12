"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useSiteState } from "@/context/SiteState";

interface HashLinkProps {
  /** Section id on the home page, e.g. "properties" (no #) */
  hash: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

/** "#x" on the home page, "/#x" (client navigation) elsewhere. */
export function HashLink({ hash, className, children, onClick, ...rest }: HashLinkProps) {
  const path = usePathname();
  if (path === "/") {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick} aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${hash}`} className={className} onClick={onClick} aria-label={rest["aria-label"]}>
      {children}
    </Link>
  );
}

/** Link that sets the listings filter (plots | villas | apartments | com) and jumps to #properties. */
export function FilterLink({
  cat,
  fromCollage = false,
  className,
  children,
}: {
  cat: string;
  fromCollage?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { applyCat } = useSiteState();
  return (
    <HashLink hash="properties" className={className} onClick={() => applyCat(cat, fromCollage)}>
      {children}
    </HashLink>
  );
}

/** Link to the booking form (#contact on the current page) with the project prefilled. */
export function BookLink({ project, className, children }: { project: string; className?: string; children: ReactNode }) {
  const { setBook } = useSiteState();
  return (
    <a href="#contact" className={className} onClick={() => setBook(project)}>
      {children}
    </a>
  );
}
