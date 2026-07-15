"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { SITE_LINKS } from "@/data/site";

const LEADERS = [
  {
    name: "Dr. Saravanan.M",
    role: "Chairman & Managing Director",
    qual: "MBBS., DCH., MRCP(UK).,",
    image: "/assets/doctors/chairman.png", // Add path to image here, e.g. "/assets/about/dr-saravanan.jpg"
    desc: "Provides overall strategic vision, co-founder leadership, and clinical direction for the hospital group, bringing decades of neonatal and paediatric intensive care experience.",
  },
  {
    name: "Mrs. Kavitha",
    role: "Executive Director",
    qual: "MCA",
    image: "/assets/doctors/", // Add path to image here, e.g. "/assets/about/mrs-kavitha.jpg"
    desc: "Directs hospital operations, execution of administrative protocols, and oversees IT systems and quality management across all branches.",
  },
  {
    name: "Mr. Krishnakumar. V",
    role: "Chief Executive Officer",
    qual: "MHM (Hospl. Mgt)",
    image: "", // Add path to image here, e.g. "/assets/about/mr-krishnakumar.jpg"
    desc: "Leads operational management, clinical excellence guidelines, corporate partnerships, and expansion execution for the hospital group.",
  },
  {
    name: "Mr. Dinesh Pandian",
    role: "Vice President : Legal & Projects",
    qual: "BE., LLB.,",
    image: "", // Add path to image here, e.g. "/assets/about/mr-dinesh.jpg"
    desc: "Directs legal regulatory compliance, project construction, expansion execution, and government liaison for the Rio Hospital Group.",
  }
];

const APPT_SERVICES = ["High-Risk Pregnancy Care", "Fetal Medicine", "NICU", "PICU", "Paediatric Emergency Care", "General Paediatrics", "Vaccination Services", "Human Milk Bank", "Maternity Care"];

const LINKS = {
  call: "tel:+917708318222",
  whatsapp: "https://wa.me/917708318222",
  instagram: "https://instagram.com/riochildrenhospitals",
};

