"use client"

import React, { useEffect } from "react"
import Button from "./Button"
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const LogoutButton = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  useEffect(() => {
    console.log(session)
    if (!session) {
      router.push("/login")
    }
  }, [session])

  return <Button text="Sign out" className="w-1/5" accion={handleSignOut} />
}

export default LogoutButton
