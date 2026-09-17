const VACCINE_CHART_REGISTER_PATH = "/rio-vaccine-chart/register";
const IP_LOOKUP_URL = "https://api.ipify.org?format=json";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const RIO_CLIENT_KEY = process.env.NEXT_PUBLIC_RIO_CLIENT_KEY;

function getVaccineChartApiUrl() {
  const baseUrl = cleanOptionalValue(API_BASE_URL);

  if (!baseUrl) {
    throw new Error("Vaccine registration API is not configured.");
  }

  return `${baseUrl.replace(/\/+$/, "")}${VACCINE_CHART_REGISTER_PATH}`;
}

function cleanOptionalValue(value) {
  if (typeof value !== "string") return null;

  const cleanedValue = value.trim();
  return cleanedValue || null;
}

async function getClientIpAddress() {
  try {
    const response = await fetch(IP_LOOKUP_URL, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();
    return cleanOptionalValue(result.ip);
  } catch {
    return null;
  }
}

// Posts a Book Vaccine form submission to the Rio admin panel (Vaccine Chart
// Leads, under the Rio client) — same backend used by Book Appointment /
// Contact (see lib/rioRegistration.js), via
// invictus_lead_backend/src/modules/rioVaccineChart.
export async function registerVaccineBooking(formValues) {
  const ipAddress =
    cleanOptionalValue(formValues.ip_address) ||
    (await getClientIpAddress());

  const payload = {
    registration_number: formValues.registrationNumber.trim(),
    parent_name: formValues.parentName.trim(),
    child_name: formValues.childName.trim(),
    phone: formValues.phone.trim(),
    dob: formValues.dob,
    gender: cleanOptionalValue(formValues.gender),
    ip_address: ipAddress,
    utm_source: cleanOptionalValue(formValues.utm_source),
  };

  // The Google Sheet mirror now happens server-side, right after the DB
  // save (invictus_lead_backend/src/modules/rio/rioSheetSync.service.js) —
  // this frontend no longer talks to Apps Script directly.
  const response = await fetch(getVaccineChartApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Client-Key": RIO_CLIENT_KEY,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationDetails = Array.isArray(result.details)
      ? result.details.join(", ")
      : "";

    throw new Error(
      validationDetails ||
        result.message ||
        "Unable to record your vaccine booking. Please try again.",
    );
  }

  return result;
}
