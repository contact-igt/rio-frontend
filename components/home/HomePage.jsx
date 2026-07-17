"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES, SITE_LINKS } from "@/data/site";
import styles from "./styles.module.css";
/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — HOME PAGE  ·  PARALLAX EDITION

   Inspiration : Awwwards healthcare winners — immersive media-rich hero with
   layered parallax (Intense Health), scroll-driven reveals (Scroll for Your
   Health) and drifting organic shapes (DrDoctor). Kept tasteful: motion adds
   depth, never buries the information.

   Engine      : custom rAF scroll parallax via [data-par] speed attributes,
                 IntersectionObserver reveals, scroll-progress bar.
                 Honours prefers-reduced-motion (all transforms disabled).
   Palette     : Rio brand — Deep Blue #303573 (primary), Pink #FD70A1 (secondary),
                 Green #7BA93A + Warm Brown #BD844C (CTAs) + Beige, over white.
   Type        : 'Proxima Nova' (→ Mulish fallback) headings · 'Montserrat' body.
   Imagery     : Rio's OWN live CDN photography (graceful gradient fallback).

   Drop-in component → export default RioHomeParallax
   (Next.js: add "use client" at the very top of the file.)
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  logo: "/assets/shared/logo.png",
  hero: "/assets/shared/hero1.png",
  nicu: "/assets/home/advanced-nicu.png",
  emergency: "/assets/home/pe.png",
  emergency2: "/assets/home/neonatal.png",
  maternity: "/assets/home/women.png",
  newborn: "/assets/home/child-newborn.png",
  specialists: "/assets/about/specialist.png",
  vaccine: "/assets/home/vaccine.png",
  specialists2: "/assets/home/specialist.png",
  cc1: "/assets/home/nicu-ward.png",
  cc2: "/assets/home/ot.png",
  cc3: "/assets/home/picu.png",
  cc4: "/assets/home/milkbank.png",
  branch1: "/assets/shared/branch-madurai-main.png",
  branch2: "/assets/shared/branch-madurai-southwing.png",
  branch3: "/assets/shared/branch-dindigul.jpg",
  branch4: "/assets/shared/branch-thanjavur.jpg",
};

const PILLARS = [
  {
    t: "High-Risk Pregnancy Expertise",
    d: "Specialised monitoring for complex pregnancies, led by experienced fetal medicine and obstetric teams.",
    icon: "pulse",
  },
  {
    t: "Advanced NICU, PICU & Preterm Care",
    d: "Equipped intensive care for premature babies and critically ill children, monitored around the clock.",
    icon: "shield",
  },
  {
    t: "24/7 Emergency & Mother-Child Support",
    d: "Round-the-clock emergency response for newborns, children and mothers because every minute matters.",
    icon: "clock",
  },
  {
    t: "Paediatric Super Specialities",
    d: "Multidisciplinary child care under one roof, featuring cardiology, neurology, surgery, pulmonology & urology.",
    icon: "stethoscope",
  },
];
const TESTIMONIALS = [
  // NOTE: sample testimonials reflecting documented review themes — replace with REAL Google / JustDial reviews before go-live.
  {
    name: "Priya R.",
    loc: "Madurai",
    stars: 5,
    text: "Our premature baby spent three weeks in the NICU and the team was incredible, constant updates, so caring. We're forever grateful to Rio.",
  },
  {
    name: "Karthik S.",
    loc: "Dindigul",
    stars: 5,
    text: "Painless delivery and wonderful maternity care. The doctors and nurses made my wife feel safe at every step. Spotless, well-run hospital.",
  },
  {
    name: "Anitha M.",
    loc: "Thanjavur",
    stars: 5,
    text: "We rushed in at 2 AM with our daughter and the emergency team was ready immediately. 24/7 care that genuinely saved us.",
  },
];

