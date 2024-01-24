"use client"

import Button from "@/components/button/Button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import React, { useState } from "react"
import { Toaster, toast } from "sonner"

const ForgotPassword = () => {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const patronEmail: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const handleSendEmail = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!email) return toast.error("Please write your email")
      if (patronEmail.test(email) === false)
        return toast.error("Please write a valid email")
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/update-password",
      })

      if (error) {
        console.log(error)
        toast.error("Something went wrong")
      } else {
        toast.success("Email sent")
        console.log("email sent")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center flex-col">
      <Toaster richColors position="top-center" duration={3000} />
      <h1 className="text-white text-2xl font-medium my-4">
        Write your email to send a verification link
      </h1>
      <form
        autoComplete="off"
        className="w-full h-max flex items-center justify-center flex-col gap-4"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          className="w-[25%] h-[50px] bg-input_color_dark rounded-md px-4 mt-4 text-white placeholder-gray-400 outline-none focus:outline-2 transition-all focus:outline-input_color_dark duration-150"
        />
        <Button
          accion={handleSendEmail}
          text="Send email"
          className="w-[25%] flex items-center justify-center gap-2"
          isLoading={isLoading}
        />
      </form>
    </main>
  )
}

export default ForgotPassword
