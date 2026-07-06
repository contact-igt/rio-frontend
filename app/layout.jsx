import "./globals.css";

export const metadata = {
  title: "Rio Children's Hospital — Advanced Women & Child Care in Tamil Nadu",
  description:
    "Rio Children's Hospital provides 24/7 paediatric emergency, NICU, PICU, high-risk pregnancy, fetal medicine, maternity and complete women & child healthcare across 4 branches in Tamil Nadu.",
  keywords: [
    "Rio Children's Hospital",
    "children hospital Madurai",
    "NICU PICU Tamil Nadu",
    "high-risk pregnancy care",
    "paediatric emergency",
    "maternity hospital Dindigul Thanjavur",
  ],
  openGraph: {
    title: "Rio Children's Hospital — Women, Newborns & Children",
    description:
      "24/7 emergency, NICU, PICU, maternity and high-risk pregnancy care across 4 branches in Tamil Nadu.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#303573",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
