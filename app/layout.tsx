import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import './globals.css'

export const metadata: Metadata = {
  title: "Millan Customz | Premium Paint Protection Film (PPF) & Ceramic Coating",
  description: "Transform and protect your vehicle with Millan Customz. High-quality Paint Protection Film (PPF) and advanced ceramic coatings.",
  icons: {
    icon: "/icon.svg",
    apple: "/images/millan-customz-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
