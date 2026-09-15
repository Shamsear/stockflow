import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import { Suspense } from "react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StockFlow | Tailor-Made Warehouse Management Dashboard (Qatar & UAE)",
  description:
    "Customizable warehouse management dashboard for Qatar and UAE businesses. Manage inbounds, outbounds, and stock with zero spreadsheet chaos. Get a tailored demo and workflow consultation on WhatsApp.",
  keywords: [
    "warehouse management system",
    "WMS Dubai",
    "WMS Qatar",
    "inventory management UAE",
    "inbound outbound warehouse",
    "custom warehouse dashboard",
    "StockFlow",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "StockFlow | Tailor-Made Warehouse Management (Qatar & UAE)",
    description:
      "Tired of spreadsheet chaos in your warehouse? Manage inbounds, outbounds, and stock on a custom dashboard built around your exact workflow.",
    url: "https://stockflow.app",
    siteName: "StockFlow WMS",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-hidden ${jakarta.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  if (registrations && registrations.length > 0) {
                    var promises = [];
                    for (var i = 0; i < registrations.length; i++) {
                      promises.push(registrations[i].unregister());
                    }
                    if (window.caches) {
                      caches.keys().then(function(names) {
                        for (var j = 0; j < names.length; j++) {
                          caches.delete(names[j]);
                        }
                      });
                    }
                    Promise.all(promises).then(function() {
                      if (navigator.serviceWorker.controller && !sessionStorage.getItem('sw_purged')) {
                        sessionStorage.setItem('sw_purged', '1');
                        window.location.reload();
                      }
                    });
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col overflow-x-hidden bg-[#F8FAFC] text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <Providers>
          <ThemeProvider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            {children}
            <MobileNav />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
