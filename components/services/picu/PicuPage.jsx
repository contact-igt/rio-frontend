"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import styles from "./styles.module.css";

/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — SERVICE PAGE (reusable template)
   Rio brand: Deep Blue #303573 · Pink #FD70A1 · Green #7BA93A · Warm Brown
   #BD844C (CTAs). 'Proxima Nova'→Mulish headings · Montserrat body.

   The page is fully DATA-DRIVEN: pass a `service` object to <ServicePage>.
   Every future service page = one more data object + a route. This demo
   renders the first service: HIGH-RISK PREGNANCY CARE.
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  "logo": "/assets/shared/riologov2.png",
  "banner": "/assets/picu/picu.png",
  "critical-care3": "/assets/picu/hero.png",
  "critical-care2": "/assets/picu/fetal.png",
  "critical-care4": "/assets/picu/vo.png",
  "critical-care1": "/assets/picu/lab.png",
  "emergency": "/assets/picu/ot.png",
  "Advanced-NICU": "/assets/picu/advanced-nicu.png",
  "maternity-care": "/assets/picu/women.png",
};
const LINKS = {
  call: "tel:+917708318222", whatsapp: "https://wa.me/917708318222",
  youtube: "https://youtube.com/@riochildrenshospital", instagram: "https://instagram.com/riochildrenhospitals",
};
const APPT_SERVICES = ["High-Risk Pregnancy Care", "Fetal Medicine", "NICU", "PICU", "Paediatric Emergency Care", "General Paediatrics", "Vaccination Services", "Human Milk Bank", "Maternity Care"];
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

/* ───────── SERVICE DATA (this page) ─────────
   Shape is reused for every service. Optional keys are simply omitted. */
const PICU = {
  slug: "picu",
  gallery: [
    { img: "critical-care3", cap: "PICU ward & monitoring" },
    { img: "critical-care4", cap: "Ventilator & life-support bay" },
    { img: "critical-care1", cap: "Isolation care bay" },
    { img: "emergency", cap: "Linked 24/7 emergency" },
  ],
  eyebrow: "PICU",
  title: "Advanced Paediatric Intensive Care for Critically Ill Children",
  lede: "When a child is seriously ill, Rio's Paediatric Intensive Care Unit provides state-of-the-art critical care, supported by a well-trained team of doctors and nurses and round-the-clock monitoring.",
  heroImg: "critical-care3",
  intro: [
    "Rio’s Paediatric Intensive Care Unit (PICU) delivers advanced critical care for children with life-threatening illnesses, supported by experienced paediatric intensivists, specialised nurses and continuous monitoring 24 hours a day.",
    "Care is delivered by a well-trained team of paediatric intensivists, doctors and nurses, with continuous monitoring and immediate access to specialists when every moment counts.",
  ],
  covers: [
    "Severe respiratory distress", "Severe asthma", "Shock", "Dehydration", "Dengue fever",
    "Seizures (fits)", "Meningitis", "Cardiac problems", "Diabetic ketoacidosis", "Metabolic problems",
  ],
  features: [
    { icon: "nicu", title: "Critical care support", desc: "State-of-the-art equipment and ventilation for children with life-threatening illness." },
    { icon: "scan", title: "Round-the-clock monitoring", desc: "Continuous monitoring of vital signs by a trained paediatric intensive-care team." },
    { icon: "team", title: "Paediatric intensivists", desc: "A well-trained team of intensivists, doctors and nurses dedicated to critically ill children." },
    { icon: "heart", title: "Multi-specialty expert support", desc: "Quick access to cardiology, neurology and other specialists when a child needs them." },
    { icon: "bell", title: "Linked to 24/7 emergency", desc: "Seamlessly connected to our paediatric emergency for fast escalation when needed." },
    { icon: "power", title: "3-level power backup", desc: "Uninterrupted power for ventilators and monitors, 100% guaranteed." },
  ],
  stat: { n: "12+", l: "Years of paediatric critical care" },
  faqs: [
    { q: "What conditions are treated in the PICU?", a: "Serious illnesses such as severe respiratory distress, asthma, shock, dehydration, dengue, seizures, meningitis, cardiac and metabolic problems, and more." },
    { q: "How is the PICU staffed?", a: "By a well-trained team of paediatric intensivists, doctors and nurses providing intensive care around the clock." },
    { q: "Is specialist support available if my child needs it?", a: "Yes. The PICU has immediate access to paediatric cardiology, neurology and other specialists." },
    { q: "What happens during a power cut?", a: "A 3-level power backup keeps ventilators and monitors running without interruption." },
  ],
  related: [
    { name: "NICU", slug: "nicu", img: "Advanced-NICU" },
    { name: "Fetal Medicine", slug: "fetal-medicine", img: "critical-care2" },
    { name: "High-Risk Pregnancy Care", slug: "high-risk-pregnancy", img: "maternity-care" },
  ],
};

