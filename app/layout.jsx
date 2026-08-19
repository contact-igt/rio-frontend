import "./globals.css";
import "slick-carousel/slick/slick.css";
import { SITE_LINKS } from "../data/site";
import InternalLinkHandler from "../components/shared/InternalLinkHandler";
import MobileCtaBar from "../components/shared/MobileCtaBar";
import Script from "next/script";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DS2V32X');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DS2V32X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <InternalLinkHandler />
        {children}
        <MobileCtaBar />
        <a
          className="whatsapp-float"
          href={SITE_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <img src="/assets/whatsapp.png" alt="WhatsApp" />
        </a>
      </body>
    </html>
  );
}