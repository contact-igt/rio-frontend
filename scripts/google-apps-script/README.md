# Google Apps Script — lead sheets

These are edited and deployed from the Apps Script editor (script.google.com),
not built by this repo — this folder just keeps the deployed source under
version control so changes are reviewable.

## Code.gs — Contact / Book Appointment (unchanged)

Bound to the existing shared spreadsheet's "Sheet1". Untouched — still backs
the Contact page and Book Appointment forms exactly as before.

## VaccineChartCode.gs — standalone Vaccine Chart spreadsheet

A separate script for a **brand-new, dedicated spreadsheet** that mirrors
Book Vaccine form submissions (registration number, parent/child details,
phone, DOB, gender). Creates its own "Vaccine Chart" sheet automatically on
first submission.

**This is not the primary storage for vaccine bookings** — see below.

## Primary storage: the Rio admin panel

The Book Vaccine form's real source of truth is now the Rio admin panel
(`invictus-admin-panel`), not a spreadsheet:

- Backend: `invictus_lead_backend/src/modules/rioVaccineChart/` — a new
  module (table `rio_vaccine_chart_leads`, mirroring the existing `rio`
  module's pattern) exposing:
  - `POST /api/v1/rio-vaccine-chart/register` — public, used by the website
    (requires `X-Client-Key: rio`, same key as Contact/Appointment).
  - `GET/POST/PATCH/DELETE /api/v1/rio-vaccine-chart[/:id]` — authenticated
    admin CRUD.
  - Mounted as a **flat, sibling path** (`/api/v1/rio-vaccine-chart`), not
    nested under `/api/v1/rio` — the existing `rio.routes.js` has an
    unconditional `router.use(authenticateToken)` with no path filter that
    would otherwise swallow any nested sub-path before it reaches this
    module, returning a bare 401 "Unauthorized".
- Frontend admin: `invictus_lead_admin/src/config/clients.ts` — added a
  second table entry under the existing `rio` client (`id: "vaccine-chart"`,
  endpoint `/rio-vaccine-chart`). This uses the same generic `DynamicSection`
  table component every other config-driven client table uses, so no new
  React components were needed — it just shows up as a **"Vaccine Chart
  Leads"** item under the Rio section in the sidebar automatically.
- Website: `rio-frontend/lib/vaccineRegistration.js` posts JSON to
  `${NEXT_PUBLIC_API_BASE_URL}/rio/vaccine-chart/register`, mirroring
  `lib/rioRegistration.js`'s pattern exactly.

**Deployment note**: `invictus_lead_backend` calls `sequelize.sync()` on
startup, which creates any missing tables from their model definitions —
the new `rio_vaccine_chart_leads` table will be created automatically the
next time that backend restarts/redeploys. No manual migration needed.

## Using VaccineChartCode.gs alongside the admin panel

If you *also* want every Book Vaccine submission mirrored into the
standalone spreadsheet (e.g. for staff without admin panel access), deploy
`VaccineChartCode.gs` to a new spreadsheet and add a second `fetch()` call
in `lib/vaccineRegistration.js` pointing at its `/exec` URL — this isn't
wired in by default. Ask for it if you want that dual-write added.
