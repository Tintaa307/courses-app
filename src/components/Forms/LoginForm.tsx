"use client"

import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "./Input"
import { LoginSchema } from "@/lib/validators/schemas"
import { zodResolver } from "@hookform/resolvers/zod"

export type LoginFormInputs = {
  email: string
  password: string
}

type InputsArrProps = {
  name: "email" | "password"
  type: string
  placeholder: string
}

const LoginForm = () => {
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
    },
    {
      name: "password",
      type: "password",
      placeholder: "*******",
    },
  ] as InputsArrProps[]

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data)
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
      {inputs.map((input, index) => (
        <Input key={index} {...input} register={register} errors={errors} />
      ))}
      <button
        className="w-[50%] h-[50px] bg-main-gradient rounded-md px-4 py-2 mt-4 text-white font-medium"
        type="submit"
      >
        Sign in
      </button>
    </form>
  )
}

export default LoginForm
