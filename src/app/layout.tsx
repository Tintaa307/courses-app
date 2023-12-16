import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"

const inter = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Courses-app",
  description: "Courses-app is a web application to get into develop area",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
