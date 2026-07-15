"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES, SITE_LINKS } from "@/data/site";
/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — ABOUT US PAGE

   Same design language as the home page: Rio brand palette (Deep Blue #303573,
   Pink #FD70A1, Green #7BA93A, Warm Brown CTAs), 'Proxima Nova'/'Montserrat',
   Rio's live CDN photography, parallax-lite
   depth + scroll reveals (reduced-motion safe).

   Content from the "02 — ABOUT US" + "04 — Departments" + "08 — Events"
   sections of the IGT migration doc, plus the 13 Jun 2026 review-call notes.

   Drop-in component → export default RioAboutPage
   (Next.js: add "use client" at the very top of the file.)
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  logo: "/assets/shared/riologov2.png",
  hero: "/assets/about/abouthero.png",
  newborn: "/assets/about/child-newborn.png",
  maternity: "/assets/about/women.png",
  specialists: "/assets/about/specialist.png",
  specialists2: "/assets/about/women.png",
  cc1: "/assets/about/advanced-nicu.png",
  cc2: "/assets/about/ot.png",
  emergency: "/assets/about/pe.png",
  branch1: "/assets/shared/branch-madurai-main.png",
  branch2: "/assets/shared/branch-madurai-southwing.png",
  branch3: "/assets/shared/branch-dindigul.jpg",
  branch4: "/assets/shared/branch-thanjavur.jpg",
};

