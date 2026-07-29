"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import { APPOINTMENT_SERVICES as APPT_SERVICES } from "@/data/site";
import styles from "./styles.module.css";

/* =========================================================
   RIO CHILDREN'S HOSPITAL — GYNAECOLOGY PAGE
   ========================================================= */

const IMG = {
  logo: "/assets/shared/riologov2.png",
  hero: "/assets/maternity/women.png",
  overview: "/assets/maternity/scan.png",
  "gal-1": "/assets/maternity/women.png",
  "gal-2": "/assets/maternity/scan.png",
  "gal-3": "/assets/maternity/nicu-ward.png",
  "gal-4": "/assets/maternity/specialist.png",
};

const LINKS = {
  call: "tel:+917708318222",
  whatsapp: "https://wa.me/917708318222",
};

const NAV_TREATMENTS = [
  { name: "High-Risk Pregnancy Care", slug: "high-risk-pregnancy" },
  { name: "Fetal Medicine", slug: "fetal-medicine" },
  { name: "Maternity Care", slug: "maternity" },
  { name: "Gynaecology", slug: "gynaecology" },
  { name: "Fertility & IVF", slug: "fertility-ivf" },
  { name: "NICU", slug: "nicu" },
  { name: "PICU", slug: "picu" },
  { name: "Paediatric Emergency", slug: "emergency" },
  { name: "General Paediatrics", slug: "general-paediatrics" },
  { name: "Vaccination Services", slug: "vaccination" },
  { name: "Human Milk Bank", slug: "human-milk-bank" },
];

const COVERS = [
  "Routine Gynaecology Consultation",
  "Menstrual Disorders",
  "PCOS & Hormonal Disorders",
  "Fertility Assessment & Counselling",
  "Pregnancy Planning",
  "Adolescent Gynaecology",
  "Menopause Care",
  "Cervical Cancer Screening",
  "Fibroids & Ovarian Cysts",
  "Vaginal & Urinary Infections",
  "Family Planning & Contraception",
  "Minimally Invasive Gynaecological Procedures",
  "High-Risk Gynaecology",
  "Preventive Women's Health Check-ups",
];

const WHAT_YOU_GET = [
  { icon: "specialists", title: "Expert Gynaecologists", desc: "Experienced specialists providing personalised care for women across every stage of life." },
  { icon: "scan", title: "Advanced Women's Diagnostics", desc: "Modern ultrasound, laboratory investigations and screening services for accurate diagnosis." },
  { icon: "shield", title: "Preventive Health Screening", desc: "Regular cervical screening, breast evaluation and preventive health assessments for early detection." },
  { icon: "heart", title: "Fertility & Pregnancy Planning", desc: "Guidance for couples planning pregnancy, fertility evaluation and pre-conception counselling." },
  { icon: "minimal", title: "Minimally Invasive Treatment", desc: "Medical and surgical treatment options designed for faster recovery and better patient comfort." },
  { icon: "followup", title: "Continuity of Care", desc: "From adolescence through pregnancy and menopause, our specialists support every phase of women's health." },
];

const SERVICES = [
  { title: "Routine Gynaecology", desc: "Annual check-ups, preventive examinations and consultations for maintaining lifelong women's health.", img: "/assets/gynaecology/uterus.png" },
  { title: "Menstrual Disorders", desc: "Evaluation and treatment for irregular periods, heavy bleeding, painful menstruation and hormonal imbalance.", img: "/assets/gynaecology/menstrual.png" },
  { title: "PCOS & Endocrine Disorders", desc: "Diagnosis and long-term management of Polycystic Ovary Syndrome, hormonal disturbances and related reproductive concerns.", img: "/assets/gynaecology/pcos.png" },
  { title: "Fertility Assessment", desc: "Comprehensive fertility evaluation, ovulation monitoring and counselling for couples planning pregnancy.", img: "/assets/gynaecology/fertility.png" },
  { title: "Pregnancy Planning", desc: "Pre-conception health assessments, nutritional advice and medical guidance before pregnancy.", img: "/assets/gynaecology/pregnancy-planning.png" },
  { title: "Adolescent Gynaecology", desc: "Specialised care for teenage girls experiencing menstrual, hormonal and developmental concerns.", img: "/assets/gynaecology/adolescent.png" },
  { title: "Fibroids & Ovarian Cysts", desc: "Diagnosis, monitoring and treatment options including medical and minimally invasive surgical care.", img: "/assets/gynaecology/fibroids.png" },
  { title: "Menopause Clinic", desc: "Support for hormonal changes, bone health, menopause symptoms and healthy ageing.", img: "/assets/gynaecology/menopause.png" },
  { title: "Family Planning", desc: "Contraceptive counselling, birth spacing advice and personalised reproductive planning.", img: "/assets/gynaecology/family-planning.png" },
  { title: "Preventive Women's Health", desc: "Regular cervical screening, HPV awareness, breast health evaluation and wellness programmes.", img: "/assets/gynaecology/preventive.png" },
];

