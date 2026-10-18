import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import SiteShell from "@/components/SiteShell";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

// Menü yazıları için ayrı font
const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-nav",
});

export const metadata: Metadata = {
  title: "Figür Vitrini",
  description: "Aksiyon figürleri, Funko Pop ve nadir heykeller",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${nunito.className} ${quicksand.variable} bg-white text-gray-900 antialiased`}
      >
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}