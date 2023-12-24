"use client"

import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"
import {
  type Session as SupabaseSession,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { IconBrandGoogleFilled } from "@tabler/icons-react"

const LoginGoogleButton = ({
  session,
}: {
  session: SupabaseSession | null
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })
  }

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session])

  return (
    <div className="w-[50%] flex items-start justify-center flex-col ">
      <button
        onClick={handleSignInWithGoogle}
        onMouseDown={() => setIsFocus(true)}
        onMouseUp={() => setIsFocus(false)}
        className={cn(
          "w-full h-[50px] rounded-md bg-input_color_dark flex items-center justify-center flex-row gap-3 text-white/60 font-normal text-lg hover:bg-[#232127] shadow-[0_4px_1px_#13131A] transition-all duration-150 my-4",
          {
            "shadow-none": isFocus,
          }
        )}
      >
        <IconBrandGoogleFilled />
        Sign in with Google
      </button>
    </div>
  )
}

export default LoginGoogleButton
