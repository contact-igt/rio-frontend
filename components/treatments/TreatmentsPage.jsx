"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { NAV_TREATMENTS, SITE_LINKS } from "@/data/site";
import styles from "./styles.module.css";
/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — TREATMENTS landing page  (route: /treatments)
   Lists every treatment in one place; each card opens its detail page.
   Brand: Deep Blue #303573 · Pink #FD70A1 · Green #7BA93A · Warm Brown CTAs.
   Drop-in → export default RioTreatmentsPage   (Next.js: add "use client".)
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  "logo": "/assets/shared/riologov2.png",
  "banner": "/assets/treatments/specialist.png",
  "Advanced-NICU": "/assets/treatments/advanced-nicu.png",
  "critical-care2": "/assets/treatments/fetal.png",
  "critical-care3": "/assets/treatments/picu.png",
  "maternity-care": "/assets/treatments/women.png",
  "newborn-care": "/assets/treatments/child-newborn.png",
  "expert-specialists": "/assets/treatments/specialist.png",
  "expert-specialists2": "/assets/treatments/women.png",
  "critical-care4": "/assets/treatments/milkbank.png",
  "emergency": "/assets/treatments/neonatal.png",
  "vaccination": "/assets/treatments/vaccine.png",
  "fertility": "/assets/treatments/scan.png"
};
const GROUPS = [
  {
    title: "Pregnancy & Maternity",
    note: "Expert care for every stage of pregnancy and a safe delivery for mother and baby.",
    items: [
      { name: "High-Risk Pregnancy Care", slug: "high-risk-pregnancy", img: "maternity-care", d: "Expert monitoring and specialised care for high-risk pregnancies to protect both mother and baby." },
      { name: "Fetal Medicine", slug: "fetal-medicine", img: "critical-care2", d: "Advanced fetal imaging, diagnostic scans and specialist care to monitor your baby’s growth and well-being throughout pregnancy." },
      { name: "Maternity Care", slug: "maternity", img: "newborn-care", d: "Comprehensive antenatal, painless delivery including normal and Caesarean deliveries, led by experienced obstetricians." },
      { name: "Fertility & IVF", slug: "fertility-ivf", img: "fertility", d: "IVF, hormonal fertility care, reproductive health and follicular studies on your journey to parenthood." },
    ],
  },
  {
    title: "Newborn & Child Intensive Care",
    note: "Round-the-clock intensive care for newborns and critically ill children.",
    items: [
      { name: "NICU", slug: "nicu", img: "Advanced-NICU", d: "Advanced neonatal intensive care for premature and critically ill newborns." },
      { name: "PICU", slug: "picu", img: "critical-care3", d: "Advanced paediatric intensive care for critically ill children requiring continuous monitoring and specialised treatment." },
      { name: "Human Milk Bank", slug: "human-milk-bank", img: "critical-care4", d: "Safe, screened, pasteurised donor milk for premature and critically ill newborns." },
    ],
  },
  {
    title: "Emergency & Everyday Care",
    note: "24/7 care for childhood emergencies, everyday illnesses and preventive healthcare.",
    items: [
      { name: "Paediatric Emergency", slug: "emergency", img: "emergency", d: "24/7 emergency care for sudden illness, accidents and critical conditions, with NICU & PICU backup." },
      { name: "General Paediatrics", slug: "general-paediatrics", img: "newborn-care", d: "24/7 outpatient care for every childhood illness, from birth to 18 years." },
      { name: "Vaccination Services", slug: "vaccination", img: "vaccination", d: "Complete immunisation on the national schedule, with free SMS reminders and a protected cold chain." },
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

export default function TreatmentsPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const o = () => setSolid(window.scrollY > 40); window.addEventListener("scroll", o, { passive: true }); return () => window.removeEventListener("scroll", o); }, []);

  return (
    <div className={`rio ${styles.page}`}>

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a><a href="/about">About</a>
          <NavManagement /><a href="/paediatric-super-specialities">Pediatric Super Specialities</a><NavTreatments active /><a href="/facilities">Facilities</a><a href="/contact">Contact</a>
        </nav>
                <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="/book-vaccine">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className="thero">
          <div className="thero-bg"><img src={IMG.banner} alt="Rio Children's Hospital Treatments" /></div>
          <div className="thero-veil" />
          <div className="thero-fluid">
            <div className="thero-in">
              <Reveal>
                <Eyebrow light>Our Treatments</Eyebrow>
                <h1>What treatments do we <span className="accent">offer?</span></h1>
                <p className="lede">From high-risk pregnancy and fetal medicine to advanced NICU, PICU and paediatric care, explore Rio’s comprehensive healthcare services for women, newborns and children all under one roof.</p>
                <div className="thero-cta">
                  <a className="btn btn-cta" href="/book-appointment">Book an Appointment</a>
                  <a className="btn btn-pink" href={SITE_LINKS.call}>Call Emergency Care</a>
                </div>
              </Reveal>
            </div>
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
                        <div className="tbody"><h3>{t.name}</h3><p>{t.d}</p><span className="tmore">Learn more <span className="arr">→</span></span></div>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section more-glow">
          <div className="wrap">
            <Reveal className="sec-head"><Eyebrow>More at Rio</Eyebrow><h2>Other specialised care &amp; departments</h2><p className="sec-note">Available across our branches. Get in touch and our team will guide you to the right care.</p></Reveal>
            <Reveal className="more-chips">{MORE.map((m) => <span key={m} className="chip"><i />{m}</span>)}</Reveal>
            <Reveal className="more-btn-wrapper"><a className="btn btn-cta" href="/book-appointment">Ask about a treatment →</a></Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="cta-band">
              <div><h2>Not sure which treatment you need?</h2><p>Our team will help you find the right department, doctor and branch.</p></div>
              <div className="cta-actions"><a className="btn btn-pink" href={SITE_LINKS.call}>Call Us</a><a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="mbar">
        <a className="btn btn-pink" href={SITE_LINKS.call}>Call</a>
        <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}





