import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nianverse",
  description: "Khởi đời của một lượng tử hoá.",
  openGraph: {
    title: "Nianverse",
    description: "Khởi đời của một lượng tử hoá.",
    images: [
      {
        url: "/animate-texture.jpg",
        width: 1200,
        height: 630,
        alt: "Nianverse",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nianverse",
    description: "Khởi đời của một lượng tử hoá.",
    images: ["/animate-texture.jpg"],
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
