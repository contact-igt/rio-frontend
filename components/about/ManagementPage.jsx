"use client";

import SiteFooter from "@/components/shared/SiteFooter";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import NavTreatments from "@/components/shared/NavTreatments";
import NavManagement from "@/components/shared/NavManagement";
import MobileNav from "@/components/shared/MobileNav";
import TopStrip from "@/components/shared/TopStrip";
import { SITE_LINKS } from "@/data/site";
import styles from "./management-page/styles.module.css";

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
    <div className={`rio management-page ${styles.page}`}>

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

      <SiteFooter />
    </div>
  );
}