export default function ManagementPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 40);
      const vh = window.innerHeight;
      const sc = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? sc / max : 0})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="rio management-page">
      <style>{`
        /* Progress & Header styles */
        .progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--coral), var(--green));
          transform: scaleX(0);
          transform-origin: left;
          z-index: 1000;
          transition: transform 0.1s ease-out;
        }

        /* Banner styling */
        .mgmt-hero {
          display: flex;
          position: relative;
          background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue) 100%);
          min-height: 360px;
          overflow: hidden;
          align-items: stretch;
          width: 100%;
        }

        .mgmt-hero-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }

        .mgmt-hero-left {
          width: 56%;
          padding: 64px 40px 64px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 3;
        }

        .mgmt-hero-left h1 {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 800;
          color: #ffffff !important;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .mgmt-hero-tagline {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .mgmt-hero-line {
          display: inline-block;
          width: 32px;
          height: 3px;
          background-color: #ffffff;
          margin-right: 12px;
          border-radius: 2px;
        }

        .mgmt-hero-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(13px, 1.8vw, 15px);
          font-weight: 700;
          color: #00a2ff !important;
          letter-spacing: 0.02em;
        }

        .mgmt-hero-desc {
          font-size: 15px;
          color: #d6d9f0;
          line-height: 1.6;
        }

        .mgmt-hero-desc p {
          margin-bottom: 6px;
          color: #d6d9f0 !important;
        }

        .mgmt-hero-desc p:last-child {
          margin-bottom: 0;
        }

        /* Leaf Decoration SVG */
        .mgmt-hero-leaf {
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.16;
          pointer-events: none;
          z-index: 1;
        }

        .mgmt-hero-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 44vw; /* stretches to the right edge of screen */
          z-index: 2;
          overflow: hidden;
        }

        .mgmt-hero-skewed {
          position: absolute;
          inset: 0;
          left: 30px;
          transform: skewX(14deg);
          border-left: 10px solid #ffffff;
          border-bottom-left-radius: 40px;
          overflow: hidden;
          background: #081735;
        }

        .mgmt-hero-skewed img {
          width: 130%;
          height: 100%;
          object-fit: cover;
          transform: skewX(-14deg) scale(1.15);
          transform-origin: center center;
        }

        @media (max-width: 900px) {
          .mgmt-hero {
            flex-direction: column;
            min-height: auto;
          }
          .mgmt-hero-container {
            flex-direction: column;
            padding: 40px 20px 0;
          }
          .mgmt-hero-left {
            width: 100%;
            padding: 0 0 32px;
          }
          .mgmt-hero-right {
            position: relative;
            width: 100%;
            height: 260px;
            right: auto;
            top: auto;
            bottom: auto;
          }
          .mgmt-hero-skewed {
            left: 0;
            transform: none;
            border-left: none;
            border-top: 8px solid #ffffff;
            border-bottom-left-radius: 0;
          }
          .mgmt-hero-skewed img {
            width: 100%;
            transform: none;
          }
        }

        /* Management Grid */
        .mgmt-section {
          padding: 80px 0;
          background: #ffffff;
        }

        .mgmt-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (max-width: 768px) {
          .mgmt-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* Leader Card */
        .leader-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 36px;
          display: flex;
          gap: 24px;
          align-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
        }

        .leader-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -18px rgba(48, 53, 115, 0.12);
          border-color: rgba(48, 53, 115, 0.18);
        }

        @media (max-width: 580px) {
          .leader-card {
            flex-direction: column;
            padding: 24px;
            gap: 16px;
            align-items: center;
            text-align: center;
          }
        }

        /* Styled Image Placeholder inside Card */
        .leader-avatar-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--blue-soft);
          border: 2px dashed rgba(48, 53, 115, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s, background 0.3s;
          overflow: hidden;
        }

        .leader-avatar-placeholder.has-image {
          border: 1px solid var(--line);
          background: #f8fafc;
        }

        .leader-avatar-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .leader-card:hover .leader-avatar-placeholder:not(.has-image) {
          border-color: var(--pink);
          background: var(--pink-soft);
        }

        .leader-avatar-placeholder svg {
          width: 44px;
          height: 44px;
          color: rgba(48, 53, 115, 0.3);
          transition: color 0.3s;
        }

        .leader-card:hover .leader-avatar-placeholder svg {
          color: var(--pink-deep);
        }

        .leader-info h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--blue);
          margin-bottom: 4px;
        }

        .leader-role {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pink-deep);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .leader-qual {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 12px;
        }

        .leader-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--muted);
        }
      `}</style>

      <div className="progress" ref={progressRef} />
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
        {/* Banner Hero */}
        <section className="mgmt-hero">
          <div className="mgmt-hero-leaf">
            <svg viewBox="0 0 100 100" width="180" height="180" fill="none">
              <path d="M10 80 C 30 50, 50 30, 80 10" stroke="rgba(21, 59, 117, 0.08)" strokeWidth="1.5" />
              <path d="M30 60 C 25 50, 20 52, 18 55 C 20 60, 25 62, 30 60" fill="rgba(21, 59, 117, 0.08)" />
              <path d="M40 50 C 35 40, 30 42, 28 45 C 30 50, 35 52, 40 50" fill="rgba(21, 59, 117, 0.08)" />
              <path d="M50 40 C 45 30, 40 32, 38 35 C 40 40, 45 42, 50 40" fill="rgba(21, 59, 117, 0.08)" />
              <path d="M60 30 C 55 20, 50 22, 48 25 C 50 30, 55 32, 60 30" fill="rgba(21, 59, 117, 0.08)" />
              <path d="M70 20 C 65 10, 60 12, 58 15 C 60 20, 65 22, 70 20" fill="rgba(21, 59, 117, 0.08)" />
            </svg>
          </div>
          <div className="mgmt-hero-container">
            <div className="mgmt-hero-left">
              <h1>Our Management</h1>
              <div className="mgmt-hero-tagline">
                <span className="mgmt-hero-line"></span>
                <span className="mgmt-hero-tag">Visionary Leadership. Compassionate Care.</span>
              </div>
              <div className="mgmt-hero-desc">
                <p>Guided by experience. Driven by purpose.</p>
                <p>Our management team leads with vision and values to create a healthier tomorrow.</p>
              </div>
            </div>
          </div>
          <div className="mgmt-hero-right">
            <div className="mgmt-hero-skewed">
              <img
                src="/assets/shared/branch-madurai-main.png"
                alt="Rio Children's Hospital Building"
              />
            </div>
          </div>
        </section>

        {/* Management Members */}
        <section className="mgmt-section">
          <div className="wrap mgmt-grid">
            {LEADERS.map((l) => (
              <div className="leader-card" key={l.name}>
                <div className={`leader-avatar-placeholder ${l.image && !l.image.endsWith("/") ? "has-image" : ""}`}>
                  {l.image && !l.image.endsWith("/") ? (
                    <img src={l.image} alt={l.name} />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  )}
                </div>
                <div className="leader-info">
                  <div className="leader-role">{l.role}</div>
                  <h3>{l.name}</h3>
                  <div className="leader-qual">{l.qual}</div>
                  <p className="leader-desc">{l.desc}</p>
                </div>
              </div>
            ))}
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
