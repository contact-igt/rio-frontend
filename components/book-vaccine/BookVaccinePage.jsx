"use client";

import { useEffect, useMemo, useState } from "react";
import Logo from "@/components/shared/SiteLogo";
import MobileNav from "@/components/shared/MobileNav";
import NavManagement from "@/components/shared/NavManagement";
import NavTreatments from "@/components/shared/NavTreatments";
import SiteFooter from "@/components/shared/SiteFooter";
import TopStrip from "@/components/shared/TopStrip";
import { SITE_LINKS } from "@/data/site";
import { buildVaccineSchedule, formatDate, isFutureDate, parseLocalDate } from "./vaccineSchedule";
import styles from "./styles.module.css";

const EMPTY_FORM = { parentName: "", childName: "", phone: "", dob: "", gender: "" };
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [year, month, day].join("-");
}

function getCalendarDays(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index < firstWeekday ? null : new Date(year, month, index - firstWeekday + 1));
}

function validateForm(values) {
  const errors = {};
  const parentName = values.parentName.trim();
  const childName = values.childName.trim();
  const phone = values.phone.trim();
  const date = parseLocalDate(values.dob);

  if (!parentName) errors.parentName = "Parent name is required.";
  if (!childName) errors.childName = "Child name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (!/^[+]?[-()\s\d]+$/.test(phone) || phone.replace(/\D/g, "").length < 8 || phone.replace(/\D/g, "").length > 15) errors.phone = "Enter a valid phone number.";
  if (!values.dob) errors.dob = "Child date of birth is required.";
  else if (!date) errors.dob = "Enter a valid date of birth.";
  else if (isFutureDate(date)) errors.dob = "Date of birth cannot be in the future.";
  if (!values.gender) errors.gender = "Please select a gender.";

  return errors;
}

function safeFilename(name) {
  const clean = name.trim().replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return `${clean || "Child"}-Vaccination-Schedule.pdf`;
}

function loadLogo() {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = "/assets/shared/riologov2.png";
  });
}

