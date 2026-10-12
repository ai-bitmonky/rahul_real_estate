import { site } from "@/data/site";
import { Ico } from "./Icons";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <a className="rr tb-d" href={site.reraUrl} target="_blank" rel="noopener">
          <Ico name="shield" />
          RERA-registered · <b>{site.rera}</b> · GSTIN {site.gstin} · Verify on UP RERA ↗
        </a>
        <a className="rr tb-m" href={site.reraUrl} target="_blank" rel="noopener">
          <Ico name="shield" />
          RERA-registered · <b>{site.rera}</b> · Verify ↗
        </a>
        <div className="tr tb-d">
          <span>{site.shortAddress}</span>
          <span aria-hidden="true">·</span>
          <a href={site.phoneHref}>{site.phone}</a>
          <span aria-hidden="true">·</span>
          <a href={site.whatsapp} target="_blank" rel="noopener">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
