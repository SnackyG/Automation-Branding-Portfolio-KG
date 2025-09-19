import laptop from '../assets/laptop.jpg';

export default function AutomationBrandingPreview() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 ">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#home" className="text-lg font-semibold tracking-tight">Klaus Gregersen • Automation</a>
          <div className="hidden gap-6 md:flex">
            <a href="#projects" className="text-sm text-neutral-300 hover:text-white">Projects</a>
            <a href="#tech" className="text-sm text-neutral-300 hover:text-white">Tech Explainers</a>
            <a href="#blog" className="text-sm text-neutral-300 hover:text-white">Blog</a>
            <a href="#about" className="text-sm text-neutral-300 hover:text-white">About</a>
            <a href="#contact" className="text-sm text-neutral-300 hover:text-white">Contact</a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5A2.25 2.25 0 0117.25 19.5H6.75A2.25 2.25 0 014.5 17.25V6.75zM6 8.25l6 4.5 6-4.5" />
            </svg>
            Connect
          </a>
        </nav>
      </header>

      {/* HERO */}
<section id="home" className="relative isolate bg-neutral-950">
  <div className="mx-auto max-w-7xl px-4 py-12 md:py-20 relative">
    {/* Hero background constrained to container */}
    <img
      src={laptop}
      alt="Laptop with glowing screen on dark table"
      className="absolute inset-0 -z-10 h-full w-full object-cover object-right rounded-2xl opacity-30"
    />

    <div className="relative max-w-3xl">
      {/* hero text content */}
      <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
        Automation • RPA
      </div>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
        Automatisering gjort simpelt—
        <span className="text-white/80"> i øjenhøjde</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300">
        Jeg dokumenterer min rejse mod at blive automation-ekspert: små projekter, korte tech-forklaringer
        (Power Automate, UiPath, n8n, Make, Zapier) og konkrete tips du kan bruge med det samme.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200">Se projekter</a>
        <a href="#tech" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">Tech explainers</a>
        <a href="#contact" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">Følg mig på LinkedIn</a>
      </div>
    </div>
  </div>
