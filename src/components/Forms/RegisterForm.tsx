"use client"

import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import Button from "../button/Button"
import Input from "./Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputsArrProps, LoginFormInputs } from "./LoginForm"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { LoginSchema } from "@/lib/validators/schemas"
import { useRouter } from "next/navigation"
import { SessionContext } from "@/context/SessionContext"

const RegisterForm = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { setUserEmail } = useContext(SessionContext)
  const [isLoading, setIsLoading] = useState(false)
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
    setUserEmail(data.email!)
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email!,
        password: data.password!,
        options: {
          emailRedirectTo: "http://localhost:3000/",
        },
      })
      router.refresh()

      if (error) {
        toast.error("Something went wrong")
        console.log(error)
        return
      } else {
        router.push("/verification-page")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Toaster richColors position="top-center" />
      <form
        autoComplete="off"
        className="w-full h-full flex items-center justify-center flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map((input, index) => (
          <Input key={index} {...input} register={register} errors={errors} />
        ))}

        <Button
          isLoading={isLoading}
          className="w-[25%] h-[50px] bg-main-gradient rounded-md px-4 py-2 my-4 text-white font-medium flex items-center justify-center gap-4"
          text="Sign up"
        />
      </form>
    </>
  )
}

export default RegisterForm
