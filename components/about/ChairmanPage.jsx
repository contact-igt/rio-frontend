"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { SITE_LINKS } from "@/data/site";
import styles from "./chairman-page/styles.module.css";

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
    <div className={`rio ch-page ${styles.page}`}>

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
          <a className="btn btn-line btn-sm" href="/book-vaccine">Book Vaccine</a>
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
              <div className={`ch-section-label ${styles.visionLabelCenter}`}>
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

      <SiteFooter />
    </div>
  );
}



