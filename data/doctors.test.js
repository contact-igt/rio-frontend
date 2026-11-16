const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const doctorsSource = fs.readFileSync(path.join(__dirname, "doctors.js"), "utf8");

test("includes Dr. Suresh Kumar in the General Paediatric directory", () => {
  assert.match(
    doctorsSource,
    /\{ "department": "General Paediatric", "name": "Dr\. Suresh Kumar", "qualifications": "MBBS, MD Paediatrics", "role": "Senior Resident - Paediatrics, Madurai", "image": "\/assets\/doctors\/Suresh Kumar\.jpeg" \}/,
  );
});

test("includes Natasha Ann Mary Mathew in the multidisciplinary team directory", () => {
  assert.match(
    doctorsSource,
    /\{ "department": "Multidisciplinary Team of Neuro Developmental Experts", "subSpeciality": "Psychology", "name": "Natasha Ann Mary Mathew", "qualifications": "MPhil Rehabilitation Psychology, MSc Clinical Psychology", "role": "RCI Licensed Psychologist", "image": "\/assets\/doctors\/Natasha 02 new\.png" \}/,
  );
});

test("includes the new anaesthesiology and hospital administration profiles", () => {
  const expectedProfiles = [
    /\{ "department": "Anaesthesiology", "name": "Dr\. Bhuvaneshwar", "qualifications": "MBBS, MD - Anaesthesia", "role": "Junior Consultant - Anaesthesiology, Thanjavur", "image": "\/assets\/doctors\/Bhuwaneshwar-new\.png" \}/,
    /\{ "department": "Anaesthesiology", "name": "Dr\. Raghavi", "qualifications": "MBBS, MD - Anaesthesia", "role": "Associate Consultant - Emergency Medicine, Madurai", "image": "\/assets\/doctors\/Ragavi new\.png" \}/,
    /\{ "department": "Anaesthesiology", "name": "Dr\. Ramya Ragul", "qualifications": "MBBS, MD - Anaesthesia", "role": "Senior Resident - Anaesthesiology, Thanjavur", "image": "\/assets\/doctors\/Ramya new\.png" \}/,
    /\{ "department": "Hospital Administration", "name": "Sudhakar Kanmani", "qualifications": "B\.Sc \(UK\), MBBS, MBA \(UK\)", "role": "Head - Operations, Thanjavur", "image": "\/assets\/doctors\/Sudhakar\.png" \}/,
  ];

  for (const profile of expectedProfiles) {
    assert.match(doctorsSource, profile);
  }
});

test("includes the newly supplied family medicine, genetic medicine, neonatal, and paediatric intensive care profiles", () => {
  const expectedProfiles = [
    /\{ "department": "Adult Care Team", "subSpeciality": "Family Medicine", "name": "Dr\. Wasim", "qualifications": "Family Medicine", "role": "Consultant - Family Medicine", "image": "\/assets\/doctors\/Dr\.Wasim new\.png" \}/,
    /\{ "department": "Paediatric Super Specialities", "subSpeciality": "Genetic Medicine", "name": "Dr\. Vijay Prabhu", "qualifications": "MD\., DCH\., FCG\.,", "role": "Consultant - Genetic Medicine", "image": "\/assets\/doctors\/Dr\.Vijay Prabhu-new\.png" \}/,
    /\{ "department": "General Paediatric", "name": "Dr\. C\.S\. Senthil Kumar", "qualifications": "MD, DCH", "role": "Consultant - General Paediatrics", "image": "\/assets\/doctors\/Dr\.C\.S\.SENTHIL KUMAR\.jpeg" \}/,
    /\{ "department": "Neonatal Intensive Care Unit", "name": "Dr\. Vivetha", "qualifications": "MD, DM \(Neonatology\)", "role": "Consultant - NICU and General Paediatrics", "image": "\/assets\/doctors\/Dr\. Vivetha-new\.png" \}/,
    /\{ "department": "Paediatric Intensive Care Unit", "name": "Dr\. R\.M\. Dinesh Babu", "qualifications": "MD, DNB \(Paed\), IDPCCM \(PICU\), Fellowship in ECMO \(ESOI\), Fellowship in Paediatric Diabetes \(ISPAED\), MBA \(Healthcare\)", "role": "Consultant - Paediatric Intensive Care Unit · IAP-PICU Accredited Teacher", "image": "\/assets\/doctors\/Dr R\.M\.DINESH BABU-new\.png", "imageFit": "cover", "imageWidth": "72%", "objectPosition": "center top", "mobileObjectPosition": "center top" \}/,
  ];

  for (const profile of expectedProfiles) {
    assert.match(doctorsSource, profile);
  }
});
