import { SITE_LINKS } from "@/data/site";

const actions = [
  { label: "Phone", href: SITE_LINKS.call, icon: "phone", tone: "phone" },
  { label: "WA", href: SITE_LINKS.whatsapp, icon: "chat", tone: "whatsapp", external: true },
  { label: "Insta", href: SITE_LINKS.instagram, icon: "instagram", tone: "instagram", external: true },
  { label: "Book", href: "/book-appointment", icon: "calendar", tone: "book" },
  { label: "Address", href: "https://maps.app.goo.gl/togePDBA37cXGmjo9", icon: "pin", tone: "address", external: true },
];

function ActionIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.1, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "phone") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M21 16.8v2.4a1.6 1.6 0 0 1-1.75 1.6A15.8 15.8 0 0 1 3.2 4.75 1.6 1.6 0 0 1 4.8 3H7.2a1.6 1.6 0 0 1 1.6 1.37c.1.77.3 1.52.61 2.23a1.6 1.6 0 0 1-.36 1.69L8 9.34a12.8 12.8 0 0 0 6.66 6.66l1.05-1.05a1.6 1.6 0 0 1 1.69-.36c.71.31 1.46.52 2.23.61A1.6 1.6 0 0 1 21 16.8Z" /></svg>;
  if (name === "chat") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M20.5 11.2a8.5 8.5 0 0 1-12.54 7.5L3.5 20l1.32-4.15A8.5 8.5 0 1 1 20.5 11.2Z" /></svg>;
  if (name === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3" y="3" width="18" height="18" rx="5" /><circle {...common} cx="12" cy="12" r="4" /><path {...common} d="M17.5 6.5h.01" /></svg>;
  if (name === "calendar") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3" y="5" width="18" height="16" rx="2" /><path {...common} d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle {...common} cx="12" cy="10" r="2.5" /></svg>;
}

export default function MobileCtaBar() {
  return <nav className="mobile-cta-bar" aria-label="Quick contact actions">{actions.map(({ label, href, icon, tone, external }) => <a className={"mobile-cta-bar__action mobile-cta-bar__action--" + tone} href={href} key={label} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}><ActionIcon name={icon} /><span>{label}</span></a>)}</nav>;
}
