import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRAVEN — Define Your Legacy",
  description: "Premium T-shirts for men and women. Built different.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ width: "100%" }}>
      <body
        className={`${inter.className} bg-black text-white min-h-screen`}
        style={{ width: "100%", overflowX: "hidden" }}
      >
        <StoreProvider>
          <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={{ flex: 1, width: "100%" }}>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}