const SERVICES = [
  {
    t: "NICU",
    d: "Incubators, ventilators, TPN and continuous monitoring for premature and critically ill newborns.",
    img: "nicu",
    slug: "nicu",
  },
  {
    t: "PICU",
    d: "Intensive care for severe respiratory distress, dengue, meningitis and critical paediatric illness.",
    img: "cc3",
    slug: "picu",
  },
  {
    t: "High-Risk Pregnancy Care",
    d: "Dedicated management for complex pregnancies, from early scans through to a safe delivery.",
    img: "maternity",
    slug: "high-risk-pregnancy",
  },
  {
    t: "Fetal Medicine",
    d: "Close monitoring of high-risk pregnancies to spot concerns early and plan safer deliveries.",
    img: "cc2",
    slug: "fetal-medicine",
  },
  {
    t: "General Paediatrics",
    d: "24/7 outpatient consultation for every childhood illness, from newborn through to 18 years.",
    img: "newborn",
    slug: "general-paediatrics",
  },
  {
    t: "Maternity Care",
    d: "Affordable normal, painless and C-section delivery packages with expert gynaecologist-led antenatal care.",
    img: "specialists2",
    slug: "maternity",
  },
  {
    t: "Human Milk Bank",
    d: "Safe, screened, pasteurised donor milk for premature babies who can't be breastfed by their mothers.",
    img: "cc4",
    slug: "human-milk-bank",
  },
  {
    t: "Paediatric Emergency",
    d: "Round-the-clock casualty care for childhood accidents, injuries and sudden critical illness.",
    img: "emergency",
    slug: "emergency",
  },
  {
    t: "Vaccination Services",
    d: "National immunisation schedule with free SMS reminders and uninterrupted 3-level power backup.",
    img: "vaccine",
    slug: "vaccination",
  },
];
const TRIMESTERS = [
  {
    k: "First Trimester",
    w: "Week 0 – 12",
    d: "A crucial phase. Early-pregnancy scans, blood tests and supplements, with free SMS alerts and 3-level power backup for uninterrupted care.",
  },
  {
    k: "Second Trimester",
    w: "Week 13 – 28",
    d: "Monitoring the baby's growth, including the anomaly scan, fetal well-being checks and routine antenatal visits, backed by advanced ultrasound.",
  },
  {
    k: "Third Trimester",
    w: "Week 29 – 40",
    d: "Focus on the baby's position, growth and delivery preparation, with growth scans, Doppler studies and regular check-ups.",
  },
];
const WHY_EXT = [
  {
    t: "Patient-Centered Care",
    d: "Every patient's story is unique, and so is our approach to caring for them.",
    icon: "pulse",
  },
  {
    t: "Compassionate Support",
    d: "We stand by you with empathy and understanding throughout your journey.",
    icon: "shield",
  },
  {
    t: "Multidisciplinary Team",
    d: "Neonatologists, paediatricians, fetal medicine specialists, intensivists and emergency experts, together.",
    icon: "stethoscope",
  },
];
const GALLERY = [
  { t: "Advanced NICU ward", img: "cc1" },
  { t: "Modular operation theatre", img: "cc2" },
  { t: "Paediatric emergency", img: "emergency" },
  { t: "Neonatal transport", img: "emergency2" },
  { t: "Specialist team", img: "specialists2" },
  { t: "Vaccination centre", img: "vaccine" },
  { t: "Newborn care", img: "newborn" },
  { t: "Maternity care", img: "maternity" },
];
const FAQS = [
  {
    q: "How often should my child visit a paediatrician?",
    a: "Routine check-ups are recommended at key stages of your child's development to ensure they're growing healthy and strong.",
  },
  {
    q: "What vaccinations does my child need?",
    a: "Vaccination schedules vary by age. At Rio we provide a clear vaccine chart and timely reminders to keep your child protected.",
  },
  {
    q: "What signs should I watch for in newborn health?",
    a: "If your newborn shows signs of jaundice, irregular feeding, or unusual sleep patterns, consult our specialists immediately.",
  },
  {
    q: "When should I start prenatal care?",
    a: "Ideally, as soon as you confirm pregnancy. Early monitoring supports a healthy journey for both mother and baby.",
  },
  {
    q: "What facilities are available for paediatric emergencies?",
    a: "Rio offers 24/7 paediatric emergency care with NICU support, ensuring immediate attention when your child needs it most.",
  },
];
const BRANCHES = [
  {
    name: "Madurai (Main)",
    addr: "Tuticorin Ring Road, Masthanpatti Rd, opp Annamalaiar School, Madurai – 625020",
    phone: "77083 18222",
    tel: "+917708318222",
    img: "branch1",
  },
  {
    name: "Southwing, Madurai",
    addr: "41, Madakulam Main Rd, Pasumpon Nagar, Palangantham, Madurai – 625003",
    phone: "0452-4036444",
    tel: "+9104524036444",
    img: "branch2",
  },
  {
    name: "Dindigul",
    addr: "10, Palani Rd, New Agraharam, Govindapuram, Dindigul – 624001",
    phone: "0451-2424333",
    tel: "+9104512424333",
    img: "branch3",
  },
  {
    name: "Thanjavur",
    addr: "21/3082, 1st St, VOC Nagar, Parisutham Nagar, Thanjavur – 613007",
    phone: "+91 82205 42555",
    tel: "+918220542555",
    img: "branch4",
  },
];

