# Google Apps Script — Rio lead sheets

Edited and deployed from the Apps Script editor (script.google.com), not
built by this repo — this folder just keeps the deployed source under
version control so changes are reviewable.

## RioSheetCode.gs — the single script (current)

One Apps Script, bound to **one spreadsheet**, with two tabs:

| Tab | Fed by | Fields |
|---|---|---|
| `Sheet1` | Contact page + Book Appointment | Name, Phone, Branch, Service, Concern, Message, Submitted On, IP Address, UTM Source |
| `Vaccine Chart` | Book Vaccine | Registration Number, Parent Name, Child Name, Phone, Child DOB, Gender, Submitted On, IP Address, UTM Source |

Routing is by an explicit `form_type` field the caller sends
(`"contact"` or `"vaccine_chart"`) — never guessed from which fields are
present, so a partial payload can't land in the wrong tab. A missing
`form_type` defaults to `"contact"` so nothing that used to work with the
old `Code.gs` (which had no discriminator) breaks.

### Deploying it

1. Open (or create) the spreadsheet you want both tabs to live in.
2. Extensions → Apps Script, paste in `RioSheetCode.gs`.
3. Deploy → New deployment → **Web app** → Execute as: Me, Who has access:
   **Anyone**. Copy the `/exec` URL.
4. Set that URL as `RIO_SHEET_WEBHOOK_URL` in `invictus_lead_backend`'s
   `.env` (see below — **not** a frontend env var; the sync now runs
   server-side). Restart the backend so `connect_mysql()` picks up the new
   `sheet_sync_*` columns and the retry scheduler starts.
5. (Optional) Run `intialSetup()` once from the Apps Script editor to record
   the spreadsheet id in Script Properties.

## Primary storage is the Rio admin panel — the sheet is a server-side mirror

For both forms, the **real source of truth is `invictus_lead_backend` /
the Rio admin panel (`invictus-admin-panel`)**, not the spreadsheet:

- Contact / Book Appointment → `POST /api/v1/rio/register` → `rio_leads`
  table → shown under **Rio → Rio Leads** in the admin panel.
- Book Vaccine → `POST /api/v1/rio-vaccine-chart/register` →
  `rio_vaccine_chart_leads` table → shown under **Rio → Vaccine Chart
  Leads** in the admin panel.

Both requests go through `resolvePublicTenantForModule("rio")`
(`X-Client-Key: rio`), and both are mounted as separate flat routes in
`invictus_lead_backend/src/app.js` (`/api/v1/rio`,
`/api/v1/rio-vaccine-chart`). `rio-frontend` (`lib/rioRegistration.js`,
`lib/vaccineRegistration.js`) only ever calls these two endpoints — it does
**not** talk to Apps Script directly.

The Google Sheet write happens **after** the DB save, from the backend,
in `invictus_lead_backend/src/modules/rio/rioSheetSync.service.js`
(same pattern as
`invictus_lead_backend/src/modules/birthwave/birthwaveSheetSync.service.js`):

- `createRioPublicLead` / `createVaccineChartPublicLead` create the DB row
  first, then fire `attemptSheetSync(record, formType)` — non-blocking, so
  the visitor's form response never waits on the sheet.
- Every row is created exactly once (DB) and mirrored exactly once
  (sheet) — the row is atomically claimed (`sheet_sync_status:
  "pending" → "syncing"`) so the inline call and the retry worker can
  never double-send it.
- On failure it's retried at +1 min, then +5 min, then gives up (3
  attempts), by a cron job (`startRioSheetSyncScheduler`, every 1 minute)
  — same retry policy as Birthwave/Invictus.
- If the sheet write fails outright (Apps Script down, wrong deployment
  access), the lead is still saved and visible in the admin panel — it's
  never lost, only the mirror is delayed/missing.

## Deprecated

`_deprecated_Code.gs.txt` and `_deprecated_VaccineChartCode.gs.txt` are the
two scripts `RioSheetCode.gs` replaces (kept only for reference — they were
two separate scripts on two separate spreadsheets). Do not deploy them;
`RioSheetCode.gs` is the single script to use going forward.
