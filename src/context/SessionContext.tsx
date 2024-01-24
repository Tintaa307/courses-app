"use client"

import React, { createContext, useEffect, useState } from "react"
import type { Session } from "@supabase/auth-helpers-nextjs"
import { PublicUserData } from "@/types/types"

export const SessionContext = createContext<{
  user: Session | null
  publicUser: PublicUserData | null
  setPublicUserData: React.Dispatch<React.SetStateAction<PublicUserData | null>>
  userEmail: string | null
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
}>({
  user: null,
  userEmail: null,
  setUserEmail: () => {},
  publicUser: null,
  setPublicUserData: () => {},
})

export const SessionProvider = ({
  children,
  user,
  publicUserData,
}: {
  children: React.ReactNode
  user: Session | null
  publicUserData: PublicUserData | null
}) => {
  const [userEmail, setUserEmail] = useState("")
  const [publicUser, setPublicUserData] = useState<PublicUserData | null>(null)

  useEffect(() => {
    if (publicUserData) {
      setPublicUserData(publicUserData)
    }
  }, [publicUserData])

  return (
    <SessionContext.Provider
      value={{ user, userEmail, setUserEmail, publicUser, setPublicUserData }}
    >
      {children}
    </SessionContext.Provider>
  )
}