/* helpers */
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

function Logo({ footer = false }) {
  const [broken, setBroken] = useState(false);
  return (
    <a className="logo" href="/" aria-label={footer ? "Rio Children's Hospital" : "Rio Children's Hospital — Home"}>
      {!broken ? (
        <img className="logo-img" src="/assets/shared/riologov2.png" alt="Rio Children's Hospital" onError={() => setBroken(true)} />
      ) : (
        <span className={`logo-word ${footer ? "on-dark" : ""}`}>Rio<em>HOSPITAL</em></span>
      )}
    </a>
  );
}
function Counter({ value }) {
  const m = value.match(/[\d,]+/); const target = m ? parseInt(m[0].replace(/,/g, ""), 10) : null;
  const suffix = m ? value.slice(m.index + m[0].length) : ""; const prefix = m ? value.slice(0, m.index) : "";
  const [n, setN] = useState(target ? 0 : null); const ref = useRef(null);
  useEffect(() => { if (target == null) return; const el = ref.current; const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; io.disconnect(); const dur = 1300, s = performance.now(); const t = (x) => { const p = Math.min(1, (x - s) / dur); setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(t); }; requestAnimationFrame(t); }, { threshold: 0.4 }); if (el) io.observe(el); return () => io.disconnect(); }, [target]);
  return <span ref={ref}>{target != null ? `${prefix}${n.toLocaleString()}${suffix}` : value}</span>;
}
const FIC = {
  scan: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  team: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 6a3 3 0 0 1 0 6m5 8a6 6 0 0 0-4-5.6" /></>,
  nicu: <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />,
  bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  power: <><path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.8 0" /></>,
  heart: <path d="M12 21s-7.5-4.6-10-9.2C.6 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.4 8.7 18 11.8 16.5 16.4 12 21 12 21z" />,
};
function FIcon({ name }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{FIC[name]}</svg>; }

/* ───────── template ───────── */


