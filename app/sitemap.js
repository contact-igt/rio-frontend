import { SITE_URL } from "@/lib/siteUrl";

const paths = [
  "",
  "/about",
  "/about/chairman",
  "/about/management",
  "/book-appointment",
  "/book-emergency",
  "/book-vaccine",
  "/contact",
  "/doctors",
  "/facilities",
  "/human-milk-bank",
  "/paediatric-super-specialities",
  "/services/emergency",
  "/services/fertility-ivf",
  "/services/fetal-medicine",
  "/services/general-paediatrics",
  "/services/gynaecology",
  "/services/high-risk-pregnancy",
  "/services/human-milk-bank",
  "/services/maternity",
  "/services/nicu",
  "/services/picu",
  "/services/vaccination",
  "/treatments",
];

export default function sitemap() {
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
