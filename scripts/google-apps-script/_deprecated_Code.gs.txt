/**
 * Rio Children's Hospital — Contact / Book Appointment lead sheet.
 *
 * Bound to the spreadsheet backing the Contact page and Book Appointment
 * forms' "Sheet1". Unchanged from the original script — Book Vaccine
 * submissions are handled separately (see the Rio admin panel API, or
 * VaccineChartCode.gs for a standalone spreadsheet), not by this file.
 */

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  let formattedDateTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "MMM-dd-yyyy hh:mm a");
  Logger.log(JSON.stringify(e.parameter));

  sheet.appendRow([
    e.parameter.name || "",
    e.parameter.phone || "",
    e.parameter.branch || "",
    e.parameter.service || "",
    e.parameter.concern || "",
    e.parameter.message || "",
    formattedDateTime,
    e.parameter.ip_address,
    e.parameter.utm_source
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
