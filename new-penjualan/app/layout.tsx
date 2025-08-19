import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Book Sales Dashboard",
  description: "Dark mode book sales management dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${sourceSans.variable}`}
    >
      <head>
        <style>{`
html {
  font-family: ${geistSans.style.fontFamily};
  --font-sans: ${geistSans.variable};
  --font-mono: ${geistMono.variable};
  /* Adding the new font variables for design system */
  --font-playfair: ${playfair.style.fontFamily};
  --font-source-sans: ${sourceSans.style.fontFamily};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
