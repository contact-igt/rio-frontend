"use client";

import { useEffect, useRef, useState } from "react";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RIO CHILDREN'S HOSPITAL â€” Paediatric Super-Speciality Page
   All 8 sections from content brief implemented here.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const IMG = {
  logo: "/assets/shared/riologov2.png",
  hero: "/assets/about/specialist.png",
  overview: "/assets/nicu/expert-specialists2.png",
  opd: "/assets/about/specialist.png",
  team: "/assets/nicu/expert-specialists2.png",
  diagnostics: "/assets/nicu/scan.png",
  nicu: "/assets/nicu/advanced-nicu.png",
  picu: "/assets/nicu/picu.png",
};

const LINKS = {
  call: "tel:+917708318222",
  whatsapp: "https://wa.me/917708318222",
  instagram: "https://instagram.com/riochildrenhospitals",
};

const APPT_SERVICES = [
  "Paediatric Super Specialities",
  "High-Risk Pregnancy Care",
  "Fetal Medicine",
  "NICU",
  "PICU",
  "Paediatric Emergency Care",
  "General Paediatrics",
  "Vaccination Services",
  "Human Milk Bank",
  "Maternity Care",
];

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

const COVERS = [
  "Paediatric Cardiology",
  "Paediatric Neurology",
  "Paediatric Neurosurgery",
  "Paediatric Nephrology",
  "Paediatric Urology",
  "Paediatric Gastroenterology & Hepatology",
  "Paediatric Endocrinology",
  "Paediatric Hemato-Oncology",
  "Paediatric Orthopaedics",
  "Paediatric Pulmonology",
  "Paediatric Rheumatology",
  "Paediatric Dermatology",
  "Paediatric ENT",
  "Paediatric Dentistry",
  "Developmental Paediatrics",
  "Metabolic & Genetic Medicine",
  "Speech & Occupational Therapy",
  "Asthma & Allergy Care",
];

const WHAT_YOU_GET = [
  {
    icon: "specialists",
    title: "Multiple super-specialities",
    desc: "Access specialists across major childhood medical, developmental and surgical conditions in one hospital.",
  },
  {
    icon: "diagnosis",
    title: "Coordinated diagnosis",
    desc: "Paediatricians, super-specialists and diagnostic teams work together to understand complex or overlapping symptoms.",
  },
  {
    icon: "child",
    title: "Child-focused treatment",
    desc: "Every care plan is designed around your child's age, medical needs, development and emotional comfort.",
  },
  {
    icon: "nicu",
    title: "NICU & PICU support",
    desc: "Advanced neonatal and paediatric intensive care is available when a child requires closer monitoring or critical support.",
  },
  {
    icon: "scan",
    title: "Advanced diagnostics",
    desc: "Laboratory services, imaging, ultrasound and specialist investigations support timely and informed treatment decisions.",
  },
  {
    icon: "followup",
    title: "Long-term follow-up",
    desc: "Families receive continued guidance for chronic conditions, developmental concerns, rehabilitation and ongoing care.",
  },
];

