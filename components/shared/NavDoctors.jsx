"use client";

import { usePathname } from "next/navigation";
import { isDoctorsPath } from "./navState";

export default function NavDoctors({ active = false }) {
  const pathname = usePathname?.() ?? "";
  const isActive = active || isDoctorsPath(pathname);

  return (
    <a href="/doctors" className={`nav-dd-trigger${isActive ? " active" : ""}`}>
      Doctors
    </a>
  );
}
