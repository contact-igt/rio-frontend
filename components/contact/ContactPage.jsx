"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES_WITH_ENQUIRY, SITE_LINKS } from "@/data/site";
/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — CONTACT US PAGE
   Rio brand: Deep Blue #303573 · Pink #FD70A1 · Green #7BA93A · Warm Brown
   #BD844C (CTAs). 'Proxima Nova'→Mulish headings · Montserrat body.
   All numbers, emails, addresses & socials from the IGT migration doc.
   Drop-in → export default RioContactPage   (Next.js: add "use client".)
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  "logo": "/assets/shared/riologov2.png",
  "hero": "/assets/shared/abouthero.png",
  "branch1": "/assets/shared/branch-madurai-main.png",
  "branch2": "/assets/shared/branch-madurai-southwing.png",
  "branch3": "/assets/shared/branch-dindigul.jpg",
  "branch4": "/assets/shared/branch-thanjavur.jpg",
};
const BRANCHES = [
  { name: "Madurai (Main)", addr: "Rio Children's Hospital, Tuticorin Ring Road, Masthanpatti Rd, opp Annamalaiar School, Madurai – 625020", phones: [["77083 18222", "+917708318222"], ["0452-2555222", "+914522555222"]], img: "branch1" },
  { name: "Southwing, Madurai", addr: "41, Madakulam Main Rd, Pasumpon Nagar, Palangantham, Madurai – 625003", phones: [["07418661222", "+917418661222"], ["0452-4036444", "+914524036444"]], img: "branch2" },
  { name: "Dindigul", addr: "10, Palani Rd, New Agraharam, Govindapuram, Dindigul – 624001", phones: [["07845464333", "+917845464333"], ["0451-2424333", "+914512424333"]], img: "branch3" },
  { name: "Thanjavur", addr: "21/3082, 1st St, VOC Nagar, Parisutham Nagar, Thanjavur – 613007", phones: [["+91 82205 42555", "+918220542555"], ["4362 472 555", "+914362472555"]], img: "branch4" },
];
const mapsEmbed = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/* helpers */
function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12 }); io.observe(el); return () => io.disconnect(); }, []);
  const T = as; return <T ref={ref} className={`reveal ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</T>;
}
function Img({ src, alt = "", grad = 0, className = "" }) {
  const [b, setB] = useState(false); const G = ["g0", "g1", "g2"];
  return <div className={`img-wrap ${G[grad % 3]} ${className}`}>{!b ? <img src={src} alt={alt} loading="lazy" onError={() => setB(true)} /> : <svg viewBox="0 0 24 24" className="fb" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.6 8.7 2 5 5.6 5c2 0 3.5 1.1 4.4 2.6C10.9 6.1 12.4 5 14.4 5 18 5 19.4 8.7 18 11.8 16.5 16.4 12 21 12 21z" /></svg>}</div>;
}
function Eyebrow({ children, light = false }) { return <span className={`eyebrow ${light ? "light" : ""}`}><i className="ey-dot" />{children}</span>; }
function CIcon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "phone":
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.29a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z" /></svg>;
    case "chat":
      return <svg {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.8-7.6A8.38 8.38 0 0 1 12.5 3h.5A8.48 8.48 0 0 1 21 11v.5Z" /></svg>;
    case "mail":
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "pin":
      return <svg {...props}><path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" /><circle cx="12" cy="11" r="2.2" /></svg>;
    case "instagram":
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" /></svg>;
    case "facebook":
      return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H17V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.8v8h2.7Z" /></svg>;
    case "youtube":
      return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.98 2.98 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A2.98 2.98 0 0 0 2.4 7.2 31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .4 4.8 2.98 2.98 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a2.98 2.98 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>;
    default:
      return null;
  }
}
export default function ContactPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => { const o = () => setSolid(window.scrollY > 40); window.addEventListener("scroll", o, { passive: true }); return () => window.removeEventListener("scroll", o); }, []);

  const QUICK = [
    { icon: "phone", t: "Call us", v: "+91 77083 18222", href: SITE_LINKS.call, note: "24/7 emergency line" },
    { icon: "chat", t: "WhatsApp", v: "Chat with us", href: SITE_LINKS.whatsapp, note: "Quick enquiries & bookings" },
    { icon: "mail", t: "Email", v: "info@riohospital.com", href: SITE_LINKS.email, note: "General enquiries" },
    { icon: "pin", t: "Visit us", v: "4 branches", href: "#branches", note: "Madurai · Dindigul · Thanjavur" },
  ];

  return (
    <div className="rio">
      <style>{`
{}
{}

        /* hero */
        .chero{padding:50px 0 8px;position:relative;overflow:hidden}
        .chero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center;position:relative;z-index:1}
        @media(max-width:920px){.chero-grid{grid-template-columns:1fr;gap:34px}}


        .chero h1{font-size:clamp(34px,5vw,56px);margin-top:14px}
        .chero h1 .accent{color:var(--pink)}
        .chero .lede{font-size:17.5px;margin-top:18px;max-width:520px}
        .chero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
        .chero-media .frame{aspect-ratio:4/3.6;border-radius:28px;box-shadow:var(--shadow)}
        /* quick cards */
        .qgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:32px;position:relative;z-index:5}
        @media(max-width:880px){.qgrid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:520px){.qgrid{grid-template-columns:1fr}}
        .qcard{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px;display:block;transition:transform .25s,box-shadow .25s}
        .qcard:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
        .qic{width:50px;height:50px;border-radius:14px;background:var(--pink-soft);color:var(--pink-deep);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
        .qic svg{width:24px;height:24px}
        .qcard h3{font-size:15px}
        .qcard .qv{font-size:16px;font-weight:800;color:var(--blue);margin:3px 0 4px}
        .qcard .qn{font-size:12.5px;color:var(--muted)}
        /* form + details */
        .cgrid{display:grid;grid-template-columns:1.1fr .9fr;gap:34px;align-items:start}
        @media(max-width:880px){.cgrid{grid-template-columns:1fr}}
        .card{background:#fff;border:1px solid var(--line);border-radius:24px;padding:34px}
        .card h2{font-size:24px}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
        @media(max-width:520px){.form-row{grid-template-columns:1fr}}
        .field{display:flex;flex-direction:column;gap:6px}
        .field.full{grid-column:1/-1}
        .field label{font-size:12.5px;font-weight:700;color:var(--ink)}
        .field input,.field select,.field textarea{padding:12px 13px;border-radius:11px;border:1.4px solid var(--line);font-size:14px;font-family:inherit;background:#fff;color:var(--ink)}
        .field textarea{resize:vertical;min-height:96px}
        .done{display:flex;align-items:center;gap:10px;background:var(--green-soft);color:var(--green-deep);font-weight:700;padding:16px;border-radius:12px;font-size:14.5px}
        .info-block + .info-block{margin-top:22px;padding-top:22px;border-top:1px solid var(--line)}
        .info-block h4{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--pink-deep);margin-bottom:10px}
        .info-row{display:flex;align-items:center;gap:10px;font-size:14.5px;font-weight:600;color:var(--ink);margin-bottom:10px}
        .info-row svg{width:18px;height:18px;flex-shrink:0;color:var(--pink-deep)}
        .info-row a{color:var(--ink)}.info-row a:hover{color:var(--blue)}
        .socials{display:flex;gap:10px;margin-top:6px}
        .socials a{width:40px;height:40px;border-radius:11px;background:var(--blue-soft);color:var(--blue);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;transition:background .2s ease, color .2s ease}
        .socials a:hover{background:var(--blue);color:#fff}
        .socials a svg{width:18px;height:18px}
        /* branches */
        .bgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
        @media(max-width:820px){.bgrid{grid-template-columns:1fr}}
        .bcard{background:#fff;border:1px solid var(--line);border-radius:22px;overflow:hidden;display:grid;grid-template-columns:.9fr 1.1fr}
        @media(max-width:520px){.bcard{grid-template-columns:1fr}}
        .bbody{padding:22px}
        .btag{font-size:10.5px;font-weight:800;color:var(--green-deep);background:var(--green-soft);padding:4px 10px;border-radius:999px;letter-spacing:.04em}
        .bbody h3{font-size:16.5px;margin:10px 0 8px}
        .bbody p{font-size:12.8px;line-height:1.5}
        .bphones{display:flex;flex-direction:column;gap:5px;margin-top:12px}
        .bphones a{font-size:13.5px;font-weight:700;color:var(--pink-deep)}
        .bdir{display:inline-flex;margin-top:12px;font-size:12.5px;font-weight:800;color:var(--blue);gap:6px}
        .mapwrap{margin-top:34px;border-radius:24px;overflow:hidden;border:1px solid var(--line);height:380px}
        .mapwrap iframe{width:100%;height:100%;border:0;display:block}
        /* careers */
        .careers{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;background:#fff;border:1px solid var(--line);border-radius:24px;padding:34px}
        .careers h3{font-size:20px}
        .careers-links{display:flex;gap:22px;flex-wrap:wrap;font-size:14px;font-weight:700}
        .careers-links a{color:var(--blue)}
      `}</style>

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a><a href="/about">About</a>
          <NavManagement /><a href="/paediatric-super-specialities">Pediatric Super Specialities</a><NavTreatments /><a href="/facilities">Facilities</a><a href="/contact" className="active">Contact</a>
        </nav>
                <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* hero */}
        <section className="chero">
          <span className="blob" style={{ width: 300, height: 300, top: "-4%", left: "-6%", background: "radial-gradient(circle at 30% 30%,#FFC4DA,transparent 70%)" }} />
          <span className="blob" style={{ width: 260, height: 260, bottom: "0%", right: "-6%", background: "radial-gradient(circle at 30% 30%,#C9CEF2,transparent 70%)" }} />
          <div className="wrap chero-grid">
            <Reveal>
              <Eyebrow>Contact Us</Eyebrow>
              <h1>We're here for you — <span className="accent">day or night</span>.</h1>
              <p className="lede">Book an appointment, ask a question, or reach our 24/7 emergency line. Our team across all four Rio branches is ready to help you and your family.</p>
              <div className="chero-cta">
                <a className="btn btn-pink" href={SITE_LINKS.call}>Call Emergency Care</a>
                <a className="btn btn-cta" href="/book-appointment">Book an Appointment</a>
                <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
              </div>
            </Reveal>
            <Reveal delay={120} className="chero-media">
              <Img src={IMG.hero} alt="Rio Children's Hospital" grad={0} className="frame" />
            </Reveal>
          </div>
        </section>

        {/* quick cards */}
        <section className="wrap" style={{ paddingBottom: 8 }}>
          <div className="qgrid">
            {QUICK.map((q, i) => (
              <Reveal key={q.t} delay={i * 70}>
                <a className="qcard" href={q.href} target={q.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className="qic"><CIcon name={q.icon} /></span>
                  <h3>{q.t}</h3>
                  <div className="qv">{q.v}</div>
                  <div className="qn">{q.note}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* form + details */}
        <section className="section" id="enquire">
          <div className="wrap cgrid">
            <Reveal className="card">
              <Eyebrow>Send an enquiry</Eyebrow>
              <h2 style={{ marginTop: 10 }}>Request a call back</h2>
              <p className="sec-note">Fill this in and our team will get back to you quickly.</p>
              {sent ? (
                <div className="done mt-26"><span>✓</span> Thank you! Our team will contact you shortly.</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="form-row">
                    <div className="field"><label>Full name</label><input type="text" placeholder="Your name" required /></div>
                    <div className="field"><label>Phone</label><input type="tel" placeholder="Phone number" required /></div>
                    <div className="field"><label>Preferred branch</label><select required defaultValue=""><option value="" disabled>Select a branch</option>{BRANCHES.map((b) => <option key={b.name}>{b.name}</option>)}</select></div>
                    <div className="field"><label>Service needed</label><select required defaultValue=""><option value="" disabled>Select a service</option>{APPOINTMENT_SERVICES_WITH_ENQUIRY.map((s) => <option key={s}>{s}</option>)}</select></div>
                    <div className="field full"><label>Message (optional)</label><textarea placeholder="Tell us briefly how we can help" /></div>
                  </div>
                  <button className="btn btn-cta mt-26" type="submit" style={{ width: "100%", justifyContent: "center" }}>Request a Call Back ↗</button>
                </form>
              )}
            </Reveal>

            <Reveal delay={120} className="card">
              <Eyebrow>Reach us directly</Eyebrow>
              <h2 style={{ marginTop: 10, fontSize: 22 }}>Contact details</h2>
              <div className="info-block mt-26">
                <h4>Phone</h4>
                <div className="info-row"><CIcon name="phone" /><a href={SITE_LINKS.call}>+91 77083 18222</a></div>
                <div className="info-row"><CIcon name="chat" /><a href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp: +91 77083 18222</a></div>
              </div>
              <div className="info-block">
                <h4>Email</h4>
                <div className="info-row"><CIcon name="mail" /><a href={SITE_LINKS.email}>info@riohospital.com</a></div>
                <div className="info-row"><CIcon name="mail" /><a href={SITE_LINKS.hr}>hr@riohospital.com</a></div>
              </div>
              <div className="info-block">
                <h4>Hours</h4>
                <div className="info-row">🚑 Emergency: 24/7, all 4 branches</div>
                <div className="info-row">🏥 Outpatient (OPD): open 24/7</div>
              </div>
              <div className="info-block">
                <h4>Follow us</h4>
                <div className="socials">
                  <a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><CIcon name="instagram" /></a>
                  <a href={SITE_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><CIcon name="facebook" /></a>
                  <a href={SITE_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><CIcon name="youtube" /></a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* branches */}
        <section className="section tint-blue" id="branches">
          <div className="wrap">
            <Reveal className="sec-head center"><Eyebrow>Our Branches</Eyebrow><h2>Find your nearest Rio</h2><p className="sec-note">Every branch offers 24/7 emergency, NICU and PICU support.</p></Reveal>
            <div className="bgrid">
              {BRANCHES.map((b, i) => (
                <Reveal key={b.name} delay={i * 80}>
                  <div className="bcard">
                    <Img src={IMG[b.img]} alt={b.name} grad={i % 3} />
                    <div className="bbody">
                      <span className="btag">24/7 EMERGENCY</span>
                      <h3>{b.name}</h3>
                      <p>{b.addr}</p>
                      <div className="bphones">{b.phones.map(([label, tel]) => <a key={tel} href={`tel:${tel}`}>📞 {label}</a>)}</div>
                      <a className="bdir" href={mapsLink(b.addr)} target="_blank" rel="noreferrer">📍 Get Directions →</a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mapwrap">
              <iframe title="Rio Children's Hospital — Madurai Main" src={mapsEmbed(BRANCHES[0].addr)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </Reveal>
          </div>
        </section>

        {/* careers */}
        <section className="section">
          <div className="wrap">
            <Reveal className="careers">
              <div>
                <Eyebrow>Careers</Eyebrow>
                <h3 style={{ marginTop: 10 }}>Join the Rio family</h3>
                <p className="sec-note">We're hiring across nursing, lab, pharmacy, front-office and clinical roles at all branches.</p>
              </div>
              <div className="careers-links">
                <a href={SITE_LINKS.hr}>✉ hr@riohospital.com</a>
                <a href={SITE_LINKS.careers}>✉ careers@riohospital.com</a>
                <a href="tel:+917397193222">📞 +91 73971 93222</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* cta */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="cta-band">
              <div>
                <h2>Need urgent help right now?</h2>
                <p>Our paediatric emergency line is open 24 hours, every day, across all branches.</p>
              </div>
              <div className="cta-actions">
                <a className="btn btn-pink" href={SITE_LINKS.call}>Call Emergency Care</a>
                <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div>
            <div style={{ marginBottom: 16 }}><Logo footer /></div>
            <p style={{ color: "#9398C2", maxWidth: 270, fontSize: 14 }}>Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.</p>
            <p className="vals">TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE</p>
          </div>
          <div><h4>Explore</h4><ul><li><a href="/">Home</a></li><li><a href="/about">About Us</a></li><li><a href="/about/chairman">Founder &amp; Chairman</a></li><li><a href="/about/management">Management Team</a></li></ul></div>
          <div><h4>Branches</h4><ul>{BRANCHES.map((b) => <li key={b.name}>{b.name}</li>)}</ul></div>
          <div><h4>Contact</h4><ul>
            <li><a href={SITE_LINKS.call}>📞 +91 77083 18222</a></li><li><a href={SITE_LINKS.email}>✉ info@riohospital.com</a></li>
            <li><a href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li><li><a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul></div>
        </div>
        <div className="wrap footer-bottom"><span>© 2026 Rio Children's Hospital</span><span>Built by Invictus Global Tech</span></div>
      </footer>

      <div className="mbar">
        <a className="btn btn-pink" href={SITE_LINKS.call}>Call</a>
        <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cta" href="/book-appointment">Book</a>
      </div>
    </div>
  );
}








