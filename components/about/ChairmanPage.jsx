"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { SITE_LINKS } from "@/data/site";

/* ── Scroll-triggered reveal ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom", as = "div" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const translate = from === "left" ? "translateX(-28px)" : from === "right" ? "translateX(28px)" : "translateY(28px)";
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : translate,
        transition: "opacity 0.75s cubic-bezier(.2,.8,.2,1), transform 0.75s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Animated counter ────────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const dur = 1800, start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const TIMELINE = [
  { year: "Childhood", label: "Humble Beginnings", desc: "Born in a Tier-4 village in Ramanathapuram, delivered by a traditional dai — the first doctor in his family." },
  { year: "Madurai", label: "Medical Foundation", desc: "Completed Diploma in Child Health (DCH) in Madurai, driven by a calling to serve the underserved." },
  { year: "UK", label: "Oxford & Royal Hospitals", desc: "Pursued MRCP in the United Kingdom; practiced at Oxford, Radcliffe, and the Royal Hospital as a Pediatrician." },
  { year: "Return", label: "Back to His Roots", desc: "Chose compassion over career, returning to Madurai to fill the critical gaps in neonatal and preterm care." },
  { year: "2003", label: "Rio Hospital Founded", desc: "Started as a 30-bed pediatric facility. Today, a 4-location centre of excellence for women and child healthcare." },
  { year: "Milestones", label: "Breaking New Ground", desc: "Founder President of NNF Madurai Chapter, first Human Milk Bank with Rotary, first Fetal Medicine in South TN." },
];

const AWARDS = [
  { icon: "🏆", title: "CII Excellence Award", sub: "No. 1 Children's Hospital in Tamil Nadu", year: "2022 & 2025" },
  { icon: "🎖️", title: "FICCI Healthcare Award", sub: "Best Hospital in South Tamil Nadu for Pediatric Care", year: "National" },
  { icon: "📖", title: "India Book of Records", sub: "BLS training for maximum villagers in a single day", year: "Record" },
];

const APPT_SERVICES = ["High-Risk Pregnancy Care", "Fetal Medicine", "NICU", "PICU", "Paediatric Emergency Care", "General Paediatrics", "Vaccination Services", "Human Milk Bank", "Maternity Care"];

const LINKS = {
  call: "tel:+917708318222",
  whatsapp: "https://wa.me/917708318222",
  instagram: "https://instagram.com/riochildrenhospitals",
};

const STATS = [
  { value: 600000, suffix: "+", label: "Patients Treated" },
  { value: 5000, suffix: "+", label: "High-Risk Pregnancies" },
  { value: 4, suffix: "", label: "Hospital Locations" },
  { value: 20, suffix: "+ yrs", label: "Of Excellence" },
];

export default function ChairmanPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="rio ch-page">
      <style>{`
        /* ── tokens ── */
        .ch-page { --hero-h: min(92vh,780px); }

        /* ── progress bar ── */
        .ch-progress {
          position: fixed; top: 0; left: 0; width: 100%; height: 3px;
          background: linear-gradient(90deg,#FD70A1,#7BA93A);
          transform: scaleX(0); transform-origin: left; z-index: 2000;
          transition: transform .1s linear;
        }

        /* ━━━━━━━━━━━━ HERO ━━━━━━━━━━━━ */
        .ch-hero {
          position: relative;
          min-height: min(92vh, 800px);
          display: flex;
          align-items: flex-end;
          background: linear-gradient(135deg, #153b75 0%, #081735 100%);
          overflow: hidden;
          padding: 0;
        }

        /* Giant outline background text */
        .ch-hero-bg-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: clamp(120px, 18vw, 280px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.075);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
          animation: floatBgText 12s ease-in-out infinite;
        }

        @keyframes floatBgText {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }

        /* Animated floating background orbs */
        .ch-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          opacity: 0.55;
        }
        .ch-orb-1 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(0, 162, 255, 0.35) 0%, transparent 70%);
          top: 5%;
          left: 15%;
          animation: floatOrb1 22s infinite alternate ease-in-out;
        }
        .ch-orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(253, 112, 161, 0.28) 0%, transparent 70%);
          bottom: 5%;
          right: 10%;
          animation: floatOrb2 28s infinite alternate ease-in-out;
        }
        .ch-orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(0, 242, 254, 0.22) 0%, transparent 70%);
          top: 35%;
          left: 50%;
          animation: floatOrb3 20s infinite alternate ease-in-out;
        }

        @keyframes floatOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(-70px, -40px) scale(0.9); }
        }
        @keyframes floatOrb3 {
          0% { transform: translate(-50%, -50%) translate(0, 0); }
          100% { transform: translate(-50%, -50%) translate(40px, -50px) scale(1.15); }
        }

        /* ── Chairman photo ── */
        .ch-hero-photo {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 90% !important;
          max-height: 720px !important;
          width: auto !important;
          max-width: 520px !important;
          object-fit: contain !important;
          object-position: bottom center;
          z-index: 2;
          pointer-events: none;
          filter: drop-shadow(0 20px 45px rgba(0, 0, 0, 0.55));
          animation: photoFadeUp 1s cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes photoFadeUp {
          from { opacity: 0; transform: translate(-50%, 30px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        /* Bottom scrim gradient for text legibility */
        .ch-hero-scrim {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(8, 23, 53, 0.95) 0%, rgba(8, 23, 53, 0.4) 50%, transparent 100%);
          z-index: 3;
          pointer-events: none;
        }

        /* Top-Left Seal emblem */
        .ch-hero-seal {
          position: absolute;
          top: 100px;
          left: 40px;
          z-index: 4;
          opacity: 0.8;
          animation: fadeIn 1.2s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.8; }
        }

        /* Layout Inner Container */
        .ch-hero-inner {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 36px 64px;
        }
        .ch-hero-content {
          max-width: 680px;
          text-align: left;
        }

        /* Founder & Chairman Badge */
        .ch-hero-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 8px 22px;
          border-radius: 99px;
          color: #ffffff !important;
          font-size: clamp(13px, 1.6vw, 15px);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 24px;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: fadeSlide .8s cubic-bezier(.2,.8,.2,1) forwards;
          opacity: 0;
        }

        .ch-hero-name {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: clamp(38px, 5.2vw, 64px);
          font-weight: 800;
          color: #ffffff !important;
          letter-spacing: -0.01em;
          line-height: 1.1;
          margin-bottom: 12px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
          animation: fadeSlide .8s cubic-bezier(.2,.8,.2,1) .15s forwards;
          opacity: 0;
        }
        .ch-hero-name .name-highlight { color: #FD70A1; }

        .ch-hero-degree {
          font-size: clamp(16px, 2.2vw, 24px);
          font-weight: 700;
          color: #ffffff !important;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
          animation: fadeSlide .8s cubic-bezier(.2,.8,.2,1) .25s forwards;
          opacity: 0;
        }

        .ch-hero-role {
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8) !important;
          margin-bottom: 32px;
          line-height: 1.4;
          letter-spacing: 0.02em;
          animation: fadeSlide .8s cubic-bezier(.2,.8,.2,1) .35s forwards;
          opacity: 0;
        }

        /* Frosted glass button */
        .ch-btn-glass {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 99px;
          padding: 15px 32px;
          font-size: 15px;
          font-weight: 700;
          color: #0d1140 !important;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background .2s, transform .2s, box-shadow .2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          animation: fadeSlide .8s cubic-bezier(.2,.8,.2,1) .45s forwards;
          opacity: 0;
        }
        .ch-btn-glass:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 162, 255, 0.3);
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Mobile ── */
        @media (max-width:900px) {
          .ch-hero {
            min-height: auto;
            aspect-ratio: 3/4;
            align-items: flex-end;
          }
          .ch-hero-bg-text {
            font-size: clamp(65px, 15vw, 130px);
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.065);
          }
          .ch-orb {
            filter: blur(50px);
            opacity: 0.45;
          }
          .ch-orb-1 {
            width: 260px;
            height: 260px;
          }
          .ch-orb-2 {
            width: 280px;
            height: 280px;
          }
          .ch-orb-3 {
            width: 220px;
            height: 220px;
          }
          .ch-hero-photo {
            height: 75% !important;
            max-height: 450px !important;
            max-width: 320px !important;
          }
          .ch-hero-seal {
            top: 80px;
            left: 20px;
            transform: scale(0.8);
          }
          .ch-hero-inner {
            padding: 0 20px 40px;
          }
          .ch-hero-content {
            max-width: 100%;
          }
          .ch-hero-badge {
            margin-bottom: 16px;
            padding: 6px 18px;
          }
          .ch-hero-name {
            font-size: clamp(28px, 7vw, 44px);
            margin-bottom: 8px;
          }
          .ch-hero-degree {
            font-size: 16px;
          }
          .ch-hero-role {
            font-size: 13px;
            margin-bottom: 24px;
          }
          .ch-btn-glass {
            padding: 12px 24px;
            font-size: 13px;
          }
        }
        @media (max-width:480px) {
          .ch-hero {
            aspect-ratio: 9/14;
          }
          .ch-hero-photo {
            height: 70% !important;
            max-width: 270px !important;
          }
          .ch-hero-seal {
            transform: scale(0.65);
            top: 70px;
            left: 10px;
          }
        }

        /* ━━━━━━━━━━━━ STATS ━━━━━━━━━━━━ */
        .ch-stats {
          background: linear-gradient(135deg,#303573 0%,#1a206e 100%);
          padding: 0;
        }
        .ch-stats-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 28px;
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 0;
        }
        @media (max-width:700px) { .ch-stats-inner { grid-template-columns: repeat(2,1fr); } }
        .ch-stat {
          padding: 48px 20px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,.08);
          position: relative; overflow: visible;
          transition: background .3s;
          min-width: 0;
        }
        .ch-stat:last-child { border-right: none; }
        .ch-stat::before {
          content: "";
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(253,112,161,.07) 0%, transparent 70%);
          opacity: 0; transition: opacity .3s;
        }
        .ch-stat:hover::before { opacity: 1; }
        .ch-stat-num {
          font-size: clamp(28px,3.5vw,46px); font-weight: 900;
          color: #ffffff; line-height: 1;
          white-space: nowrap;
        }
        .ch-stat-label {
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.55);
          text-transform: uppercase; letter-spacing: .08em;
          margin-top: 8px; white-space: nowrap;
        }

        /* ━━━━━━━━━━━━ JOURNEY / TIMELINE ━━━━━━━━━━━━ */
        .ch-journey {
          padding: 100px 0;
          background: #f8f9ff;
          position: relative; overflow: hidden;
        }
        .ch-journey::before {
          content: ""; position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(48,53,115,.04), transparent 70%);
        }
        .ch-section-label {
          font-size: 12px; font-weight: 800; text-transform: uppercase;
          letter-spacing: .14em; color: #FD70A1;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .ch-section-label::after {
          content: ""; height: 2px; width: 40px;
          background: linear-gradient(90deg,#FD70A1,transparent);
        }
        .ch-section-title {
          font-size: clamp(28px,4vw,44px); font-weight: 800;
          color: #0d1140; line-height: 1.15;
          margin-bottom: 16px; letter-spacing: -.02em;
        }
        .ch-section-sub {
          font-size: 16px; color: #6b7280; max-width: 520px; line-height: 1.6;
          margin-bottom: 64px;
        }

        /* Timeline */
        .ch-timeline { position: relative; padding-left: 32px; }
        .ch-timeline::before {
          content: ""; position: absolute;
          left: 10px; top: 8px; bottom: 8px; width: 2px;
          background: linear-gradient(180deg,#FD70A1,#303573,#7BA93A);
        }
        .ch-tl-item { position: relative; padding: 0 0 48px 36px; }
        .ch-tl-item:last-child { padding-bottom: 0; }
        .ch-tl-dot {
          position: absolute; left: -42px; top: 4px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #fff;
          border: 3px solid #303573;
          box-shadow: 0 0 0 4px rgba(48,53,115,.1);
          transition: border-color .3s, transform .3s;
        }
        .ch-tl-item:hover .ch-tl-dot {
          border-color: #FD70A1; transform: scale(1.25);
          box-shadow: 0 0 0 6px rgba(253,112,161,.15);
        }
        .ch-tl-year {
          display: inline-block;
          background: linear-gradient(135deg,#303573,#1a206e);
          color: #fff; font-size: 11px; font-weight: 700;
          padding: 3px 12px; border-radius: 99px;
          letter-spacing: .08em; text-transform: uppercase;
          margin-bottom: 8px;
        }
        .ch-tl-head {
          font-size: 18px; font-weight: 700; color: #0d1140; margin-bottom: 6px;
        }
        .ch-tl-body { font-size: 14.5px; color: #6b7280; line-height: 1.65; }
        /* Plain static timeline — no animation */
        .ch-tl-item-plain {
          position: relative; padding: 0 0 48px 36px;
          opacity: 1 !important; transform: none !important;
        }
        .ch-tl-item-plain:last-child { padding-bottom: 0; }

        /* ━━━━━━━━━━━━ VISION / QUOTE ━━━━━━━━━━━━ */
        .ch-vision {
          background: linear-gradient(135deg,#0d1140,#1e2580);
          padding: 100px 0;
          position: relative; overflow: hidden;
        }
        .ch-vision::before {
          content: """;
          position: absolute; font-family: Georgia,serif;
          font-size: 600px; line-height: .7;
          color: rgba(255,255,255,.03); top: -80px; left: -40px;
          pointer-events: none; user-select: none;
        }
        .ch-vision-inner {
          max-width: 800px; margin: 0 auto; padding: 0 28px;
          text-align: center; position: relative; z-index: 2;
        }
        .ch-vision-quote {
          font-size: clamp(20px,2.8vw,30px); font-weight: 600;
          font-style: italic; color: rgba(255,255,255,.9);
          line-height: 1.55; margin-bottom: 32px;
        }
        .ch-vision-quote em { color: #FD70A1; font-style: normal; }
        .ch-vision-attr {
          display: flex; align-items: center; justify-content: center; gap: 14px;
        }
        .ch-vision-attr-line { height: 1px; width: 48px; background: rgba(255,255,255,.2); }
        .ch-vision-attr-text { font-size: 13px; font-weight: 700; color: rgba(255,255,255,.5); letter-spacing: .1em; text-transform: uppercase; }

        /* ━━━━━━━━━━━━ AWARDS ━━━━━━━━━━━━ */
        .ch-awards {
          padding: 100px 0;
          background: #fff;
        }
        .ch-awards-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 28px;
          margin-top: 56px;
        }
        @media (max-width:700px) { .ch-awards-grid { grid-template-columns: 1fr; } }
        .ch-award-card {
          position: relative; overflow: hidden;
          border: 1px solid #e5e7f0;
          border-radius: 24px; padding: 40px 32px;
          background: #fafbff;
          text-align: center;
          transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s;
          cursor: default;
        }
        .ch-award-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 48px rgba(48,53,115,.1);
          border-color: #FD70A1;
        }
        .ch-award-card::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(145deg, rgba(253,112,161,.04) 0%, transparent 60%);
          opacity: 0; transition: opacity .35s;
        }
        .ch-award-card:hover::after { opacity: 1; }
        .ch-award-icon {
          font-size: 48px; margin-bottom: 20px; display: block;
          filter: drop-shadow(0 4px 12px rgba(253,112,161,.2));
          transition: transform .35s;
        }
        .ch-award-card:hover .ch-award-icon { transform: scale(1.15) rotate(-5deg); }
        .ch-award-year {
          display: inline-block;
          background: #FD70A1; color: #fff;
          font-size: 11px; font-weight: 700;
          padding: 3px 12px; border-radius: 99px;
          letter-spacing: .08em;
          margin-bottom: 14px;
        }
        .ch-award-title {
          font-size: 18px; font-weight: 800; color: #0d1140;
          margin-bottom: 8px;
        }
        .ch-award-sub {
          font-size: 13.5px; color: #6b7280; line-height: 1.5;
        }

        /* ━━━━━━━━━━━━ SECTION WRAPPER ━━━━━━━━━━━━ */
        .ch-wrap { max-width: 1200px; margin: 0 auto; padding: 0 28px; }

        /* ━━━━━━━━━━━━ RESPONSIVE TWEAKS ━━━━━━━━━━━━ */
        @media (max-width:600px) {
          .ch-stat { padding: 36px 16px; }
          .ch-tl-item { padding-left: 24px; }
          .ch-timeline::before { left: 6px; }
          .ch-tl-dot { left: -34px; }
        }
      `}</style>

      {/* Reading progress */}
      <div className="ch-progress" ref={progressRef} />

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${navSolid ? "nav-solid" : ""}`}>
        <Logo />
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement active={true} />
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href={SITE_LINKS.youtube} target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="ch-hero">
          {/* Giant background typography */}
          <div className="ch-hero-bg-text">FOUNDER</div>

          {/* Animated floating background orbs */}
          <div className="ch-orb ch-orb-1" />
          <div className="ch-orb ch-orb-2" />
          <div className="ch-orb ch-orb-3" />

          {/* Centered transparent portrait of Dr. Saravanan.M */}
          <img
            src="/assets/shared/chairman.png"
            alt="Dr. Saravanan M — Founder & Chairman, Rio Hospital"
            className="ch-hero-photo"
          />

          {/* Bottom legibility scrim */}
          <div className="ch-hero-scrim" />

          <div className="ch-hero-inner">
            <div className="ch-hero-content">
              <div className="ch-hero-badge">
                Founder &amp; Chairman
              </div>
              <h1 className="ch-hero-name">
                Dr. Saravanan M
              </h1>
              <div className="ch-hero-degree">
                MBBS., DCH., MRCP (UK)
              </div>
              <p className="ch-hero-role">
                Pediatrician &amp; Neonatal Care Leader &nbsp;·&nbsp; Founder, Rio Children's Hospital
              </p>
              <a href="#journey" className="ch-btn-glass">
                <span>↗ Read His Journey</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────── */}
        <section className="ch-stats">
          <div className="ch-stats-inner">
            {STATS.map((s, i) => (
              <div key={i} className="ch-stat">
                <div className="ch-stat-num">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="ch-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BIOGRAPHY ────────────────────────────────────── */}
        <section className="ch-journey" id="journey">
          <style>{`
            .bio-hl   { color: #303573; font-weight: 700; }
            .bio-para { font-size: 15.5px; line-height: 1.85; color: #1f2937; margin-bottom: 28px; }
            .bio-para:last-child { margin-bottom: 0; }
            .bio-body  { max-width: 100%; margin-top: 32px; }
          `}</style>
          <div className="ch-wrap">
            <h2 className="ch-section-title">His Story</h2>
            <div className="bio-body">
              <p className="bio-para">
                Dr. Saravanan was born in a <span className="bio-hl">Tier-4 village in Ramanathapuram (Ramnad) District</span> into a poor family and was delivered by a traditional dai. He is the <span className="bio-hl">first doctor in his family</span>. Growing up with limited access to healthcare shaped his deep commitment to improving medical services for underserved communities.
              </p>
              <p className="bio-para">
                Initially aspiring to become an engineer, destiny led him to medicine. He completed his <span className="bio-hl">Diploma in Child Health (DCH) in Madurai</span> and later pursued <span className="bio-hl">MRCP in the United Kingdom</span>, where he practiced at Oxford and Radcliffe Hospitals and served as a Pediatrician at the Royal Hospital. Despite international exposure and opportunities, he chose to return to Madurai to serve his people.
              </p>
              <p className="bio-para">
                On returning home, Dr. Saravanan witnessed the critical gaps in <span className="bio-hl">neonatal and preterm care</span>, especially in Tier-2 and Tier-3 cities. Families travelled long distances for newborn surgeries, and many babies suffered due to delayed or unavailable care. This deeply personal experience inspired his vision to provide <span className="bio-hl">international-standard neonatal care that is accessible and affordable</span>.
              </p>
              <p className="bio-para">
                This vision led to the establishment of <span className="bio-hl">Rio Hospital</span>, which began as a 30-bedded pediatric and neonatal care facility. Today, Rio Hospital has expanded to <span className="bio-hl">four locations</span>, emerging as a leading centre for pediatric and maternal healthcare in South India and setting new benchmarks in quality and compassion.
              </p>
              <p className="bio-para">
                Dr. Saravanan is the <span className="bio-hl">Founder President of the National Neonatology Forum (NNF), Madurai Chapter</span>, and has played a pivotal role in strengthening neonatal care in the region. He introduced neonatal retrieval services for critically ill newborns and established surgical facilities for preterm and critical babies, <span className="bio-hl">significantly reducing referrals to distant cities</span>.
              </p>
              <p className="bio-para">
                With the support of the Rotary Club, he established a <span className="bio-hl">Private Human Milk Bank</span> within the hospital premises to serve NICU babies. Rio Hospital is also the <span className="bio-hl">first hospital in South Tamil Nadu</span> to offer complete neonatal super specialty services and to introduce Fetal Medicine. To bridge healthcare gaps beyond Madurai, advanced units were established in <span className="bio-hl">Dindigul and Thanjavur</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ── VISION QUOTE ─────────────────────────────────── */}
        <section className="ch-vision">
          <div className="ch-vision-inner">
            <Reveal delay={0}>
              <div className="ch-section-label" style={{ justifyContent: "center", color: "rgba(255,255,255,.4)" }}>
                The Vision
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="ch-vision-quote">
                "To be the most loved, trusted, and comprehensive healthcare destination for women and children, delivering <em>compassionate, innovative, and world-class care</em> under one roof."
              </p>
            </Reveal>
            <Reveal delay={200} className="ch-vision-attr">
              <span className="ch-vision-attr-line" />
              <span className="ch-vision-attr-text">Dr. Saravanan.M — Founder, Rio Hospital</span>
              <span className="ch-vision-attr-line" />
            </Reveal>
          </div>
        </section>

        {/* ── AWARDS ───────────────────────────────────────── */}
        <section className="ch-awards">
          <div className="ch-wrap">
            <Reveal>
              <div className="ch-section-label">Recognition</div>
              <h2 className="ch-section-title">Awards &amp; Honours</h2>
            </Reveal>
            <div className="ch-awards-grid">
              {AWARDS.map((a, i) => (
                <Reveal key={i} delay={i * 120} className="ch-award-card">
                  <span className="ch-award-icon">{a.icon}</span>
                  <span className="ch-award-year">{a.year}</span>
                  <div className="ch-award-title">{a.title}</div>
                  <div className="ch-award-sub">{a.sub}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div>
            <div style={{ marginBottom: 16 }}><Logo footer /></div>
            <p style={{ color: "#AEB2D6", maxWidth: 270, fontSize: 14 }}>Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.</p>
            <p className="vals">TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE</p>
          </div>
          <div><h4>Treatments</h4><ul>{APPT_SERVICES.slice(0, 6).map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h4>Explore</h4><ul><li><a href="/">Home</a></li><li><a href="/about">About Us</a></li><li><a href="/about/chairman">Founder &amp; Chairman</a></li><li><a href="/about/management">Management Team</a></li></ul></div>
          <div><h4>Contact</h4><ul><li><a href={LINKS.call}>📞 +91 77083 18222</a></li><li><a href="mailto:info@riohospital.com">✉ info@riohospital.com</a></li><li><a href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li><li><a href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li></ul></div>
        </div>
        <div className="wrap footer-bottom"><span>© 2026 Rio Children&apos;s Hospital</span><span>Built by Invictus Global Tech</span></div>
      </footer>
    </div>
  );
}
