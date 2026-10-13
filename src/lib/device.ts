import { headers } from "next/headers";

/** "mobile" for phone user-agents (set by src/middleware.ts), otherwise "desktop". */
export async function getDevice(): Promise<"mobile" | "desktop"> {
  return (await headers()).get("x-device") === "mobile" ? "mobile" : "desktop";
}