const GALLERY = [
  { key: "gal-1", cap: "Gynaecology Consultation Room" },
  { key: "gal-2", cap: "Women's Ultrasound Suite" },
  { key: "gal-3", cap: "Advanced Procedure Room" },
  { key: "gal-4", cap: "Dedicated Women's Care Team" },
];

const FAQS = [
  { q: "When should I visit a gynaecologist?", a: "Women should have regular gynaecological check-ups and seek consultation for menstrual concerns, pelvic pain, abnormal bleeding, fertility issues, pregnancy planning or menopause-related symptoms." },
  { q: "Do I need a referral?", a: "No. Appointments can be booked directly with our gynaecologists." },
  { q: "Can I consult before planning pregnancy?", a: "Yes. Pre-conception counselling helps optimise health before pregnancy and identifies any medical conditions that may require treatment beforehand." },
  { q: "Is treatment available for PCOS?", a: "Yes. Rio provides diagnosis, hormonal evaluation, lifestyle counselling and personalised treatment for women with PCOS." },
  { q: "Are minimally invasive procedures available?", a: "Yes. Depending on the condition, our specialists offer advanced minimally invasive gynaecological procedures whenever appropriate." },
];

/* ── helpers ── */

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

function Logo() {
  const [broken, setBroken] = useState(false);
  return (
    <a className="logo" href="/" aria-label="Rio Children's Hospital - Home">
      {!broken ? (
        <img className="logo-img" src={IMG.logo} alt="Rio Children's Hospital" onError={() => setBroken(true)} />
      ) : (
        <span className="logo-word">Rio<em>HOSPITAL</em></span>
      )}
    </a>
  );
}

