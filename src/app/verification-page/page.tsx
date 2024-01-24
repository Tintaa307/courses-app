"use client"

import Button from "@/components/button/Button"
import { SessionContext } from "@/context/SessionContext"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import React, { useContext, useEffect, useRef } from "react"
import { Toaster, toast } from "sonner"

const VerificationPage = () => {
  const { userEmail } = useContext(SessionContext)
  const hasMounted = useRef(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (hasMounted.current && userEmail) {
      toast.success(`Email sent to ${userEmail}`)
    } else {
      hasMounted.current = true
    }
  }, [userEmail])

  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: userEmail!,
        options: {
          emailRedirectTo: "http://localhost:3000/",
        },
      })
      if (error) {
        toast.error("Something went wrong")
      } else {
        toast.success(`Email resend to ${userEmail}`)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Toaster richColors position="top-center" duration={2000} />
      <div
        className={[
          "w-[550px] h-max bg-bg_color_dark flex items-center justify-center text-center flex-col gap-4",
          "border",
        ].join(" ")}
      >
        <Image src={"/email-hippo.png"} alt="image" width={200} height={200} />
        <h2 className="text-white/90 text-lg font-semibold">
          Please verify your email
        </h2>
        <p className="w-3/4 text-sm text-white/60 font-normal">
          We just sent an email to{" "}
          <span className="text-white/80">{userEmail}</span>. Click the link in
          the email to verify your account.
        </p>
        <div className="w-full h-max flex items-center justify-center flex-row gap-8 mb-6">
          <Button
            accion={handleResendEmail}
            text="Resend email"
            className="w-[30%] h-10"
          />
          <Button
            text="Update email"
            className="w-[30%] h-10 bg-transparent border-[1.7px] border-violet"
          />
        </div>
      </div>
    </main>
  )
}

export default VerificationPage
