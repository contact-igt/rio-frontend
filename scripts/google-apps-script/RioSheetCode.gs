/**
 * Single Apps Script deployment for all Rio website form mirrors.
 *
 * Bound to ONE spreadsheet with two tabs:
 *   - "Sheet1"        — Contact page + Book Appointment submissions
 *   - "Vaccine Chart"  — Book Vaccine submissions
 *
 * Replaces the two previously-separate scripts (Code.gs, VaccineChartCode.gs)
 * and their two separate spreadsheets. Deploy this ONE script, get its
 * ONE /exec URL, and point both `lib/rioRegistration.js` and
 * `lib/vaccineRegistration.js` at it (see lib/rioSheetMirror.js).
 *
 * Routing is by an explicit `form_type` field the caller sends — never
 * inferred from which fields happen to be present, so a partial/malformed
 * payload can't silently land in the wrong sheet.
 */

var CONTACT_SHEET_NAME = "Sheet1";
var VACCINE_CHART_SHEET_NAME = "Vaccine Chart";

var CONTACT_HEADERS = [
  "Name",
  "Phone",
  "Branch",
  "Service",
  "Concern",
  "Message",
  "Submitted On",
  "IP Address",
  "UTM Source",
];

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

var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty("key", activeSpreadsheet.getId());
}

function getOrCreateSheet_(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendContactRow_(spreadsheet, params, formattedDateTime) {
  var sheet = getOrCreateSheet_(spreadsheet, CONTACT_SHEET_NAME, CONTACT_HEADERS);

  sheet.appendRow([
    params.name || "",
    params.phone || "",
    params.branch || "",
    params.service || "",
    params.concern || "",
    params.message || "",
    formattedDateTime,
    params.ip_address || "",
    params.utm_source || "",
  ]);
}

function appendVaccineChartRow_(spreadsheet, params, formattedDateTime) {
  var sheet = getOrCreateSheet_(spreadsheet, VACCINE_CHART_SHEET_NAME, VACCINE_CHART_HEADERS);

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
}

function doPost(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var params = (e && e.parameter) || {};
  var formattedDateTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "MMM-dd-yyyy hh:mm a");

  Logger.log(JSON.stringify(params));

  // Explicit discriminator, defaulted to "contact" so existing callers that
  // never send form_type (the old Code.gs behavior) keep working unchanged.
  var formType = String(params.form_type || "contact").toLowerCase();

  if (formType === "vaccine_chart") {
    appendVaccineChartRow_(spreadsheet, params, formattedDateTime);
  } else if (formType === "contact") {
    appendContactRow_(spreadsheet, params, formattedDateTime);
  } else {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: "Unknown form_type: " + formType }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
