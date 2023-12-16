import React, { useEffect, useState } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { LoginFormInputs } from "./LoginForm"

type InputProps = {
  name: "email" | "password"
  type: string
  placeholder: string
  register: UseFormRegister<LoginFormInputs>
  errors: FieldErrors<LoginFormInputs>
}

const Input = ({ name, type, placeholder, register, errors }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div className="relative w-[50%] h-max flex items-center justify-center flex-col gap-3">
      <input
        onFocus={() => setIsFocus(true)}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={
          "w-full h-[50px] bg-input_color_dark rounded-md px-4 py-2 mt-4 text-white placeholder-gray-400 outline-none focus:outline-2 transition-all focus:outline-input_color_dark duration-150"
        }
      />
      {name === "email" && errors.email?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">{errors.email.message}</p>
        </div>
      )}
      {name === "password" && errors.password?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">{errors.password.message}</p>
        </div>
      )}
    </div>
  )
}

export default Input
