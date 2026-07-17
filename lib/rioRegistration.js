const RIO_REGISTER_PATH = "/rio/register";
const IP_LOOKUP_URL = "https://api.ipify.org?format=json";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const RIO_CLIENT_KEY = process.env.NEXT_PUBLIC_RIO_CLIENT_KEY;
const RIO_API_URL = `${API_BASE_URL.replace(/\/+$/, "")}${RIO_REGISTER_PATH}`;

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

export async function registerRioLead(formValues) {
  const ipAddress =
    cleanOptionalValue(formValues.ip_address) ||
    (await getClientIpAddress());

  const payload = {
    name: formValues.name.trim(),
    mobile_number: formValues.mobile_number.trim(),
    service: cleanOptionalValue(formValues.service),
    branch: cleanOptionalValue(formValues.branch),
    message: cleanOptionalValue(formValues.message),
    ip_address: ipAddress,
    utm_source: cleanOptionalValue(formValues.utm_source),
  };

  const response = await fetch(RIO_API_URL, {
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
        "Unable to submit your request. Please try again.",
    );
  }

  return result;
}
