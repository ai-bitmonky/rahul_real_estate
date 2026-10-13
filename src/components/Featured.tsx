import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";
import { BookLink } from "./Links";
import Progress from "./Progress";
import { Ico } from "./Icons";

export default function Featured() {
  const p = getProject("summit-twin-towers");
  if (!p) return null;
  return (
    <section className="feat" id="featured" aria-labelledby="h-feat">
      <div className="feat-g">
        <div className="feat-im">
          <Image src={`/img/${p.image}.jpg`} alt={p.imageAlt} fill quality={85} sizes="(max-width: 999px) 100vw, 50vw" />
          <span className="tag bl">Artist&apos;s impression</span>
        </div>
        <div className="feat-b">
          <p className="eyebrow reveal">
            <b>04</b>— New launch · Under construction
          </p>
          <h2 id="h-feat" className="reveal d1">
            <Link href={`/projects/${p.slug}`}>{p.name}</Link>
          </h2>
          <p className="d reveal d1">{p.description}</p>
          <div className="facts reveal d2">
            <div>
              <small>RERA no.</small>
              <a href={site.reraUrl} target="_blank" rel="noopener">
                {p.rera} ↗
              </a>
            </div>
            <div>
              <small>Possession</small>
              <b>{p.possession}</b>
            </div>
            <div>
              <small>Homes</small>
              <b>2 &amp; 3 BHK</b>
            </div>
            <div>
              <small>Price</small>
              <b className="num">From ₹52 L*</b>
            </div>
          </div>
          <ul className="amen reveal d2">
            {p.amenities.map((a) => (
              <li key={a}>
                <Ico name="check" />
                {a}
              </li>
            ))}
          </ul>
          <Progress slug={p.slug} />
          <div className="feat-cta reveal">
            <BookLink className="btn btn-brass" project={p.name}>
              Enquire about Summit <Ico name="arrow" className="arr" />
            </BookLink>
            <BookLink className="btn btn-od" project={p.name}>
              Download brochure
            </BookLink>
          </div>
        </div>
      </div>
    </section>
  );
}