function PicuPageContent({ service: s }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => { const o = () => setSolid(window.scrollY > 40); window.addEventListener("scroll", o, { passive: true }); return () => window.removeEventListener("scroll", o); }, []);

  return (
    <div className={`rio ${styles.page}`}>

      <div className="topstrip">24/7 Emergency • NICU • PICU | <a href={LINKS.call}>Call now: +91 77083 18222</a></div>

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav"><a href="/">Home</a><a href="/about">About</a>
          <NavManagement /><a href="/paediatric-super-specialities">Pediatric Super Specialities</a><NavTreatments active /><a href="/facilities">Facilities</a><a href="/contact">Contact</a></nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* hero */}
        <section className="shero">
          <div className="shero-bg"><Img src={IMG.banner} alt={s.eyebrow} grad={0} /></div>
          <div className="shero-veil" />
          <div className="shero-in">
            <Reveal>
              <Eyebrow light>{s.eyebrow}</Eyebrow>
              <h1>{s.title}</h1>
              <p className="lede">{s.lede}</p>
              <div className="shero-cta">
                <a className="btn btn-cta" href="/book-appointment">Book an Appointment</a>
                <a className="btn btn-pink" href={LINKS.call}>Call Emergency Care</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* intro + covers */}
        <section className="section">
          <div className="wrap split">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <h2 className={styles.headingTop}>Closer monitoring, a stronger safety net</h2>
              {s.intro.map((p, i) => <p className={`sec-note ${i ? styles.secNoteGap : ""}`} key={i}>{p}</p>)}
              {s.covers && (
                <>
                  <h4 className={styles.coversTitle}>This care covers</h4>
                  <div className="covers">{s.covers.map((c) => <span key={c} className="cov"><i />{c}</span>)}</div>
                </>
              )}
            </Reveal>
            <Reveal delay={120}><Img src={IMG[s.heroImg]} alt={s.eyebrow} grad={1} className="frame" /></Reveal>
          </div>
        </section>

        {/* features */}
        {s.features && (
          <section className="section tint-blue">
            <div className="wrap">
              <Reveal className="sec-head center"><Eyebrow>What you get at Rio</Eyebrow><h2>Advanced Critical Care, All Under One Roof</h2></Reveal>
              <div className="feat-grid">
                {s.features.map((f, i) => (
                  <Reveal key={f.title} delay={(i % 3) * 80}>
                    <div className="feat"><div className="feat-ic"><FIcon name={f.icon} /></div><h3>{f.title}</h3><p>{f.desc}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* infrastructure gallery */}
        {s.gallery && (
          <section className="section">
            <div className="wrap">
              <Reveal className="sec-head center"><Eyebrow>Our Infrastructure</Eyebrow><h2>Inside our {s.eyebrow} facilities</h2><p className="sec-note">A look at the structure and infrastructure behind our {s.eyebrow.toLowerCase()} care.</p></Reveal>
              <div className="gal-grid">
                {s.gallery.map((g, i) => (
                  <Reveal key={i} delay={(i % 4) * 70} className="gal-item">
                    <Img src={IMG[g.img]} alt={g.cap} grad={i % 3} />
                    <span className="gal-cap">{g.cap}</span>
                  </Reveal>
                ))}
              </div>
              <p className="gal-note">Facility photographs to be supplied by Rio (placeholders shown).</p>
            </div>
          </section>
        )}

        {/* journey */}
        {s.journey && (
          <section className="section">
            <div className="wrap">
              <Reveal className="sec-head center"><Eyebrow>Your Journey</Eyebrow><h2>Care that follows every trimester</h2></Reveal>
              <div className="tri-rail">
                {s.journey.map((t, i) => (
                  <Reveal key={t.k} delay={i * 100}><div className="tri"><div className="tri-num">{i + 1}</div><h3>{t.k}</h3><span className="wk">{t.w}</span><p>{t.d}</p></div></Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* stat band */}
        {s.stat && (
          <section className={`section ${styles.sectionNoTop}`}>
            <div className="wrap">
              <Reveal className="statband">
                <div><strong><Counter value={s.stat.n} /></strong><span>{s.stat.l}</span></div>
                <div className="sb-cta">
                  <a className="btn btn-pink" href="/book-appointment">Book a Consultation</a>
                  <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* faq */}
        {s.faqs && (
          <section className="section tint-pink">
            <div className="wrap">
              <Reveal className="sec-head"><Eyebrow>FAQ</Eyebrow><h2>Questions families ask</h2></Reveal>
              <div className="faq">
                {s.faqs.map((f, i) => (
                  <Reveal key={f.q} delay={i * 50} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                    <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q}<span>{openFaq === i ? "–" : "+"}</span></button>
                    <div className="faq-a"><p>{f.a}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* related */}
        {s.related && (
          <section className="section">
            <div className="wrap">
              <Reveal className="sec-head center"><Eyebrow>Related Care</Eyebrow><h2>Explore related services</h2></Reveal>
              <div className="rel-grid">
                {s.related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 80}>
                    <a className="rel" href={`/services/${r.slug}`}>
                      <Img src={IMG[r.img]} alt={r.name} grad={i % 3} />
                      <div className="rel-body"><h3>{r.name}</h3><span>→</span></div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* enquiry */}
        <section className={`section ${styles.sectionNoTop}`} id="book">
          <div className="wrap">
            <Reveal className="enq">
              <div className="enq-copy">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 className={styles.headingTop}>Book your {s.eyebrow.toLowerCase()} consultation</h2>
                <p>Share your details and our team will call you back to schedule a visit at your preferred branch.</p>
                <div className={styles.enqActions}>
                  <a className="btn btn-pink" href={LINKS.call}>Call Now</a>
                  <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
              <div className="enq-form">
                <h3>Request a call back</h3>
                {sent ? <div className="enq-done"><span>✓</span> Thanks! We'll call you back shortly.</div> : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <input type="text" placeholder="Full name" required />
                    <input type="tel" placeholder="Phone number" required />
                    <select required defaultValue={s.eyebrow}>{APPT_SERVICES.map((x) => <option key={x}>{x}</option>)}</select>
                    <button className={`btn btn-cta ${styles.fullButton}`} type="submit">Request a Call Back ↗</button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="mbar">
        <a className="btn btn-pink" href={LINKS.call}>Call</a>
        <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}

export default function PicuPage() { return <PicuPageContent service={PICU} />; }





