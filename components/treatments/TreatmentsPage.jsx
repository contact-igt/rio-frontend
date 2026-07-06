"use client";

import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — TREATMENTS landing page  (route: /treatments)
   Lists every treatment in one place; each card opens its detail page.
   Brand: Deep Blue #303573 · Pink #FD70A1 · Green #7BA93A · Warm Brown CTAs.
   Drop-in → export default RioTreatmentsPage   (Next.js: add "use client".)
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  "logo": "/assets/shared/riologov2.png",
  "banner": "/assets/shared/site-hero.png",
  "Advanced-NICU": "/assets/treatments/neonatal-intensive-care.png",
  "critical-care2": "/assets/treatments/diagnostic-suite.png",
  "critical-care3": "/assets/treatments/paediatric-intensive-care.png",
  "maternity-care": "/assets/treatments/womens-care.png",
  "newborn-care": "/assets/treatments/child-newborn-care.png",
  "expert-specialists": "/assets/treatments/specialist-team.png",
  "expert-specialists2": "/assets/treatments/clinical-team-support.png",
  "critical-care4": "/assets/treatments/human-milk-bank.png",
  "emergency": "/assets/treatments/emergency-care.png",
};
const LINKS = { call: "tel:+917708318222", whatsapp: "https://wa.me/917708318222", youtube: "https://youtube.com/@riochildrenshospital", instagram: "https://instagram.com/riochildrenhospitals" };

const NAV_TREATMENTS = [
  { name: "High-Risk Pregnancy Care", slug: "high-risk-pregnancy" },
  { name: "Fetal Medicine", slug: "fetal-medicine" },
  { name: "Maternity Care", slug: "maternity" },
  { name: "Fertility & IVF", slug: "fertility-ivf" },
  { name: "NICU", slug: "nicu" },
  { name: "PICU", slug: "picu" },
  { name: "Paediatric Emergency", slug: "emergency" },
  { name: "General Paediatrics", slug: "general-paediatrics" },
  { name: "Vaccination Services", slug: "vaccination" },
  { name: "Human Milk Bank", slug: "human-milk-bank" },
];

