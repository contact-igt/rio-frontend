/**
 * Rio Children's Hospital — Vaccine Chart spreadsheet (standalone).
 *
 * Bind this script to a BRAND NEW, dedicated Google Spreadsheet (not the
 * Contact/Book Appointment one). It writes every Book Vaccine form field to
 * the sheet named VACCINE_CHART_SHEET_NAME below, creating the sheet with a
 * bold, frozen header row on first run if it doesn't already exist.
 *
 * This is independent of the Rio admin panel (invictus_lead_backend /
 * invictus_lead_admin) — that already stores Vaccine Chart submissions in a
 * proper database with its own admin UI. Use this script only if you also
 * want a plain Google Sheet copy (e.g. for staff who don't have admin panel
 * access). It is NOT wired into the website by default — see the note at
 * the bottom of this file for how to add that if you want both.
 *
 * Fields captured (in column order):
 *   1. Registration Number  (8-digit)
 *   2. Parent Name
 *   3. Child Name
 *   4. Phone
 *   5. Child DOB
 *   6. Gender
 *   7. Submitted On           (server timestamp, IST)
 *   8. IP Address
 *   9. UTM Source
 *
 * Deploy:
 * 1. Create a new Google Sheet.
 * 2. Extensions -> Apps Script, paste this file's contents in as Code.gs.
 * 3. Deploy -> New deployment -> type "Web app" -> Execute as "Me" ->
 *    Who has access "Anyone" -> Deploy. Copy the resulting /exec URL.
 */

var VACCINE_CHART_SHEET_NAME = "Vaccine Chart";

var VACCINE_CHART_HEADERS = [
  "Registration Number",
  "Parent Name",
  "Child Name",
  "Phone",
  "Child DOB",
  "Gender",
  "Submitted On",
  "IP Address",
  "UTM Source",
];

function getOrCreateVaccineChartSheet_(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(VACCINE_CHART_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(VACCINE_CHART_SHEET_NAME);
    sheet.appendRow(VACCINE_CHART_HEADERS);
    sheet.getRange(1, 1, 1, VACCINE_CHART_HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateVaccineChartSheet_(spreadsheet);
  var params = e.parameter;
  var formattedDateTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "MMM-dd-yyyy hh:mm a");

  Logger.log(JSON.stringify(params));

  sheet.appendRow([
    params.registration_number || "",
    params.parent_name || "",
    params.child_name || "",
    params.phone || "",
    params.dob || "",
    params.gender || "",
    formattedDateTime,
    params.ip_address || "",
    params.utm_source || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * OPTIONAL — dual-write from the website.
 *
 * The Book Vaccine form on riochildrenshospital.com currently submits only
 * to the Rio admin panel API (lib/vaccineRegistration.js in rio-frontend),
 * which is the source of truth shown in the admin panel's "Vaccine Chart
 * Leads" page. If you ALSO want every submission mirrored into this sheet,
 * add a second fetch() call in that same file's registerVaccineBooking()
 * pointing at this deployment's /exec URL, sending the same field names
 * used above (registration_number, parent_name, child_name, phone, dob,
 * gender, ip_address, utm_source) as form-encoded POST data. Ask for this
 * to be wired in if you want it — it isn't automatic.
 */
