"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import TopStrip from "@/components/shared/TopStrip";
import { FACILITIES } from "@/data/facilities";
import { SITE_LINKS } from "@/data/site";
import styles from "./styles.module.css";

function Reveal({ children, delay = 0, className = "", as = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      {...rest}
      className={`reveal ${visible ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span className={`eyebrow ${light ? "light" : ""}`}>
      <i className="ey-dot" />
      {children}
    </span>
  );
}


function AnimatedCount({ end, suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;

      if (prefersReducedMotion) {
        setValue(end);
        return;
      }

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [duration, end]);

  return <strong ref={ref}>{value}{suffix}</strong>;
}

function FacilityTypeIcon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "ambulance":
      return (
        <svg {...props}>
          <path d="M10 7h4l3 4h2a2 2 0 0 1 2 2v3h-2" />
          <path d="M3 16V9a2 2 0 0 1 2-2h7v9" />
          <path d="M7 10v4" />
          <path d="M5 12h4" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "xray":
      return (
        <svg {...props}>
          <path d="M7 4h10" />
          <path d="M9 4v6l-3 9" />
          <path d="M15 4v6l3 9" />
          <path d="M10 11h4" />
          <path d="M8 20h8" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...props}>
          <rect x="6" y="5" width="12" height="15" rx="2" />
          <path d="M9 3h6" />
          <path d="M12 9v5" />
          <path d="M9.5 11.5h5" />
        </svg>
      );
    case "lab":
      return (
        <svg {...props}>
          <path d="M10 3v5l-4.5 8.2A3 3 0 0 0 8.1 21h7.8a3 3 0 0 0 2.6-4.8L14 8V3" />
          <path d="M9 13h6" />
        </svg>
      );
    case "vaccine":
      return (
        <svg {...props}>
          <path d="m14 5 5 5" />
          <path d="m11 8 5 5" />
          <path d="M7 21c-1.1 0-2-.9-2-2 0-.5.2-1 .6-1.4l6.8-6.8 2.8 2.8-6.8 6.8c-.4.4-.9.6-1.4.6Z" />
        </svg>
      );
    case "bank":
      return (
        <svg {...props}>
          <path d="M3 10h18" />
          <path d="M5 10v7" />
          <path d="M9 10v7" />
          <path d="M15 10v7" />
          <path d="M19 10v7" />
          <path d="M2 20h20" />
          <path d="m12 4 8 4H4l8-4Z" />
        </svg>
      );
    case "tele":
      return (
        <svg {...props}>
          <path d="M4 14a8 8 0 0 1 16 0" />
          <path d="M6 14v3a2 2 0 0 0 2 2h1" />
          <path d="M18 14v3a2 2 0 0 1-2 2h-1" />
          <rect x="2" y="13" width="4" height="6" rx="1" />
          <rect x="18" y="13" width="4" height="6" rx="1" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="m4 11 8-6 8 6" />
          <path d="M6 10v9h12v-9" />
        </svg>
      );
    case "center":
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <path d="M6 20V8h12v12" />
          <path d="M9 8V5h6v3" />
          <path d="M12 11v6" />
          <path d="M9 14h6" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

function FacilityImage({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className={`facility-image ${className}`}>
      {!broken ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} />
      ) : (
        <div className="facility-fallback">
          <span>Image slot ready</span>
        </div>
      )}
    </div>
  );
}

function getFacilityStatus(slug) {
  if (slug === "ambulance-services" || slug === "24-hours-laboratory-services") {
    return { text: "24/7 Support", is247: true };
  }
  if (slug === "pharmacy" || slug === "vaccination-services" || slug === "human-milk-bank" || slug === "vaccination-center") {
    return { text: "Daily Operations", is247: true };
  }
  return { text: "By Appointment", is247: false };
}

function getFacilityStaff(slug) {
  switch (slug) {
    case "ambulance-services":
      return "Neonatal Transport Team";
    case "24-hours-laboratory-services":
      return "Qualified Pathologists";
    case "pharmacy":
      return "Registered Pharmacists";
    case "human-milk-bank":
      return "Lactation Counselors";
    case "vaccination-services":
    case "vaccination-center":
      return "Paediatric Nurses";
    case "x-ray":
      return "Expert Radiologists";
    default:
      return "Paediatric Specialists";
  }
}

function FacilityDetailsInner({ facility, activeTab, setActiveTab }) {
  const status = getFacilityStatus(facility.slug);
  const staff = getFacilityStaff(facility.slug);

  return (
    <>
      <div className="detail-header-image">
        <FacilityImage src={facility.image} alt={facility.name} />
      </div>

      <div className="detail-content">
        <div className="detail-meta-header">
          <span className="detail-eyebrow">{facility.eyebrow}</span>
          <h2>{facility.name}</h2>
        </div>

        <p className="detail-summary">{facility.summary}</p>
        <p className="detail-desc">{facility.description}</p>

        <div className="action-panel">
          <a className="btn-booking" href="/book-appointment">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Appointment
          </a>
          <a className="btn-whatsapp-live" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">
            <span className="live-dot" />
            Message Us
          </a>
        </div>
      </div>
    </>
  );
}

export default function FacilitiesPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(FACILITIES[0]?.slug ?? "");
  const [activeTab, setActiveTab] = useState("overview");
  // Removed animating state to prevent double animation on click
  const detailRef = useRef(null);
  const facilityCardRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeFacility = FACILITIES.find((facility) => facility.slug === activeSlug) ?? FACILITIES[0];

  const handleFacilitySelect = (slug) => {
    const isMobileLayout = typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
    const scrollToCard = () => {
      const targetCard = facilityCardRefs.current[slug];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (slug !== activeSlug) {
      setActiveSlug(slug);
      setActiveTab("overview");
      // Animation will be handled by CSS on mount via key change
    }

    if (isMobileLayout) {
      if (slug !== activeSlug) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(scrollToCard);
        });
      } else {
        scrollToCard();
      }
    }
  };

  return (
    <div className={`rio facilities-page ${styles.page}`}>

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
          
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities" className="active">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="/book-vaccine">
            Book Vaccine
          </a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">
            Book an Appointment
          </a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className="facility-browser">
          <div className="wrap">
            <Reveal className="browser-intro-new">
              <div className="facility-hero-bg">
                <img src="/assets/shared/hero1.png" alt="Rio Children's Hospital facilities" loading="eager" />
              </div>
              <div className="facility-hero-veil" />
              <div className="intro-container">
                <div className="facility-hero-copy">
                  <Eyebrow>World-Class Healthcare</Eyebrow>
                  <h1>Our Medical Facilities &amp; Care Units</h1>
                  <p className="lede">
                    Explore our advanced pediatric, neonatal, and maternity care units. Rio Children's Hospital is equipped with
                    state-of-the-art diagnostic technology, round-the-clock emergency services, and specialized clinical infrastructure.
                  </p>
                </div>
                <div className="quick-stats">
                  <div className="quick-stat-badge">
                    <AnimatedCount end={FACILITIES.length} />
                    <span>Specialized Facilities</span>
                  </div>
                  <div className="quick-stat-badge">
                    <AnimatedCount end={24} suffix="/7" />
                    <span>Emergency &amp; Lab Support</span>
                  </div>
                  <div className="quick-stat-badge">
                    <AnimatedCount end={100} suffix="%" />
                    <span>Cold Chain &amp; Power Backup</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="facility-dashboard">
              <Reveal className="facility-sidebar" delay={80}>
                {FACILITIES.map((facility) => {
                  const isActive = facility.slug === activeFacility.slug;

                  return (
                    <div key={facility.slug} ref={(node) => { facilityCardRefs.current[facility.slug] = node; }} className={`facility-item-wrapper ${isActive ? "is-active" : ""}`}>
                      <button
                        type="button"
                        className={`facility-item-card ${isActive ? "is-active" : ""}`}
                        aria-pressed={isActive}
                        onClick={() => handleFacilitySelect(facility.slug)}
                      >
                        <span className="card-icon">
                          <FacilityTypeIcon name={facility.icon} />
                        </span>
                        <span className="card-info">
                          <strong>{facility.name}</strong>
                          <span>{facility.eyebrow}</span>
                        </span>
                        
                      </button>

                      {isActive && (
                        <div className="mobile-facility-details">
                          <FacilityDetailsInner
                            facility={facility}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </Reveal>

              <Reveal className="facility-detail-pane" delay={140} ref={detailRef}>
                <div className="detail-card animate-in" key={activeSlug}>
                  <FacilityDetailsInner
                    facility={activeFacility}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={`section ${styles.facilityCtaSection}`}>
          <div className="wrap">
            <Reveal className="facility-cta-banner">
              <div>
                <Eyebrow light>Need guidance?</Eyebrow>
                <h2>Find the right facility for your family</h2>
                <p>
                  Tell us what care you need and our team will guide you to the
                  right unit, specialist and Rio branch.
                </p>
              </div>
              <div className="facility-cta-actions">
                <a className="btn btn-pink" href={SITE_LINKS.call}>Call us</a>
                <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                <a className="btn btn-line" href="/book-appointment">Book an appointment</a>
              </div>
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





