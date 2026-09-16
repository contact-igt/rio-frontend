const VACCINE_CHART_REGISTER_PATH = "/rio-vaccine-chart/register";
const IP_LOOKUP_URL = "https://api.ipify.org?format=json";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const RIO_CLIENT_KEY = process.env.NEXT_PUBLIC_RIO_CLIENT_KEY;

// Standalone Vaccine Chart spreadsheet (see
// scripts/google-apps-script/VaccineChartCode.gs). Best-effort mirror only —
// the Rio admin panel (above) is the source of truth; a failure here never
// blocks or fails the booking.
const VACCINE_CHART_SHEET_URL = "https://script.google.com/macros/s/AKfycbxQM_mFkxs7ggQKX11_QXRKFINkSXzP2KDgWXQpJ8FOJ3Z7wEdzT03VdosJiXgQB5i8/exec";

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

// Fire-and-forget mirror into the standalone Vaccine Chart spreadsheet.
// Never throws — a failure here must not affect the booking outcome.
async function mirrorToVaccineChartSheet(payload) {
  try {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.set(key, value ?? "");
    });

    await fetch(VACCINE_CHART_SHEET_URL, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.warn("Vaccine Chart sheet mirror failed:", error);
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

  // Mirror into the standalone spreadsheet in parallel — best-effort, never
  // blocks or affects the outcome of the admin-panel submission below.
  mirrorToVaccineChartSheet(payload);

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
