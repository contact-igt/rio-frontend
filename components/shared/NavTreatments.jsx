import { NAV_TREATMENTS } from "@/data/site";

export default function NavTreatments({ active = false }) {
  return (
    <div className="nav-dd">
      <a href="/treatments" className={`nav-dd-trigger${active ? " active" : ""}`}>
        Treatments <span className="cv">▼</span>
      </a>
      <div className="nav-dd-menu">
        {NAV_TREATMENTS.map((t) => (
          <a key={t.slug} href={`/services/${t.slug}`}>
            {t.name}
          </a>
        ))}
        <a className="nav-dd-all" href="/treatments">
          View all treatments →
        </a>
      </div>
    </div>
  );
}