const SPECIALITIES = [
  {
    title: "Paediatric Cardiology",
    desc: "Evaluation and treatment for congenital heart conditions, murmurs, rhythm concerns and other heart-related problems in children.",
    icon: "heart",
    img: "/assets/specialities/heart.png",
  },
  {
    title: "Paediatric Neurology & Neurosurgery",
    desc: "Specialist care for seizures, developmental concerns, headaches, movement disorders and conditions affecting the brain, spine and nervous system.",
    icon: "brain",
    img: "/assets/specialities/brain.png",
  },
  {
    title: "Paediatric Nephrology",
    desc: "Diagnosis and management of kidney disorders, urinary abnormalities, recurrent infections, hypertension and related childhood conditions.",
    icon: "kidney",
    img: "/assets/specialities/kidneys.png",
  },
  {
    title: "Paediatric Urology",
    desc: "Care for urinary tract conditions, congenital abnormalities, bladder concerns and paediatric surgical urology needs.",
    icon: "urology",
    img: "/assets/specialities/bladder.png",
  },
  {
    title: "Gastroenterology & Hepatology",
    desc: "Specialist evaluation for persistent stomach pain, digestive disorders, feeding problems, liver conditions and bowel-related concerns.",
    icon: "gastro",
    img: "/assets/specialities/stomach.png",
  },
  {
    title: "Paediatric Endocrinology",
    desc: "Care for growth concerns, thyroid disorders, childhood diabetes, hormonal conditions and early or delayed puberty.",
    icon: "endo",
    img: "/assets/specialities/thyroid.png",
  },
  {
    title: "Paediatric Hemato-Oncology",
    desc: "Evaluation and care for blood disorders, anaemia, bleeding conditions and childhood cancers through specialist-led treatment.",
    icon: "blood",
    img: "/assets/specialities/cells.png",
  },
  {
    title: "Paediatric Orthopaedics",
    desc: "Assessment and treatment for bone, joint, limb, posture, gait and musculoskeletal concerns in growing children.",
    icon: "ortho",
    img: "/assets/specialities/bones.png",
  },
  {
    title: "Pulmonology, Asthma & Allergy",
    desc: "Specialist support for recurring breathing difficulties, asthma, allergies, chronic cough and other respiratory conditions.",
    icon: "lung",
    img: "/assets/specialities/lungs.png",
  },
  {
    title: "Developmental Paediatrics",
    desc: "Evaluation and guidance for developmental delays, behavioural concerns, learning difficulties, autism-related concerns and milestone monitoring.",
    icon: "dev",
    img: "/assets/specialities/blocks.png",
  },
  {
    title: "Metabolic & Genetic Medicine",
    desc: "Specialist assessment, genetic counselling and continued care for inherited, metabolic and rare childhood disorders.",
    icon: "genetic",
    img: "/assets/specialities/dna.png",
  },
  {
    title: "Speech & Occupational Therapy",
    desc: "Therapy support for speech, communication, sensory, feeding, motor and daily-functioning difficulties.",
    icon: "therapy",
    img: "/assets/specialities/speech.png",
  },
];

const GALLERY = [
  { img: "opd", cap: "Paediatric Super-Speciality OPD" },
  { img: "team", cap: "Multidisciplinary Specialist Team" },
  { img: "diagnostics", cap: "Advanced Diagnostics & Imaging" },
  { img: "nicu", cap: "NICU & PICU Support" },
];

const FAQS = [
  {
    q: "When should my child see a paediatric super-specialist?",
    a: "A referral may be recommended when symptoms persist, frequently return, involve a particular organ system or require advanced diagnosis and treatment beyond routine paediatric care.",
  },
  {
    q: "Do I need a referral from a general paediatrician?",
    a: "Parents may book directly, although an initial paediatric assessment can help identify the most appropriate specialist for the child's condition.",
  },
  {
    q: "Can my child consult more than one specialist at Rio?",
    a: "Yes. When a condition affects more than one area, Rio's paediatricians and super-specialists can coordinate consultations and develop a combined care plan.",
  },
  {
    q: "Is intensive-care support available if my child needs it?",
    a: "Yes. Rio has NICU and PICU support for newborns and children who require advanced monitoring, emergency stabilisation or intensive care.",
  },
  {
    q: "Are developmental and therapy services included?",
    a: "Yes. Developmental paediatrics, speech therapy and occupational therapy are available for children who need developmental, communication, sensory or functional support.",
  },
];

