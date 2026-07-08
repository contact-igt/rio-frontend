"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { FACILITIES } from "@/data/facilities";
import { SITE_LINKS } from "@/data/site";

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
    <div className="rio facilities-page">
      <style jsx global>{`
        .facilities-page {
          --facility-blue: #303573;
          --facility-blue-deep: #252a63;
          --facility-pink: #fd70a1;
          --facility-pink-soft: #ffe5ef;
          --facility-green: #7ba93a;
          --facility-brown: #bd844c;
          --facility-ink: #23304d;
          --facility-muted: #69728f;
          --facility-line: rgba(48, 53, 115, 0.08);
          --facility-surface: #ffffff;
          --facility-surface-soft: #f4f6ff;
          background:
            radial-gradient(circle at top left, rgba(253, 112, 161, 0.12), transparent 24%),
            radial-gradient(circle at 88% 10%, rgba(123, 169, 58, 0.12), transparent 20%),
            linear-gradient(180deg, #f4f6ff 0%, #fffaf3 100%);
          color: var(--facility-ink);
        }

        .header {
          background: transparent;
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .header.solid {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          box-shadow: 0 10px 34px rgba(48, 53, 115, 0.08);
        }
        .nav a.active,
        .nav a[href="/facilities"] {
          color: var(--pink-deep);
        }

        .facility-browser {
          position: relative;
          padding: 0 0 80px;
          overflow: hidden;
        }
        .facility-browser::before {
          content: "";
          position: absolute;
          inset: 24px auto auto 4%;
          width: min(420px, 34vw);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(48, 53, 115, 0.08), transparent 68%);
          pointer-events: none;
        }
        .facility-browser::after {
          content: "";
          position: absolute;
          right: -80px;
          bottom: 40px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253, 112, 161, 0.12), transparent 70%);
          pointer-events: none;
        }
        .facility-browser .wrap {
          position: relative;
          z-index: 1;
        }

        .browser-intro-new {
          position: relative;
          min-height: 78vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-radius: 0;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-bottom: 48px;
          background: #1f255d;
        }
        .facility-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .facility-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .facility-hero-veil {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(98deg, rgba(35, 39, 90, 0.95) 0%, rgba(35, 39, 90, 0.78) 45%, rgba(35, 39, 90, 0.38) 100%);
        }
        .intro-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 56px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
        }
        .facility-hero-copy {
          max-width: 760px;
        }
        .browser-intro-new .eyebrow {
          color: #ffc4da;
        }
        .browser-intro-new .ey-dot {
          background: #ffc4da;
        }
        .browser-intro-new h1 {
          margin-top: 18px;
          font-size: clamp(38px, 5vw, 74px);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: #ffffff;
          max-width: 820px;
        }
        .browser-intro-new .lede {
          margin-top: 22px;
          font-size: 18px;
          line-height: 1.7;
          color: #d7e7e1;
          max-width: 640px;
        }
        .quick-stats {
          position: relative;
          z-index: 2;
          align-self: flex-end;
          display: flex;
          gap: 0;
          background: rgba(35, 39, 90, 0.55);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 18px;
          padding: 16px 8px;
          box-shadow: 0 18px 40px rgba(10, 15, 45, 0.2);
        }
        .quick-stat-badge {
          min-width: 150px;
          padding: 6px 18px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          box-shadow: none;
        }
        .quick-stat-badge + .quick-stat-badge {
          border-left: 1px solid rgba(255, 255, 255, 0.18);
        }
        .quick-stat-badge strong {
          color: #ffffff;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 800;
          line-height: 1;
        }
        .quick-stat-badge span {
          color: #e3e6f5;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .facility-dashboard {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 32px;
          margin-top: 16px;
          align-items: start;
        }
        
        .facility-sidebar {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .facility-item-wrapper {
          border: 1px solid var(--facility-line);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 4px 16px rgba(48, 53, 115, 0.03);
        }
        .facility-item-wrapper:hover {
          transform: translateX(4px);
          background: #ffffff;
          border-color: rgba(253, 112, 161, 0.3);
          box-shadow: 0 8px 24px rgba(48, 53, 115, 0.08);
        }
        .facility-item-wrapper.is-active {
          background: #ffffff;
          border-color: var(--facility-blue);
          border-left: 5px solid var(--facility-blue);
          box-shadow: 0 12px 30px rgba(48, 53, 115, 0.12);
        }
        
        .facility-item-card {
          width: 100%;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
          cursor: pointer;
          outline: none;
          padding: 16px;
        }
        
        .facility-item-card .card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: var(--facility-surface-soft);
          color: var(--facility-blue);
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        
        .facility-item-wrapper.is-active .card-icon {
          background: var(--facility-pink-soft);
          color: var(--facility-pink);
        }
        
        .facility-item-card .card-icon svg {
          width: 20px;
          height: 20px;
        }
        
        .facility-item-card .card-info {
          flex: 1;
          min-width: 0;
        }
        .facility-item-card .card-info strong {
          display: block;
          font-family: "Proxima Nova", "Mulish", sans-serif;
          font-size: 16px;
          color: var(--facility-blue-deep);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .facility-item-card .card-info span {
          display: block;
          font-family: "Mulish", "Montserrat", sans-serif;
          font-size: 12.5px;
          color: var(--facility-muted);
          font-weight: 700;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .facility-item-card .card-indicator {
          color: var(--facility-muted);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.25s ease;
          opacity: 0.6;
        }
        .facility-item-wrapper.is-active .card-indicator {
          color: var(--facility-pink);
          opacity: 1;
        }

        .mobile-facility-details {
          display: none;
        }

        /* Premium Detail Card Redesign */
        .facility-detail-pane {
          position: sticky;
          top: 110px;
          perspective: 1000px;
        }
        
        .detail-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(190%);
          border: 1px solid rgba(48, 53, 115, 0.08);
          border-radius: 28px;
          box-shadow: 
            0 4px 30px rgba(0, 0, 0, 0.03),
            0 24px 60px rgba(48, 53, 115, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Animation when changing active facility */
        @keyframes detailEntrance {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .detail-card.animate-in {
          animation: detailEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .detail-header-image {
          height: 380px;
          position: relative;
          background: #eef1ff;
          overflow: hidden;
        }
        
        .detail-header-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(35, 48, 77, 0.05) 0%, rgba(35, 48, 77, 0.4) 100%);
          z-index: 1;
        }

        .detail-header-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .detail-card:hover .detail-header-image img {
          transform: scale(1.04);
        }

        .detail-category-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          color: var(--facility-blue-deep);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          z-index: 2;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        /* Status Badge on top-right of image */
        .detail-status-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(48, 53, 115, 0.85);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .detail-status-badge .dot {
          width: 6px;
          height: 6px;
          background-color: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 8px #38bdf8;
        }

        .detail-status-badge.active-247 .dot {
          background-color: #4ade80;
          box-shadow: 0 0 8px #4ade80;
          animation: pulseGreen 2s infinite;
        }

        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        .detail-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", sans-serif;
        }

        .detail-meta-header {
          margin-bottom: 20px;
        }

        .detail-eyebrow {
          font-family: "Mulish", "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 800;
          color: var(--facility-pink);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-block;
          margin-bottom: 6px;
        }

        .detail-content h2 {
          font-family: "Proxima Nova", "Mulish", sans-serif;
          font-size: clamp(24px, 2.5vw, 36px);
          color: var(--facility-blue-deep);
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 800;
        }

        /* Quick Specs Row */
        .detail-specs-row {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .spec-pill {
          background: var(--facility-surface-soft);
          border: 1px solid rgba(48, 53, 115, 0.05);
          padding: 8px 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--facility-ink);
        }

        .spec-pill svg {
          color: var(--facility-blue);
          opacity: 0.8;
          width: 15px;
          height: 15px;
        }

        /* Modern Tabs Component */
        .detail-tabs {
          display: flex;
          border-bottom: 2px solid var(--facility-line);
          margin-bottom: 24px;
          position: relative;
          gap: 24px;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 10px 4px 12px;
          font-size: 14.5px;
          font-weight: 700;
          color: var(--facility-muted);
          cursor: pointer;
          position: relative;
          transition: color 0.25s ease;
          outline: none;
        }

        .tab-btn:hover {
          color: var(--facility-blue-deep);
        }

        .tab-btn.is-active {
          color: var(--facility-blue);
        }

        .tab-btn.is-active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: var(--facility-blue);
          border-radius: 99px;
          animation: tabLineSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes tabLineSlide {
          from { transform: scaleX(0.7); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }

        /* Tab Content Panel */
        .tab-panel {
          min-height: 220px;
          animation: panelFadeIn 0.35s ease forwards;
        }

        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .detail-summary {
          font-family: "Mulish", "Montserrat", sans-serif;
          font-size: 15px;
          line-height: 1.55;
          color: var(--facility-blue-deep);
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 16px;
          padding: 16px 20px;
          background: var(--facility-pink-soft);
          border-radius: 16px;
          border-left: 4px solid var(--facility-pink);
          box-shadow: 0 4px 12px rgba(253, 112, 161, 0.05);
        }

        .detail-desc {
  font-family: "Montserrat", sans-serif;
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--facility-muted);
  margin-top: 24px;
  margin-bottom: 24px;
  padding-top: 12px;
}

        /* Premium Highlights Layout */
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .highlight-card {
          background: #ffffff;
          border: 1px solid rgba(48, 53, 115, 0.06);
          padding: 14px 18px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--facility-blue-deep);
          box-shadow: 0 2px 8px rgba(48, 53, 115, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .highlight-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(48, 53, 115, 0.06);
          border-color: rgba(123, 169, 58, 0.3);
          background: rgba(123, 169, 58, 0.02);
        }

        .highlight-card-icon {
          color: var(--facility-green);
          background: rgba(123, 169, 58, 0.1);
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .highlight-card:hover .highlight-card-icon {
          background: rgba(123, 169, 58, 0.18);
          transform: scale(1.05);
        }

        /* Dynamic Action Panel Footer */
        .action-panel {
          display: flex;
          gap: 14px;
          margin-top: 32px;
          border-top: 1px solid var(--facility-line);
          padding-top: 24px;
          align-items: center;
        }

        .btn-booking {
          flex: 1.3;
          background: linear-gradient(135deg, var(--facility-blue) 0%, var(--facility-blue-deep) 100%);
          color: #ffffff !important;
          border: none;
          padding: 14px 24px;
          border-radius: 14px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(48, 53, 115, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-booking:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(48, 53, 115, 0.3);
          filter: brightness(1.05);
        }

        .btn-whatsapp-live {
          flex: 1;
          background: #ffffff;
          border: 1.5px solid #25d366;
          color: #128c7e !important;
          padding: 13px 20px;
          border-radius: 14px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-whatsapp-live:hover {
          background: rgba(37, 211, 102, 0.05);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.12);
        }

        /* Pulsing indicator for active support */
        .live-dot {
          width: 8px;
          height: 8px;
          background-color: #25d366;
          border-radius: 50%;
          box-shadow: 0 0 8px #25d366;
          animation: pulseGreen 2.5s infinite;
        }

        .footer {
          margin-top: 60px;
        }
        .footer ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer li + li {
          margin-top: 10px;
        }
        .footer a {
          color: #d8e4df;
        }
        .footer a:hover {
          color: #fff;
        }
        
        @media (max-width: 1024px) {
          .facility-dashboard {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .facility-sidebar {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .facility-item-wrapper {
            scroll-margin-top: 96px;
          }
          .facility-item-wrapper:hover {
            transform: translateY(-2px) translateX(0);
          }
          .facility-item-wrapper.is-active {
            border-left: 1px solid var(--facility-line);
            border-top: 4px solid var(--facility-blue);
          }
          .facility-detail-pane {
            display: none;
          }
          .mobile-facility-details {
            display: block;
            border-top: 1px solid var(--facility-line);
            animation: slideDown 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }
          .mobile-facility-details .detail-header-image {
            height: 260px;
          }
          .mobile-facility-details .detail-content {
            padding: 24px 16px;
          }
        }

        @media (max-width: 760px) {
          .facility-browser {
            padding: 0 0 60px;
          }
          .browser-intro-new {
            min-height: auto;
            border-radius: 0;
          }
          .intro-container {
            padding: 64px 20px 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .browser-intro-new h1 {
            font-size: clamp(32px, 10vw, 48px);
          }
          .browser-intro-new .lede {
            font-size: 15px;
            line-height: 1.65;
          }
          .quick-stats {
            width: 100%;
            margin-top: 22px;
            flex-wrap: wrap;
            gap: 10px;
            padding: 12px;
            border-radius: 16px;
          }
          .quick-stat-badge {
            min-width: calc(50% - 5px);
            flex: 1 1 calc(50% - 5px);
            border-left: none;
            background: rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 14px 12px;
          }
          .quick-stat-badge + .quick-stat-badge {
            border-left: none;
          }
          .detail-content {
            padding: 24px;
          }
          .action-panel {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .btn-booking,
          .btn-whatsapp-live {
            width: 100%;
            justify-content: center;
          }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/doctors">Doctors</a>
          <NavTreatments />
          <a href="/facilities" className="active">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">
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
      </main>

      <footer className="footer">
        <div className="wrap">
          <div>
            <div style={{ marginBottom: 16 }}>
              <Logo footer />
            </div>
            <p style={{ color: "#9FC4BB", maxWidth: 270, fontSize: 14 }}>
              Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.
            </p>
            <p className="values">TRUST - CARE - INNOVATION - COMPASSION - EXCELLENCE</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/doctors">Doctors</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={SITE_LINKS.call}>Call +91 77083 18222</a></li>
              <li><a href="mailto:info@riohospital.com">info@riohospital.com</a></li>
              <li><a href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>2026 Rio Children's Hospital</span>
          <span>Built by Invictus Global Tech</span>
        </div>
      </footer>

      <div className="mbar">
        <a className="btn btn-pink" href={SITE_LINKS.call}>Call</a>
        <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}







