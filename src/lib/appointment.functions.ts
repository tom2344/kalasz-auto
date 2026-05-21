import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  nev: z.string().trim().min(1).max(120),
  telefon: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  szolgaltatas: z.string().trim().min(1).max(120),
  autoTipus: z.string().trim().max(120).optional().or(z.literal("")),
  rendszam: z.string().trim().max(20).optional().or(z.literal("")),
  datum: z.string().trim().min(1).max(20),
  idopont: z.string().trim().min(1).max(20),
  megjegyzes: z.string().trim().max(2000).optional().or(z.literal("")),
});

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

export const sendAppointment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return { ok: false as const, error: "Email szolgáltatás nincs beállítva." };
    }

    const rows: Array<[string, string]> = [
      ["Név", data.nev],
      ["Telefon", data.telefon],
      ["Email", data.email || "—"],
      ["Szolgáltatás", data.szolgaltatas],
      ["Autó típusa", data.autoTipus || "—"],
      ["Rendszám", data.rendszam || "—"],
      ["Kívánt dátum", data.datum],
      ["Kívánt időpont", data.idopont],
      ["Megjegyzés", data.megjegyzes || "—"],
    ];

    const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;background:#f6f6f6;padding:24px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #eee;">
  <h2 style="margin:0 0 16px;color:#c1121f;">Új időpontkérés — Kalász Autószerviz</h2>
  <table style="width:100%;border-collapse:collapse;">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;width:160px;">${esc(
            k
          )}</td><td style="padding:8px;border-bottom:1px solid #eee;">${esc(v)}</td></tr>`
      )
      .join("")}
  </table>
</div></body></html>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Kalász Autószerviz <onboarding@resend.dev>",
          to: ["nagy.csavas@gmail.com"],
          reply_to: data.email || undefined,
          subject: `Időpontkérés: ${data.nev} — ${data.datum} ${data.idopont}`,
          html,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error("Resend error", res.status, txt);
        return { ok: false as const, error: "Nem sikerült elküldeni az emailt." };
      }
      return { ok: true as const };
    } catch (e) {
      console.error(e);
      return { ok: false as const, error: "Hálózati hiba történt." };
    }
  });
