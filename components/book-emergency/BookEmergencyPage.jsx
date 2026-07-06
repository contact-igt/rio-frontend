"use client";

import { useState } from "react";

const IMG = { logo: "/assets/shared/riologov2.png", hero: "/assets/shared/site-hero.png" };
const LINKS = { call: "tel:+917708318222", whatsapp: "https://wa.me/917708318222" };
const BRANCHES = ["Madurai (Main)", "Southwing, Madurai", "Dindigul", "Thanjavur"];
const SERVICES = ["High-Risk Pregnancy Care", "Fetal Medicine", "NICU", "PICU", "Paediatric Emergency Care", "General Paediatrics", "Vaccination Services", "Human Milk Bank", "Maternity Care", "Fertility & IVF"];

function Logo() { return <a className="logo" href="/" aria-label="Rio Children's Hospital — Home"><img className="logo-img" src="/assets/shared/riologov2.png" alt="Rio Children's Hospital" /></a>; }

export default function BookEmergencyPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="rio booking-page">
      <style>{`
      `}</style>
      <div className="topstrip">24/7 Emergency • NICU • PICU — <a href={LINKS.call}>Call now: +91 77083 18222</a></div>
      <header className="header"><Logo /><nav className="nav"><a href="/">Home</a><a href="/about">About</a><a href="/treatments">Treatments</a><a href="/contact">Contact</a></nav><a className="btn btn-brown" href="/book-appointment">Book Appointment</a></header>
      <main><section className="hero"><div className="wrap hero-grid"><div><span className="eyebrow">Book Emergency Visit</span><h1>Emergency care, <span>ready now</span>.</h1><p className="lede">For sudden illness, accidents, newborn emergencies or critical symptoms, call immediately or submit your visit details so the Rio team can prepare for your arrival.</p><div className="actions"><a className="btn btn-pink" href={LINKS.call}>Call Emergency Care</a><a className="btn btn-green" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="panel"><h2>Prepare an emergency visit</h2><p style={{marginTop:8}}>If this is urgent, call first. This form helps our team prepare while you travel.</p>{sent ? <div className="done" style={{marginTop:20}}>Thanks. Our care team will contact you shortly.</div> : <form className="form" onSubmit={(e)=>{e.preventDefault();setSent(true);}}><div className="field"><label>Full name</label><input required placeholder="Your name" /></div><div className="field"><label>Phone</label><input required type="tel" placeholder="Phone number" /></div><div className="field"><label>Preferred branch</label><select required defaultValue=""><option value="" disabled>Select a branch</option>{BRANCHES.map((b)=><option key={b}>{b}</option>)}</select></div><div className="field"><label>Service needed</label><select required defaultValue=""><option value="" disabled>Select a service</option>{SERVICES.map((s)=><option key={s}>{s}</option>)}</select></div><div className="field"><label>Message</label><textarea placeholder="Tell us briefly how we can help" /></div><button className="btn btn-brown" type="submit">Submit request</button></form>}</div></div></section><section className="wrap info"><div className="card"><strong>24/7 response</strong><p>Emergency support is available day and night across all four Rio branches.</p></div><div className="card"><strong>Specialist guidance</strong><p>Our team routes you to the right doctor, department and branch for your need.</p></div><div className="card"><strong>Family-first care</strong><p>Clear communication, compassionate support and coordinated women and child healthcare.</p></div></section></main>
      <footer className="footer"><div className="wrap"><span>© 2026 Rio Children's Hospital</span><span>Built by Invictus Global Tech</span></div></footer>
    </div>
  );
}
