import { NextResponse } from "next/server";
import { projectNames } from "@/data/projects";
import { leadAdvisor } from "@/data/team";
import { normalisePhone } from "@/lib/validate";

export const dynamic = "force-dynamic";

interface Lead {
  name: string;
  phone: string;
  project: string;
  day: string;
  whatsapp: boolean;
  createdAt: string;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Nothing is mandatory for now (no login / OTP / required fields).
  // We keep whatever the visitor typed, tidy the phone number when it is a valid Indian mobile,
  // and fall back to safe defaults so every request is accepted and logged.
  const name = str(body.name).slice(0, 80) || "Visitor";
  const rawPhone = str(body.phone).slice(0, 20);
  const phone = normalisePhone(rawPhone) ?? rawPhone;
  const projectIn = str(body.project);
  const project = projectNames.includes(projectIn) ? projectIn : projectIn.slice(0, 80) || "Not decided yet";

  const lead: Lead = {
    name,
    phone,
    project,
    day: str(body.day).slice(0, 40) || "Tomorrow",
    whatsapp: body.whatsapp !== false,
    createdAt: new Date().toISOString(),
  };
  console.log("[lead] site visit request", JSON.stringify(lead));

  const hook = process.env.BOOKING_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "site_visit", advisor: leadAdvisor.name, ...lead }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) console.error("[lead] webhook responded", res.status);
    } catch (err) {
      console.error("[lead] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true, advisor: leadAdvisor.name });
}
