"use client";

import { useState } from "react";
import SiteFooter from "@/components/shared/SiteFooter";
import SiteLogo from "@/components/shared/SiteLogo";
import NavManagement from "@/components/shared/NavManagement";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { SITE_LINKS } from "@/data/site";
import styles from "./styles.module.css";

export default function SubmissionStatusPage({
  type,
  title,
  description,
  detail,
  retryHref = "/book-appointment",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSuccess = type === "success";
  const primaryHref = isSuccess ? "/" : retryHref;
  const primaryLabel = isSuccess ? "Return to home" : "Try again";

  return (
    <div className={`rio ${styles.page}`}>
      <TopStrip callHref={SITE_LINKS.call} />

      <header className="header solid">
        <SiteLogo />
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

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className={`${styles.hero} ${isSuccess ? styles.successHero : styles.errorHero}`}>
          <div className={styles.heroOverlay} />
          <div className={`wrap ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <span className={styles.kicker}>{isSuccess ? "Request received" : "Please try again"}</span>
              <div className={styles.statusLine}>
                <span className={styles.statusSymbol} aria-hidden="true">{isSuccess ? "✓" : "!"}</span>
                <span>{isSuccess ? "Our care team has been notified" : "Please review and try again"}</span>
              </div>
              <h1>{title}</h1>
              <p className={styles.description}>{description}</p>

              {detail ? <p className={styles.detail} role="alert">{detail}</p> : null}

              <div className={styles.actions}>
                <a className="btn btn-coral" href={primaryHref}>{primaryLabel}</a>
                <a className="btn btn-line" href={SITE_LINKS.call}>Call Rio now</a>
              </div>

              <div className={styles.trustLine}>
                <span className={styles.trustBar} aria-hidden="true" />
                <p>
                  <strong>{isSuccess ? "Our care team will call you shortly." : "Need help now?"}</strong>{" "}
                  {isSuccess
                    ? "For urgent concerns, please call our 24/7 emergency line."
                    : "Our emergency and care teams are available around the clock."}
                </p>
              </div>

              <a className={styles.phoneLink} href={SITE_LINKS.call}>+91 77083 18222</a>
            </div>
          </div>
        </section>

        <section className={styles.guidance}>
          <div className={`wrap ${styles.guidanceInner}`}>
            <div className={styles.guidanceCopy}>
              <p className={styles.guidanceLabel}>Need help sooner?</p>
              <p className={styles.guidanceText}>
                Our care team is available 24/7 for urgent questions.
              </p>
            </div>
            <a className={styles.textLink} href={isSuccess ? SITE_LINKS.call : SITE_LINKS.whatsapp} target={isSuccess ? undefined : "_blank"} rel={isSuccess ? undefined : "noreferrer"}>
              {isSuccess ? "Call emergency care" : "Message on WhatsApp"} →
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
