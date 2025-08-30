import type { Metadata } from "next";
import localFont from "next/font/local";
import OGImage from '@/public/og.png'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site-config";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Social } from "@/components/sections/social";
import Script from "next/script";

// const inter = localFont({
//   src: [
//     {
//       path: "../public/HelveticaNeueRoman.otf",
//       weight: "normal",
//       style: "normal",
//     },
//     {
//       path: "../public/HelveticaNeueMedium.otf",
//       weight: "bold",
//       style: "bold",
//     },
//   ],
// });
export const metadata: Metadata = {
  title: `${site.name} | Buy Quality Products at Affordable Prices`,
  description: "Welcome to trendyhub – Your one-stop shop for quality products at affordable prices. Explore our wide range of items and enjoy fast delivery and excellent customer service.",
  keywords: [
    "trendyhub",
    "e-commerce",
    "buy online",
    "affordable products",
    "quality products",
    "online shopping",
    "best deals",
    "fast delivery",
    "customer service",
  ],
  openGraph: {
    title: `${site.name} | Buy Quality Products at Affordable Prices`,
    description: "Welcome to trendyhub – Your one-stop shop for quality products at affordable prices. Explore our wide range of items and enjoy fast delivery and excellent customer service.",
    url: "https://trendyhub.co.in", // Replace with your actual website URL
    siteName: site.name,
    images: [
      {
        url: OGImage.src, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "trendyhub - Quality Products at Affordable Prices",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Buy Quality Products at Affordable Prices`,
    description: "Welcome to trendyhub – Your one-stop shop for quality products at affordable prices. Explore our wide range of items and enjoy fast delivery and excellent customer service.",
    images: [OGImage.src], // Replace with your actual Twitter card image URL
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://trendyhub.co.in", // Replace with your actual canonical URL
  },
  icons: {
    icon: "/favicon.ico", // Replace with your actual favicon path
    shortcut: "/shortcut-icon.png", // Replace with your actual shortcut icon path
    apple: "/apple-touch-icon.png", // Replace with your actual Apple touch icon path
  },
  manifest: "/site.webmanifest", // Replace with your actual manifest file path
};


// JSON-LD Structured Data for Products
export const jsonLdProducts = {
  "@context": "https://schema.org/",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Men's Watches",
      "description": "Explore our collection of stylish and durable men's watches. Perfect for every occasion.",
      "url": "https://trendyhub.co.in/mens-watches",
      "image": "https://trendyhub.co.in/images/mens-watches.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "1999",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "trendyhub"
        }
      }
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Ladies' Watches",
      "description": "Discover elegant and trendy ladies' watches to complement your style.",
      "url": "https://trendyhub.co.in/ladies-watches",
      "image": "https://trendyhub.co.in/images/ladies-watches.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "1799",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "trendyhub"
        }
      }
    },
    {
      "@type": "Product",
      "position": 3,
      "name": "Sunglasses",
      "description": "Shop the latest collection of sunglasses for men and women. UV protection and stylish designs.",
      "url": "https://trendyhub.co.in/sunglasses",
      "image": "https://trendyhub.co.in/images/sunglasses.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "999",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "trendyhub"
        }
      }
    },
    {
      "@type": "Product",
      "position": 4,
      "name": "Gadgets",
      "description": "Find the latest gadgets, including smartwatches, earphones, and more.",
      "url": "https://trendyhub.co.in/gadgets",
      "image": "https://trendyhub.co.in/images/gadgets.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "4999",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "trendyhub"
        }
      }
    }
  ]
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
<head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdProducts)}
        </script>
        <script src="https://fpyf8.com/88/tag.min.js" data-zone="167364" async data-cfasync="false"></script>
      </head>
      <body className={` antialiased`}>
        
          <Header />
          <div className="min-h-screen md:px-20 px-4 py-24">{children}</div>
          <Footer />
          <Toaster />
         
      </body>
    </html>
  );
}
