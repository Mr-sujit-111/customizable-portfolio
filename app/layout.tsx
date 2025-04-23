import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Roboto, Open_Sans, Lato, Montserrat, Raleway } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/contexts/settings-context"
import { Header } from "@/components/header"
import { SettingsPanel } from "@/components/settings/settings-panel"

// Define fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sujit Bhanderi | Senior Frontend Developer",
  description: "Frontend developer with 4+ years of experience building responsive, performant web applications",
  keywords: "frontend developer, React, Next.js, TypeScript, UI/UX, web development, portfolio",
  authors: [{ name: "Sujit Bhanderi" }],
  creator: "Sujit Bhanderi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sujitbhanderi.com",
    title: "Sujit Bhanderi | Senior Frontend Developer",
    description: "Frontend developer with 4+ years of experience building responsive, performant web applications",
    siteName: "Sujit Bhanderi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujit Bhanderi | Senior Frontend Developer",
    description: "Frontend developer with 4+ years of experience building responsive, performant web applications",
    creator: "@sujitbhanderi",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
        ${inter.variable} 
        ${poppins.variable} 
        ${roboto.variable} 
        ${openSans.variable} 
        ${lato.variable} 
        ${montserrat.variable} 
        ${raleway.variable}
        font-sans
      `}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          themes={[
            "default",
            "dark",
            "midnight",
            "forest",
            "ocean",
            "sunset",
            "pastel",
            "neon",
            "monochrome",
            "solarized",
          ]}
        >
          <SettingsProvider>
            <Header />
            {children}
            <SettingsPanel />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
