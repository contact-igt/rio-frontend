"use client";

import { useEffect, useRef, useState } from "react";

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
  "logo": "/assets/shared/logo.png",
  "hero": "/assets/shared/hero1.png",
  "nicu": "/assets/home/advanced-nicu.png",
  "emergency": "/assets/home/pe.png",
  "emergency2": "/assets/home/neonatal.png",
  "maternity": "/assets/home/women.png",
  "newborn": "/assets/home/child-newborn.png",
  "specialists": "/assets/about/specialist.png",
  "vaccine": "/assets/home/vaccine.png",
  "specialists2": "/assets/home/specialist.png",
  "cc1": "/assets/home/nicu-ward.png",
  "cc2": "/assets/home/ot.png",
  "cc3": "/assets/home/picu.png",
  "cc4": "/assets/home/milkbank.png",
  "branch1": "/assets/shared/branch-madurai-main.png",
  "branch2": "/assets/shared/branch-madurai-southwing.png",
  "branch3": "/assets/shared/branch-dindigul.jpg",
  "branch4": "/assets/shared/branch-thanjavur.jpg",
};

const LINKS = {
  call: "tel:+917708318222",
  whatsapp: "https://wa.me/917708318222",
  youtube: "https://youtube.com/@riochildrenshospital",
  instagram: "https://instagram.com/riochildrenhospitals",
};


const PILLARS = [
  { t: "High-Risk Pregnancy Expertise", d: "Specialised monitoring for complex pregnancies, led by experienced fetal medicine and obstetric teams.", icon: "pulse" },
  { t: "Advanced NICU, PICU & Preterm Care", d: "Equipped intensive care for premature babies and critically ill children, monitored around the clock.", icon: "shield" },
  { t: "24/7 Emergency & Mother-Child Support", d: "Round-the-clock emergency response for newborns, children and mothers — because every minute matters.", icon: "clock" },
];
const TESTIMONIALS = [
  // NOTE: sample testimonials reflecting documented review themes — replace with REAL Google / JustDial reviews before go-live.
  { name: "Priya R.", loc: "Madurai", stars: 5, text: "Our premature baby spent three weeks in the NICU and the team was incredible — constant updates, so caring. We're forever grateful to Rio." },
  { name: "Karthik S.", loc: "Dindigul", stars: 5, text: "Painless delivery and wonderful maternity care. The doctors and nurses made my wife feel safe at every step. Spotless, well-run hospital." },
  { name: "Anitha M.", loc: "Thanjavur", stars: 5, text: "We rushed in at 2 AM with our daughter and the emergency team was ready immediately. 24/7 care that genuinely saved us." },
];

const SERVICES = [
  { t: "NICU", d: "Incubators, ventilators, TPN and continuous monitoring for premature and critically ill newborns.", img: "nicu", slug: "nicu" },
  { t: "PICU", d: "Intensive care for severe respiratory distress, dengue, meningitis and critical paediatric illness.", img: "cc3", slug: "picu" },
  { t: "High-Risk Pregnancy Care", d: "Dedicated management for complex pregnancies, from early scans through to a safe delivery.", img: "maternity", slug: "high-risk-pregnancy" },
  { t: "Fetal Medicine", d: "Close monitoring of high-risk pregnancies to spot concerns early and plan safer deliveries.", img: "cc2", slug: "fetal-medicine" },
  { t: "General Paediatrics", d: "24/7 outpatient consultation for every childhood illness, from newborn through to 18 years.", img: "newborn", slug: "general-paediatrics" },
  { t: "Maternity Care", d: "Affordable normal, painless and C-section delivery packages with expert gynaecologist-led antenatal care.", img: "specialists2", slug: "maternity" },
  { t: "Human Milk Bank", d: "Safe, screened, pasteurised donor milk for premature babies who can't be breastfed by their mothers.", img: "cc4", slug: "human-milk-bank" },
  { t: "Paediatric Emergency", d: "Round-the-clock casualty care for childhood accidents, injuries and sudden critical illness.", img: "emergency", slug: "emergency" },
  { t: "Vaccination Services", d: "National immunisation schedule with free SMS reminders and uninterrupted 3-level power backup.", img: "vaccine", slug: "vaccination" },
];
const TRIMESTERS = [
  { k: "First Trimester", w: "Week 0 – 12", d: "A crucial phase — early-pregnancy scans, blood tests and supplements, with free SMS alerts and 3-level power backup for uninterrupted care." },
  { k: "Second Trimester", w: "Week 13 – 28", d: "Monitoring the baby's growth — the anomaly scan, fetal well-being checks and routine antenatal visits, backed by advanced ultrasound." },
  { k: "Third Trimester", w: "Week 29 – 40", d: "Focus on the baby's position, growth and delivery preparation — growth scans, Doppler studies and regular check-ups." },
];
const WHY_EXT = [
  { t: "Patient-Centered Care", d: "Every patient's story is unique, and so is our approach to caring for them." },
  { t: "Compassionate Support", d: "We stand by you with empathy and understanding throughout your journey." },
  { t: "Multidisciplinary Team", d: "Neonatologists, paediatricians, fetal medicine specialists, intensivists and emergency experts, together." },
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
  { q: "How often should my child visit a paediatrician?", a: "Routine check-ups are recommended at key stages of your child's development to ensure they're growing healthy and strong." },
  { q: "What vaccinations does my child need?", a: "Vaccination schedules vary by age. At Rio we provide a clear vaccine chart and timely reminders to keep your child protected." },
  { q: "What signs should I watch for in newborn health?", a: "If your newborn shows signs of jaundice, irregular feeding, or unusual sleep patterns, consult our specialists immediately." },
  { q: "When should I start prenatal care?", a: "Ideally, as soon as you confirm pregnancy. Early monitoring supports a healthy journey for both mother and baby." },
  { q: "What facilities are available for paediatric emergencies?", a: "Rio offers 24/7 paediatric emergency care with NICU support, ensuring immediate attention when your child needs it most." },
];
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
const BRANCHES = [
  { name: "Madurai (Main)", addr: "Tuticorin Ring Road, Masthanpatti Rd, opp Annamalaiar School, Madurai – 625020", phone: "77083 18222", tel: "+917708318222", img: "branch1" },
  { name: "Southwing, Madurai", addr: "41, Madakulam Main Rd, Pasumpon Nagar, Palangantham, Madurai – 625003", phone: "0452-4036444", tel: "+9104524036444", img: "branch2" },
  { name: "Dindigul", addr: "10, Palani Rd, New Agraharam, Govindapuram, Dindigul – 624001", phone: "0451-2424333", tel: "+9104512424333", img: "branch3" },
  { name: "Thanjavur", addr: "21/3082, 1st St, VOC Nagar, Parisutham Nagar, Thanjavur – 613007", phone: "+91 82205 42555", tel: "+918220542555", img: "branch4" },
];

