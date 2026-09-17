import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { getSiteSettings } from "@/lib/sanity/queries";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.title || "Grains of Time | NC State All-Male A Cappella";
  const description =
    settings?.description ||
    "Official website and living archive of Grains of Time, NC State University's premier all-male a cappella ensemble, founded in 1968.";

  return {
    title: {
      default: title,
      template: "%s | Grains of Time",
    },
    description,
    keywords: [
      "Grains of Time",
      "NC State A Cappella",
      "All-male a cappella",
      "North Carolina State University",
      "Raleigh vocal music",
      "Collegiate a cappella",
      "NC State music",
    ],
    authors: [{ name: "Grains of Time" }],
    creator: "Grains of Time",
    publisher: "Grains of Time",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://grainsoftime.com"
    ),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: "Grains of Time",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-grains-black text-grains-paper selection:bg-grains-red selection:text-white font-sans antialiased">
        <SkipToContent />
        <div className="grain-overlay" aria-hidden="true" />
        <Header settings={settings} />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
