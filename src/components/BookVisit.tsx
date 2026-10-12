"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSiteState } from "@/context/SiteState";
import { projectNames } from "@/data/projects";
import { site } from "@/data/site";
import { normalisePhone } from "@/lib/validate";
import { Ico } from "./Icons";

type Field = "name" | "phone" | "project";
const DAYS = ["Today", "Tomorrow", "This weekend", "Next week"];

const CHECKS: Record<Field, (v: string) => boolean> = {
  name: (v) => v.trim().length >= 2,
  phone: (v) => normalisePhone(v) !== null,
  project: (v) => !!v,
};

export default function BookVisit({ num = "12", defaultProject = "" }: { num?: string; defaultProject?: string }) {
  const { book } = useSiteState();
  const [vals, setVals] = useState({ name: "", phone: "", project: defaultProject, day: "Tomorrow" });
  const [wa, setWa] = useState(true);
  const [err, setErr] = useState<Record<Field, boolean>>({ name: false, phone: false, project: false });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fail">("idle");
  const [advisor, setAdvisor] = useState("Anjali");
  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    project: useRef<HTMLSelectElement>(null),
  };

  // Prefill from "Book visit" links elsewhere on the page.
  useEffect(() => {
    if (!book.tick || !book.project) return;
    setVals((v) => ({ ...v, project: book.project }));
    setErr((e) => ({ ...e, project: false }));
  }, [book]);

  const change = (k: keyof typeof vals, v: string) => {
    setVals((s) => ({ ...s, [k]: v }));
    if (k !== "day") setErr((e) => ({ ...e, [k]: false }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const bad: Record<Field, boolean> = {
      name: !CHECKS.name(vals.name),
      phone: !CHECKS.phone(vals.phone),
      project: !CHECKS.project(vals.project),
    };
    setErr(bad);
    const first = (Object.keys(bad) as Field[]).find((k) => bad[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...vals, whatsapp: wa }),
      });
      const data: { ok?: boolean; advisor?: string } = await res.json();
      if (!res.ok || !data.ok) throw new Error("Booking failed");
      if (data.advisor) setAdvisor(data.advisor.split(" ")[0]);
      setStatus("done");
    } catch {
      setStatus("fail");
    }
  };

  const f = (k: Field) => `f${k === "project" ? " w" : ""}${err[k] ? " err" : ""}`;

  return (
    <section className="book" id="contact" aria-labelledby="h-book">
      <div className="wrap book-g">
        <div>
          <p className="eyebrow reveal">
            {num ? (
              <>
                <b>{num}</b>— Book a visit
              </>
            ) : (
              "Book a visit"
            )}
          </p>
          <h2 id="h-book" className="reveal d1">
            Ready to see it <em>for yourself?</em>
          </h2>
          <p className="l reveal d2">Book a free guided site visit. We call back within 2 hours (9 am – 8 pm).</p>
          <div className="links reveal d2">
            <a href={site.phoneHref}>
              <span>
                <Ico name="phone" />
              </span>
              {site.phone}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener">
              <span>
                <Ico name="wa" />
              </span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className={`form reveal d1${status === "done" ? " done" : ""}`} id="formBox">
          <form id="bookForm" noValidate onSubmit={submit}>
            <h3>Book a free site visit</h3>
            <p>Takes 30 seconds. No payment needed.</p>
            <div className="fg">
              <div className={f("name")}>
                <label htmlFor="fN">Your name</label>
                <input
                  ref={refs.name}
                  id="fN"
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. Priya Mishra"
                  value={vals.name}
                  aria-invalid={err.name}
                  onChange={(e) => change("name", e.target.value)}
                />
                <span className="e">Please enter your name.</span>
              </div>
              <div className={f("phone")}>
                <label htmlFor="fP">Phone number</label>
                <input
                  ref={refs.phone}
                  id="fP"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile"
                  value={vals.phone}
                  aria-invalid={err.phone}
                  onChange={(e) => change("phone", e.target.value)}
                />
                <span className="e">Please enter a 10-digit mobile number.</span>
              </div>
              <div className={f("project")}>
                <label htmlFor="fJ">Project</label>
                <select
                  ref={refs.project}
                  id="fJ"
                  name="project"
                  value={vals.project}
                  aria-invalid={err.project}
                  onChange={(e) => change("project", e.target.value)}
                >
                  <option value="">Choose a project</option>
                  {projectNames.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span className="e">Please choose a project.</span>
              </div>
              <div className="f w">
                <label htmlFor="fD">Preferred day</label>
                <select id="fD" name="day" value={vals.day} onChange={(e) => change("day", e.target.value)}>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label className="chk">
              <input type="checkbox" checked={wa} onChange={(e) => setWa(e.target.checked)} /> Also message me on WhatsApp
            </label>
            <button className="btn btn-p" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Book my visit"} <Ico name="arrow" className="arr" />
            </button>
            <p className="fine" role={status === "fail" ? "alert" : undefined}>
              {status === "fail"
                ? `Sorry, that did not go through. Please try again or call ${site.phone}.`
                : "We never share your number. No spam calls."}
            </p>
          </form>
          <div className="ok-msg" role="status">
            <div className="ic">
              <Ico name="check" />
            </div>
            <h3>Visit request received</h3>
            <p id="okT">Thanks, {advisor} will call you within 2 hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
