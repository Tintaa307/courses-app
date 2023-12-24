"use client"

import { cn } from "@/lib/utils"
import { Session } from "@supabase/auth-helpers-nextjs"
import React, { useEffect } from "react"

const Button = ({
  className,
  text,
  accion,
}: {
  className?: string
  text: string
  accion?: () => void
}) => {
  return (
    <button
      onClick={accion}
      className={cn(
        "w-[50%] h-[50px] bg-main-gradient rounded-md px-4 py-2 mt-4 text-white font-medium",
        className
      )}
    >
      {text}
    </button>
  )
}

export default Button
