import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Disc3,
  Car,
  Search,
  Droplet,
  Wrench,
  Zap,
  ClipboardCheck,
  Settings,
  Facebook,
  Phone,
} from "lucide-react";
import logo from "@/assets/q-service-logo.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { sendAppointment } from "@/lib/appointment.functions";

const galleryImages = [
  { src: gallery1, alt: "Autószerviz műhely belső" },
  { src: gallery2, alt: "Féktárcsa csere" },
  { src: gallery3, alt: "Motor diagnosztika" },
  { src: gallery4, alt: "Olajcsere" },
  { src: gallery5, alt: "Futómű javítás" },
  { src: gallery6, alt: "Szerszámok és felszerelés" },
];

const TITLE = "Kalász Autószerviz | Autószerviz Békésen – Fék, Futómű, Diagnosztika";
const DESC =
  "Autószerviz Békésen és környékén. Fék, futómű, diagnosztika, olajcsere, műszaki felkészítés. Q-Service hálózat tagja, 15+ év tapasztalat. Hívjon: +36 70 368 3302";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Kalász Autószerviz",
  image: "/og.jpg",
  telephone: "+36 70 368 3302",
  email: "nagy.csavas@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kalász sor 28.",
    addressLocality: "Békés",
    postalCode: "5630",
    addressCountry: "HU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 46.7686, longitude: 21.1303 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: ["Békés", "Békéscsaba", "Gyula", "Békés megye"],
  url: "/",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hu_HU" },
      { property: "og:url", content: "https://kalasz-auto.lovable.app/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://kalasz-auto.lovable.app/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  component: Index,
});

const services = [
  { t: "Fék javítás", d: "Féktárcsa, fékbetét, fékfolyadék csere — gyorsan és garanciával.", Icon: Disc3 },
  { t: "Futómű javítás", d: "Lengéscsillapító, stabilizátor, futómű geometria beállítás.", Icon: Car },
  { t: "Motor diagnosztika", d: "Bosch diagnosztika, hibakód olvasás, pontos hibafeltárás.", Icon: Search },
  { t: "Olajcsere", d: "Motorolaj és szűrők cseréje márkafüggetlenül, minőségi alapanyagokkal.", Icon: Droplet },
  { t: "Vezérlés és kuplung csere", d: "Vezérműszíj, vezérműlánc, kuplung szett csere szakszerűen.", Icon: Wrench },
  { t: "Elektromos hibák javítása", d: "Elektromos rendszer diagnosztika és javítás minden márkára.", Icon: Zap },
  { t: "Műszakira felkészítés", d: "Teljes körű átvizsgálás és felkészítés a műszaki vizsgára.", Icon: ClipboardCheck },
  { t: "Általános karbantartás", d: "Időszakos szervizelés, ellenőrzés, megelőző karbantartás.", Icon: Settings },
];

