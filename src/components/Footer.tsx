import { site } from "@/data/site";
import { FilterLink, HashLink } from "./Links";
import SubscribeForm from "./SubscribeForm";
import { Mono } from "./Icons";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-g">
          <div>
            <HashLink hash="top" className="logo" aria-label="Highness Construction home">
              <Mono />
              <span className="wm">
                <b>Highness</b>
                <small>CONSTRUCTION</small>
              </span>
            </HashLink>
            <address>
              {site.addressLines.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < site.addressLines.length - 1 && <br />}
                </span>
              ))}
            </address>
            <p className="rl">
              RERA{" "}
              <a href={site.reraUrl} target="_blank" rel="noopener">
                {site.rera} ↗
              </a>
              <br />
              GSTIN{" "}
              <a href={site.gstUrl} target="_blank" rel="noopener">
                {site.gstin} ↗
              </a>
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><FilterLink cat="plots">Plots</FilterLink></li>
              <li><FilterLink cat="villas">Villas</FilterLink></li>
              <li><FilterLink cat="apartments">Apartments</FilterLink></li>
              <li><FilterLink cat="com">Commercial</FilterLink></li>
              <li><HashLink hash="emi">EMI calculator</HashLink></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><HashLink hash="featured">New launches</HashLink></li>
              <li><HashLink hash="why">Why us</HashLink></li>
              <li><HashLink hash="journal">Guides</HashLink></li>
              <li><HashLink hash="contact">Contact</HashLink></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={site.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>
                <HashLink hash="top">Instagram</HashLink> · <HashLink hash="top">Facebook</HashLink>
              </li>
            </ul>
            <SubscribeForm />
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="foot-b">
          <div className="lk">
            <span>© 2026 Highness Construction</span>
            <HashLink hash="top">Privacy</HashLink>
            <HashLink hash="top">Terms</HashLink>
          </div>
          <p>
            Images are artist&apos;s impressions. Prices are indicative and exclude registration and GST. *T&amp;C apply. Pay
            only into Highness Construction&apos;s registered bank accounts — never to an individual.
          </p>
        </div>
      </div>
    </footer>
  );
}