const GROUPS = [
  {
    title: "Pregnancy & Maternity",
    note: "Expert care for every stage of pregnancy and a safe delivery for mother and baby.",
    items: [
      { name: "High-Risk Pregnancy Care", slug: "high-risk-pregnancy", img: "maternity-care", d: "Closer monitoring and a stronger safety net for complex pregnancies and high-risk babies." },
      { name: "Fetal Medicine", slug: "fetal-medicine", img: "critical-care2", d: "Advanced scans and specialist care tracking your baby's growth and wellbeing before birth." },
      { name: "Maternity Care", slug: "maternity", img: "newborn-care", d: "Complete antenatal care with painless, normal & C-section packages, led by senior gynaecologists." },
      { name: "Fertility & IVF", slug: "fertility-ivf", img: "maternity-care", d: "IVF, hormonal fertility care, reproductive health and follicular studies on your journey to parenthood." },
    ],
  },
  {
    title: "Newborn & Child Intensive Care",
    note: "Round-the-clock intensive care for newborns and critically ill children.",
    items: [
      { name: "NICU", slug: "nicu", img: "Advanced-NICU", d: "Advanced neonatal intensive care for premature and critically ill newborns." },
      { name: "PICU", slug: "picu", img: "critical-care3", d: "State-of-the-art paediatric intensive care for seriously ill children." },
      { name: "Human Milk Bank", slug: "human-milk-bank", img: "critical-care4", d: "Safe, screened, pasteurised donor milk for premature and critically ill newborns." },
    ],
  },
  {
    title: "Emergency & Everyday Care",
    note: "Always-on care for childhood emergencies, everyday illness and prevention.",
    items: [
      { name: "Paediatric Emergency", slug: "emergency", img: "emergency", d: "24/7 emergency care for sudden illness, accidents and critical conditions, with NICU & PICU backup." },
      { name: "General Paediatrics", slug: "general-paediatrics", img: "newborn-care", d: "24/7 outpatient care for every childhood illness, from birth to 18 years." },
      { name: "Vaccination Services", slug: "vaccination", img: "expert-specialists", d: "Complete immunisation on the national schedule, with free SMS reminders and a protected cold chain." },
    ],
  },
];
const MORE = ["Super-speciality Departments", "Plastic & Reconstructive Surgery", "24-hour Lab & Pharmacy", "Ambulance & Neonatal Transport", "Tele-consultation", "Home Care & Home Vaccination"];

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12 }); io.observe(el); return () => io.disconnect(); }, []);
  const T = as; return <T ref={ref} className={`reveal ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</T>;
}
function Img({ src, alt = "", grad = 0, className = "" }) {
  const [b, setB] = useState(false); const G = ["g0", "g1", "g2"];
  return <div className={`img-wrap ${G[grad % 3]} ${className}`}>{!b ? <img src={src} alt={alt} loading="lazy" onError={() => setB(true)} /> : <svg viewBox="0 0 24 24" className="fb" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.6 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.4 8.7 18 11.8 16.5 16.4 12 21 12 21z" /></svg>}</div>;
}
function Eyebrow({ children, light = false }) { return <span className={`eyebrow ${light ? "light" : ""}`}><i className="ey-dot" />{children}</span>; }
function Logo({ footer = false }) {
  const [b, setB] = useState(false);
  if (footer) return <a className="logo" href="/"><span className="logo-word on-dark">Rio<em>HOSPITAL</em></span></a>;
  return <a className="logo" href="/">{!b ? <img className="logo-img" src={IMG.logo} alt="Rio Children's Hospital" onError={() => setB(true)} /> : <span className="logo-word">Rio<em>HOSPITAL</em></span>}</a>;
}
function NavTreatments({ active = false }) {
  return (
    <div className="nav-dd">
      <a href="/treatments" className={`nav-dd-trigger${active ? " active" : ""}`}>Treatments <span className="cv">▾</span></a>
      <div className="nav-dd-menu">
        {NAV_TREATMENTS.map((t) => <a key={t.slug} href={`/services/${t.slug}`}>{t.name}</a>)}
        <a className="nav-dd-all" href="/treatments">View all treatments →</a>
      </div>
    </div>
  );
}

function MobileNav({ open, onClose }) {
  return (
    <div className={`mnav ${open ? "open" : ""}`} onClick={onClose}>
      <div className="mnav-panel" onClick={(e) => e.stopPropagation()}>
        <button className="mnav-x" aria-label="Close menu" onClick={onClose}>×</button>
        <a className="mnav-link" href="/" onClick={onClose}>Home</a>
        <a className="mnav-link" href="/about" onClick={onClose}>About</a>
        <div className="mnav-group">
          <span className="mnav-h">Treatments</span>
          {NAV_TREATMENTS.map((t) => (
            <a key={t.slug} className="mnav-sub" href={`/services/${t.slug}`} onClick={onClose}>{t.name}</a>
          ))}
          <a className="mnav-sub mnav-all" href="/treatments" onClick={onClose}>View all treatments →</a>
        </div>
        <a className="mnav-link" href="/book-appointment" onClick={onClose}>Contact</a>
        <div className="mnav-cta">
          <a className="btn btn-cta" href="/book-appointment" onClick={onClose}>Book an Appointment</a>
          <a className="btn btn-pink" href={LINKS.call} onClick={onClose}>Call Now</a>
          <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer" onClick={onClose}>WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

export default function TreatmentsPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const o = () => setSolid(window.scrollY > 40); window.addEventListener("scroll", o, { passive: true }); return () => window.removeEventListener("scroll", o); }, []);

  return (
    <div className="rio">
      <style>{`
{}

        .nav a:hover{color:var(--blue)}
{}
        /* dropdown */

        /* hero */
        .thero{padding:52px 0 8px;position:relative;overflow:hidden}
        .thero
        .thero-in{position:relative;z-index:1;max-width:820px}

        .thero h1{font-size:clamp(34px,5vw,56px);margin-top:14px}.thero h1 .accent{color:var(--pink)}
        .thero .lede{font-size:18px;margin-top:18px;max-width:620px}
        .thero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
        /* group */
        .group + .group{margin-top:64px}
        .group-head{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:26px}
        .group-head h2{font-size:clamp(22px,3vw,30px)}
        .group-head .gn{font-size:14.5px;color:var(--muted)}
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        @media(max-width:920px){.tgrid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:600px){.tgrid{grid-template-columns:1fr}}
        .tcard{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
        .tcard:hover{transform:translateY(-6px);box-shadow:var(--shadow)}
        .tcard
        .tcard .img-wrap img{transition:transform .6s}.tcard:hover .img-wrap img{transform:scale(1.05)}
        .tbody{padding:22px;display:flex;flex-direction:column;flex:1}
        .tbody h3{font-size:18px;margin-bottom:8px}.tbody p{font-size:14px;flex:1}
        .tmore{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:13.5px;font-weight:800;color:var(--pink-deep)}
        /* more chips */
        .more-chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}
        .chip{display:inline-flex;align-items:center;gap:9px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:11px 18px;font-size:14px;font-weight:600;color:var(--ink)}
        .chip i{width:7px;height:7px;border-radius:50%;background:var(--green)}
        /* cta */
      `}</style>

      <div className="topstrip">24/7 Emergency • NICU • PICU — <a href={LINKS.call}>Call now: +91 77083 18222</a></div>

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a><a href="/about">About</a><NavTreatments active /><a href="/book-appointment">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-green btn-sm" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="btn btn-cta btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
              <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className="thero">
          <span className="blob" style={{ width: 300, height: 300, top: "-6%", right: "4%", background: "radial-gradient(circle at 30% 30%,#FFC4DA,transparent 70%)" }} />
          <span className="blob" style={{ width: 240, height: 240, bottom: "-10%", left: "0%", background: "radial-gradient(circle at 30% 30%,#C9CEF2,transparent 70%)" }} />
          <div className="wrap thero-in">
            <Reveal>
              <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Treatments</p>
              <Eyebrow>Our Treatments</Eyebrow>
              <h1>What treatments do we <span className="accent">offer?</span></h1>
              <p className="lede">From high-risk pregnancy and fetal medicine to advanced NICU and PICU care — explore the specialised treatments and care Rio provides for women, newborns and children, all under one roof.</p>
              <div className="thero-cta">
                <a className="btn btn-cta" href="/book-appointment">Book an Appointment</a>
                <a className="btn btn-pink" href={LINKS.call}>Call Emergency Care</a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            {GROUPS.map((g, gi) => (
              <div className="group" key={g.title}>
                <Reveal className="group-head"><h2>{g.title}</h2><span className="gn">{g.note}</span></Reveal>
                <div className="tgrid">
                  {g.items.map((t, i) => (
                    <Reveal key={t.slug} delay={(i % 3) * 80}>
                      <a className="tcard" href={`/services/${t.slug}`}>
                        <Img src={IMG[t.img]} alt={t.name} grad={(gi + i) % 3} />
                        <div className="tbody"><h3>{t.name}</h3><p>{t.d}</p><span className="tmore">Learn more →</span></div>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section tint-blue">
          <div className="wrap">
            <Reveal className="sec-head"><Eyebrow>More at Rio</Eyebrow><h2>Other specialised care &amp; departments</h2><p className="sec-note">Available across our branches — get in touch and our team will guide you to the right care.</p></Reveal>
            <Reveal className="more-chips">{MORE.map((m) => <span key={m} className="chip"><i />{m}</span>)}</Reveal>
            <Reveal style={{ marginTop: 26 }}><a className="btn btn-cta" href="/book-appointment">Ask about a treatment →</a></Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="cta-band">
              <div><h2>Not sure which treatment you need?</h2><p>Our team will help you find the right department, doctor and branch.</p></div>
              <div className="cta-actions"><a className="btn btn-pink" href={LINKS.call}>Call Us</a><a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div>
            <div style={{ marginBottom: 16 }}><Logo footer /></div>
            <p style={{ color: "#9398C2", maxWidth: 270, fontSize: 14 }}>Advanced women &amp; child healthcare across Tamil Nadu — medical expertise, modern facilities, a human-centered approach.</p>
            <p className="vals">TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE</p>
          </div>
          <div><h4>Treatments</h4><ul>{NAV_TREATMENTS.map((t) => <li key={t.slug}><a href={`/services/${t.slug}`}>{t.name}</a></li>)}</ul></div>
          <div><h4>Explore</h4><ul><li><a href="/">Home</a></li><li><a href="/about">About Us</a></li><li><a href="/treatments">Treatments</a></li><li><a href="/book-appointment">Contact</a></li></ul></div>
          <div><h4>Contact</h4><ul><li><a href={LINKS.call}>📞 +91 77083 18222</a></li><li><a href="mailto:info@riohospital.com">✉ info@riohospital.com</a></li><li><a href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li><li><a href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li></ul></div>
        </div>
        <div className="wrap footer-bottom"><span>© 2026 Rio Children's Hospital</span><span>Built by Invictus Global Tech</span></div>
      </footer>

      <div className="mbar">
        <a className="btn btn-pink" href={LINKS.call}>Call</a>
        <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}
