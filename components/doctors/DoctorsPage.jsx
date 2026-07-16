"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import TopStrip from "@/components/shared/TopStrip";
import { APPOINTMENT_SERVICES, BRANCH_NAMES, SITE_LINKS } from "@/data/site";
import { doctors } from "@/data/doctors";
import styles from "./styles.module.css";

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
  const chipsRef = useRef(null);

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

  const scrollChips = (direction) => {
    chipsRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  return (
    <div className={`rio ${styles.page}`}>

      <TopStrip callHref={SITE_LINKS.call} />

      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <NavManagement />
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
            <div className={styles.chipsControl}>
              <button
                type="button"
                className={styles.chipsArrow}
                aria-label="Scroll departments left"
                onClick={() => scrollChips(-1)}
              >
                ←
              </button>
              <div ref={chipsRef} className="chips-scroll-wrap">
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
              <button
                type="button"
                className={styles.chipsArrow}
                aria-label="Scroll departments right"
                onClick={() => scrollChips(1)}
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* Results count & Listings */}
        <section className={`section ${styles.sectionNoTop}`}>
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
                              <div className={`doc-fb-avatar ${styles.hidden}`}>
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
        <section className={`section ${styles.sectionNoTop}`} id="book">
          <div className="wrap">
            <Reveal className="cta-band">
              <div className="cta-copy">
                <Eyebrow light>Consultation</Eyebrow>
                <h2 className={styles.headingTop}>Start Your Parenthood Journey Today</h2>
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
                  <button className={`btn btn-cta ${styles.fullButton}`} type="submit">
                    Request a Call Back ↗
                  </button>
                </form>
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
















