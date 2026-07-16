"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES_WITH_FERTILITY, BRANCH_NAMES, SITE_LINKS } from "@/data/site";
import styles from "./styles.module.css";
const IMG = {
  logo: "/assets/shared/riologov2.png",
  hero: "/assets/shared/site-hero.png",
};


export default function BookEmergencyPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const o = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", o, { passive: true });
    return () => window.removeEventListener("scroll", o);
  }, []);

  return (
    <div className={`rio booking-page ${styles.page}`}>
      <TopStrip callHref={SITE_LINKS.call} />
      
      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
          
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
                <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} ctaButtons={[{ href: "/book-appointment", label: "Book Appointment", className: "btn btn-cta" }, { href: SITE_LINKS.whatsapp, label: "WhatsApp", className: "btn btn-green", target: "_blank", rel: "noreferrer" }]} />

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className={`eyebrow ${styles.eyebrowInline}`}>
                <i className={`ey-dot ${styles.eyDot}`} />
                Book Emergency Visit
              </span>
              <h1>Emergency care, <span>ready now</span>.</h1>
              <p className="lede">For sudden illness, accidents, newborn emergencies or critical symptoms, call immediately or submit your visit details so the Rio team can prepare for your arrival.</p>
              <div className="actions">
                <a className="btn btn-pink" href={SITE_LINKS.call}>Call Emergency Care</a>
                <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
            
            <div className="panel">
              <h2>Prepare an emergency visit</h2>
              <p className={styles.panelIntro}>If this is urgent, call first. This form helps our team prepare while you travel.</p>
              {sent ? (
                <div className={`done ${styles.doneSpace}`}>Thanks! Our care team will contact you shortly.</div>
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
                      {BRANCH_NAMES.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Service needed</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {APPOINTMENT_SERVICES_WITH_FERTILITY.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea placeholder="Tell us briefly how we can help" />
                  </div>
                  <button className={`btn btn-cta ${styles.fullButton}`} type="submit">Submit request ↗</button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className={`wrap info ${styles.infoSection}`}>
          <div className="card">
            <strong>24/7 response</strong>
            <p className={styles.infoText}>Emergency support is available day and night across all four Rio branches.</p>
          </div>
          <div className="card">
            <strong>Specialist guidance</strong>
            <p className={styles.infoText}>Our team routes you to the right doctor, department and branch for your need.</p>
          </div>
          <div className="card">
            <strong>Family-first care</strong>
            <p className={styles.infoText}>Clear communication, compassionate support and coordinated women and child healthcare.</p>
          </div>
        </section>
      </main>

      <footer className={`footer ${styles.bookingFooter}`}>
        <div className={`wrap ${styles.bookingFooterWrap}`}>
          <div>
            <div className={styles.footerLogoSpace}><Logo footer /></div>
            <p className={styles.footerDesc}>Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.</p>
          </div>
          <div className={styles.footerMeta}>
            <span>© 2026 Rio Children's Hospital</span>
            <span className={styles.footerCredit}>Built by Invictus Global Tech</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

