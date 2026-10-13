import Link from "next/link";
import type { Guide } from "@/data/guides";
import GuideCover from "../GuideCover";
import { Ico } from "../Icons";

/** iOS-style list row for a guide: thumbnail, title, chevron. */
export default function GuideRow({ g }: { g: Guide }) {
  return (
    <Link className="grow" href={`/guides/${g.slug}`}>
      <span className="grow-th">
        <GuideCover slug={g.slug} />
      </span>
      <span className="grow-t">
        <small>
          {g.category} · {g.date}
        </small>
        <b>{g.title}</b>
      </span>
      <Ico name="chev" className="chev" />
    </Link>
  );
}
