import { NAV_TREATMENTS } from "@/data/site";

const DEFAULT_CTA_BUTTONS = [
  { href: "/book-appointment", label: "Book an Appointment", className: "btn btn-cta" },
  { href: "tel:+917708318222", label: "Call Now", className: "btn btn-pink" },
  {
    href: "https://wa.me/917708318222",
    label: "WhatsApp",
    className: "btn btn-green",
    target: "_blank",
    rel: "noreferrer",
  },
];

export default function MobileNav({
  open,
  onClose,
  showDoctors = true,
  ctaButtons = DEFAULT_CTA_BUTTONS,
}) {
  return (
    <div className={`mnav ${open ? "open" : ""}`} onClick={onClose}>
      <div className="mnav-panel" onClick={(e) => e.stopPropagation()}>
        <button className="mnav-x" aria-label="Close menu" onClick={onClose}>
          ×
        </button>
        <a className="mnav-link" href="/" onClick={onClose}>
          Home
        </a>
        <a className="mnav-link" href="/about" onClick={onClose}>
          About
        </a>
        <div className="mnav-group">
          <span className="mnav-h">Management</span>
          <a className="mnav-sub" href="/about/chairman" onClick={onClose}>
            Founder & Chairman
          </a>
          <a className="mnav-sub" href="/about/management" onClick={onClose}>
            Management Team
          </a>
          {showDoctors ? (
            <a className="mnav-sub" href="/doctors" onClick={onClose}>
              Our Doctors
            </a>
          ) : null}
        </div>
        <a className="mnav-link" href="/paediatric-super-specialities" onClick={onClose}>
          Paediatric Super Specialities
        </a>
        <a className="mnav-link" href="/facilities" onClick={onClose}>
          Facilities
        </a>
        <a className="mnav-link" href="/book-vaccine" onClick={onClose}>
          Book Vaccine
        </a>
        <div className="mnav-group">
          <span className="mnav-h">Treatments</span>
          {NAV_TREATMENTS.map((t) => (
            <a key={t.slug} className="mnav-sub" href={`/services/${t.slug}`} onClick={onClose}>
              {t.name}
            </a>
          ))}
          <a className="mnav-sub mnav-all" href="/treatments" onClick={onClose}>
            View all treatments →
          </a>
        </div>
        <a className="mnav-link" href="/contact" onClick={onClose}>
          Contact
        </a>
        <div className="mnav-cta">
          {ctaButtons.map((button) => (
            <a
              key={`${button.label}-${button.href}`}
              className={button.className}
              href={button.href}
              target={button.target}
              rel={button.rel}
              onClick={onClose}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
