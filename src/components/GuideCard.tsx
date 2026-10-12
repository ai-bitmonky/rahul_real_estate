import Link from "next/link";
import type { Guide } from "@/data/guides";
import GuideCover from "./GuideCover";
import { Ico } from "./Icons";

export default function GuideCard({ g, delay = "" }: { g: Guide; delay?: string }) {
  return (
    <Link className={`guide reveal${delay}`} href={`/guides/${g.slug}`}>
      <div className="cov">
        <GuideCover slug={g.slug} />
      </div>
      <p className="gm">
        {g.category} · {g.date}
      </p>
      <h3>{g.title}</h3>
      <span className="tlink">
        Read <Ico name="arrow" className="arr" />
      </span>
    </Link>
  );
}