/* ---------- helpers ------------------------------------------------------ */
const GRAD = ["g0", "g1", "g2"];
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${vis ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Img({ src, alt = "", grad = 0, className = "", par }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`img-wrap ${GRAD[grad % GRAD.length]} ${className}`}>
      {!broken && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          data-par={par}
          onError={() => setBroken(true)}
        />
      )}
      {broken && (
        <svg
          viewBox="0 0 24 24"
          className="img-fallback-mark"
          aria-hidden="true"
        >
          <path d="M12 21s-7.5-4.6-10-9.2C.6 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.4 8.7 18 11.8 16.5 16.4 12 21 12 21z" />
        </svg>
      )}
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <i className="eyebrow-dot" />
      {children}
    </span>
  );
}

function Counter({ value, light = false }) {
  const m = value.match(/[\d,]+/);
  const target = m ? parseInt(m[0].replace(/,/g, ""), 10) : null;
  const suffix = m ? value.slice(m.index + m[0].length) : "";
  const prefix = m ? value.slice(0, m.index) : "";
  const [n, setN] = useState(target ? 0 : null);
  const ref = useRef(null);
  useEffect(() => {
    if (target == null) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const dur = 1300,
          start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return (
    <span ref={ref} className={light ? "ct-light" : ""}>
      {target != null ? `${prefix}${n.toLocaleString()}${suffix}` : value}
    </span>
  );
}

const ICONS = {
  pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  shield: (
    <path d="M12 3.2 5.5 5.6v4.9c0 4.3 2.8 7.2 6.5 8.8 3.7-1.6 6.5-4.5 6.5-8.8V5.6L12 3.2Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M4.5 2C3.7 2 3 2.7 3 3.5v2.3c0 .8.7 1.5 1.5 1.5S6 6.6 6 5.8V3.5C6 2.7 5.3 2 4.5 2z" />
      <path d="M21 3.5c0-.8-.7-1.5-1.5-1.5S18 2.7 18 3.5v2.3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V3.5z" />
      <path d="M4.5 7.3C4.5 11.6 8 15 12 15s7.5-3.4 7.5-7.7" />
      <path d="M12 15v3" />
      <path d="M12 18H9c-1.7 0-3 1.3-3 3" />
    </>
  ),
};
function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pillar-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}

export default function HomePage() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const progressRef = useRef(null);

  /* parallax engine */
  useEffect(() => {
    if (reduced()) return;
    const nodes = Array.from(document.querySelectorAll("[data-par]"));
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of nodes) {
        const speed = parseFloat(el.getAttribute("data-par")) || 0;
        const r = el.getBoundingClientRect();
        const fromCenter = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-fromCenter * speed).toFixed(1)}px, 0)`;
      }
      // scroll progress
      const sc = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${max > 0 ? sc / max : 0})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`rio ${styles.page}`}>

      <div className="progress" ref={progressRef} />

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${navSolid ? "nav-solid" : ""}`}>
        <Logo />
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
          
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a
            className="btn btn-line btn-sm"
           href="/book-vaccine">
            Book Vaccine
          </a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">
            Book an Appointment
          </a>
        </div>
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="top">
        {/* ───────── PARALLAX HERO ───────── */}
        <section className="hero">
          <div className="hero-bg">
            <Img
              src={IMG.hero}
              alt="Mother holding her newborn at Rio Children's Hospital"
              grad={0}
              par="0.18"
            />
          </div>
          <div className="hero-veil" />
          <span
            className={`blob blob-coral ${styles.homeBlobOne}`}
            data-par="0.32"
          />
          <span
            className={`blob blob-teal ${styles.homeBlobTwo}`}
            data-par="0.22"
          />
          <div className="hero-inner">
            <Reveal>
              <Eyebrow>12 Years of Trusted Care</Eyebrow>
              <h1>
                Trusted <span className="accent">Women</span> &amp; Children’s Hospital in South Tamil Nadu
              </h1>
              <p className="lede">
                Home to South Tamil Nadu's only Level 3 NICU, offering
                high-risk pregnancy care, fetal medicine, PICU, maternity
                services and comprehensive paediatric super-speciality care
                across four branches.
              </p>
              <div className="hero-cta">
                <a className="btn btn-coral" href="/book-appointment">
                  Book an Appointment
                </a>
                <a className="btn btn-line" href={SITE_LINKS.call}>
                  Call Emergency Care
                </a>
              </div>
              <div className="hero-badges">
                <span>NABH Entry-Level Certified</span>
                <span>Only Level 3 NICU in South TN</span>
              </div>
            </Reveal>
          </div>
          <div className="hero-glass-wrap">
            <div className="hero-glass-container">
              <div className="hero-badges-glass">
                <span>NABH Entry-Level Certified</span>
                <span>Only Level 3 NICU in South TN</span>
              </div>
              <div className="hero-glass">
                <div>
                  <strong>
                    <Counter value="6 Lacs+" />
                  </strong>
                  <span>Patients</span>
                </div>
                <div>
                  <strong>
                    <Counter value="100+" />
                  </strong>
                  <span>Specialists</span>
                </div>
                <div>
                  <strong>
                    <Counter value="4" />
                  </strong>
                  <span>Branches</span>
                </div>
              </div>
            </div>
          </div>
          <div className="scrollcue">
            <span className="mouse" />
            Scroll
          </div>
        </section>

        {/* ───────── 4 pillars ───────── */}
        <section className={`section ${styles.whyChooseBackground}`}>
          <span
            className={`blob blob-coral ${styles.homeBlobThree}`}
            data-par="0.12"
          />
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Why Choose Rio</Eyebrow>
              <h2>Four reasons families trust us</h2>
            </Reveal>
            <div className="pillar-grid">
              {PILLARS.map((p, i) => (
                <Reveal key={p.t} delay={i * 100}>
                  <div className="pillar">
                    <div className="pillar-ic-wrap">
                      <Icon name={p.icon} />
                    </div>
                    <h3>{p.t}</h3>
                    <p className="mt-14">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PARALLAX BAND: emergency + stats ───────── */}
        <section className="band">
          <div className="band-bg">
            <Img
              src={IMG.emergency}
              alt="24/7 paediatric emergency at Rio"
              grad={1}
              par="0.16"
            />
          </div>
          <div className="band-veil" />
          <div className="band-inner">
            <Reveal>
              <Eyebrow light>Around the clock</Eyebrow>
              <h2 className="mt-14">
                When every minute matters, we're already ready.
              </h2>
              <p>
                24/7 paediatric emergency, advanced NICU &amp; PICU, neonatal
                transport and round-the-clock specialists  across all four
                branches.
              </p>
              <div className={`hero-trust ${styles.heroTrustTight}`}>
                <span className="ht-bar" />
                <p>
                  Trusted by <strong>1 Lac+ families</strong> across Tamil Nadu
                  for women &amp; child healthcare.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── services ──────── */}
        <section
          className={`section tint-sage ${styles.servicesBackground}`}
          id="services"
        >
          <span
            className={`blob blob-teal ${styles.homeBlobFour}`}
            data-par="0.1"
          />
          <div className="wrap">
            <Reveal className="sec-head">
              <Eyebrow>Our Treatments</Eyebrow>
              <h2>Specialised care, all under one roof</h2>
              <p className="sec-note">
                From high-risk pregnancy through every stage of childhood. The
                core services families turn to Rio for, every day.
              </p>
            </Reveal>
            <div className="svc-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.t} delay={i * 60}>
                  <a
                    className="svc"
                    href={s.slug ? `/services/${s.slug}` : "/services"}
                  >
                    <Img src={IMG[s.img]} alt={s.t} grad={i % 3} />
                    <div className="svc-body">
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                      <span className="svc-more">
                        {s.slug ? "Learn more →" : "View treatments →"}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

   
      

        {/* ───────── pregnancy journey ───────── */}
        <section className="section tint-blush" id="pregnancy">
          <span
            className={`blob blob-coral ${styles.homeBlobFive}`}
            data-par="0.1"
          />
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Pregnancy Journey</Eyebrow>
              <h2>Care that follows every trimester</h2>
              <p className="sec-note">
                From the first scan to delivery day, Rio's antenatal programme
                is built around what each stage of pregnancy needs most.
              </p>
            </Reveal>
            <div className={`tri-rail ${styles.trimesterRail}`}>
              {TRIMESTERS.map((t, i) => (
                <Reveal key={t.k} delay={i * 120}>
                  <div className="tri">
                    <div className="tri-num">{i + 1}</div>
                    <h3>{t.k}</h3>
                    <span className="wk">{t.w}</span>
                    <p>{t.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


          <section className={`section ${styles.childHealthBackground}`}>
          <div className="wrap split">
            <Reveal className={styles.childHealthContent}>
              <Eyebrow>Child Health</Eyebrow>
              <h2>Caring for your child, at every stage</h2>
              <p className="sec-note">
                More than a paediatric hospital, we are your trusted partners in
                your child's health journey. From newborn care to adolescent
                health,
                our specialists provide expert, compassionate care in a
                child-friendly environment.
              </p>
              <ul className="split-list">
                <li>
                  <i>✓</i> Newborn to 18-year care
                </li>
                <li>
                  <i>✓</i> 24/7 outpatient consultation
                </li>
                <li>
                  <i>✓</i> Fever, asthma & infections
                </li>
                <li>
                  <i>✓</i> Vaccination & growth tracking
                </li>
                <li>
                  <i>✓</i> Child-friendly environment
                </li>
                <li>
                  <i>✓</i> Developmental & specialist care
                </li>
              </ul>
              <a className="btn btn-coral mt-28" href="/book-appointment">
                Book a Paediatric Consultation ↗
              </a>
            </Reveal>
            <Reveal delay={120} className="rev">
              <Img
                src={IMG.newborn}
                alt="Paediatric care at Rio"
                grad={1}
                className="frame"
                par="0.06"
              />
            </Reveal>
          </div>
        </section>

        {/* ───────── HUMAN MILK BANK (dedicated div) ───────── */}
        <section className="section mbank" id="milkbank">
          <span
            className={`blob blob-teal ${styles.homeBlobSix}`}
            data-par="0.1"
          />
          <div className="wrap mbank-grid">
            <Reveal className="mbank-media">
              <span className="mbank-badge">★ A Rio differentiator</span>
              <div className="mbank-card-stack">
                <article className="mbank-card mbank-card-rose">
                  <Img
                src={IMG.cc4}
                alt="Rio's Human Milk Bank — screened, pasteurised donor milk"
                grad={1}
                    className="mbank-card-image"
                    par="0.05"
                  />
                </article>
                <article className="mbank-card mbank-card-green">
                  <Img
                    src={IMG.newborn}
                    alt="Newborn care at Rio Children's Hospital"
                    grad={2}
                    className="mbank-card-image"
                  />
                </article>
                <article className="mbank-card mbank-card-yellow">
                  <Img
                    src={IMG.cc1}
                    alt="Rio neonatal intensive care ward"
                    grad={0}
                    className="mbank-card-image"
                  />
                </article>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>Human Milk Bank</Eyebrow>
              <h2>Safe Human Milk Bank for Premature & Critically ill Newborns</h2>
              <p className="sec-note">
                Our state-of-the-art Human Milk Bank operates every single day,
                providing safe, screened and pasteurised donor human milk for
                premature and critically ill newborns who cannot be breastfed by
                their own mothers. Stringent quality-control protocols, sterile
                storage and 24/7 power backup ensure the highest safety and
                nutritional standards, along with personalised guidance and
                counselling for both donor mothers and recipients.
              </p>
              <div className="mbank-stats">
                <div className="mbank-stat">
                  <strong>300 L+</strong>
                  <span>Donor milk collected</span>
                </div>
                <div className="mbank-stat">
                  <strong>100%</strong>
                  <span>Screened &amp; pasteurised</span>
                </div>
                <div className="mbank-stat">
                  <strong>365 days</strong>
                  <span>Operational, every day</span>
                </div>
                <div className="mbank-stat">
                  <strong>24/7</strong>
                  <span>Power-backed cold chain</span>
                </div>
              </div>
              <ul className="mbank-help">
                <li>
                  <i>♥</i> For premature &amp; preterm babies who need early
                  nutrition
                </li>
                <li>
                  <i>♥</i> For critically ill newborns under NICU care
                </li>
                <li>
                  <i>♥</i> For mothers temporarily unable to breastfeed their
                  baby
                </li>
              </ul>
              <div className="mbank-cta">
                <a
                  className="btn btn-coral"
                  href={SITE_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Become a Milk Donor ↗
                </a>
                <a className="btn btn-line" href="/book-appointment">
                  Talk to a Lactation Specialist
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── why (teal) ───────── */}
        <section
          className={`section why ${styles.approachBackground}`}
          id="why"
        >
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow light>Our Approach</Eyebrow>
              <h2>What it feels like to be cared for at Rio</h2>
            </Reveal>
            <div className="why-grid">
              {WHY_EXT.map((w, i) => (
                <Reveal key={w.t} delay={i * 90}>
                  <div className="why-card">
                    <div className={styles.approachIcon}>
                      <Icon name={w.icon} />
                    </div>
                    <div className="why-rule" />
                    <h3>{w.t}</h3>
                    <p>{w.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── SIGNATURE: staggered parallax gallery ───────── */}
        <section className="section" id="facilities">
          <div className="wrap">
            <Reveal className="sec-head">
              <Eyebrow>Infrastructure</Eyebrow>
              <h2>Built for Emergencies Around Mother &amp; Child</h2>
              <p className="sec-note">
                Advanced NICU &amp; PICU wards, modular theatres, 24-hour lab
                and imaging, all designed for faster, coordinated care.
              </p>
            </Reveal>
            <div className="gal">
              <div className="gal-col" data-par="0.06">
                <div className="gal-cell h1">
                  <Img src={IMG[GALLERY[0].img]} alt={GALLERY[0].t} grad={0} />
                  <div className="gal-cap">{GALLERY[0].t}</div>
                </div>
                <div className="gal-cell h2">
                  <Img src={IMG[GALLERY[1].img]} alt={GALLERY[1].t} grad={1} />
                  <div className="gal-cap">{GALLERY[1].t}</div>
                </div>
              </div>
              <div className="gal-col" data-par="-0.05">
                <div className="gal-cell h2">
                  <Img src={IMG[GALLERY[2].img]} alt={GALLERY[2].t} grad={2} />
                  <div className="gal-cap">{GALLERY[2].t}</div>
                </div>
                <div className="gal-cell h1">
                  <Img src={IMG[GALLERY[3].img]} alt={GALLERY[3].t} grad={0} />
                  <div className="gal-cap">{GALLERY[3].t}</div>
                </div>
              </div>
              <div className="gal-col" data-par="0.08">
                <div className="gal-cell h1">
                  <Img src={IMG[GALLERY[4].img]} alt={GALLERY[4].t} grad={1} />
                  <div className="gal-cap">{GALLERY[4].t}</div>
                </div>
                <div className="gal-cell h3">
                  <Img src={IMG[GALLERY[5].img]} alt={GALLERY[5].t} grad={2} />
                  <div className="gal-cap">{GALLERY[5].t}</div>
                </div>
              </div>
              <div className="gal-col" data-par="-0.04">
                <div className="gal-cell h3">
                  <Img src={IMG[GALLERY[6].img]} alt={GALLERY[6].t} grad={0} />
                  <div className="gal-cap">{GALLERY[6].t}</div>
                </div>
                <div className="gal-cell h1">
                  <Img src={IMG[GALLERY[7].img]} alt={GALLERY[7].t} grad={1} />
                  <div className="gal-cap">{GALLERY[7].t}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── specialist band ───────── */}
        <section className={`section tint-sage ${styles.ourTeamBackground}`}>
          <div className="wrap">
            <Reveal className="spec">
              <Img src={IMG.specialists} alt="Rio specialist team" grad={1} />
              <div className="spec-body">
                <Eyebrow>Our Team</Eyebrow>
                <h2>Specialist-led care for mother &amp; child</h2>
                <p className="sec-note">
                  Experienced paediatricians, neonatologists, intensivists,
                  gynaecologists, fetal medicine specialists, emergency doctors
                  and super-speciality consultants, offering coordinated care
                  for women and children, under one roof.
                </p>
                <span className="spec-chip">
                  ★ 100+ specialists across 4 branches
                </span>
                <div className="mt-28">
                  <a className="btn btn-cta" href="/book-appointment">
                    Speak to Our Care Team ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── branches ───────── */}
        <section className="section" id="branches">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Branches</Eyebrow>
              <h2>4 branches across Tamil Nadu</h2>
              <p className="sec-note">
                Every Rio branch offers 24/7 emergency, NICU and PICU support.
              </p>
            </Reveal>
            <div className="branch-grid">
              {BRANCHES.map((b, i) => (
                <Reveal key={b.name} delay={i * 80}>
                  <div className="branch">
                    <Img
                      src={IMG[b.img]}
                      alt={b.name}
                      grad={i % 3}
                      par="0.04"
                    />
                    <div className="branch-body">
                      <span className="branch-tag">24/7 EMERGENCY</span>
                      <h3>{b.name}</h3>
                      <p>{b.addr}</p>
                      <a className="call" href={`tel:${b.tel}`}>
                        📞 {b.phone}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* testimonials */}
        <section className={`section tint-blush ${styles.reviewsSection}`} id="reviews">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>What Families Say</Eyebrow>
              <h2>Trusted by families across Tamil Nadu</h2>
              <p className="sec-note">
                Rated 4.1★ on JustDial across 1,400+ ratings, with hundreds of
                reviews on Google.
              </p>
            </Reveal>
            <div className="tst-grid">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={(i % 3) * 80} className="tst">
                  <article className="tst-card">
                  <div className="tst-stars">{"★".repeat(t.stars)}</div>
                  <p className="tst-text">"{t.text}"</p>
                  <div className="tst-by">
                    <span className="tst-av">{t.name[0]}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <span className="tst-loc">{t.loc}</span>
                    </div>
                  </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── faq ───────── */}
        <section className={`section tint-sage ${styles.faqSection}`} id="faq">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>FAQ</Eyebrow>
              <h2>Frequently asked questions</h2>
            </Reveal>
            <div className="faq">
              {FAQS.map((f, i) => (
                <Reveal
                  key={f.q}
                  delay={i * 50}
                  className={`faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  >
                    {f.q}
                    <span>{openFaq === i ? "–" : "+"}</span>
                  </button>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── cta ───────── */}
        <section className="section" id="book">
          <div className="wrap">
            <Reveal className="cta-band home-cta">
              <div className="cta-copy">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 className="mt-14">
                  Ready when your family needs us — day or night.
                </h2>
                <p>
                  Book an appointment online, or call our emergency line for
                  immediate guidance.
                </p>
                <div className="cta-actions">
                  <a className="btn btn-pink" href={SITE_LINKS.call}>
                    Call Emergency Care Now
                  </a>
                  <a
                    className="btn btn-green"
                    href={SITE_LINKS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
              <div className="cta-form">
                <h3>Get a call back</h3>
                <p className="note">Our team responds quickly.</p>
                {sent ? (
                  <div className="cta-done">
                    <span>✓</span> Thanks! Our team will call you back shortly.
                  </div>
                ) : (
                  <form className={styles.callbackForm}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <input
                      aria-label="Full name"
                      type="text"
                      placeholder="Full name"
                      required
                    />
                    <select
                      aria-label="Preferred branch"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Preferred branch
                      </option>
                      {BRANCHES.map((b) => (
                        <option key={b.name}>{b.name}</option>
                      ))}
                    </select>
                    <select
                      aria-label="Service needed"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Service needed
                      </option>
                      {APPOINTMENT_SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <input
                      aria-label="Phone number"
                      type="tel"
                      placeholder="Phone number"
                      required
                    />
                    <button
                      className={`btn btn-coral ${styles.fullButton}`}
                      type="submit"
                    >
                      Request a Call Back ↗
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="mbar">
        <a className="btn btn-pink" href={SITE_LINKS.call}>
          Call
        </a>
        <a
          className="btn btn-green"
          href={SITE_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a className="btn btn-teal" href="/book-appointment">
          Book
        </a>
      </div>
    </div>
  );
}
