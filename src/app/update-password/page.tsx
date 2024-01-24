"use client"

import Button from "@/components/button/Button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Toaster, toast } from "sonner"

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [passwordUnmask, setPasswordUnmask] = useState(false)

  const handleNewPassword = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        console.log(error)
        toast.error("Something went wrong")
      } else {
        toast.success("Password updated")
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center flex-col">
      <Toaster richColors position="top-center" duration={3000} />
      <h1 className="text-white text-3xl font-medium my-6">
        Write your new password
      </h1>
      <form
        autoComplete="off"
        className="w-full h-max flex items-center justify-center flex-col gap-4"
      >
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type={passwordUnmask ? "text" : "password"}
          className="w-[25%] h-[50px] bg-input_color_dark rounded-md px-4 mt-4 text-white placeholder-gray-400 outline-none focus:outline-2 transition-all focus:outline-input_color_dark duration-150"
          placeholder="*******"
        />
        <div className="absolute w-[25%] h-max flex items-end justify-end">
          <span
            onClick={() => setPasswordUnmask(!passwordUnmask)}
            className="relative -top-8 -left-5 bg-bg_color rounded-md w-8 h-8 flex items-center justify-center cursor-pointer border-[1px] border-white/30 transition-colors duration-200 group"
          >
            {!passwordUnmask ? (
              <Eye
                size={20}
                className=" text-white/60 group-hover:text-white transition-colors duration-200"
              />
            ) : (
              <EyeOff
                size={20}
                className=" text-white/60 group-hover:text-white transition-colors duration-200"
              />
            )}
          </span>
        </div>
        <Button
          accion={handleNewPassword}
          isLoading={isLoading}
          text="Update password"
          className="w-[25%] flex items-center justify-center gap-2"
        />
      </form>
    </main>
  )
}

export default UpdatePassword
