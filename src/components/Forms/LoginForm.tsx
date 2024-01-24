"use client"

import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "./Input"
import { LoginSchema } from "@/lib/validators/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import Button from "../button/Button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"

export type LoginFormInputs = {
  email?: string
  password?: string
}

export type InputsArrProps = {
  name: "email" | "password"
  type: string
  placeholder: string
  isInputPassword?: boolean
}

const LoginForm = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  })

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "you@example.com",
      isInputPassword: false,
    },
    {
      name: "password",
      type: "password",
      placeholder: "*******",
      isInputPassword: true,
    },
  ] as InputsArrProps[]

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email!,
      password: data.password!,
    })
    router.refresh()

    if (error) {
      toast.error(error.message)
      console.log(error.message)
      return
    } else {
      toast.success("You have successfully logged in")
    }
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <form
      autoComplete="off"
      className="w-full h-full flex items-center justify-center flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster richColors position="top-center" duration={3000} />
      {inputs.map((input, index) => (
        <Input key={index} {...input} register={register} errors={errors} />
      ))}
      <div className="relative w-[25%] h-max flex items-end justify-end">
        <Link
          href={"/recover-password"}
          className="text-sm text-white/40 font-normal absolute top-2 hover:text-white/80 transition-all duration-150"
        >
          Forgot password?
        </Link>
      </div>
      <Button
        className="w-[25%] h-[50px] bg-main-gradient rounded-md px-4 py-2 my-4 text-white font-medium "
        text="Sign in"
      />
    </form>
  )
}

export default LoginForm