</section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Projects & Case Studies</h2>
            <p className="mt-2 text-sm text-neutral-300">Små showcases: problem → løsning → læring</p>
          </div>
          <a href="#blog" className="text-sm text-neutral-300 hover:text-white">Se flere i bloggen →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SharePoint ↔ Excel sync (Power Automate)",
              img: "https://source.unsplash.com/800x600/?flowchart,diagram",
              problem: "Manuel dataflyt gav fejl og forsinkelser",
              learn: "Brug datavalidering + fejlhåndtering med retries",
            },
            {
              title: "Legacy desktop RPA (UiPath)",
              img: "https://source.unsplash.com/800x600/?robot,automation",
              problem: "Intet API—kun GUI. Behov for robust klik/submit",
              learn: "Stabil selectors + logning + kill-switch",
            },
            {
              title: "Webhook → CRM (n8n/Make)",
              img: "https://source.unsplash.com/800x600/?webhook,api",
              problem: "Leads gik tabt mellem formular og CRM",
              learn: "Idempotency keys + dead-letter queue",
            },
          ].map((p, i) => (
            <article key={i} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <div className="text-sm text-neutral-300">
                  <p>
                    <span className="font-medium text-white">Problem:</span> {p.problem}
                  </p>
                  <p>
                    <span className="font-medium text-white">Læring:</span> {p.learn}
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-300">
                    Læs mere
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

     {/* TECH EXPLAINERS */}
<section id="tech" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
    Tech Explainers
  </h2>
  <p className="mt-2 text-sm text-neutral-300">
    Korte, konkrete forklaringer med hvornår/hvorfor
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[
      {
        name: "Power Automate",
        img: "/Power-Automate-Logo.webp",
        bullets: [
          "God i Microsoft 365-stack",
          "Hurtig at komme i gang",
          "Low kode",
        ],
      },
      {
        name: "UiPath",
        img: "/uipath-logo-transparent.png",
        bullets: [
          "Stærk til legacy/desktop",
          "Enterprise features",
          "Robuste workflows",
        ],
      },
      {
        name: "n8n",
        img: "/N8nLogo.png",
        bullets: ["Self-host", "Open source", "Fleksibel nodes"],
      },
      {
        name: "Make.com",
        img: "/MakeLogo.png",
        bullets: [
          "Visuelt let",
          "Mange integrationer",
          "God til prototyper",
        ],
      },
      {
        name: "Zapier",
        img: "/Zapier_logo.svg",
        bullets: [
          "Hurtig prototyping",
          "Stor app-økologi",
          "Begrænsning v. skala",
        ],
      },
      {
        name: "Best practice",
        img: "/checklist-icon.png",
        bullets: [
          "Fejlhåndtering",
          "Logging/monitorering",
          "ROI-måling",
        ],
      },
    ].map((t, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      >
        {/* Logo-container */}
        <div className="flex h-40 w-full items-center justify-center bg-white/5">
          <img
            src={t.img}
            alt={t.name}
            className="max-h-20 object-contain"
          />
        </div>

        {/* Tekst-indhold */}
        <div className="p-5">
          <h3 className="text-lg font-semibold">{t.name}</h3>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-neutral-300">
            {t.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
          <div className="pt-3">
            <button className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">
              Læs kort intro
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* BLOG */}
      <section id="blog" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Blog (læringslog)</h2>
          <p className="mt-2 text-sm text-neutral-300">Korte indlæg: 1 problem → 1 løsning → 1 takeaway</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "3 små automations der sparer 5 timer/uge", img: "https://source.unsplash.com/800x600/?productivity,time" },
            { title: "Power Automate vs n8n—hvornår vælger jeg hvad?", img: "https://source.unsplash.com/800x600/?compare,versus" },
            { title: "UiPath til legacy: selectors der ikke driller", img: "https://source.unsplash.com/800x600/?legacy,windows" },
          ].map((b, i) => (
            <article key={i} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="text-sm text-neutral-300">Kort teasertekst der forklarer pointen og hvorfor det er nyttigt.</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-300">Læs indlæg →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Om mig</h2>
            <p className="mt-4 text-neutral-300">
              Datamatiker‑studerende, junior konsulent & automations udvikler, der bygger automationer i praksis og deler processen åbent.
              Jeg fokuserer på simple, stabile løsninger og klare læringspointer—så andre kan genbruge mine erfaringer.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-4 text-sm text-neutral-300">
              <li>Fokus: Power Automate, UiPath, n8n, Make, Zapier</li>
              <li>Emner: Ai-beslutnings-flow, SoMe-output-flows, standard RPA automatiseringer</li>
              <li>Community‑CTA: del dine flows—jeg fremhæver de bedste i bloggen</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center">
            <img
              src="/profilePhotoRound.png"
              alt="Portrætbillede (placeholder)"
              className="rounded-full max-w-xs h-auto"
            />
          </div>
        </div>
      </section>

      {/* CONTACT / CTAs */}
      <section id="contact" className="relative">
        <img
          src="://source.unsplash.com/1600x800/?keyboard,desk"
          alt="Contact background"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Skal vi connecte?</h2>
            <p className="mt-3 max-w-2xl text-sm text-neutral-300">
              Jeg poster nye projekter og små how‑to’s. Har du et fedt trick eller et flow, der bare virker? Del det—måske fremhæver jeg det i et indlæg.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
              >
                {/* LinkedIn icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.3 2.5-2.7 5.1-2.7 5.4 0 6.4 3.6 6.4 8.3V24h-5V16c0-1.9 0-4.3-2.6-4.3s-3 2.1-3 4.1V24H8z" />
                </svg>
                Følg mig på LinkedIn
              </a>
              <a href="#" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">
                Del et flow/tip
              </a>
              <a href="#blog" className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">
                Læs bloggen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-neutral-400">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p>
              © {new Date().getFullYear()} Klaus Gregersen • Personal Automation Hub
            </p>
            <div className="flex gap-5">
              <a href="#tech" className="hover:text-white">Tech</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#blog" className="hover:text-white">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
