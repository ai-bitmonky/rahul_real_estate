import Link from "next/link";
import { site } from "@/data/site";
import { Ico } from "@/components/Icons";

export default function NotFound() {
  return (
    <main id="main">
      <section className="sec nf">
        <div className="wrap">
          <p className="eyebrow">
            <b>404</b>— Page not found
          </p>
          <h1>
            This page has <em>moved or never existed.</em>
          </h1>
          <p className="lead">The home you are looking for may have a new address. Start again from our homepage or talk to us.</p>
          <div className="acts">
            <Link className="btn btn-p" href="/">
              Back to homepage <Ico name="arrow" className="arr" />
            </Link>
            <a className="btn btn-wa" href={site.whatsapp} target="_blank" rel="noopener">
              <Ico name="wa" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
