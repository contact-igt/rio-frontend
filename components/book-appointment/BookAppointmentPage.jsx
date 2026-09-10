"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES_WITH_FERTILITY, BRANCH_NAMES, SITE_LINKS } from "@/data/site";
import { registerRioLead } from "@/lib/rioRegistration";
import styles from "./styles.module.css";
const IMG = {
  logo: "/assets/shared/riologov2.png",
  hero: "/assets/book-appointment/child-newborn.png",
};


export default function BookAppointmentPage() {
  const router = useRouter();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const o = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", o, { passive: true });
    return () => window.removeEventListener("scroll", o);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    const utmSource = new URLSearchParams(window.location.search).get("utm_source");

    setSubmitting(true);
    setSubmitError("");

    try {
      await registerRioLead({
        name: formData.get("name"),
        mobile_number: formData.get("mobile_number"),
        branch: formData.get("branch"),
        service: formData.get("service"),
        message: formData.get("message"),
        utm_source: utmSource,
      });
      setSent(true);
      router.push("/thank-you");
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Unable to submit your request. Please try again.";
      setSubmitError(message);
      router.push(`/submission-error?source=appointment&message=${encodeURIComponent(message)}`);
    } finally {
      setSubmitting(false);
    }
  }

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
          <a className="btn btn-line btn-sm" href="/book-vaccine">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} ctaButtons={[{ href: "/book-emergency", label: "Emergency Visit", className: "btn btn-pink" }, { href: SITE_LINKS.whatsapp, label: "WhatsApp", className: "btn btn-green", target: "_blank", rel: "noreferrer" }]} />

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className={`eyebrow ${styles.eyebrowInline}`}>
                <i className={`ey-dot ${styles.eyDot}`} />
                Book Appointment
              </span>
              <h1>Book an <span>appointment</span> with Rio.</h1>
              <p className="lede">Choose your branch and care need. Our team will call back quickly to confirm the right doctor, department and visit timing for your family.</p>
              <div className="actions">
                <a className="btn btn-pink" href={SITE_LINKS.call}>Call Emergency Care</a>
                <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>

            <div className="panel">
              <h2>Request a call back</h2>
              <p className={styles.panelIntro}>Share a few details and we will help you plan the visit.</p>
              {sent ? (
                <div className={`done ${styles.doneSpace}`}>Thanks! Our care team will contact you shortly.</div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="field">
                    <label>Full name</label>
                    <input name="name" required maxLength={150} autoComplete="name" placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input name="mobile_number" required type="tel" maxLength={20} pattern="[0-9+()\- ]+" autoComplete="tel" placeholder="Phone number" />
                  </div>
                  <div className="field">
                    <label>Preferred branch</label>
                    <select name="branch" required defaultValue="">
                      <option value="" disabled>Select a branch</option>
                      {BRANCH_NAMES.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Service needed</label>
                    <select name="service" required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {APPOINTMENT_SERVICES_WITH_FERTILITY.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea name="message" maxLength={2000} placeholder="Tell us briefly how we can help" />
                  </div>
                  {submitError ? <div className={styles.formError} role="alert">{submitError}</div> : null}
                  <button className={`btn btn-cta ${styles.fullButton}`} type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit request ↗"}
                  </button>
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

      <SiteFooter />
    </div>
  );
}