/* ---------- helpers ------------------------------------------------------ */
const GRAD = ["g0", "g1", "g2"];
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

function Img({ src, alt = "", grad = 0, className = "", par }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`img-wrap ${GRAD[grad % GRAD.length]} ${className}`}>
      {!broken && <img src={src} alt={alt} loading="lazy" data-par={par} onError={() => setBroken(true)} />}
      {broken && <svg viewBox="0 0 24 24" className="img-fallback-mark" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.6 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.4 8.7 18 11.8 16.5 16.4 12 21 12 21z" /></svg>}
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}><i className="eyebrow-dot" />{children}</span>;
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
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const dur = 1300, start = performance.now();
      const tick = (t) => { const p = Math.min(1, (t - start) / dur); setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (el) io.observe(el); return () => io.disconnect();
  }, [target]);
  return <span ref={ref} className={light ? "ct-light" : ""}>{target != null ? `${prefix}${n.toLocaleString()}${suffix}` : value}</span>;
}

const ICONS = {
  pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  shield: <path d="M12 3.2 5.5 5.6v4.9c0 4.3 2.8 7.2 6.5 8.8 3.7-1.6 6.5-4.5 6.5-8.8V5.6L12 3.2Z" />,
  clock: <><circle cx="12" cy="12" r="8.3" /><path d="M12 7.5V12l3 1.8" /></>,
};
function Icon({ name }) {
  return <svg viewBox="0 0 24 24" className="pillar-icon" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICONS[name]}</svg>;
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

