import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { SessionProvider } from "@/context/SessionContext"
import Navbar from "@/components/navbar/Navbar"
import { CartProvider } from "@/context/CartContext"
import Footer from "@/components/footer/Footer"

const inter = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Courses-app",
  description: "Courses-app is a web application to get into develop area",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session: user },
    error,
  } = await supabase.auth.getSession()

  const publicUserData = await (
    await supabase.from("users").select("*")
  ).data?.filter((publicUsers) => publicUsers.id === user?.user.id)[0]

  return (
    <html lang="en">
      <SessionProvider user={user} publicUserData={publicUserData}>
        <body className={inter.className}>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </body>
      </SessionProvider>
    </html>
  )
}
