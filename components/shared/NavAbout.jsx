"use client";

export default function NavAbout({ active = false }) {
  return (
    <div className="nav-dd">
      <a href="/about" className={`nav-dd-trigger${active ? " active" : ""}`}>
        About <span className="cv">▼</span>
      </a>
      <div className="nav-dd-menu">
        <a href="/about">About Us</a>
        <a href="/about/chairman">Founder & Chairman</a>
        <a href="/about/management">Management Team</a>
      </div>
    </div>
  );
}
