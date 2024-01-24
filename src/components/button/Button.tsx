"use client"

import { cn } from "@/lib/utils"
import React from "react"
import ButtonLoader from "../shared/ButtonLoader"

const Button = ({
  className,
  text,
  accion,
  isLoading,
  children,
  disable,
}: {
  className?: string
  text: string
  accion?: (param?: any) => void
  isLoading?: boolean
  children?: React.ReactNode
  disable?: boolean
}) => {
  return (
    <button
      disabled={disable}
      onClick={accion}
      className={cn(
        "w-[50%] h-[50px] bg-main-gradient rounded-md px-4 py-2 mt-4 text-white font-medium hover:opacity-90 transition-all duration-150",
        className,
        {
          "opacity-50 hover:opacity-50": disable,
        }
      )}
    >
      {isLoading ? <ButtonLoader /> : null}
      {text}
      {children}
    </button>
  )
}

export default Button
