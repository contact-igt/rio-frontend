"use client";

import { useEffect, useState } from "react";

const IMG = {
  logo: "/assets/shared/riologov2.png",
  hero: "/assets/book-appointment/child-newborn.png",
};

const LINKS = {
  call: "tel:+917708318222",
  whatsapp: "https://wa.me/917708318222",
  youtube: "https://youtube.com/@riochildrenshospital",
  instagram: "https://instagram.com/riochildrenhospitals",
  facebook: "https://facebook.com/riochildrenhospitals",
  email: "mailto:info@riohospital.com",
};

const BRANCHES = ["Madurai (Main)", "Southwing, Madurai", "Dindigul", "Thanjavur"];

const SERVICES = [
  "High-Risk Pregnancy Care",
  "Fetal Medicine",
  "NICU",
  "PICU",
  "Paediatric Emergency Care",
  "General Paediatrics",
  "Vaccination Services",
  "Human Milk Bank",
  "Maternity Care",
  "Fertility & IVF",
];

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
        <a className="mnav-link" href="/doctors" onClick={onClose}>Doctors</a>
        <div className="mnav-group">
          <span className="mnav-h">Treatments</span>
          {NAV_TREATMENTS.map((t) => (
            <a key={t.slug} className="mnav-sub" href={`/services/${t.slug}`} onClick={onClose}>{t.name}</a>
          ))}
          <a className="mnav-sub mnav-all" href="/treatments" onClick={onClose}>View all treatments →</a>
        </div>
        <a className="mnav-link" href="/contact" onClick={onClose}>Contact</a>
        <div className="mnav-cta">
          <a className="btn btn-pink" href="/book-emergency" onClick={onClose}>Emergency Visit</a>
          <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer" onClick={onClose}>WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const o = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", o, { passive: true });
    return () => window.removeEventListener("scroll", o);
  }, []);

  return (
    <div className="rio booking-page">
      <div className="topstrip">24/7 Emergency • NICU • PICU — <a href={LINKS.call}>Call now: +91 77083 18222</a></div>

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/doctors">Doctors</a>
          <NavTreatments />
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-green btn-sm" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="btn btn-pink btn-sm" href="/book-emergency">Emergency Visit</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <i className="ey-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
                Book Appointment
              </span>
              <h1>Book an <span>appointment</span> with Rio.</h1>
              <p className="lede">Choose your branch and care need. Our team will call back quickly to confirm the right doctor, department and visit timing for your family.</p>
              <div className="actions">
                <a className="btn btn-pink" href={LINKS.call}>Call Emergency Care</a>
                <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>

            <div className="panel">
              <h2>Request a call back</h2>
              <p style={{ marginTop: 8 }}>Share a few details and we will help you plan the visit.</p>
              {sent ? (
                <div className="done" style={{ marginTop: 20 }}>Thanks! Our care team will contact you shortly.</div>
              ) : (
                <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="field">
                    <label>Full name</label>
                    <input required placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input required type="tel" placeholder="Phone number" />
                  </div>
                  <div className="field">
                    <label>Preferred branch</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select a branch</option>
                      {BRANCHES.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Service needed</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea placeholder="Tell us briefly how we can help" />
                  </div>
                  <button className="btn btn-cta" type="submit" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Submit request ↗</button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="wrap info" style={{ padding: "64px 0" }}>
          <div className="card">
            <strong>24/7 response</strong>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>Emergency support is available day and night across all four Rio branches.</p>
          </div>
          <div className="card">
            <strong>Specialist guidance</strong>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>Our team routes you to the right doctor, department and branch for your need.</p>
          </div>
          <div className="card">
            <strong>Family-first care</strong>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>Clear communication, compassionate support and coordinated women and child healthcare.</p>
          </div>
        </section>
      </main>

      <footer className="footer" style={{ borderTop: "1px solid var(--line)", background: "#FAFBFD" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", padding: "32px 0", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ marginBottom: 12 }}><Logo footer /></div>
            <p style={{ color: "#9398C2", maxWidth: 280, fontSize: 13, lineHeight: 1.5 }}>Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 600 }}>
            <span>© 2026 Rio Children's Hospital</span>
            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Built by Invictus Global Tech</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
