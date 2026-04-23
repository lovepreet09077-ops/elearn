import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";


const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "My Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en">
      <body className={`${jakarta.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}