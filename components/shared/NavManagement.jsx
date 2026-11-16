"use client";

import { usePathname } from "next/navigation";

export default function NavManagement({ active = false }) {
  const pathname = usePathname?.() ?? "";
  const isActive =
    active ||
    pathname === "/about/chairman" ||
    pathname === "/about/management";

  return (
    <div className="nav-dd">
      <a
        href="/about/management"
        className={`nav-dd-trigger${isActive ? " active" : ""}`}
      >
        Management <span className="cv">▼</span>
      </a>
      <div className="nav-dd-menu">
        <a href="/about/chairman">Founder &amp; Chairman</a>
        <a href="/about/management">Management Team</a>
      </div>
    </div>
  );
}