/* ---------- page --------------------------------------------------------- */
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
          <a className="btn btn-cta" href="/book-appointment" onClick={onClose}>Book an Appointment</a>
          <a className="btn btn-pink" href={LINKS.call} onClick={onClose}>Call Now</a>
          <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer" onClick={onClose}>WhatsApp</a>
        </div>
      </div>
    </div>
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
        const fromCenter = (r.top + r.height / 2) - vh / 2;
        el.style.transform = `translate3d(0, ${(-fromCenter * speed).toFixed(1)}px, 0)`;
      }
      // scroll progress
      const sc = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? sc / max : 0})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="rio">
      <style>{`
/* drifting organic blobs */




        /* scroll progress + emergency strip */


        /* header */



        /* ── PARALLAX HERO ── */
        .hero{position:relative; min-height:96vh; display:flex; align-items:center; overflow:hidden}
        .hero-bg{position:absolute; inset:-12% 0; z-index:0}
        .hero-bg .img-wrap{border-radius:0; width:100%; height:100%}
        .hero-bg img{object-position:70% center}
        .hero-veil{position:absolute; inset:0; z-index:1;
          background:
            linear-gradient(to right,
              rgba(23,27,72,.97) 0%,
              rgba(23,27,72,.92) 30%,
              rgba(23,27,72,.68) 50%,
              rgba(23,27,72,.28) 68%,
              rgba(23,27,72,.08) 82%,
              rgba(23,27,72,0)   100%),
            linear-gradient(to top,
              rgba(23,27,72,.92) 0%,
              rgba(23,27,72,.55) 18%,
              rgba(23,27,72,0)   40%)}
        .hero-inner{position:relative; z-index:3; max-width:1200px; margin:0 auto; padding:0 28px; width:100%}
        @media (max-width:760px){
          .hero{min-height:auto; padding:110px 0 40px; display:block}
          .hero-inner{padding:0 20px;}
        }
        .hero h1{color:#fff; font-size:clamp(34px,8vw,74px); max-width:880px; margin-top:18px}
        .hero h1 .accent{color:#FFA8C4}
        .hero .lede{color:#D7E7E1; font-size:18px; margin-top:22px; max-width:560px}
        .hero-cta{display:flex; gap:13px; flex-wrap:wrap; margin-top:30px}
        @media (max-width:480px){.hero-cta .btn{width:100%; justify-content:center;}}
        .hero-trust{display:flex; align-items:center; gap:14px; margin-top:34px; color:#FFFFFF; font-size:14.5px; font-weight:600; text-shadow:0 1px 14px rgba(0,0,0,.6)}
        .hero-trust strong{color:#fff}
        .hero-badges{display:none; gap:10px; flex-wrap:wrap; margin-top:18px}
        .hero-badges span{font-size:12px; font-weight:700; color:#E8EBF8; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.24); padding:7px 13px; border-radius:999px}
        @media (max-width:760px){.hero-badges{display:flex}}
        .hero-trust .ht-bar{width:2px;height:38px;background:var(--coral); border-radius:2px}
        .scrollcue{position:absolute; bottom:26px; left:50%; transform:translateX(-50%); z-index:3; color:#E3E6F5; font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; display:flex; flex-direction:column; align-items:center; gap:8px}
        .scrollcue .mouse{width:22px;height:34px;border:2px solid rgba(255,255,255,.5); border-radius:12px; position:relative}
        .scrollcue .mouse::after{content:""; position:absolute; top:6px; left:50%; transform:translateX(-50%); width:3px;height:7px;border-radius:2px; background:#fff; animation:wheel 1.6s infinite}
        @keyframes wheel{0%{opacity:0; top:6px}30%{opacity:1}60%{opacity:1; top:15px}100%{opacity:0; top:18px}}
        @media (max-width:760px){.scrollcue{display:none}}
        .hero-glass-wrap{position:absolute; inset:0; max-width:1200px; margin:0 auto; width:100%; pointer-events:none; z-index:3}
        .hero-glass-container{position:absolute; right:28px; bottom:36px; display:flex; flex-direction:column; align-items:flex-end; gap:12px; pointer-events:auto}
        .hero-badges-glass{display:flex; gap:8px}
        .hero-badges-glass span{font-size:11.5px; font-weight:700; color:#fff; background:rgba(35,39,90,.6); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.24); padding:6px 12px; border-radius:999px; text-shadow:0 1px 2px rgba(0,0,0,0.1)}
        .hero-glass{display:flex; gap:0; background:rgba(35,39,90,.55); backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,.32); border-radius:18px; padding:16px 6px}
        .hero-glass div{text-align:center; padding:4px 20px}
        .hero-glass div + div{border-left:1px solid rgba(255,255,255,.22)}
        .hero-glass strong{display:block; font-family:'Proxima Nova','Mulish',sans-serif; font-size:27px; font-weight:800; color:#fff}
        .hero-glass div > span{font-size:11px; font-weight:700; color:#E3E6F5}
        @media (max-width:760px){
          .hero-glass-wrap{position:relative; inset:auto; margin-top:40px; padding:0 20px; z-index:3; pointer-events:auto}
          .hero-glass-container{position:relative; right:auto; bottom:auto; align-items:stretch; gap:12px}
          .hero-badges-glass{display:none}
          .hero-glass{border-radius:12px; justify-content:space-around; background:rgba(35,39,90,.85)}
          .hero-glass div{padding:8px 6px}
        }
        @media (max-width:400px){
          .hero-glass div{padding:6px 2px}
          .hero-glass strong{font-size:22px}
        }

        /* ── PARALLAX FULL-BLEED BAND ── */
        .band{position:relative; min-height:60vh; display:flex; align-items:center; overflow:hidden}
        .band-bg{position:absolute; inset:-18% 0; z-index:0}
        .band-veil{position:absolute; inset:0; z-index:1; background:linear-gradient(90deg, rgba(35,39,90,.95), rgba(35,39,90,.78))}
        .band-inner{position:relative; z-index:2; max-width:1200px; margin:0 auto; padding:64px 28px; width:100%; color:#fff}
        .band-inner h2{color:#fff; font-size:clamp(28px,4vw,46px); max-width:680px}
        .band-inner p{color:#D7E7E1; margin-top:14px; max-width:520px; font-size:16.5px}
        .band-stats{display:flex; flex-wrap:wrap; gap:38px; margin-top:34px}
        .band-stats strong{display:block; font-family:'Proxima Nova','Mulish',sans-serif; font-size:clamp(34px,4vw,50px); font-weight:800; color:#fff; text-shadow:0 2px 16px rgba(0,0,0,.4)}
        .band-stats div > span{font-size:13px; color:#D6D9F0; font-weight:700}
        @media (max-width:480px){
          .band-inner{padding:48px 20px}
          .band-stats{gap:24px; flex-direction:column}
        }


        /* pillars */
        .pillar-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:26px; align-items:stretch}
        @media (max-width:880px){.pillar-grid{grid-template-columns:1fr}}
        .pillar-grid > .reveal{display:flex}

        /* uniform height + base style */
        .pillar{background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:36px 32px;
          display:flex; flex-direction:column; position:relative; overflow:hidden;
          transition:transform .32s cubic-bezier(.2,.7,.2,1), box-shadow .32s cubic-bezier(.2,.7,.2,1), border-color .32s}

        /* gradient top-border slides in on hover */
        .pillar::before{content:""; position:absolute; top:0; left:0; right:0; height:4px;
          background:linear-gradient(90deg, var(--pink), var(--blue));
          transform:scaleX(0); transform-origin:left; transition:transform .38s cubic-bezier(.2,.7,.2,1)}
        .pillar:hover::before{transform:scaleX(1)}

        /* shimmer sweep */
        .pillar::after{content:""; position:absolute; inset:-2px; pointer-events:none;
          background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,.6) 50%, transparent 70%);
          transform:translateX(-130%); transition:transform 600ms cubic-bezier(.2,.7,.2,1)}
        .pillar:hover::after{transform:translateX(130%)}

        .pillar:hover{transform:translateY(-8px); box-shadow:0 28px 52px -20px rgba(48,53,115,.22); border-color:rgba(48,53,115,.16)}

        /* icon */
        .pillar-ic-wrap{width:52px; height:52px; border-radius:16px; background:var(--coral-soft);
          display:flex; align-items:center; justify-content:center; margin-bottom:22px; flex-shrink:0;
          transition:background .28s, transform .28s cubic-bezier(.2,.7,.2,1)}
        .pillar:hover .pillar-ic-wrap{background:var(--pink); transform:scale(1.08) rotate(-4deg)}
        .pillar-icon{width:24px; height:24px; color:var(--coral-deep); transition:color .28s}
        .pillar:hover .pillar-icon{color:#fff}

        /* typography */
        .pillar h3{font-size:18.5px; margin-bottom:10px; transition:color .22s}
        .pillar:hover h3{color:var(--blue)}
        .pillar p{font-size:14.5px; color:var(--muted); flex:1; line-height:1.65}

        /* services */
        .svc-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch}
        @media (max-width:920px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
        @media (max-width:600px){.svc-grid{grid-template-columns:1fr}}

        /* uniform card height */
        .svc{background:#fff; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden;
             display:flex; flex-direction:column; position:relative;
             transition:transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s cubic-bezier(.2,.7,.2,1), border-color .3s}

        /* shimmer sweep */
        .svc::before{content:""; position:absolute; inset:-2px; z-index:1; pointer-events:none;
          background:linear-gradient(110deg, transparent 0 35%, rgba(255,255,255,.55) 50%, transparent 65% 100%);
          transform:translateX(-130%); transition:transform 600ms cubic-bezier(.2,.7,.2,1)}
        .svc:hover::before{transform:translateX(130%)}

        /* accent bar slides in from left */
        .svc::after{content:""; position:absolute; left:0; top:0; width:4px; height:100%; z-index:2;
          background:linear-gradient(180deg, var(--pink), var(--blue));
          transform:scaleY(0); transform-origin:top; transition:transform .35s cubic-bezier(.2,.7,.2,1)}
        .svc:hover::after{transform:scaleY(1)}

        .svc:hover{transform:translateY(-8px); box-shadow:0 32px 56px -24px rgba(48,53,115,.28); border-color:rgba(48,53,115,.18)}

        /* image area — fixed ratio, covers uniformly */
        .svc .img-wrap{aspect-ratio:16/10; flex-shrink:0; border-radius:0; overflow:hidden}
        .svc .img-wrap img{width:100%; height:100%; object-fit:cover; transition:transform .55s cubic-bezier(.2,.7,.2,1)}
        .svc:hover .img-wrap img{transform:scale(1.07)}

        /* body grows to fill remaining space so all cards align at bottom */
        .svc-body{padding:22px 24px 24px; flex:1; display:flex; flex-direction:column}
        .svc-body h3{font-size:17px; margin-bottom:8px; transition:color .2s}
        .svc:hover .svc-body h3{color:var(--blue)}
        .svc-body p{font-size:14px; flex:1}
        .svc-more{display:inline-flex; align-items:center; gap:4px; margin-top:16px; font-size:13px; font-weight:800;
          color:var(--coral-deep); transition:gap .2s}
        .svc:hover .svc-more{gap:8px}
        /* Reveal wrappers inside the grid must stretch so all cards fill row height */
        .svc-grid > .reveal{display:flex}

        /* split */
        .split-list{margin-top:22px; display:grid; grid-template-columns:1fr 1fr; gap:12px 22px}
        @media (max-width:480px){.split-list{grid-template-columns:1fr}}
        .split-list li{display:flex; gap:9px; font-size:14.5px; color:var(--ink); font-weight:600}
        .split-list li i{color:var(--coral-deep); font-style:normal; font-weight:800}


        /* trimester */
        .tri-rail{display:grid; grid-template-columns:repeat(3,1fr); gap:26px; position:relative; align-items:stretch}
        .tri-rail::before{content:""; position:absolute; top:42px; left:8%; right:8%; height:2px;
          background:repeating-linear-gradient(90deg,var(--coral) 0 9px, transparent 9px 18px); pointer-events:none}
        @media (max-width:820px){.tri-rail{grid-template-columns:1fr} .tri-rail::before{display:none}}
        .tri-rail > .reveal{display:flex}

        .tri{position:relative; background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:32px 28px;
          display:flex; flex-direction:column; overflow:hidden; flex:1;
          transition:transform .32s cubic-bezier(.2,.7,.2,1), box-shadow .32s cubic-bezier(.2,.7,.2,1), border-color .32s}

        .tri::before{content:""; position:absolute; left:0; top:0; width:4px; height:100%;
          background:linear-gradient(180deg, var(--coral), var(--pink));
          transform:scaleY(0); transform-origin:top; transition:transform .38s cubic-bezier(.2,.7,.2,1)}
        .tri:hover::before{transform:scaleY(1)}

        .tri::after{content:""; position:absolute; inset:-2px; pointer-events:none;
          background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
          transform:translateX(-130%); transition:transform 560ms cubic-bezier(.2,.7,.2,1)}
        .tri:hover::after{transform:translateX(130%)}

        .tri:hover{transform:translateY(-8px); box-shadow:0 28px 52px -18px rgba(232,78,134,.22); border-color:rgba(232,78,134,.22)}

        .tri-num{width:38px; height:38px; border-radius:50%; background:var(--coral); color:#fff;
          display:flex; align-items:center; justify-content:center; font-weight:800; font-size:15px;
          margin-bottom:18px; flex-shrink:0; box-shadow:0 8px 18px -8px rgba(232,78,134,.7);
          transition:transform .32s cubic-bezier(.2,.7,.2,1), box-shadow .32s cubic-bezier(.2,.7,.2,1)}
        .tri:hover .tri-num{transform:scale(1.15); box-shadow:0 14px 28px -8px rgba(232,78,134,.75)}

        .tri h3{font-size:18px; transition:color .22s}
        .tri:hover h3{color:var(--blue)}
        .tri .wk{display:block; font-size:12px; font-weight:800; color:var(--coral-deep); margin:5px 0 14px; transition:color .22s}
        .tri:hover .wk{color:var(--pink)}
        .tri p{font-size:14px; flex:1; line-height:1.65}

        /* why teal */
        .why{background:var(--teal); color:#fff}
        .why h2{color:#fff} .why .why-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:28px}
        @media (max-width:880px){.why .why-grid{grid-template-columns:1fr}}
        .why-card h3{color:#fff; font-size:18px; margin-bottom:9px}
        .why-card p{color:#C7E2DA; font-size:14.5px}
        .why-rule{width:36px;height:3px;background:var(--coral); border-radius:2px; margin-bottom:16px}

        /* ── HUMAN MILK BANK (dedicated) ── */
        .mbank{background:linear-gradient(180deg,var(--teal-soft), #fff)}
        .mbank-grid{display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center}
        @media (max-width:880px){.mbank-grid{grid-template-columns:1fr; gap:38px}}
        .mbank-media{position:relative}
        .mbank-media .frame{aspect-ratio:4/3.4; box-shadow:var(--shadow); border-radius:26px}
        .mbank-media .frame img{height:120%; top:-10%; position:relative}
        .mbank-badge{position:absolute; left:18px; top:18px; z-index:3; background:var(--green); color:#fff; font-weight:800; font-size:12px; letter-spacing:.04em; padding:8px 14px; border-radius:999px; box-shadow:0 12px 24px -10px rgba(123,169,58,.6)}
        .mbank h2{font-size:clamp(28px,3.8vw,42px); margin-top:14px}
        .mbank-stats{display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-top:26px}
        @media (max-width:480px){.mbank-stats{grid-template-columns:1fr}}
        .mbank-stat{background:#fff; border:1px solid var(--line); border-radius:16px; padding:18px 20px}
        .mbank-stat strong{display:block; font-family:'Proxima Nova','Mulish',sans-serif; font-size:27px; color:var(--teal)}
        .mbank-stat span{font-size:12.5px; color:var(--muted); font-weight:600}
        .mbank-help{margin-top:56px; display:flex; flex-direction:column; gap:14px}
        .mbank-help li{display:flex; gap:11px; font-size:14.5px; color:var(--ink); font-weight:600; align-items:flex-start}
        .mbank-help li i{color:var(--coral-deep); font-style:normal; font-weight:800; line-height:1.5}
        .mbank-cta{display:flex; gap:12px; flex-wrap:wrap; margin-top:42px}

        /* ── SIGNATURE: staggered multi-speed gallery ── */
        .gal{display:grid; grid-template-columns:repeat(4,1fr); gap:20px; align-items:start}
        @media (max-width:880px){.gal{grid-template-columns:repeat(2,1fr)}}
        .gal-col{display:flex; flex-direction:column; gap:20px}
        .gal-cell{position:relative; border-radius:var(--radius); overflow:hidden; box-shadow:0 12px 30px rgba(48,53,115,.1); transition:transform .45s cubic-bezier(.25,1,.5,1), box-shadow .45s cubic-bezier(.25,1,.5,1)}
        .gal-cell::after{content:""; position:absolute; inset:0; background:linear-gradient(110deg, transparent 40%, rgba(255,255,255,.3) 50%, transparent 60%); transform:translateX(-100%); transition:none; z-index:3; pointer-events:none}
        .gal-cell:hover{transform:translateY(-6px); box-shadow:0 22px 48px rgba(48,53,115,.22)}
        .gal-cell:hover::after{transform:translateX(100%); transition:transform .85s ease-in-out}
        .gal-cell .img-wrap{width:100%; height:100%; border-radius:0}
        .gal-cell img{width:100%; height:100%; object-fit:cover; transition:transform .7s cubic-bezier(.25,1,.5,1)}
        .gal-cell:hover img{transform:scale(1.06) rotate(0.5deg)}
        .gal-cell.h1{aspect-ratio:3/4} .gal-cell.h2{aspect-ratio:4/3} .gal-cell.h3{aspect-ratio:1/1}
        .gal-cap{position:absolute; left:0; right:0; bottom:0; padding:36px 20px 20px; background:linear-gradient(transparent, rgba(35,39,90,.9)); color:#fff; font-weight:700; font-size:15px; font-family:'Proxima Nova','Mulish',sans-serif; z-index:2; transition:transform .45s cubic-bezier(.25,1,.5,1)}
        .gal-cell:hover .gal-cap{transform:translateY(-4px)}

        @media (max-width:920px){}
        @media (max-width:560px){}

        /* testimonials */
        .tst-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:26px; align-items:stretch; margin-top:34px}
        @media (max-width:880px){.tst-grid{grid-template-columns:1fr}}
        .tst-grid > .reveal{display:flex}
        
        .tst{background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:36px 32px;
          display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden; flex:1;
          transition:transform .32s cubic-bezier(.2,.7,.2,1), box-shadow .32s cubic-bezier(.2,.7,.2,1), border-color .32s}
          
        /* gradient bottom-border slides in on hover */
        .tst::before{content:""; position:absolute; bottom:0; left:0; right:0; height:4px;
          background:linear-gradient(90deg, var(--coral), var(--pink));
          transform:scaleX(0); transform-origin:left; transition:transform .38s cubic-bezier(.2,.7,.2,1)}
        .tst:hover::before{transform:scaleX(1)}
        
        /* shimmer sweep */
        .tst::after{content:""; position:absolute; inset:-2px; pointer-events:none;
          background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
          transform:translateX(-130%); transition:transform 600ms cubic-bezier(.2,.7,.2,1)}
        .tst:hover::after{transform:translateX(130%)}
        
        .tst:hover{transform:translateY(-8px); box-shadow:0 28px 52px -20px rgba(48,53,115,.18); border-color:rgba(48,53,115,.12)}
        
        .tst-stars{color:#FFD700; font-size:18px; margin-bottom:18px; letter-spacing:2px; transition:transform .3s ease}
        .tst:hover .tst-stars{transform:scale(1.05)}
        
        .tst-text{font-size:15px; line-height:1.65; color:var(--ink); font-style:italic; flex:1; margin-bottom:24px}
        
        .tst-by{display:flex; align-items:center; gap:14px; border-top:1px solid var(--line); padding-top:20px; flex-shrink:0}
        
        .tst-av{width:42px; height:42px; border-radius:50%; background:var(--coral-soft); color:var(--coral-deep);
          display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px;
          transition:background .28s, color .28s, transform .28s}
        .tst:hover .tst-av{background:var(--coral); color:#fff; transform:scale(1.1)}
        
        .tst-by strong{display:block; font-size:15px; color:var(--ink); font-weight:700}
        .tst-loc{display:block; font-size:12.5px; color:var(--muted); font-weight:600; margin-top:2px}

        /* faq */
        .faq{max-width:780px}
        .faq-item{border-bottom:1px solid var(--line)}
        .faq-q{width:100%; display:flex; justify-content:space-between; align-items:center; gap:16px; background:none; border:none; padding:22px 2px; font-family:inherit; font-size:16.5px; font-weight:700; color:var(--ink); text-align:left; cursor:pointer}
        .faq-q span{flex-shrink:0; width:26px;height:26px;border-radius:50%; background:var(--coral-soft); display:flex; align-items:center; justify-content:center; font-size:16px; color:var(--coral-deep); font-weight:700}
        .faq-a{max-height:0; overflow:hidden; transition:max-height .35s ease}
        .faq-a p{padding:0 2px 22px; font-size:15px}
        .faq-item.open .faq-a{max-height:260px}

        /* cta */

        .cta-copy{padding:56px; color:#fff}
        .cta-copy h2{color:#fff; font-size:clamp(26px,3.4vw,38px); max-width:420px}
        .cta-copy p{color:#D6D9F0; margin-top:12px; max-width:400px}

        .cta-form{background:rgba(255,255,255,.06); border-left:1px solid rgba(255,255,255,.12); padding:48px}
        .cta-form h3{color:#fff; font-size:18px; margin-bottom:6px}
        .cta-form p.note{color:#D6D9F0; font-size:13px; margin-bottom:18px}
        .cta-form select,.cta-form input{width:100%; padding:13px 14px; margin-bottom:11px; border-radius:11px; border:none; font-size:14px; font-family:inherit; background:#fff; color:var(--ink)}
        .cta-done{display:flex; align-items:center; gap:10px; color:#fff; font-weight:700; font-size:15px; background:rgba(255,255,255,.1); padding:16px; border-radius:12px}

        @media (max-width:860px){
          .rio .cta-band{padding:32px 20px !important; gap:24px;}
          .cta-copy{padding:0 0 8px 0 !important;}
          .cta-form{
            padding:32px 20px !important;
            margin:0 -20px -32px !important;
            border-left:none !important;
            border-top:1px solid rgba(255,255,255,.12) !important;
            border-radius:0 0 28px 28px !important;
          }
        }
        @media (max-width:480px){
          .rio .cta-actions{flex-direction:column; width:100%;}
          .rio .cta-actions .btn{width:100%; justify-content:center;}
        }
 .scrollcue .mouse::after{animation:none} }
      `}</style>

      <div className="progress" ref={progressRef} />

      <div className="topstrip">24/7 Emergency • NICU • PICU — <a href={LINKS.call}>Call now: +91 77083 18222</a></div>

      <header className={`header ${navSolid ? "nav-solid" : ""}`}>
        <Logo />
        <nav className="nav-links">
          <a href="/about">About</a><NavTreatments /><a href="/doctors">Doctors</a><a href="#facilities">Facilities</a><a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="top">
        {/* ───────── PARALLAX HERO ───────── */}
        <section className="hero">
          <div className="hero-bg"><Img src={IMG.hero} alt="Mother holding her newborn at Rio Children's Hospital" grad={0} par="0.18" /></div>
          <div className="hero-veil" />
          <span className="blob blob-coral" style={{ width: 320, height: 320, top: "8%", right: "12%" }} data-par="0.32" />
          <span className="blob blob-teal" style={{ width: 260, height: 260, bottom: "12%", left: "6%" }} data-par="0.22" />
          <div className="hero-inner">
            <Reveal>
              <Eyebrow>12 Years of Trusted Care</Eyebrow>
              <h1>Best hospital for <span className="accent">women &amp; children</span> in Tamil Nadu.</h1>
              <p className="lede">Home to the only Level 3 NICU in South Tamil Nadu — with high-risk pregnancy care, fetal medicine, PICU, maternity and a full range of paediatric super-specialities, across 4 branches.</p>
              <div className="hero-cta">
                <a className="btn btn-coral" href="/book-appointment">Book an Appointment</a>
                <a className="btn btn-line" href={LINKS.call}>Call Emergency Care</a>
              </div>
              <div className="hero-badges"><span>NABH Entry-Level Certified</span><span>Only Level 3 NICU in South TN</span></div>
            </Reveal>
          </div>
          <div className="hero-glass-wrap">
            <div className="hero-glass-container">
              <div className="hero-badges-glass">
                <span>NABH Entry-Level Certified</span>
                <span>Only Level 3 NICU in South TN</span>
              </div>
              <div className="hero-glass">
                <div><strong><Counter value="6 Lacs+" /></strong><span>Patients</span></div>
                <div><strong><Counter value="100+" /></strong><span>Specialists</span></div>
                <div><strong><Counter value="4" /></strong><span>Branches</span></div>
              </div>
            </div>
          </div>
          <div className="scrollcue"><span className="mouse" />Scroll</div>
        </section>

        {/* ───────── 3 pillars ───────── */}
        <section className="section">
          <span className="blob blob-coral" style={{ width: 280, height: 280, top: "-4%", left: "-6%" }} data-par="0.12" />
          <div className="wrap">
            <Reveal className="sec-head center"><Eyebrow>Why Choose Rio</Eyebrow><h2>Three reasons families trust us</h2></Reveal>
            <div className="pillar-grid">
              {PILLARS.map((p, i) => (
                <Reveal key={p.t} delay={i * 100}>
                  <div className="pillar"><div className="pillar-ic-wrap"><Icon name={p.icon} /></div><h3>{p.t}</h3><p className="mt-14">{p.d}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PARALLAX BAND: emergency + stats ───────── */}
        <section className="band">
          <div className="band-bg"><Img src={IMG.emergency} alt="24/7 paediatric emergency at Rio" grad={1} par="0.16" /></div>
          <div className="band-veil" />
          <div className="band-inner">
            <Reveal>
              <Eyebrow light>Around the clock</Eyebrow>
              <h2 className="mt-14">When every minute matters, we're already ready.</h2>
              <p>24/7 paediatric emergency, advanced NICU &amp; PICU, neonatal transport and round-the-clock specialists — across all four branches.</p>
              <div className="hero-trust" style={{ marginTop: 28 }}><span className="ht-bar" /><p>Trusted by <strong>1 Lac+ families</strong> across Tamil Nadu for women &amp; child healthcare.</p></div>
            </Reveal>
          </div>
        </section>

        {/* ───────── services ───────── */}
        <section className="section tint-sage" id="services">
          <span className="blob blob-teal" style={{ width: 300, height: 300, top: "10%", right: "-8%" }} data-par="0.1" />
          <div className="wrap">
            <Reveal className="sec-head"><Eyebrow>Our Treatments</Eyebrow><h2>Specialised care, all under one roof</h2><p className="sec-note">From high-risk pregnancy through every stage of childhood — the core services families turn to Rio for, every day.</p></Reveal>
            <div className="svc-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.t} delay={i * 60}>
                  <a className="svc" href={s.slug ? `/services/${s.slug}` : "/services"}><Img src={IMG[s.img]} alt={s.t} grad={i % 3} /><div className="svc-body"><h3>{s.t}</h3><p>{s.d}</p><span className="svc-more">{s.slug ? "Learn more →" : "View treatments →"}</span></div></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── caring split ───────── */}
        <section className="section">
          <div className="wrap split">
            <Reveal>
              <Eyebrow>Child Health</Eyebrow>
              <h2>Caring for your child, at every stage</h2>
              <p className="sec-note">More than a paediatric hospital — your trusted partners in your child's health journey. From newborn care to adolescent health, our specialists provide expert, compassionate care in a child-friendly environment.</p>
              <ul className="split-list">
                <li><i>✓</i> Newborn to 18-year care</li><li><i>✓</i> 24/7 outpatient consultation</li>
                <li><i>✓</i> Fever, asthma & infections</li><li><i>✓</i> Vaccination & growth tracking</li>
                <li><i>✓</i> Child-friendly environment</li><li><i>✓</i> Developmental & specialist care</li>
              </ul>
              <a className="btn btn-coral mt-28" href="/book-appointment">Book a Paediatric Consultation ↗</a>
            </Reveal>
            <Reveal delay={120} className="rev"><Img src={IMG.newborn} alt="Paediatric care at Rio" grad={1} className="frame" par="0.06" /></Reveal>
          </div>
        </section>

        {/* ───────── pregnancy journey ───────── */}
        <section className="section tint-blush" id="pregnancy">
          <span className="blob blob-coral" style={{ width: 260, height: 260, bottom: "0%", left: "-6%" }} data-par="0.1" />
          <div className="wrap">
            <Reveal className="sec-head center"><Eyebrow>Pregnancy Journey</Eyebrow><h2>Care that follows every trimester</h2><p className="sec-note">From the first scan to delivery day, Rio's antenatal programme is built around what each stage of pregnancy needs most.</p></Reveal>
            <div className="tri-rail">
              {TRIMESTERS.map((t, i) => (
                <Reveal key={t.k} delay={i * 120}><div className="tri"><div className="tri-num">{i + 1}</div><h3>{t.k}</h3><span className="wk">{t.w}</span><p>{t.d}</p></div></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── HUMAN MILK BANK (dedicated div) ───────── */}
        <section className="section mbank" id="milkbank">
          <span className="blob blob-teal" style={{ width: 280, height: 280, top: "6%", right: "-7%" }} data-par="0.1" />
          <div className="wrap mbank-grid">
            <Reveal className="mbank-media">
              <span className="mbank-badge">★ A Rio differentiator</span>
              <Img src={IMG.cc4} alt="Rio's Human Milk Bank — screened, pasteurised donor milk" grad={1} className="frame" par="0.05" />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>Human Milk Bank</Eyebrow>
              <h2>South Tamil Nadu's life-saving Human Milk Bank</h2>
              <p className="sec-note">
                Our state-of-the-art Human Milk Bank operates every single day, providing safe, screened
                and pasteurised donor human milk for premature and critically ill newborns who cannot be
                breastfed by their own mothers. Stringent quality-control protocols, sterile storage and
                24/7 power backup ensure the highest safety and nutritional standards — with personalised
                guidance and counselling for both donor mothers and recipients.
              </p>
              <div className="mbank-stats">
                <div className="mbank-stat"><strong>300 L+</strong><span>Donor milk collected</span></div>
                <div className="mbank-stat"><strong>100%</strong><span>Screened &amp; pasteurised</span></div>
                <div className="mbank-stat"><strong>365 days</strong><span>Operational, every day</span></div>
                <div className="mbank-stat"><strong>24/7</strong><span>Power-backed cold chain</span></div>
              </div>
              <ul className="mbank-help">
                <li><i>♥</i> For premature &amp; preterm babies who need early nutrition</li>
                <li><i>♥</i> For critically ill newborns under NICU care</li>
                <li><i>♥</i> For mothers temporarily unable to breastfeed their baby</li>
              </ul>
              <div className="mbank-cta">
                <a className="btn btn-coral" href={LINKS.whatsapp} target="_blank" rel="noreferrer">Become a Milk Donor ↗</a>
                <a className="btn btn-line" href="/book-appointment">Talk to a Lactation Specialist</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── why (teal) ───────── */}
        <section className="section why" id="why">
          <div className="wrap">
            <Reveal className="sec-head center"><Eyebrow light>Our Approach</Eyebrow><h2>What it feels like to be cared for at Rio</h2></Reveal>
            <div className="why-grid">
              {WHY_EXT.map((w, i) => (<Reveal key={w.t} delay={i * 90}><div className="why-card"><div className="why-rule" /><h3>{w.t}</h3><p>{w.d}</p></div></Reveal>))}
            </div>
          </div>
        </section>

        {/* ───────── SIGNATURE: staggered parallax gallery ───────── */}
        <section className="section" id="facilities">
          <div className="wrap">
            <Reveal className="sec-head"><Eyebrow>Infrastructure</Eyebrow><h2>Built for emergencies, around mother &amp; child</h2><p className="sec-note">Advanced NICU &amp; PICU wards, modular theatres, 24-hour lab and imaging — all designed for faster, coordinated care.</p></Reveal>
            <div className="gal">
              <div className="gal-col" data-par="0.06">
                <div className="gal-cell h1"><Img src={IMG[GALLERY[0].img]} alt={GALLERY[0].t} grad={0} /><div className="gal-cap">{GALLERY[0].t}</div></div>
                <div className="gal-cell h2"><Img src={IMG[GALLERY[1].img]} alt={GALLERY[1].t} grad={1} /><div className="gal-cap">{GALLERY[1].t}</div></div>
              </div>
              <div className="gal-col" data-par="-0.05">
                <div className="gal-cell h2"><Img src={IMG[GALLERY[2].img]} alt={GALLERY[2].t} grad={2} /><div className="gal-cap">{GALLERY[2].t}</div></div>
                <div className="gal-cell h1"><Img src={IMG[GALLERY[3].img]} alt={GALLERY[3].t} grad={0} /><div className="gal-cap">{GALLERY[3].t}</div></div>
              </div>
              <div className="gal-col" data-par="0.08">
                <div className="gal-cell h1"><Img src={IMG[GALLERY[4].img]} alt={GALLERY[4].t} grad={1} /><div className="gal-cap">{GALLERY[4].t}</div></div>
                <div className="gal-cell h3"><Img src={IMG[GALLERY[5].img]} alt={GALLERY[5].t} grad={2} /><div className="gal-cap">{GALLERY[5].t}</div></div>
              </div>
              <div className="gal-col" data-par="-0.04">
                <div className="gal-cell h3"><Img src={IMG[GALLERY[6].img]} alt={GALLERY[6].t} grad={0} /><div className="gal-cap">{GALLERY[6].t}</div></div>
                <div className="gal-cell h1"><Img src={IMG[GALLERY[7].img]} alt={GALLERY[7].t} grad={1} /><div className="gal-cap">{GALLERY[7].t}</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── specialist band ───────── */}
        <section className="section tint-sage">
          <div className="wrap">
            <Reveal className="spec">
              <Img src={IMG.specialists} alt="Rio specialist team" grad={1} />
              <div className="spec-body">
                <Eyebrow>Our Team</Eyebrow>
                <h2>Specialist-led care for mother &amp; child</h2>
                <p className="sec-note">Experienced paediatricians, neonatologists, intensivists, gynaecologists, fetal medicine specialists, emergency doctors and super-speciality consultants — coordinated care for women and children, under one roof.</p>
                <span className="spec-chip">★ 100+ specialists across 4 branches</span>
                <div className="mt-28"><a className="btn btn-cta" href="/book-appointment">Speak to Our Care Team ↗</a></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── branches ───────── */}
        <section className="section" id="branches">
          <div className="wrap">
            <Reveal className="sec-head center"><Eyebrow>Our Branches</Eyebrow><h2>4 branches across Tamil Nadu</h2><p className="sec-note">Every Rio branch offers 24/7 emergency, NICU and PICU support.</p></Reveal>
            <div className="branch-grid">
              {BRANCHES.map((b, i) => (
                <Reveal key={b.name} delay={i * 80}>
                  <div className="branch"><Img src={IMG[b.img]} alt={b.name} grad={i % 3} par="0.04" /><div className="branch-body"><span className="branch-tag">24/7 EMERGENCY</span><h3>{b.name}</h3><p>{b.addr}</p><a className="call" href={`tel:${b.tel}`}>📞 {b.phone}</a></div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* testimonials */}
        <section className="section tint-blush" id="reviews">
          <div className="wrap">
            <Reveal className="sec-head center"><Eyebrow>What Families Say</Eyebrow><h2>Trusted by families across Tamil Nadu</h2><p className="sec-note">Rated 4.1★ on JustDial across 1,400+ ratings, with hundreds of reviews on Google.</p></Reveal>
            <div className="tst-grid">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={(i % 3) * 80} className="tst">
                  <div className="tst-stars">{"★".repeat(t.stars)}</div>
                  <p className="tst-text">"{t.text}"</p>
                  <div className="tst-by"><span className="tst-av">{t.name[0]}</span><div><strong>{t.name}</strong><span className="tst-loc">{t.loc}</span></div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── faq ───────── */}
        <section className="section tint-blush" id="faq">
          <div className="wrap">
            <Reveal className="sec-head"><Eyebrow>FAQ</Eyebrow><h2>Frequently asked questions</h2></Reveal>
            <div className="faq">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 50} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q}<span>{openFaq === i ? "–" : "+"}</span></button>
                  <div className="faq-a"><p>{f.a}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── cta ───────── */}
        <section className="section" id="book">
          <div className="wrap">
            <Reveal className="cta-band">
              <div className="cta-copy">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 className="mt-14">Ready when your family needs us — day or night.</h2>
                <p>Book an appointment online, or call our emergency line for immediate guidance.</p>
                <div className="cta-actions"><a className="btn btn-pink" href={LINKS.call}>Call Emergency Care Now</a><a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a></div>
              </div>
              <div className="cta-form">
                <h3>Get a call back</h3><p className="note">Our team responds quickly.</p>
                {sent ? (<div className="cta-done"><span>✓</span> Thanks! Our team will call you back shortly.</div>) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <select aria-label="Preferred branch" required defaultValue=""><option value="" disabled>Preferred branch</option>{BRANCHES.map((b) => <option key={b.name}>{b.name}</option>)}</select>
                    <select aria-label="Service needed" required defaultValue=""><option value="" disabled>Service needed</option>{APPT_SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
                    <input aria-label="Phone number" type="tel" placeholder="Phone number" required />
                    <button className="btn btn-coral" type="submit" style={{ width: "100%", justifyContent: "center" }}>Request a Call Back ↗</button>
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
            <p style={{ color: "#9FC4BB", maxWidth: 270, fontSize: 14 }}>Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.</p>
            <p className="values">TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE</p>
          </div>
          <div><h4>Treatments</h4><ul>{APPT_SERVICES.slice(0, 6).map((s) => <li key={s}>{s}</li>)}</ul></div>
          <div><h4>Branches</h4><ul>{BRANCHES.map((b) => <li key={b.name}>{b.name}</li>)}</ul></div>
          <div><h4>Contact</h4><ul>
            <li><a href={LINKS.call}>📞 +91 77083 18222</a></li><li><a href="mailto:info@riohospital.com">✉ info@riohospital.com</a></li>
            <li><a href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li><li><a href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li><li><a href={LINKS.youtube} target="_blank" rel="noreferrer">YouTube</a></li>
          </ul></div>
        </div>
        <div className="wrap footer-bottom"><span>© 2026 Rio Children's Hospital</span><span>Built by Invictus Global Tech</span></div>
      </footer>

      <div className="mbar">
        <a className="btn btn-pink" href={LINKS.call}>Call</a>
        <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-teal" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}
