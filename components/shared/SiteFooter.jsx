import SiteLogo from "@/components/shared/SiteLogo";
import { APPOINTMENT_SERVICES, BRANCH_NAMES, SITE_LINKS } from "@/data/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <div className={styles.logoSpace}>
            <SiteLogo footer />
          </div>
          <p className={styles.description}>
            Advanced women and child healthcare across Tamil Nadu combining
            medical expertise, modern facilities, and compassionate care.
          </p>
          <p className="values">TRUST • CARE • INNOVATION • COMPASSION • EXCELLENCE</p>
        </div>
        <div>
          <h4>Treatments</h4>
          <ul>
            {APPOINTMENT_SERVICES.slice(0, 6).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Branches</h4>
          <ul>
            {BRANCH_NAMES.map((branch) => (
              <li key={branch}>{branch}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={SITE_LINKS.call}>📞 +91 77083 18222</a></li>
            <li><a href={SITE_LINKS.email}>✉ info@riohospital.com</a></li>
            <li><a href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={SITE_LINKS.youtube} target="_blank" rel="noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Rio Children's Hospital</span>
        <span>Built by Invictus Global Tech</span>
      </div>
    </footer>
  );
}
