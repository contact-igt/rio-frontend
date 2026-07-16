export const VACCINE_RULES = [
  ["Birth", "BCG", "birth"],
  ["Birth", "Oral Polio", "birth"],
  ["Birth", "Hepatitis - B1", "birth"],
  ["6 Weeks / 45 Days", "DTwP/DTap", "days", 45],
  ["6 Weeks / 45 Days", "Hib 1", "days", 45],
  ["6 Weeks / 45 Days", "IPV 1", "days", 45],
  ["6 Weeks / 45 Days", "Hepatitis - B2", "days", 45],
  ["6 Weeks / 45 Days", "Pneumococcal (PCV)", "days", 45],
  ["6 Weeks / 45 Days", "Rotavirus 1", "days", 45],
  ["10 Weeks / 75 Days", "DTwP/DTap2", "days", 75],
  ["10 Weeks / 75 Days", "Hib2", "days", 75],
  ["10 Weeks / 75 Days", "IPV2", "days", 75],
  ["10 Weeks / 75 Days", "Pneumococcal (PCV)2", "days", 75],
  ["10 Weeks / 75 Days", "Rotavirus 2", "days", 75],
  ["14 Weeks / 105 Days", "DTwP/DTap3", "days", 105],
  ["14 Weeks / 105 Days", "Hib3", "days", 105],
  ["14 Weeks / 105 Days", "IPV3", "days", 105],
  ["14 Weeks / 105 Days", "Pneumococcal (PCV)3", "days", 105],
  ["14 Weeks / 105 Days", "Rotavirus 3", "days", 105],
  ["6 Months", "Hepatitis - B3", "months", 6],
  ["6 Months", "Oral Polio 1", "months", 6],
  ["7 Months", "Influenza (Flu1)", "months", 7],
  ["8 Months", "Influenza (Flu2)", "months", 8],
  ["9 Months", "Oral Polio 2", "months", 9],
  ["9 Months", "MMR 1", "months", 9],
  ["1 Year", "Typhoid 1", "years", 1],
  ["1 Year", "Hepatitis - A1", "years", 1],
  ["13 Months", "Japanese Encephalitis1", "months", 13],
  ["14 Months", "Japanese Encephalitis2", "months", 14],
  ["15 Months", "MMR 2", "months", 15],
  ["15 Months", "Pneumococcal (PCV) Booster 1", "months", 15],
  ["16 Months", "Chicken Pox (Varicella 1)", "months", 16],
  ["18 Months", "DTwP/DTap 1st Booster", "months", 18],
  ["18 Months", "Hib 1st Booster", "months", 18],
  ["18 Months", "IPV 1st Booster", "months", 18],
  ["2 Years", "Hepatitis - A2", "years", 2],
  ["2 Years", "Typhoid 1st Booster", "years", 2],
  ["5 Years", "Oral Polio / IPV 3", "years", 5],
  ["5 Years", "DTwP/DTap 2nd Booster", "years", 5],
  ["5 Years", "MMR3", "years", 5],
  ["5 Years", "Chicken Pox (Varicella 2)", "years", 5],
  ["10 Years", "TT/Td/Tdap", "years", 10],
  ["10 Years", "HPV", "years", 10],
];

export function parseLocalDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}

export function addCalendarMonths(date, months) {
  const targetIndex = date.getMonth() + months;
  const year = date.getFullYear() + Math.floor(targetIndex / 12);
  const month = ((targetIndex % 12) + 12) % 12;
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(date.getDate(), lastDay));
}

export function addCalendarYears(date, years) {
  return addCalendarMonths(date, years * 12);
}

export function addCalendarDays(date, days) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

export function formatDate(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

export function isFutureDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

export function buildVaccineSchedule(dateOfBirth) {
  let previousAge = "";

  return VACCINE_RULES.map(([age, vaccine, type, amount], index) => {
    const date = type === "birth"
      ? new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate())
      : type === "days"
        ? addCalendarDays(dateOfBirth, amount)
        : type === "months"
          ? addCalendarMonths(dateOfBirth, amount)
          : addCalendarYears(dateOfBirth, amount);

    const displayAge = age === previousAge ? "" : age;
    previousAge = age;

    return { serial: index + 1, age, displayAge, vaccine, date, recommendedDate: formatDate(date) };
  });
}
