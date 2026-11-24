import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata = {
  title: {
    default: "Megha Goenka",
    template: "%s — Megha Goenka",
  },
  description: "Ceramic artist — installation, sculpture, drawing.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Reveals start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>
            {
              "[data-reveal],[data-reveal]>*{opacity:1;transform:none;clip-path:none}.work-image{opacity:1}.icon-draw *{stroke-dashoffset:0}.rule{transform:none}"
            }
          </style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
