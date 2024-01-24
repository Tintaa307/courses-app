import React, { useEffect, useState } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { LoginFormInputs } from "./LoginForm"
import { UserInformationProps } from "./UserInformationForm"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

type FullInputsProps = Partial<LoginFormInputs> & Partial<UserInformationProps>

type InputProps = {
  name: "email" | "password" | "name" | "phone" | "user_role"
  type: string
  placeholder: string
  register: UseFormRegister<FullInputsProps>
  errors: FieldErrors<FullInputsProps>
  inputClassname?: string
  containerClassname?: string
  labels?: boolean
  isInputPassword?: boolean
}

const Input = ({
  name,
  type,
  placeholder,
  register,
  errors,
  inputClassname,
  containerClassname,
  labels,
  isInputPassword,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const [passwordUnmask, setPasswordUnmask] = useState(false)

  return (
    <div
      className={cn(
        "relative w-[25%] h-max flex items-center justify-center flex-col gap-3",
        containerClassname
      )}
    >
      <div className="w-full h-full my-3">
        {labels ? (
          <div className="w-full flex items-start justify-start">
            <label
              htmlFor={name}
              className="text-white/80 text-base font-normal"
            >
              {name !== "user_role"
                ? name.charAt(0).toUpperCase() + name.slice(1)
                : "Role"}
            </label>
          </div>
        ) : null}
        <input
          onFocus={() => setIsFocus(true)}
          type={type === "password" && !passwordUnmask ? "password" : "text"}
          {...register(name)}
          placeholder={placeholder}
          className={cn(
            "w-full h-[50px] bg-input_color_dark rounded-md px-4 py-2 mt-4 text-white placeholder-gray-400 outline-none focus:outline-2 transition-all focus:outline-input_color_dark duration-150",
            inputClassname
          )}
        />
        {isInputPassword && (
          <div className="absolute w-full h-max flex items-end justify-end">
            <span
              onClick={() => setPasswordUnmask(!passwordUnmask)}
              className="relative -top-10 -left-5 bg-bg_color rounded-md w-8 h-8 flex items-center justify-center cursor-pointer border-[1px] border-white/30 transition-colors duration-200 group"
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
        )}
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
        {name === "name" && errors.name?.message && (
          <div className="w-full h-max flex justify-start items-start">
            <p className="text-error_color">{errors.name.message}</p>
          </div>
        )}
        {name === "phone" && errors.phone?.message && (
          <div className="w-full h-max flex justify-start items-start">
            <p className="text-error_color">{errors.phone.message}</p>
          </div>
        )}
        {name === "user_role" && errors.user_role?.message && (
          <div className="w-full h-max flex justify-start items-start">
            <p className="text-error_color">
              {errors.user_role.message === "Invalid input"
                ? "Invalid role, type 'buyer' or 'seller'"
                : errors.user_role.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