/* ---------- content ------------------------------------------------------ */
const STATS = [
  { n: "6 Lakh+", l: "Patients cared for" },
  { n: "100+", l: "Expert specialists" },
  { n: "1 Lac+", l: "Families helped" },
  { n: "5,000+", l: "High-risk pregnancies" },
];
const MISSION_PTS = [
  "Ensuring Safe Motherhood",
  "Protecting Childhood Health",
  "Building Trust",
  "Fostering Innovation",
];
const VALUES = [
  {
    t: "Trust",
    d: "Earned over 12 years through honest, transparent and dependable care.",
    icon: "shield",
  },
  {
    t: "Care",
    d: "Compassion at the centre of every consultation, every shift, every branch.",
    icon: "heart",
  },
  {
    t: "Innovation",
    d: "Advanced NICU, PICU, fetal medicine and a Human Milk Bank under one roof.",
    icon: "spark",
  },
  {
    t: "Compassion",
    d: "Standing beside families with empathy through their most anxious moments.",
    icon: "hands",
  },
  {
    t: "Excellence",
    d: "Global-class standards held consistently across mother and child care.",
    icon: "star",
  },
];
const MILESTONES = [
  {
    y: "2013",
    t: "Rio is founded in Madurai",
    d: "Begins as a dedicated women & children's hospital, built around safer motherhood and newborn care.",
  },
  {
    y: "2023",
    t: "10th anniversary, Dindigul branch & Human Milk Bank",
    d: "A decade of care marked by the opening of the Dindigul branch and the launch of the Human Milk Bank.",
  },
  {
    y: "2024",
    t: "11th anniversary",
    d: "Continued growth across specialities, with multidisciplinary super-speciality care expanding.",
  },
  {
    y: "2025",
    t: "12th anniversary, South Wing & Thanjavur",
    d: "South Wing inaugurated in Madurai, followed by the addition of the Thanjavur branch expanding Rio to four branches across Tamil Nadu."
  }
];
const TRUST_THEMES = [
  "Cleanliness & sterilised equipment",
  "Supportive & caring staff",
  "Advanced NICU & PICU facilities",
  "24/7 availability",
  "Global-class standards",
  "Highly Rated by Patients",
];
const DEPARTMENTS = [
  "Neonatal Intensive Care (NICU)",
  "Paediatric Intensive Care (PICU)",
  "Obstetrics & Gynaecology",
  "Fetal Medicine",
  "Paediatric Cardiology",
  "Paediatric Neurology",
  "Paediatric Neuro Surgery",
  "Paediatric Urology",
  "Paediatric Orthopaedics",
  "Paediatric Nephrology",
  "Gastroenterology & Hepatology",
  "Hemato Oncology",
  "Paediatric ENT",
  "Paediatric Dental",
  "Endocrinology",
  "Asthma & Allergy",
  "Dermatology",
  "Pulmonology",
  "Rheumatology",
  "Metabolic & Genetic Medicine",
  "Developmental Paediatrics",
  "Speech & Occupational Therapy",
];
const APPROACH = [
  {
    t: "Patient-Centered Care",
    d: "Every patient's story is unique, and so is our approach to caring for them.",
  },
  {
    t: "Compassionate Support",
    d: "We stand by you with empathy and understanding throughout your journey.",
  },
  {
    t: "Multidisciplinary Team",
    d: "Neonatologists, paediatricians, fetal medicine specialists, intensivists and emergency experts, together.",
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
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
  shield: (
    <path d="M12 3.2 5.5 5.6v4.9c0 4.3 2.8 7.2 6.5 8.8 3.7-1.6 6.5-4.5 6.5-8.8V5.6L12 3.2Z" />
  ),
  heart: (
    <path d="M12 20 4.4 12.7a4.5 4.5 0 0 1 6.4-6.3l1.2 1.2 1.2-1.2a4.5 4.5 0 0 1 6.4 6.3z" />
  ),
  spark: (
    <path d="M12 3v5m0 8v5M4 12h5m6 0h5M6.5 6.5l3 3m5 5 3 3m0-11-3 3m-5 5-3 3" />
  ),
  hands: (
    <>
      <path d="M3.5 13a8.5 8.5 0 0 1 17 0" />
      <path d="M12 10.6 10.9 9.5a2.3 2.3 0 0 0-3.3 3.2L12 17l4.4-4.3a2.3 2.3 0 0 0-3.3-3.2z" />
    </>
  ),
  star: (
    <path d="M12 3.3l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.5 6.8 19.2l1.2-5.8-4.4-4 5.9-.7z" />
  ),
};
function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="val-icon"
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

export default function AboutPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

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
      const sc = window.scrollY,
        max = document.documentElement.scrollHeight - vh;
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
    <div className="rio about-page">
      <style>{`
.nav-links a.active{position:relative}


        .nav-cta
        /* about hero — editorial */
        .ahero{padding:54px 0 10px; position:relative}
        .ahero-grid{display:grid; grid-template-columns:1.05fr .95fr; gap:58px; align-items:center}
        @media (max-width:940px){.ahero-grid{grid-template-columns:1fr; gap:40px}}
        .ahero h1{font-size:clamp(38px,5.4vw,62px); margin-top:18px}
        .ahero h1 .accent{color:var(--coral)}
        .ahero .lede{font-size:18px; margin-top:20px; max-width:540px}
        .ahero-cta{display:flex; gap:12px; flex-wrap:wrap; margin-top:28px}
        .ahero-media{position:relative}
        .ahero-media .frame{aspect-ratio:4/4.4; border-radius:30px; box-shadow:var(--shadow)}
        .ahero-media .frame img{height:118%; top:-9%; position:relative}
        .seal {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: var(--blue);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(48, 53, 115, 0.25);
          z-index: 5;
          border: 2.5px solid #fff;
        }
        .seal strong { font-family: 'Proxima Nova', 'Mulish', sans-serif; font-size: 26px; line-height: 1; font-weight: 800; }
        .seal span { font-size: 9px; font-weight: 800; letter-spacing: .12em; margin-top: 2px; }

        /* breadcrumb */



        /* story split */

        @media (max-width:880px){}



        .split p + p{margin-top:14px}
         @media (max-width:880px){}

        /* stat band */
        .about-page .statband{background:var(--teal); color:#fff; padding:20px 0; width:100%; margin:46px 0; border-radius:0; box-shadow:none}
        .about-page .statband > .wrap{display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:12px 18px}
        .about-page .statband > .wrap > div{text-align:center; flex:1; min-width:180px; padding:4px 18px; border-right:1px solid rgba(255,255,255,.14); transition:transform .3s ease}
        .about-page .statband > .wrap > div:hover{transform:scale(1.05)}
        .about-page .statband > .wrap > div:last-child{border-right:none}
        .about-page .statband strong{display:inline-block; font-family:'Proxima Nova','Mulish',sans-serif; font-weight:800; font-size:24px; color:#fff; line-height:1; vertical-align:middle}
        .about-page .statband div > span{font-size:13.5px; color:#D6D9F0; font-weight:600; margin-left:8px; display:inline-block; vertical-align:middle}

        @media (max-width:768px){
          .about-page .statband{margin:36px 0; padding:16px 0}
          .about-page .statband > .wrap > div{border-right:none; border-bottom:1px solid rgba(255,255,255,.1); padding-bottom:12px; margin-bottom:12px}
          .about-page .statband > .wrap > div:last-child{border-bottom:none; padding-bottom:0; margin-bottom:0}
          .about-page .statband strong{display:block}
          .about-page .statband div > span{display:block; margin-left:0; margin-top:2px}
        }

        /* mission / vision */
        .mv-grid{display:grid; grid-template-columns:1fr 1fr; gap:24px}
        @media (max-width:820px){.mv-grid{grid-template-columns:1fr}}
        .mv{border-radius:26px; padding:40px; border:1px solid var(--line)}
        .mv-mission{background:#fff}
        .mv-vision{background:var(--teal); color:#fff}
        .mv-vision h3,.mv-vision  .mv-vision  .mv-vision
        .mv-vision p{color:#C7E2DA}
        .mv h3{font-size:24px; margin:12px 0 12px; font-family:'Proxima Nova','Mulish',sans-serif; font-weight:400}
        .mv-pts{display:flex; flex-wrap:wrap; gap:9px; margin-top:18px}
        .mv-pt{font-size:12.5px; font-weight:700; background:var(--coral-soft); color:var(--coral-deep); padding:8px 13px; border-radius:999px}

        /* values */
        .val-grid{display:grid; grid-template-columns:repeat(5,1fr); gap:18px; align-items:stretch}
        @media (max-width:980px){.val-grid{grid-template-columns:repeat(3,1fr)}}
        @media (max-width:620px){.val-grid{grid-template-columns:repeat(2,1fr)}}
        .val-grid > .reveal{display:flex}

        .val{background:#fff; border:1px solid var(--line); border-radius:18px; padding:28px 24px;
          display:flex; flex-direction:column; position:relative; overflow:hidden; flex:1;
          transition:transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s cubic-bezier(.2,.7,.2,1), border-color .3s}

        /* gradient top-border */
        .val::before{content:""; position:absolute; top:0; left:0; right:0; height:3.5px;
          background:linear-gradient(90deg, var(--coral), var(--blue));
          transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(.2,.7,.2,1)}
        .val:hover::before{transform:scaleX(1)}

        /* shimmer sweep */
        .val::after{content:""; position:absolute; inset:-2px; pointer-events:none;
          background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
          transform:translateX(-130%); transition:transform 560ms cubic-bezier(.2,.7,.2,1)}
        .val:hover::after{transform:translateX(130%)}

        .val:hover{transform:translateY(-6px); box-shadow:0 22px 44px -18px rgba(48,53,115,.2); border-color:rgba(48,53,115,.14)}

        /* icon */
        .val-ic-wrap{width:48px; height:48px; border-radius:14px; background:var(--coral-soft);
          display:flex; align-items:center; justify-content:center; margin-bottom:20px; flex-shrink:0;
          transition:background .28s, transform .28s cubic-bezier(.2,.7,.2,1)}
        .val:hover .val-ic-wrap{background:var(--pink); transform:scale(1.08) rotate(-3deg)}
        .val-icon{width:22px; height:22px; color:var(--coral-deep); transition:color .28s}
        .val:hover .val-icon{color:#fff}

        /* text */
        .val h3{font-size:16.5px; margin-bottom:8px; transition:color .22s}
        .val:hover h3{color:var(--blue)}
        .val p{font-size:13.5px; line-height:1.55; color:var(--muted); flex:1}

        /* timeline */
        .tl{position:relative; max-width:820px; margin:0 auto; padding-left:34px}
        .tl::before{content:""; position:absolute; left:8px; top:6px; bottom:6px; width:2px; background:linear-gradient(var(--coral), var(--teal))}
        .tl-item{position:relative; padding:0 0 38px 8px;
          transition:opacity .7s cubic-bezier(.2, .7,.2,1), transform .7s cubic-bezier(.2, .7,.2,1)}
        .tl-item:hover{transform:translateX(6px); transition:transform .3s ease}
        .tl-item:last-child{padding-bottom:0}
        
        /* dot pops in when section triggers (.in) */
        .tl-dot{position:absolute; left:-34px; top:2px; width:18px; height:18px; border-radius:50%; background:#fff; border:3px solid var(--coral); box-shadow:0 0 0 5px var(--coral-soft);
          transform:scale(0); transition:transform .55s cubic-bezier(.34, 1.56, .64, 1) .22s, background .25s, box-shadow .25s}
        .reveal.in .tl-dot{transform:scale(1)}
        .tl-item:hover .tl-dot{background:var(--coral); box-shadow:0 0 0 8px var(--coral-soft)}
        
        .tl-y{font-family:'Proxima Nova','Mulish',sans-serif; font-size:22px; color:var(--teal); line-height:1; transition:color .22s}
        .tl-item:hover .tl-y{color:var(--pink)}
        .tl-item h3{font-size:17.5px; margin:6px 0 6px; transition:color .22s}
        .tl-item:hover h3{color:var(--blue)}
        .tl-item p{font-size:14px; line-height:1.6}

        /* trust themes */
        .themes{display:flex; flex-wrap:wrap; gap:12px}
        .theme{display:inline-flex; align-items:center; gap:9px; background:#fff; border:1px solid var(--line); border-radius:999px; padding:11px 18px; font-size:14px; font-weight:600; color:var(--ink)}
        .theme i{color:var(--coral-deep); font-style:normal; font-weight:800}

        /* departments */
        .dept-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:12px}
        @media (max-width:820px){.dept-grid{grid-template-columns:repeat(2,1fr)}}
        @media (max-width:520px){.dept-grid{grid-template-columns:1fr}}
        .dept{background:#fff; border:1px solid var(--line); border-radius:13px; padding:15px 18px; font-size:14px; font-weight:600; color:var(--ink);
          display:flex; align-items:center; gap:10px; cursor:default;
          transition:transform .28s cubic-bezier(.2,.7,.2,1), box-shadow .28s cubic-bezier(.2,.7,.2,1), border-color .28s, color .28s}
        .dept:hover{transform:translateY(-3px); box-shadow:0 0 16px rgba(253,112,161,.36), 0 12px 24px -12px rgba(48,53,115,.16); border-color:var(--pink); color:var(--blue)}
        .dept i{width:7px; height:7px; border-radius:50%; background:var(--coral); flex-shrink:0; transition:transform .28s cubic-bezier(.2,.7,.2,1), background-color .28s}
        .dept:hover i{transform:scale(1.3); background-color:var(--pink-deep)}

        /* approach */
        .ap-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px}
        @media (max-width:880px){.ap-grid{grid-template-columns:1fr}}
        .ap{padding:6px}
        .ap-rule{width:36px;height:3px;background:var(--coral); border-radius:2px; margin-bottom:16px}
        .ap h3{font-size:18px; margin-bottom:9px}

        /* specialist band */

        @media (max-width:820px){}


        @media (max-width:820px){}



        /* branches */

        @media (max-width:920px){}
        @media (max-width:560px){}








        /* cta */




 }
      `}</style>

      <div className="progress" ref={progressRef} />
      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${navSolid ? "nav-solid" : ""}`}>
        <Logo />
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about" className="active">About</a>
          <NavManagement />
          
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a
            className="btn btn-line btn-sm"
            href={SITE_LINKS.youtube}
            target="_blank"
            rel="noreferrer"
          >
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

      <main>
        {/* hero */}
        <section className="ahero">
          <span
            className="blob blob-coral"
            style={{ width: 300, height: 300, top: "0%", left: "-8%" }}
            data-par="0.12"
          />
          <div className="wrap ahero-grid">
            <Reveal>
              <Eyebrow>About Rio</Eyebrow>
              <h1>
                12 Years of Trusted Care for Tamil Nadu’s Mothers &amp;{" "}
                <span className="accent">Children</span>.
              </h1>
              <p className="lede">
                Rio provides comprehensive women and child healthcare with
                expertise in high-risk pregnancy care, fetal medicine, NICU,
                PICU, preterm baby care, paediatric emergency care and
                child-development services, all under one roof.
              </p>
              <div className="ahero-cta">
                <a className="btn btn-coral" href="/book-appointment">
                  Book an Appointment
                </a>
                <a className="btn btn-line" href="/#branches">
                  Find a Branch
                </a>
              </div>
            </Reveal>
            <Reveal delay={120} className="ahero-media">
              <div className="seal">
                <strong>12</strong>
                <span>YEARS</span>
              </div>
              <Img
                src={IMG.hero}
                alt="Rio Children's Hospital — women & child care"
                grad={0}
                className="frame"
                par="0.05"
              />
            </Reveal>
          </div>
        </section>

        {/* story */}
        <section className="section">
          <div className="wrap split">
            <Reveal>
              <Img
                src={IMG.newborn}
                alt="Care at Rio"
                grad={1}
                className="frame"
                par="0.05"
              />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>Who We Are</Eyebrow>
              <h2>One trusted home for women &amp; child healthcare</h2>
              <p className="sec-note">
                For over a decade, Rio has cared for mothers, newborns, and
                children across Tamil Nadu, combining advanced maternity
                services, high-risk pregnancy management, fetal medicine, NICU,
                PICU, preterm baby care, and 24/7 paediatric emergency support.
              </p>
              <p>
                Today, with 100+ specialists across four branches in Madurai,
                Dindigul, and Thanjavur, our multidisciplinary teams including
                neonatologists, paediatricians, fetal medicine specialists,
                intensivists, and emergency experts work together to deliver
                compassionate, evidence-based care that families trust across
                generations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* stats */}
        <section className="statband">
          <div className="wrap">
            {STATS.map((s) => (
              <div key={s.l}>
                <strong>
                  <Counter value={s.n} light />
                </strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* mission / vision */}
        <section className="section">
          <span
            className="blob blob-teal"
            style={{ width: 280, height: 280, bottom: "0%", right: "-8%" }}
            data-par="0.1"
          />
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Purpose</Eyebrow>
              <h2>Mission &amp; Vision</h2>
            </Reveal>
            <div className="mv-grid">
              <Reveal className="mv mv-mission">
                <Eyebrow>Mission</Eyebrow>
                <h3>
                  World-Class, Affordable Healthcare for Women &amp; Children
                </h3>
                <p>
                  To deliver world-class, affordable healthcare for women and
                  children by combining medical expertise, advanced facilities
                  and a human-centered approach.
                </p>
                <div className="mv-pts">
                  {MISSION_PTS.map((p) => (
                    <span key={p} className="mv-pt">
                      {p}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={120} className="mv mv-vision">
                <Eyebrow>Vision</Eyebrow>
                <h3>
                  The Most Trusted Destination for Women &amp; Child Healthcare
                </h3>
                <p>
                  To become the most trusted and comprehensive healthcare
                  destination for women and children by delivering
                  compassionate, innovative, world-class medical services under
                  one roof.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* values */}
        <section className="section tint-sage">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>What We Stand For</Eyebrow>
              <h2>Our values</h2>
            </Reveal>
            <div className="val-grid">
              {VALUES.map((v, i) => (
                <Reveal key={v.t} delay={i * 70}>
                  <div className="val">
                    <div className="val-ic-wrap">
                      <Icon name={v.icon} />
                    </div>
                    <h3>{v.t}</h3>
                    <p>{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* timeline */}
        <section className="section">
          <span
            className="blob blob-coral"
            style={{ width: 260, height: 260, top: "8%", left: "-6%" }}
            data-par="0.1"
          />
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Journey</Eyebrow>
              <h2>12 years of growth</h2>
            </Reveal>
            <div className="tl">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.y} delay={100} className="tl-item">
                  <span className="tl-dot" />
                  <div className="tl-y">{m.y}</div>
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* trust themes */}
        <section className="section tint-blush">
          <div className="wrap split">
            <Reveal>
              <Eyebrow>Why Families Choose Rio</Eyebrow>
              <h2>What patients value most</h2>
              <p className="sec-note">
                Consistent feedback from the families we care for highlights the qualities that bring them back and inspire them to recommend Rio to others.
              </p>
              <div className="themes" style={{ marginTop: 22 }}>
                {TRUST_THEMES.map((t) => (
                  <span key={t} className="theme">
                    <i>✓</i>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="rev">
              <Img
                src={IMG.maternity}
                alt="Families at Rio"
                grad={2}
                className="frame"
                par="0.05"
              />
            </Reveal>
          </div>
        </section>

        {/* approach */}
        <section className="section">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Approach</Eyebrow>
              <h2>What it feels like to be cared for at Rio</h2>
            </Reveal>
            <div className="ap-grid">
              {APPROACH.map((a, i) => (
                <Reveal key={a.t} delay={i * 90}>
                  <div className="ap">
                    <div className="ap-rule" />
                    <h3>{a.t}</h3>
                    <p>{a.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* departments */}
        <section className="section tint-sage">
          <div className="wrap">
            <Reveal className="sec-head">
              <Eyebrow>Departments</Eyebrow>
              <h2>Super-speciality care, organised clearly</h2>
              <p className="sec-note">
                From neonatal intensive care to genetic medicine. Find the right department, doctor and branch for your need.
              </p>
            </Reveal>
            <div className="dept-grid">
              {DEPARTMENTS.map((d, i) => (
                <Reveal key={d} delay={(i % 3) * 50}>
                  <div className="dept">
                    <i />
                    {d}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* specialist band */}
        <section className="section">
          <div className="wrap">
            <Reveal className="spec">
              <Img src={IMG.specialists} alt="Rio specialist team" grad={1} />
              <div className="spec-body">
                <Eyebrow>Our Team</Eyebrow>
                <h2>Specialist-led, multidisciplinary care</h2>
                <p className="sec-note">
                  Experienced paediatricians, neonatologists, intensivists, gynaecologists, fetal medicine specialists, emergency physicians, and super-speciality consultants working together to provide coordinated care for women and children under one roof.
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

        {/* branches */}
        <section className="section tint-blush">
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

        {/* cta */}
        <section className="section">
          <div className="wrap">
            <Reveal className="cta-band">
              <div>
                <h2>Ready when your family needs us — day or night.</h2>
                <p>
                  Book an appointment online, or call our emergency line for
                  immediate guidance.
                </p>
              </div>
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
            </Reveal>
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
              Advanced women and child healthcare across Tamil Nadu combining
              medical expertise, modern facilities, and compassionate care.
            </p>
            <p className="values-line">
              TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/about/chairman">Founder &amp; Chairman</a>
              </li>
              <li>
                <a href="/about/management">Management Team</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Branches</h4>
            <ul>
              {BRANCHES.map((b) => (
                <li key={b.name}>{b.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={SITE_LINKS.call}>📞 +91 77083 18222</a>
              </li>
              <li>
                <a href="mailto:info@riohospital.com">✉ info@riohospital.com</a>
              </li>
              <li>
                <a href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SITE_LINKS.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Rio Children's Hospital</span>
          <span>Built by Invictus Global Tech</span>
        </div>
      </footer>

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