const trust = [
  "Q-Service hálózat tagja",
  "15+ év tapasztalat",
  "Garancia minden javításra",
  "Márkafüggetlen szerviz",
  "Bosch diagnosztika",
  "Békés és környéke",
];

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <ServiceArea />
        <About />
        <Gallery />
        <Appointment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="Q-Service" className="h-10 w-10 object-contain" width={40} height={40} />
          <span className="font-bold text-secondary tracking-tight">Kalász Autószerviz</span>
        </a>
        <nav className="hidden gap-7 text-sm font-medium md:flex">
          <a href="#szolgaltatasok" className="text-foreground/80 hover:text-primary transition-colors">Szolgáltatások</a>
          <a href="#rolunk" className="text-foreground/80 hover:text-primary transition-colors">Rólunk</a>
          <a href="#idopont" className="text-foreground/80 hover:text-primary transition-colors">Időpont</a>
          <a href="#kapcsolat" className="text-foreground/80 hover:text-primary transition-colors">Kapcsolat</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/p/Kal%C3%A1sz-Aut%C3%B3szerviz-61582370366586/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-secondary hover:bg-muted transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="tel:+36703683302"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+36 70 368 3302</span>
            <span className="sm:hidden">Hívás</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Q-Service hálózat tagja
        </p>
        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Kalász Autószerviz</h1>
        <p className="mt-3 text-xl text-secondary-foreground/90 md:text-2xl">
          Autószerviz Békésen — Kalász sor 28.
        </p>
        <p className="mt-5 max-w-2xl text-base text-secondary-foreground/80 md:text-lg">
          Teljes körű autószerelés Békésen és környékén — Q-Service hálózat tagjaként, 15 év
          tapasztalattal.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="tel:+36703683302"
            className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90"
          >
            Hívás: +36 70 368 3302
          </a>
          <a
            href="#szolgaltatasok"
            className="rounded-md border border-secondary-foreground/30 px-6 py-3 text-base font-semibold hover:bg-secondary-foreground/10"
          >
            Szolgáltatások
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="szolgaltatasok" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Szolgáltatások</h2>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          Márkafüggetlen autószerelés Békésen és környékén.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.Icon;
            return (
              <article
                key={s.t}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-secondary">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section id="terulet" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Szolgáltatási terület</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Autószervizünk Békésen, a Kalász soron található. Ügyfeleinket fogadjuk Békésről és a
          környező településekről — Békéscsabáról, Gyuláról és a 20 km-es körzetből.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="rolunk" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Rólunk</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Q-Service hálózat tagja, több mint 15 év tapasztalattal. Márkafüggetlen autószerviz
          személyautók és kis teherautók javítására. Modern diagnosztika, gyors hibafeltárás,
          garancia minden munkára.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((b) => (
            <li
              key={b}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-secondary shadow-sm"
            >
              <span className="mr-2 text-primary">✓</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeria" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pár kép szervizünkből</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Appointment() {
  const send = useServerFn(sendAppointment);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      nev: String(fd.get("nev") || ""),
      telefon: String(fd.get("telefon") || ""),
      email: String(fd.get("email") || ""),
      szolgaltatas: String(fd.get("szolgaltatas") || ""),
      autoTipus: String(fd.get("autoTipus") || ""),
      rendszam: String(fd.get("rendszam") || ""),
      datum: String(fd.get("datum") || ""),
      idopont: String(fd.get("idopont") || ""),
      megjegyzes: String(fd.get("megjegyzes") || ""),
    };
    try {
      const res = await send({ data: payload });
      if (res.ok) {
        setStatus("ok");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("err");
        setErrMsg(res.error);
      }
    } catch {
      setStatus("err");
      setErrMsg("Hiba történt. Próbálja újra.");
    }
  }

  const input =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="idopont" className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold md:text-4xl">Időpontkérés</h2>
        <p className="mt-2 text-muted-foreground">
          Töltse ki az űrlapot, hamarosan visszahívjuk.
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-1 block text-sm font-medium">Név *</span>
            <input name="nev" required maxLength={120} className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Telefonszám *</span>
            <input name="telefon" required maxLength={40} className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Email</span>
            <input name="email" type="email" maxLength={200} className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Szolgáltatás *</span>
            <select name="szolgaltatas" required className={input} defaultValue="">
              <option value="" disabled>Válasszon…</option>
              {services.map((s) => (
                <option key={s.t} value={s.t}>{s.t}</option>
              ))}
              <option value="Egyéb">Egyéb</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Autó típusa</span>
            <input name="autoTipus" maxLength={120} className={input} placeholder="pl. VW Passat 2015" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Rendszám</span>
            <input name="rendszam" maxLength={20} className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Kívánt dátum *</span>
            <input name="datum" type="date" required className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Kívánt időpont *</span>
            <input name="idopont" type="time" required className={input} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">Megjegyzés</span>
            <textarea name="megjegyzes" rows={4} maxLength={2000} className={input} />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Küldés…" : "Időpont kérése"}
            </button>
            {status === "ok" && (
              <p className="mt-3 text-sm font-medium text-secondary">
                Köszönjük! Hamarosan visszahívjuk a megadott telefonszámon.
              </p>
            )}
            {status === "err" && (
              <p className="mt-3 text-sm font-medium text-primary">{errMsg}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kapcsolat" className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Kapcsolat</h2>
          <ul className="mt-6 space-y-3 text-base">
            <li>
              <span className="font-semibold">Telefon: </span>
              <a className="hover:text-primary" href="tel:+36703683302">+36 70 368 3302</a>
            </li>
            <li>
              <span className="font-semibold">Email: </span>
              <a className="hover:text-primary" href="mailto:nagy.csavas@gmail.com">nagy.csavas@gmail.com</a>
            </li>
            <li>
              <span className="font-semibold">Cím: </span>5630 Békés, Kalász sor 28.
            </li>
            <li>
              <span className="font-semibold">Facebook: </span>
              <a
                className="hover:text-primary"
                href="https://www.facebook.com/p/Kal%C3%A1sz-Aut%C3%B3szerviz-61582370366586/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kalász Autószerviz
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold">Nyitvatartás</h3>
          <ul className="mt-4 space-y-2 text-base">
            <li>Hétfő – Péntek: 08:00 – 17:00</li>
            <li>Szombat – Vasárnap: Zárva</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kalász Autószerviz · 5630 Békés, Kalász sor 28.
      </div>
    </footer>
  );
}
