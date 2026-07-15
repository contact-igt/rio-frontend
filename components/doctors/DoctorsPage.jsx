"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES, NAV_TREATMENTS, SITE_LINKS } from "@/data/site";
import { doctors } from "@/data/doctors";

/* ════════════════════════════════════════════════════════════════════════
   RIO CHILDREN'S HOSPITAL — DOCTORS landing page (route: /doctors)
   Warm/soft palette, search + pill department chips, circular photos.
   ════════════════════════════════════════════════════════════════════════ */

const IMG = {
  logo: "/assets/shared/riologov2.png",
};


function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = as;
  return (
    <T
      ref={ref}
      className={`reveal ${v ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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

export default function DoctorsPage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDept, setActiveDept] = useState("All");

  useEffect(() => {
    const o = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", o, { passive: true });
    return () => window.removeEventListener("scroll", o);
  }, []);

  // Extract unique departments in their original order
  const uniqueDepts = Array.from(new Set(doctors.map((d) => d.department)));

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = activeDept === "All" || doc.department === activeDept;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      doc.name.toLowerCase().includes(query) ||
      doc.role.toLowerCase().includes(query) ||
      (doc.qualifications && doc.qualifications.toLowerCase().includes(query));

    return matchesDept && matchesSearch;
  });

  return (
    <div className="rio">
      <style>{`
        /* --- layout variables overrides --- */
        .header { background: transparent; transition: background .3s; }
        .header.solid { background: #fff; box-shadow: 0 4px 20px rgba(48,53,115,.06); }
        
        /* --- doctors hero search area --- */
        .doc-hero {
          background: linear-gradient(135deg, var(--brown-soft) 0%, #FFF8EE 100%);
          padding: 120px 0 60px;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--line);
        }
        .doc-hero-in { max-width: 780px; margin: 0 auto; }
        .doc-hero h1 { font-size: clamp(32px, 5vw, 48px); margin-top: 10px; color: var(--blue-deep); }
        .doc-hero .lede { font-size: 17px; color: var(--muted); margin-top: 14px; max-width: 600px; margin-left: auto; margin-right: auto; }
        
        /* --- search container --- */
        .search-box-wrap {
          margin-top: 32px;
          position: relative;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 6px 10px 6px 24px;
          display: flex;
          align-items: center;
          box-shadow: 0 10px 30px rgba(189, 132, 76, .08);
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
          transition: border-color .3s ease, box-shadow .3s ease, transform .3s cubic-bezier(.16, 1, .3, 1);
        }
        .search-box-wrap:focus-within {
          border-color: var(--brown);
          box-shadow: 0 10px 30px rgba(189, 132, 76, .16);
          transform: scale(1.02);
        }
        .search-box-wrap svg {
          fill: var(--muted);
          width: 20px;
          height: 20px;
          margin-right: 12px;
          transition: fill .3s ease, transform .3s cubic-bezier(.16, 1, .3, 1);
        }
        .search-box-wrap:focus-within svg {
          fill: var(--brown);
          transform: scale(1.1) rotate(8deg);
        }
        .search-input {
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 16px;
          color: var(--ink);
          flex: 1;
          background: transparent;
        }
        .search-input::placeholder { color: #A0A4B5; }
        
        /* --- department filter chips --- */
        .dept-filter-sec {
          background: #FFF;
          padding: 24px 0;
          border-bottom: 1px solid var(--line);
          position: sticky;
          top: 76px;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0,0,0,.02);
        }
        .chips-scroll-wrap {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 4px 10px;
          scrollbar-width: none; /* Firefox */
        }
        .chips-scroll-wrap::-webkit-scrollbar { display: none; } /* Chrome/Safari */
        .dept-chip {
          white-space: nowrap;
          padding: 10px 22px;
          border-radius: 999px;
          background: #FFF;
          border: 1px solid var(--line);
          font-size: 13.5px;
          font-weight: 700;
          color: var(--muted);
          cursor: pointer;
          transition: all .3s cubic-bezier(.25, .8, .25, 1);
        }
        .dept-chip:hover {
          color: var(--brown-deep);
          border-color: var(--brown);
          background: var(--brown-soft);
          transform: translateY(-2px);
        }
        .dept-chip:active {
          transform: translateY(0);
        }
        .dept-chip.active {
          color: #FFF;
          border-color: var(--brown);
          background: var(--brown);
          box-shadow: 0 8px 20px rgba(189, 132, 76, .35);
          transform: translateY(-2px) scale(1.02);
        }

        /* --- results stats --- */
        .results-bar {
          padding: 24px 0 0;
          font-size: 15px;
          font-weight: 700;
          color: var(--muted);
        }
        
        /* --- department sections --- */
        .dept-section { margin-top: 56px; }
        .dept-section + .dept-section { margin-top: 72px; }
        .dept-header {
          margin-bottom: 28px;
          border-bottom: 1px solid var(--line);
          padding-bottom: 12px;
        }
        .dept-header h2 {
          font-size: clamp(20px, 3.2vw, 26px);
          color: var(--blue);
        }
        
        /* --- grid --- */
        .doc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media(max-width: 960px){ .doc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width: 600px){ .doc-grid { grid-template-columns: 1fr; } }
        
                /* --- doctor card --- */
        .doc-card {
          position: relative;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-align: left;
          padding: 0 24px 24px;
          background: linear-gradient(180deg, #fff 0%, #fff 56%, #FCF7F1 100%);
          border: 1px solid var(--line);
          border-radius: 28px;
          box-shadow: 0 6px 18px rgba(48,53,115,.05);
          transition: transform .35s cubic-bezier(.16, 1, .3, 1), box-shadow .35s cubic-bezier(.16, 1, .3, 1), border-color .35s ease;
        }
        .doc-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--brown), var(--pink));
        }
        .doc-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.35) 100%);
          transform: skewX(-25deg);
          transition: 0.75s;
          pointer-events: none;
        }
        .doc-card:hover::after {
          left: 120%;
        }
        .doc-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 54px rgba(48,53,115,.10);
          border-color: rgba(189,132,76,.22);
        }

        /* --- hero photo --- */
        .doc-photo-wrap {
          width: calc(100% + 48px);
          height: 260px;
          margin: 0 -24px 18px;
          border-radius: 0 0 26px 26px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--brown-soft), var(--blue-soft));
          border: 0;
          box-shadow: inset 0 -1px 0 rgba(255,255,255,.55);
          position: relative;
          transition: transform .5s cubic-bezier(.16, 1, .3, 1), box-shadow .5s ease;
        }
        .doc-card:hover .doc-photo-wrap {
          transform: scale(1.02);
          box-shadow: inset 0 -1px 0 rgba(255,255,255,.55);
        }
        .doc-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        /* fallback avatar */
        .doc-fb-avatar {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--brown-soft), #fff);
          color: var(--brown-deep);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: .08em;
        }

        .doc-name {
          font-size: 18px;
          font-weight: 800;
          text-transform: none;
          color: var(--blue-deep);
          margin: 12px 0 14px;
          padding-bottom: 6px;
          letter-spacing: 0;
          line-height: 1.2;
        }
        .doc-qual {
          display: block;
          padding: 10px 12px;
          margin-bottom: 18px;
          border-radius: 14px;
          background: rgba(189,132,76,.08);
          color: var(--muted);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 1.55;
        }
        .doc-role {
          font-size: 14.5px;
          color: var(--muted);
          margin-bottom: 0;
          line-height: 1.65;
          padding-top: 14px;
          border-top: 1px solid rgba(48,53,115,.08);
        }

        @media (max-width: 600px) {
          .doc-card { padding: 0 18px 22px; border-radius: 24px; }
          .doc-photo-wrap { width: calc(100% + 36px); height: 230px; margin: 0 -18px 16px; border-radius: 0 0 22px 22px; }
          .doc-name { font-size: 17px; }
        }

        /* --- empty state --- */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          border: 1px dashed var(--line);
          border-radius: var(--radius);
          background: var(--blue-soft);
          color: var(--muted);
          max-width: 500px;
          margin: 40px auto 0;
        }
        .empty-state h3 { color: var(--blue-deep); margin-bottom: 10px; }

        /* --- cta --- */
        .cta-band {
          overflow: hidden;
          display: flex !important;
          align-items: stretch !important;
          padding: 0 !important;
        }
        .cta-copy {
          flex: 1.2;
          padding: 48px 48px 48px 48px;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cta-copy h2 { color: #fff; font-size: clamp(26px, 3.4vw, 38px); max-width: 480px; }
        .cta-copy p { color: #D6D9F0; margin-top: 12px; max-width: 440px; }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }

        .cta-form {
          flex: 1;
          background: rgba(255,255,255,.06);
          border-left: 1px solid rgba(255,255,255,.12);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cta-form h3 { color: #fff; font-size: 18px; margin-bottom: 6px; }
        .cta-form select, .cta-form input {
          width: 100%;
          padding: 13px 14px;
          margin-bottom: 11px;
          border-radius: 11px;
          border: none;
          font-size: 14px;
          font-family: inherit;
          background: #fff;
          color: var(--ink);
        }

        @media (max-width: 860px) {
          .cta-band { flex-direction: column; }
          .cta-copy { padding: 40px 24px 24px 24px !important; }
          .cta-form {
            padding: 32px 24px !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,.12) !important;
          }
        }
        @media (max-width: 480px) {
          .cta-actions { flex-direction: column; width: 100%; }
          .cta-actions .btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
          <a href="/doctors" className="active" style={{ color: "var(--brown)" }}>
            Doctors
          </a>
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a>
          <NavTreatments />
          <a href="/facilities">Facilities</a>
          <a href="/contact">Contact</a>
        </nav>
                <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="https://appointment.riochildrenshospital.com" target="_blank" rel="noreferrer">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* Hero & Search Area */}
        <section className="doc-hero">
          <div className="wrap doc-hero-in">
            <Reveal>
              <Eyebrow>Rio Specialists</Eyebrow>
              <h1>Meet Our Expert Doctors</h1>
              <p className="lede">
                Our team of dedicated paediatricians, gynaecologists, intensive care specialists, and emergency doctors are available 24/7.
              </p>
              
              {/* Live Search */}
              <div className="search-box-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by doctor name, qualification, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Sticky Department Filter Chips */}
        <section className="dept-filter-sec">
          <div className="wrap">
            <div className="chips-scroll-wrap">
              <button
                className={`dept-chip ${activeDept === "All" ? "active" : ""}`}
                onClick={() => setActiveDept("All")}
              >
                All Departments
              </button>
              {uniqueDepts.map((dept) => (
                <button
                  key={dept}
                  className={`dept-chip ${activeDept === dept ? "active" : ""}`}
                  onClick={() => setActiveDept(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results count & Listings */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            {/* Live Count */}
            <div className="results-bar">
              Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? "doctor" : "doctors"}
            </div>

            {/* List Grouped by Department */}
            {uniqueDepts.map((dept) => {
              // Get doctors in this department that match the current filters
              const deptDocs = filteredDoctors.filter((d) => d.department === dept);

              // Hide department header entirely if no matching doctors
              if (deptDocs.length === 0) return null;

              return (
                <div key={dept} className="dept-section">
                  <Reveal className="dept-header">
                    <h2>{dept}</h2>
                  </Reveal>
                  
                  <div className="doc-grid">
                    {deptDocs.map((doc, index) => {
                      // Handle fallback avatar initials
                      const initials = doc.name
                        .replace("Dr.", "")
                        .trim()
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("");

                      return (
                        <Reveal key={`${activeDept}-${searchQuery}-${doc.name}`} delay={(index % 3) * 60}>
                          <div className="doc-card">
                            <div className="doc-photo-wrap">
                              <img
                                className="doc-photo"
                                src={doc.image}
                                alt={doc.name}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  const fallback = e.target.nextSibling;
                                  if (fallback) fallback.style.display = "flex";
                                }}
                              />
                              <div className="doc-fb-avatar" style={{ display: "none" }}>
                                {initials}
                              </div>
                            </div>
                            
                            <h3 className="doc-name">{doc.name}</h3>
                            
                            {/* Omit empty qualifications line */}
                            {doc.qualifications && (
                              <div className="doc-qual">{doc.qualifications}</div>
                            )}
                            
                            <div className="doc-role">{doc.role}</div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {filteredDoctors.length === 0 && (
              <div className="empty-state">
                <h3>No doctors found</h3>
                <p>Try searching for a different name, specialty, or select another department.</p>
              </div>
            )}
          </div>
        </section>

        {/* Parenthood Journey CTA band */}
        <section className="section" id="book" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="cta-band">
              <div className="cta-copy">
                <Eyebrow light>Consultation</Eyebrow>
                <h2 style={{ marginTop: 12 }}>Start Your Parenthood Journey Today</h2>
                <p>
                  Connect with our leading neonatologists, paediatricians, gynaecologists, and fetal medicine specialists. Get in touch to schedule a visit at your preferred branch.
                </p>
                <div className="cta-actions">
                  <a className="btn btn-pink" href={SITE_LINKS.call}>
                    Call Now
                  </a>
                  <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="cta-form">
                <h3>Request a call back</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Request submitted successfully!"); }}>
                  <input type="text" placeholder="Full name" required aria-label="Full name" />
                  <input type="tel" placeholder="Phone number" required aria-label="Phone number" />
                  <select required defaultValue="" aria-label="Service needed">
                    <option value="" disabled>Service needed</option>
                    {APPOINTMENT_SERVICES.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                  <button className="btn btn-cta" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                    Request a Call Back ↗
                  </button>
                </form>
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
            <p style={{ color: "#9398C2", maxWidth: 270, fontSize: 14 }}>
              Advanced women and child healthcare across Tamil Nadu combining medical expertise, modern facilities, and compassionate care.
            </p>
            <p className="vals">TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE</p>
          </div>
          <div>
            <h4>Treatments</h4>
            <ul>
              {NAV_TREATMENTS.map((t) => (
                <li key={t.slug}>
                  <a href={`/services/${t.slug}`}>{t.name}</a>
                </li>
              ))}
            </ul>
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
        <a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a className="btn btn-cta" href="/book-appointment">
          Book
        </a>
      </div>
    </div>
  );
}
















