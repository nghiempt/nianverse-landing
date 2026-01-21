import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nianverse Quantangle",
  description: "Quantangle is a self-management system based on states, energies, and observation, in which aspects of life exist in a state of tangled connections and only “collapse” into action when intentionally observed.",
  openGraph: {
    title: "Nianverse Quantangle",
    description: "Quantangle is a self-management system based on states, energies, and observation, in which aspects of life exist in a state of tangled connections and only “collapse” into action when intentionally observed.",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Nianverse",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nianverse Quantangle",
    description: "Quantangle is a self-management system based on states, energies, and observation, in which aspects of life exist in a state of tangled connections and only “collapse” into action when intentionally observed.",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