function NavTreatments() {
  return (
    <div className="nav-dd">
      <a href="/treatments" className="nav-dd-trigger active">Treatments <span className="cv">&#9662;</span></a>
      <div className="nav-dd-menu">
        {NAV_TREATMENTS.map((t) => <a key={t.slug} href={`/services/${t.slug}`}>{t.name}</a>)}
        <a className="nav-dd-all" href="/treatments">View all treatments &#8594;</a>
      </div>
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
      const tick = (x) => {
        const p = Math.min(1, (x - s) / dur);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{target != null ? `${prefix}${n.toLocaleString()}${suffix}` : value}</span>;
}

const ICONS = {
  specialists: (<><circle cx="9" cy="9" r="2.6" /><circle cx="16.3" cy="9.4" r="2" /><path d="M3.8 18.8a5.2 5.2 0 0 1 10.4 0" /><path d="M14.6 18.8a4.4 4.4 0 0 1 5.6-4.3" /></>),
  scan: (<path d="M3 12h3.4l1.9-6 3.4 12 2.2-7.4 1.3 1.4H21" />),
  shield: (<path d="M12 3.2 5.5 5.6v4.9c0 4.3 2.8 7.2 6.5 8.8 3.7-1.6 6.5-4.5 6.5-8.8V5.6L12 3.2Z" />),
  heart: (<path d="M12 20 4.4 12.7a4.5 4.5 0 0 1 6.4-6.3l1.2 1.2 1.2-1.2a4.5 4.5 0 0 1 6.4 6.3z" />),
  minimal: (<><path d="M12 3v18" /><path d="M8 7c2-2 6-2 8 0" /><path d="M8 17c2 2 6 2 8 0" /><circle cx="12" cy="12" r="2" /></>),
  followup: (<path d="M12 20 4.4 12.7a4.5 4.5 0 0 1 6.4-6.3l1.2 1.2 1.2-1.2a4.5 4.5 0 0 1 6.4 6.3z" />),
};

function SIcon({ name, size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

/* ── Page ── */

export default function GynaecologyPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`rio ${styles.page}`}>

      {/* Top strip */}
      <div className="topstrip">
        24/7 Emergency &bull; NICU &bull; PICU | <a href={LINKS.call}>Call now: +91 77083 18222</a>
      </div>

      {/* Header */}
      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
          <a href="/paediatric-super-specialities">Paediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href={LINKS.call}>Call Us</a>
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
            <Img src={IMG.hero} alt="Female gynaecologist consulting a patient at Rio" grad={0} />
          </div>
          <div className="shero-veil" />
          <div className="shero-in">
            <Reveal>
              <Eyebrow light>Gynaecology Services</Eyebrow>
              <h1>Complete women&apos;s healthcare at every stage of life</h1>
              <p className="lede">
                From adolescence to motherhood and menopause, Rio provides compassionate, evidence-based
                gynaecological care for women of every age. Whether it&apos;s routine check-ups, menstrual
                concerns, fertility guidance, minimally invasive procedures or complex gynaecological
                conditions, our specialists provide personalised care in a safe and supportive environment.
              </p>
              <div className="shero-cta">
                <a className="btn btn-cta" href="/book-appointment">Book an Appointment</a>
                <a className="btn btn-pink" href={LINKS.call}>Call Emergency Care</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. OVERVIEW */}
        <section className={`section ${styles.overviewSection}`}>
          <div className="wrap split">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <h2 className={styles.headingTop}>Women&apos;s health deserves specialised care throughout life</h2>
              <p className="sec-note">
                Women&apos;s healthcare needs evolve through every stage of life from the first menstrual cycle
                and reproductive years to pregnancy planning and menopause. Regular gynaecological care helps
                identify health concerns early while supporting long-term reproductive and overall wellbeing.
              </p>
              <p className={`sec-note ${styles.noteTop}`}>
                At Rio, experienced obstetricians and gynaecologists provide comprehensive consultations,
                advanced diagnostics, preventive screenings, medical management and surgical care, ensuring
                every woman receives personalised treatment in a comfortable and confidential setting.
              </p>
              <h4 className={styles.coversTitle}>This care covers</h4>
              <div className="covers">
                {COVERS.map((c) => (
                  <span key={c} className="cov"><i />{c}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Img src={IMG.overview} alt="Female gynaecologist consulting a patient with ultrasound equipment" grad={1} className="frame" />
            </Reveal>
          </div>
        </section>

        {/* 3. WHAT YOU GET AT RIO */}
        <section className="section tint-blue">
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>What You Get at Rio</Eyebrow>
              <h2>Comprehensive women&apos;s healthcare under one roof</h2>
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

        {/* 4. WOMEN'S HEALTH SERVICES */}
        <section className={`section ${styles.servicesSection}`}>
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Services</Eyebrow>
              <h2>Complete gynaecological care for every stage of womanhood</h2>
            </Reveal>
            <div className={styles.svcGrid}>
              {SERVICES.map((sv, i) => (
                <Reveal key={sv.title} delay={(i % 3) * 50}>
                  <div className={styles.svcCard}>
                    <div className={styles.svcLeft}>
                      <div className={styles.svcImageBox}>
                        <img src={sv.img} alt={sv.title} className={styles.svcImg} />
                      </div>
                    </div>
                    <div className={styles.svcRight}>
                      <h3>{sv.title}</h3>
                      <div className={styles.svcDivider} />
                      <p>{sv.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. INFRASTRUCTURE */}
        <section className={`section tint-blue ${styles.infrastructureSection}`}>
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>Our Infrastructure</Eyebrow>
              <h2>Built for comfortable and confidential women&apos;s healthcare</h2>
              <p className="sec-note">
                Dedicated consultation suites, advanced diagnostics and modern treatment facilities
                designed exclusively for women&apos;s healthcare.
              </p>
            </Reveal>
            <div className="gal-grid">
              {GALLERY.map((g, i) => (
                <Reveal key={g.key} delay={(i % 4) * 70} className="gal-item">
                  <Img src={IMG[g.key]} alt={g.cap} grad={i % 3} />
                  <span className="gal-cap">{g.cap}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. STAT CTA */}
        <section className={`section ${styles.statSection}`}>
          <div className="wrap">
            <Reveal className="statband">
              <div>
                <strong><Counter value="10,000+" /></strong>
                <span>Women cared for across consultations, pregnancy and specialised gynaecological services.</span>
              </div>
              <div className="sb-cta">
                <a className="btn btn-pink" href="/book-appointment">Book a Consultation</a>
                <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp &#8599;</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className={`section tint-pink ${styles.faqSection}`}>
          <div className="wrap">
            <Reveal className="sec-head center">
              <Eyebrow>FAQ</Eyebrow>
              <h2>Frequently asked questions</h2>
            </Reveal>
            <div className="faq">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 50} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}<span>{openFaq === i ? "\u2013" : "+"}</span>
                  </button>
                  <div className="faq-a"><p>{f.a}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA / ENQUIRY */}
        <section className={`section ${styles.enquirySection}`} id="book">
          <div className="wrap">
            <Reveal className="enq">
              <div className="enq-copy">
                <Eyebrow light>Appointments</Eyebrow>
                <h2 className={styles.headingTop}>Your health deserves dedicated women&apos;s care</h2>
                <p>
                  Whether you need a routine check-up, fertility guidance, pregnancy planning or specialised
                  treatment, our women&apos;s healthcare team is here to support you with compassionate,
                  confidential and personalised care.
                </p>
                <div className={styles.enqActions}>
                  <a className="btn btn-pink" href={LINKS.call}>Call Now</a>
                  <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
              <div className="enq-form">
                <h3>Request a call back</h3>
                {sent ? (
                  <div className="enq-done"><span>&#10003;</span> Thanks! We will call you back shortly.</div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <input type="text" placeholder="Full name" required />
                    <input type="tel" placeholder="Phone number" required />
                    <select required defaultValue="">
                      <option value="" disabled>Preferred branch</option>
                      <option>Madurai - Main Branch</option>
                      <option>Madurai - Bypass Road</option>
                    </select>
                    <select required defaultValue="Gynaecology">
                      {APPT_SERVICES.map((x) => <option key={x}>{x}</option>)}
                    </select>
                    <button className={`btn btn-cta ${styles.fullButton}`} type="submit">
                      Request a Call Back
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <SiteFooter />

      {/* Mobile sticky bar */}
      <div className="mbar">
        <a className="btn btn-pink" href={LINKS.call}>Call</a>
        <a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>

    </div>
  );
}