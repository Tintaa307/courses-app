"use client"

import React from "react"
import Button from "./Button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return <Button text="Sign out" className="w-1/5" accion={handleSignOut} />
}

export default LogoutButton
