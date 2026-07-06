"use client";

import { useEffect, useRef, useState } from "react";

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
  "banner": "/assets/fetal-medicine/scan.png",
  "critical-care2": "/assets/fetal-medicine/ot.png",
  "maternity-care": "/assets/fetal-medicine/ultrasound.png",
  "expert-specialists": "/assets/fetal-medicine/specialist.png",
  "Advanced-NICU": "/assets/fetal-medicine/advanced-nicu.png",
  "expert-specialists2": "/assets/fetal-medicine/clinical-team-support.png",
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
const FETAL = {
  slug: "fetal-medicine",
  gallery: [
    { img: "critical-care2", cap: "Fetal ultrasound & Doppler suite" },
    { img: "maternity-care", cap: "Scan & consultation room" },
    { img: "expert-specialists", cap: "Fetal medicine team" },
    { img: "Advanced-NICU", cap: "NICU on standby" },
  ],
  eyebrow: "Fetal Medicine",
  title: "Monitoring your baby's health, growth & development before birth",
  lede: "Fetal medicine focuses on your baby's wellbeing throughout pregnancy — especially in high-risk pregnancies. At Rio, advanced scans and specialist care help identify concerns early, guide your pregnancy, and plan a safer delivery with the right newborn support ready when needed.",
  heroImg: "maternity-care",
  intro: [
    "Fetal medicine is the specialised care of your baby during pregnancy — assessing growth, organ development and overall wellbeing through detailed ultrasound and monitoring. It becomes especially important when a pregnancy is high-risk.",
    "At Rio, fetal medicine specialists work alongside our obstetric and NICU teams. Concerns are spotted early, your pregnancy care is guided accordingly, and if your baby needs specialised care after birth, an advanced NICU is ready in the same hospital.",
  ],
  covers: [
    "Anomaly scan (18\u201322 weeks)", "Growth scans", "Fetal well-being checks", "Doppler studies",
    "Renal Doppler", "Portal circulation studies", "Early pregnancy assessment", "High-risk fetal monitoring",
  ],
  features: [
    { icon: "scan", title: "Detailed anomaly scan", desc: "A thorough 18\u201322 week scan to assess the baby's growth, organ development and overall wellbeing." },
    { icon: "scan", title: "Advanced Doppler studies", desc: "Assessing blood flow between mother and baby to evaluate circulation and the baby's wellbeing." },
    { icon: "team", title: "Fetal medicine specialists", desc: "Experienced specialists who identify concerns early and guide a safer pregnancy and delivery plan." },
    { icon: "nicu", title: "NICU ready on site", desc: "If specialised newborn care is needed after birth, an advanced NICU & PICU are in the same hospital." },
    { icon: "bell", title: "Free SMS care alerts", desc: "Timely reminders for scans, antenatal visits and investigations throughout pregnancy." },
    { icon: "power", title: "3-level power backup", desc: "Uninterrupted power for advanced ultrasound and monitoring equipment \u2014 100% guaranteed." },
  ],
  journey: [
    { k: "First Trimester", w: "Week 0\u201312", d: "Early pregnancy assessment, dating and viability scans, and a baseline risk evaluation." },
    { k: "Second Trimester", w: "Week 13\u201328", d: "The detailed anomaly scan and fetal well-being checks to track growth and development." },
    { k: "Third Trimester", w: "Week 29\u201340", d: "Growth scans and Doppler studies, with delivery planning and the NICU team on standby." },
  ],
  stat: { n: "12+", l: "Years of advanced fetal & maternal care" },
  faqs: [
    { q: "What is fetal medicine?", a: "It's the specialised care of your baby during pregnancy \u2014 monitoring growth, organ development and wellbeing through detailed scans, especially in high-risk pregnancies." },
    { q: "When is the anomaly scan done?", a: "Usually between 18 and 22 weeks. It assesses the baby's growth, organ development and overall wellbeing, and helps plan the right pregnancy care." },
    { q: "What is a Doppler study?", a: "A specialised ultrasound that checks blood flow between mother and baby, helping evaluate circulation and the baby's wellbeing." },
    { q: "Do I need fetal medicine if my pregnancy is normal?", a: "Routine scans are part of standard antenatal care. Fetal medicine becomes especially important if your pregnancy is high-risk or a scan flags something to monitor more closely." },
  ],
  related: [
    { name: "High-Risk Pregnancy Care", slug: "high-risk-pregnancy", img: "maternity-care" },
    { name: "NICU", slug: "nicu", img: "Advanced-NICU" },
    { name: "Maternity Care", slug: "maternity", img: "expert-specialists2" },
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
  const [b, setB] = useState(false);
  if (footer) return <a className="logo" href="/"><span className="logo-word on-dark">Rio<em>HOSPITAL</em></span></a>;
  return <a className="logo" href="/">{!b ? <img className="logo-img" src={IMG.logo} alt="Rio Children's Hospital" onError={() => setB(true)} /> : <span className="logo-word">Rio<em>HOSPITAL</em></span>}</a>;
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
        <a className="mnav-link" href="/contact" onClick={onClose}>Contact</a>
        <div className="mnav-cta">
          <a className="btn btn-cta" href="/book-appointment" onClick={onClose}>Book an Appointment</a>
          <a className="btn btn-pink" href={LINKS.call} onClick={onClose}>Call Now</a>
          <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer" onClick={onClose}>WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

function FetalMedicinePageContent({ service: s }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => { const o = () => setSolid(window.scrollY > 40); window.addEventListener("scroll", o, { passive: true }); return () => window.removeEventListener("scroll", o); }, []);

  return (
    <div className="rio">
      <style>{`
      `}</style>

      <div className="topstrip">24/7 Emergency • NICU • PICU — <a href={LINKS.call}>Call now: +91 77083 18222</a></div>

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav"><a href="/">Home</a><a href="/about">About</a><NavTreatments active /><a href="/contact">Contact</a></nav>
        <div className="nav-cta"><a className="btn btn-green btn-sm" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a className="btn btn-cta btn-sm" href="/book-appointment">Book an Appointment</a></div>
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
              <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/treatments">Treatments</a> &nbsp;/&nbsp; {s.eyebrow}</p>
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
              <h2 style={{ marginTop: 12 }}>Closer monitoring, a stronger safety net</h2>
              {s.intro.map((p, i) => <p className="sec-note" key={i} style={i ? { marginTop: 14 } : {}}>{p}</p>)}
              {s.covers && (
                <>
                  <h4 style={{ marginTop: 24, fontSize: 14, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--pink-deep)" }}>This care covers</h4>
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
              <Reveal className="sec-head center"><Eyebrow>What you get at Rio</Eyebrow><h2>Built around mother &amp; baby</h2></Reveal>
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
          <section className="section" style={{ paddingTop: 0 }}>
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
        <section className="section" id="book" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="enq">
              <div className="enq-copy">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 style={{ marginTop: 12 }}>Book your {s.eyebrow.toLowerCase()} consultation</h2>
                <p>Share your details and our team will call you back to schedule a visit at your preferred branch.</p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                    <button className="btn btn-cta" type="submit" style={{ width: "100%", justifyContent: "center" }}>Request a Call Back ↗</button>
                  </form>
                )}
              </div>
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
          <div><h4>Treatments</h4><ul>{APPT_SERVICES.slice(0, 6).map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h4>Explore</h4><ul><li><a href="/">Home</a></li><li><a href="/about">About Us</a></li><li><a href="/contact">Contact</a></li></ul></div>
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

export default function FetalMedicinePage() { return <FetalMedicinePageContent service={FETAL} />; }