export default function BookVaccinePage() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [generatedPatient, setGeneratedPatient] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [pdfState, setPdfState] = useState({ loading: false, error: "" });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarView, setCalendarView] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const errors = useMemo(() => validateForm(form), [form]);
  const canGenerate = Object.keys(errors).length === 0;

  useEffect(() => {
    if (!generatedPatient) return;
    const date = parseLocalDate(form.dob);
    if (!date || isFutureDate(date)) {
      setSchedule([]);
      setGeneratedPatient(null);
      return;
    }
    setSchedule(buildVaccineSchedule(date));
    setGeneratedPatient((patient) => ({ ...patient, dob: form.dob }));
  }, [form.dob]);

  const updateField = (field, value) => {
    const nextValue = field === "parentName" || field === "childName" ? value.replace(/^\s+/, "") : value;
    setForm((current) => ({ ...current, [field]: nextValue }));
  };

  const handleBlur = (field) => {
    if (field === "parentName" || field === "childName" || field === "phone") {
      setForm((current) => ({ ...current, [field]: current[field].trim() }));
    }
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const openCalendar = () => {
    const selected = parseLocalDate(form.dob);
    const initialView = selected || new Date();
    setCalendarView(new Date(initialView.getFullYear(), initialView.getMonth(), 1));
    setCalendarOpen(true);
  };

  const selectDate = (date) => {
    updateField("dob", toDateInputValue(date));
    setTouched((current) => ({ ...current, dob: true }));
    setCalendarOpen(false);
  };

  const handleGenerate = (event) => {
    event.preventDefault();
    setTouched({ parentName: true, childName: true, phone: true, dob: true, gender: true });
    if (!canGenerate) return;

    const patient = { ...form, parentName: form.parentName.trim(), childName: form.childName.trim(), phone: form.phone.trim() };
    setForm(patient);
    setGeneratedPatient(patient);
    setSchedule(buildVaccineSchedule(parseLocalDate(patient.dob)));
    setPdfState({ loading: false, error: "" });
  };

  const handlePdfDownload = async () => {
    if (!generatedPatient || !schedule.length || pdfState.loading) return;
    setPdfState({ loading: true, error: "" });

    try {
      const [{ jsPDF }, autoTableModule] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
      const autoTable = autoTableModule.default;
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const generatedDate = formatDate(new Date());
      const hospitalPhone = SITE_LINKS.call.replace(/^tel:/, "");
      const hospitalEmail = SITE_LINKS.email.replace(/^mailto:/, "");
      let logo = null;

      try {
        logo = await loadLogo();
      } catch {
        logo = null;
      }

      const drawHeader = () => {
        doc.setFillColor(48, 53, 115);
        doc.rect(0, 0, pageWidth, 28, "F");
        if (logo) doc.addImage(logo, "PNG", 15, 5, 25, 18);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text("Rio Children's Hospital", logo ? 44 : 15, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Child Vaccination Schedule", logo ? 44 : 15, 19);
        doc.setFontSize(8);
        doc.text(`Generated: ${generatedDate}`, pageWidth - 15, 12, { align: "right" });
        doc.text(`${hospitalPhone}  |  ${hospitalEmail}`, pageWidth - 15, 19, { align: "right" });
      };

      const drawFooter = (pageNumber) => {
        doc.setDrawColor(220, 222, 237);
        doc.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);
        doc.setTextColor(82, 88, 113);
        doc.setFontSize(7);
        const note = "This schedule is generated for reference based on the child's date of birth. Vaccination timing may vary based on the child's health and the doctor's advice. Please consult your pediatrician before vaccination.";
        doc.text(doc.splitTextToSize(note, pageWidth - 48), 15, pageHeight - 13);
        doc.text(`Rio Children's Hospital  |  Page ${pageNumber}`, pageWidth - 15, pageHeight - 8, { align: "right" });
      };

      drawHeader();
      doc.setTextColor(26, 26, 34);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Patient information", 15, 37);

      autoTable(doc, {
        startY: 40,
        body: [
          ["Parent Name", generatedPatient.parentName, "Child Name", generatedPatient.childName],
          ["Phone Number", generatedPatient.phone, "Child Date of Birth", formatDate(parseLocalDate(generatedPatient.dob))],
          ["Gender", generatedPatient.gender, "", ""],
        ],
        theme: "grid",
        margin: { left: 15, right: 15 },
        styles: { font: "helvetica", fontSize: 8.5, cellPadding: 2.6, valign: "middle", overflow: "linebreak", lineColor: [225, 227, 238] },
        columnStyles: {
          0: { cellWidth: 31, fontStyle: "bold", textColor: [48, 53, 115], fillColor: [247, 248, 255] },
          1: { cellWidth: 83 },
          2: { cellWidth: 37, fontStyle: "bold", textColor: [48, 53, 115], fillColor: [247, 248, 255] },
          3: { cellWidth: 100 },
        },
      });

      const scheduleStartY = doc.lastAutoTable.finalY + 8;

      autoTable(doc, {
        startY: scheduleStartY,
        head: [["S.No", "Age / Period", "Vaccine", "Recommended Date"]],
        body: schedule.map((row) => [row.serial, row.displayAge, row.vaccine, row.recommendedDate]),
        theme: "grid",
        margin: { top: 34, right: 15, bottom: 24, left: 15 },
        styles: { font: "helvetica", fontSize: 8, cellPadding: 2.2, valign: "middle", overflow: "linebreak", lineColor: [225, 227, 238] },
        headStyles: { fillColor: [48, 53, 115], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [249, 249, 253] },
        columnStyles: { 0: { cellWidth: 14, halign: "center" }, 1: { cellWidth: 43 }, 2: { cellWidth: 143 }, 3: { cellWidth: 45 } },
        rowPageBreak: "avoid",
        didDrawPage: ({ pageNumber }) => {
          if (pageNumber > 1) drawHeader();
          drawFooter(pageNumber);
        },
      });

      doc.save(safeFilename(generatedPatient.childName));
      setPdfState({ loading: false, error: "" });
    } catch {
      setPdfState({ loading: false, error: "We could not create the PDF. Please try again." });
    }
  };

  return (
    <div className={`rio ${styles.page}`}>
      <TopStrip callHref={SITE_LINKS.call} />
      <header className={`header ${solid ? "solid" : ""}`}>
        <Logo />
        <nav className="nav">
          <a href="/">Home</a><a href="/about">About</a><NavManagement />
          <a href="/paediatric-super-specialities">Pediatric Super Specialities</a><NavTreatments />
          <a href="/facilities">Facilities</a><a href="/contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-line btn-sm" href="/book-vaccine">Book Vaccine</a>
          <a className="btn btn-coral btn-sm" href="/book-appointment">Book an Appointment</a>
        </div>
        <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className="vaccine-hero">
          <div className="vaccine-hero-image" /><div className="vaccine-hero-overlay" />
          <div className="vaccine-hero-content">
            <span className="eyebrow light"><i className="ey-dot" />Vaccination care</span>
            <h1>Protect every little <span>tomorrow.</span></h1>
            <p>Build a personalised vaccination plan for your child from birth through 10 years of age.</p>
          </div>
        </section>

        <section className="section vaccine-form-section">
          <div className="wrap vaccine-layout">
            <div className="vaccine-form-copy">
              <span className="eyebrow"><i className="ey-dot" />Child immunisation</span>
              <h2>Generate your child&apos;s vaccine schedule</h2>
              <p className="sec-note">Enter the child&apos;s date of birth and we will calculate the recommended vaccination dates. Your details remain only in this browser session.</p>
            </div>
            <form className="vaccine-form-card" noValidate onSubmit={handleGenerate}>
              <div className="vaccine-form-grid">
                {[
                  ["parentName", "Parent Name", "text", "Parent or guardian name"],
                  ["childName", "Child Name", "text", "Child's full name"],
                  ["phone", "Parent Phone Number", "tel", "Phone number"],
                ].map(([field, label, type, placeholder]) => (
                  <label className="vaccine-field" key={field}>
                    <span>{label}</span>
                    <input type={type} value={form[field]} placeholder={placeholder} max={field === "dob" ? new Date().toISOString().slice(0, 10) : undefined} onChange={(event) => updateField(field, event.target.value)} onBlur={() => handleBlur(field)} aria-invalid={Boolean(touched[field] && errors[field])} />
                    {touched[field] && errors[field] && <em>{errors[field]}</em>}
                  </label>
                ))}
                <div className="vaccine-field vaccine-date-field">
                  <span>Child Date of Birth</span>
                  <button type="button" className="date-picker-trigger" onClick={openCalendar} aria-haspopup="dialog" aria-expanded={calendarOpen} aria-label="Select child date of birth">
                    <span className={form.dob ? "date-picker-value" : "date-picker-placeholder"}>{form.dob ? formatDate(parseLocalDate(form.dob)) : "Select date of birth"}</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3v3M17 3v3M4.5 9h15M5.5 5.5h13a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z" /><path d="M8 13h.01M12 13h.01M16 13h.01M8 16h.01M12 16h.01" /></svg>
                  </button>
                  {calendarOpen && <div className="date-picker-popover" role="dialog" aria-label="Choose date of birth">
                    <div className="date-picker-head"><button type="button" onClick={() => setCalendarView((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))} aria-label="Previous month">‹</button><strong>{MONTH_NAMES[calendarView.getMonth()]} {calendarView.getFullYear()}</strong><button type="button" disabled={calendarView.getFullYear() === new Date().getFullYear() && calendarView.getMonth() === new Date().getMonth()} onClick={() => setCalendarView((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))} aria-label="Next month">›</button></div>
                    <div className="date-picker-weekdays">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => <span key={day}>{day}</span>)}</div>
                    <div className="date-picker-days">{getCalendarDays(calendarView).map((date, index) => date ? <button type="button" key={toDateInputValue(date)} disabled={date > new Date()} className={form.dob === toDateInputValue(date) ? "selected" : ""} onClick={() => selectDate(date)}>{date.getDate()}</button> : <span key={"empty-" + index} />)}</div>
                  </div>}
                  {touched.dob && errors.dob && <em>{errors.dob}</em>}
                </div>
                <fieldset className="vaccine-field vaccine-gender-field">
                  <legend>Gender</legend>
                  <div className="gender-options">
                    {["Male", "Female"].map((gender) => <label className={form.gender === gender ? "selected" : ""} key={gender}><input type="radio" name="gender" value={gender} checked={form.gender === gender} onChange={(event) => updateField("gender", event.target.value)} onBlur={() => handleBlur("gender")} /><span className="gender-radio" aria-hidden="true" />{gender}</label>)}
                  </div>
                  {touched.gender && errors.gender && <em>{errors.gender}</em>}
                </fieldset>
              </div>
              <button className="btn btn-cta vaccine-submit" type="submit" disabled={!canGenerate}>Generate Vaccine Schedule</button>
            </form>
          </div>
        </section>

        {generatedPatient && schedule.length > 0 && (
          <section className="section vaccine-results-section">
            <div className="wrap">
              <div className="schedule-heading">
                <div><span className="eyebrow"><i className="ey-dot" />Vaccination chart</span><h2>Your child&apos;s recommended schedule</h2></div>
                <button type="button" className="btn btn-pink" disabled={pdfState.loading} onClick={handlePdfDownload}>{pdfState.loading ? "Creating PDF…" : "Download Vaccine Chart PDF"}</button>
              </div>
              {pdfState.error && <p className="pdf-error" role="alert">{pdfState.error}</p>}
              <div className="patient-summary">
                <div><span>Parent Name</span><strong>{generatedPatient.parentName}</strong></div>
                <div><span>Child Name</span><strong>{generatedPatient.childName}</strong></div>
                <div><span>Phone Number</span><strong>{generatedPatient.phone}</strong></div>
                <div><span>Child Date of Birth</span><strong>{formatDate(parseLocalDate(generatedPatient.dob))}</strong></div>
                <div><span>Gender</span><strong>{generatedPatient.gender}</strong></div>
              </div>
              <div className="schedule-table-wrap">
                <table className="schedule-table">
                  <thead><tr><th>S.No</th><th>Age / Period</th><th>Vaccine</th><th>Recommended Date</th></tr></thead>
                  <tbody>{schedule.map((row) => <tr key={row.serial}><td data-label="S.No">{row.serial}</td><td data-label="Age / Period">{row.displayAge}</td><td data-label="Vaccine">{row.vaccine}</td><td data-label="Recommended Date">{row.recommendedDate}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="schedule-note">This schedule is generated for reference based on the child&apos;s date of birth. Vaccination timing may vary based on the child&apos;s health and the doctor&apos;s advice. Please consult your pediatrician before vaccination.</p>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      <div className="mbar"><a className="btn btn-pink" href={SITE_LINKS.call}>Call</a><a className="btn btn-green" href={SITE_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a className="btn btn-cta" href="/book-appointment">Book</a></div>
    </div>
  );
}
