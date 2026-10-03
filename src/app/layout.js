import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "GadgetHub Signature — Premium Gadgets Online",
  description: "Shop the best phones, laptops, wearables and accessories at unbeatable prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit antialiased bg-[#f0f4ff] text-navy-900">
        {children}
      </body>
    </html>
  );
}