/* â”€â”€â”€ Helper components â”€â”€â”€ */

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = as;
  return (
    <T ref={ref} className={`reveal ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </T>
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

function Logo({ footer = false }) {
  const [broken, setBroken] = useState(false);
  return (
    <a className="logo" href="/" aria-label="Rio Children's Hospital â€” Home">
      {!broken ? (
        <img className="logo-img" src={IMG.logo} alt="Rio Children's Hospital" onError={() => setBroken(true)} />
      ) : (
        <span className={`logo-word ${footer ? "on-dark" : ""}`}>Rio<em>HOSPITAL</em></span>
      )}
    </a>
  );
}

function NavTreatments() {
  return (
    <div className="nav-dd">
      <a href="/treatments" className="nav-dd-trigger">Treatments <span className="cv">▼</span></a>
      <div className="nav-dd-menu">
        {NAV_TREATMENTS.map((t) => <a key={t.slug} href={`/services/${t.slug}`}>{t.name}</a>)}
        <a className="nav-dd-all" href="/treatments">View all treatments &rarr;</a>
      </div>
    </div>
  );
}

function Img({ src, alt = "", grad = 0, className = "" }) {
  const [b, setB] = useState(false);
  const G = ["g0", "g1", "g2"];
  return (
    <div className={`img-wrap ${G[grad % 3]} ${className}`}>
      {!b ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setB(true)} />
      ) : (
        <svg viewBox="0 0 24 24" className="fb" aria-hidden="true">
          <path d="M12 21s-7.5-4.6-10-9.2C.6 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.4 8.7 18 11.8 16.5 16.4 12 21 12 21z" />
        </svg>
      )}
    </div>
  );
}

function Counter({ value }) {
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
      if (!e.isIntersecting) return;
      io.disconnect();
      const dur = 1300, s = performance.now();
      const t = (x) => {
        const p = Math.min(1, (x - s) / dur);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(t);
      };
      requestAnimationFrame(t);
    }, { threshold: 0.4 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{target != null ? `${prefix}${n.toLocaleString()}${suffix}` : value}</span>;
}

const ICONS = {
  specialists: (<><circle cx="9" cy="9" r="2.6" /><circle cx="16.3" cy="9.4" r="2" /><path d="M3.8 18.8a5.2 5.2 0 0 1 10.4 0" /><path d="M14.6 18.8a4.4 4.4 0 0 1 5.6-4.3" /></>),
  diagnosis: (<path d="M3 12h3.4l1.9-6 3.4 12 2.2-7.4 1.3 1.4H21" />),
  child: (<><circle cx="12" cy="7" r="3" /><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" /></>),
  nicu: (<path d="M12 3.2 5.5 5.6v4.9c0 4.3 2.8 7.2 6.5 8.8 3.7-1.6 6.5-4.5 6.5-8.8V5.6L12 3.2Z" />),
  scan: (<path d="M3 12h3.4l1.9-6 3.4 12 2.2-7.4 1.3 1.4H21" />),
  followup: (<path d="M12 20 4.4 12.7a4.5 4.5 0 0 1 6.4-6.3l1.2 1.2 1.2-1.2a4.5 4.5 0 0 1 6.4 6.3z" />),
  heart: (<path d="M12 20 4.4 12.7a4.5 4.5 0 0 1 6.4-6.3l1.2 1.2 1.2-1.2a4.5 4.5 0 0 1 6.4 6.3z" />),
  brain: (<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.3A5 5 0 0 0 3 9.5v.5A5 5 0 0 0 8 15h1v2H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2h-2v-2h1a5 5 0 0 0 5-5v-.5A5 5 0 0 0 17 4.8v-.3A2.5 2.5 0 0 0 14.5 2" />),
  kidney: (<path d="M9 3C6 3 4 5.5 4 8c0 4 3 6 5 8 1 1 1 3 3 3s2-2 3-3c2-2 5-4 5-8 0-2.5-2-5-5-5-1.5 0-2.8.8-3.5 2A3.8 3.8 0 0 0 9 3z" />),
  urology: (<><path d="M12 2v8" /><path d="M5 10a7 7 0 0 0 14 0" /></>),
  gastro: (<path d="M12 2c-4 0-7 3-7 7 0 3 2 5.5 5 6.5v1.5a2 2 0 0 0 4 0V15.5C17 14.5 19 12 19 9c0-4-3-7-7-7z" />),
  endo: (<><path d="M12 3v18" /><path d="M8 7c2-2 6-2 8 0" /><path d="M8 17c2 2 6 2 8 0" /><circle cx="12" cy="12" r="2" /></>),
  blood: (<path d="M12 2 5.8 10a8 8 0 1 0 12.4 0L12 2z" />),
  ortho: (<><path d="M8 22V12L12 2l4 10v10" /><path d="M8 15h8" /></>),
  lung: (<><path d="M12 4v8" /><path d="M5 12c0 3.9 1.8 7 4 8.5V20a2 2 0 0 0 2-2v-2" /><path d="M19 12c0 3.9-1.8 7-4 8.5V20a2 2 0 0 1-2-2v-2" /><path d="M5 10c0-2.8 1.8-5 4-5h6c2.2 0 4 2.2 4 5" /></>),
  dev: (<><circle cx="12" cy="7" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></>),
  genetic: (<><path d="M10 3c0 4.5 4 5.5 4 10s-4 5.5-4 10" /><path d="M14 3c0 4.5-4 5.5-4 10s4 5.5 4 10" /><path d="M8 8h8" /><path d="M8 16h8" /></>),
  therapy: (<><circle cx="9" cy="9" r="2.6" /><path d="M3.8 18.8a5.2 5.2 0 0 1 10.4 0" /><path d="M16 11l2 2 4-4" /></>),
};

function SIcon({ name, size = 22, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {ICONS[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

export default function PaediatricSuperSpecialitiesPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const o = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", o, { passive: true });
    return () => window.removeEventListener("scroll", o);
  }, []);

  return (
    <div className="rio">
      <style>{`
        .spec-section {
          background: linear-gradient(135deg, #fff2f6 0%, #f2f5ff 50%, #fffbfd 100%);
          position: relative;
          z-index: 1;
        }
        .spec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .spec-grid .reveal {
          display: flex;
          height: 100%;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .spec-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .spec-grid { grid-template-columns: 1fr; }
        }
        .spec-card {
          background: #ffffff;
          border: 1px solid #f0f0f4;
          border-radius: 24px;
          display: flex;
          gap: 20px;
          text-align: left;
          box-shadow: 0 10px 30px rgba(0,0,0,0.015), 0 2px 4px rgba(48, 53, 115, 0.005);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          width: 100%;
          height: 100%;
          padding: 24px;
        }
        .spec-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(253, 112, 161, 0.1), 0 4px 10px rgba(48, 53, 115, 0.02);
          border-color: rgba(253, 112, 161, 0.2);
        }
        .spec-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 92px;
        }
        .spec-illustration {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .spec-circle {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff3f7 0%, #ffd4e3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 6px rgba(253, 112, 161, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: visible;
        }
        .illust-img {
          width: 82%;
          height: 82%;
          object-fit: contain;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: bottom center;
        }
        .spec-card:hover .spec-circle {
          background: radial-gradient(circle, #ffd4e3 0%, #ffb6d0 100%);
          transform: scale(1.04);
        }
        .spec-card:hover .illust-img {
          transform: scale(1.12) rotate(3deg);
          filter: drop-shadow(0 6px 12px rgba(253, 112, 161, 0.15));
        }
        .spec-right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .spec-right h3 {
          font-size: 16px;
          font-weight: 700;
          color: #6a0b37;
          margin: 0 0 6px;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .spec-card:hover .spec-right h3 {
          color: #c2185b;
        }
        .spec-divider {
          width: 24px;
          height: 3px;
          background: #fd70a1;
          border-radius: 2px;
          margin-bottom: 12px;
        }
        .spec-right p {
          font-size: 13px;
          color: #555c82;
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }
        .gal-note { display: none; }
      `}</style>

      {/* Top strip */}
      <div className="topstrip">
        24/7 Emergency &bull; NICU &bull; PICU |{" "}
        <a href={LINKS.call}>Call now: +91 77083 18222</a>
      </div>

      {/* Header */}
      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
          <a href="/paediatric-super-specialities" className="active">Paediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>

        {/* 1. HERO */}
        <section className="shero">
          <div className="shero-bg">
            <Img src={IMG.hero} alt="Paediatric multidisciplinary specialist team at Rio" grad={0} />
          </div>
          <div className="shero-veil" />
          <div className="shero-in">
            <Reveal>
              <Eyebrow light>Advanced Paediatric Super Speciality Care, all under one roof</Eyebrow>
              <h1>Advanced specialist care for every complex childhood condition</h1>
              <p className="lede">
                When your child needs care beyond a routine paediatric consultation, Rio brings together experienced
                paediatric super-specialists across multiple disciplines. From heart, brain, kidney and digestive
                conditions to developmental, hormonal, genetic and surgical concerns, children receive coordinated
                specialist care with NICU, PICU, diagnostics and emergency support available under one roof.
              </p>
              <div className="shero-cta">
                <a className="btn btn-cta" href="/book-appointment">Book an Appointment</a>
                <a className="btn btn-pink" href={LINKS.call}>Call Emergency Care</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. OVERVIEW */}
        <section className="section">
          <div className="wrap split">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <h2 style={{ marginTop: 12 }}>Specialised answers for complex childhood conditions</h2>
              <p className="sec-note">
                Some childhood health concerns require more than general paediatric care. Persistent symptoms,
                developmental delays, organ-related conditions, recurring illness or an unusual diagnosis may require
                assessment by a paediatric doctor with advanced training in a specific speciality.
              </p>
              <p className="sec-note" style={{ marginTop: 14 }}>
                At Rio, paediatricians and super-specialists work together to understand the complete condition and
                guide families through diagnosis, treatment and follow-up. Children can access coordinated
                consultations, advanced investigations, critical-care support and long-term management without
                having to move between multiple hospitals.
              </p>
              <h4 style={{ marginTop: 24, fontSize: 13, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--pink-deep)", fontWeight: 700 }}>
                This care covers
              </h4>
              <div className="covers">
                {COVERS.map((c) => (
                  <span key={c} className="cov"><i />{c}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Img src={IMG.overview} alt="Paediatric specialist consulting a child and parent" grad={1} className="frame" />
            </Reveal>
          </div>
        </section>

        {/* 3. WHAT YOU GET AT RIO */}
        <section className="section tint-blue">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>What You Get at Rio</Eyebrow>
              <h2>Many paediatric specialists, working as one team</h2>
            </Reveal>
            <div className="feat-grid">
              {WHAT_YOU_GET.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <div className="feat">
                    <div className="feat-ic"><SIcon name={f.icon} /></div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SPECIALITY DEPARTMENTS */}
        <section className="section spec-section">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Specialities</Eyebrow>
              <h2>Specialist care for every system of your child&apos;s body</h2>
            </Reveal>
            <div className="spec-grid">
              {SPECIALITIES.map((sp, i) => (
                <Reveal key={sp.title} delay={(i % 3) * 50}>
                  <div className="spec-card">
                    <div className="spec-left">
                      <div className="spec-illustration">
                        <div className="spec-circle">
                          <img src={sp.img} alt={sp.title} className="illust-img" />
                        </div>
                      </div>
                    </div>
                    <div className="spec-right">
                      <h3>{sp.title}</h3>
                      <div className="spec-divider" />
                      <p>{sp.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. INFRASTRUCTURE */}
        <section className="section tint-blue">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Infrastructure</Eyebrow>
              <h2>Built for coordinated paediatric specialist care</h2>
              <p className="sec-note">
                Specialist consultations, diagnostics, intensive care and rehabilitation support&mdash;connected within one hospital.
              </p>
            </Reveal>
            <div className="gal-grid">
              {GALLERY.map((g, i) => (
                <Reveal key={i} delay={(i % 4) * 70} className="gal-item">
                  <Img src={IMG[g.img]} alt={g.cap} grad={i % 3} />
                  <span className="gal-cap">{g.cap}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. STAT + CTA */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="statband">
              <div>
                <strong><Counter value="18+" /></strong>
                <span>Paediatric specialities and supportive services</span>
              </div>
              <div className="sb-cta">
                <a className="btn btn-pink" href="/book-appointment">Book a Consultation</a>
                <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp &rarr;</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="section tint-pink">
          <div className="wrap">
            <Reveal className="sec-head">
              <Eyebrow>FAQ</Eyebrow>
              <h2>Questions families ask</h2>
            </Reveal>
            <div className="faq">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 50} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}<span>{openFaq === i ? "-" : "+"}</span>
                  </button>
                  <div className="faq-a"><p>{f.a}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL APPOINTMENT */}
        <section className="section" id="book" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="enq">
              <div className="enq-copy">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 style={{ marginTop: 12 }}>Find the right specialist for your child</h2>
                <p>
                  Tell us about your child&apos;s concern, and our care team will help you identify the appropriate
                  paediatric speciality, doctor and Rio branch.
                </p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a className="btn btn-pink" href={LINKS.call}>Call Now</a>
                  <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
              <div className="enq-form">
                <h3>Request a call back</h3>
                {sent ? (
                  <div className="enq-done"><span>&#10003;</span> Thanks! We&apos;ll call you back shortly.</div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <input type="text" placeholder="Full name" required />
                    <input type="tel" placeholder="Phone number" required />
                    <select required defaultValue="Paediatric Super Specialities">
                      {APPT_SERVICES.map((x) => <option key={x}>{x}</option>)}
                    </select>
                    <button className="btn btn-cta" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                      Request a Call Back &rarr;
                    </button>
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
            <p style={{ color: "#AEB2D6", maxWidth: 270, fontSize: 14 }}>
              Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.
            </p>
            <p className="vals">TRUST &bull; CARE &bull; INNOVATION &bull; COMPASSION &bull; EXCELLENCE</p>
          </div>
          <div>
            <h4>Specialities</h4>
            <ul>
              {SPECIALITIES.slice(0, 6).map((sp) => <li key={sp.title}>{sp.title}</li>)}
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/facilities">Facilities</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={LINKS.call}>Call: +91 77083 18222</a></li>
              <li><a href="mailto:info@riohospital.com">Email: info@riohospital.com</a></li>
              <li><a href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>&copy; 2026 Rio Children&apos;s Hospital</span>
          <span>Built by Invictus Global Tech</span>
        </div>
      </footer>

      <div className="mbar">
        <a className="btn btn-pink" href={LINKS.call}>Call</a>
        <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}
