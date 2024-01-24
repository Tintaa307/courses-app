"use client"

import React, { useContext, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserInformationSchema } from "@/lib/validators/schemas"
import Input from "./Input"
import Button from "../button/Button"
import Image from "next/image"
import { Toaster, toast } from "sonner"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { SessionContext } from "@/context/SessionContext"

export type UserInformationProps = {
  name?: string
  phone?: string
  user_role?: "seller" | "buyer" | ""
}

type InputsArrProps = {
  name: "name" | "phone" | "user_role"
  type: string
  placeholder: string
}

const UserInformationForm = () => {
  const supabase = createClientComponentClient()
  const { user } = useContext(SessionContext)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserInformationProps>({
    defaultValues: {
      name: "",
      phone: "",
      user_role: "",
    },
    resolver: zodResolver(UserInformationSchema),
  })

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      name: "phone",
      type: "text",
      placeholder: "54 9 12345678",
    },
    {
      name: "user_role",
      type: "text",
      placeholder: "seller or buyer",
    },
  ] as InputsArrProps[]

  const onSubmit: SubmitHandler<UserInformationProps> = async (data) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: data.name!,
          phone: data.phone!,
          user_role: data.user_role!,
        })
        .eq("id", user?.user.id)

      router.refresh()

      if (error) {
        toast.error("Something went wrong")
        console.log(error)
        return
      } else {
        toast.success("Your information has been saved")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[65%] h-max flex items-center justify-start flex-col gap-4 bg-bg_color_dark rounded-md border-[2px] border-white/20">
      <Toaster richColors position="top-center" duration={2000} />
      <div className="w-full h-full flex items-center justify-center flex-row">
        <div className="w-1/2 h-full flex items-center justify-center flex-col gap-4">
          <h2 className="text-white text-[26px] font-medium mt-8">
            Firstly, give us some information
          </h2>
          <p className="text-white/60 text-xs w-3/4 font-normal">
            These information is going to be public and will be used to identify
            you in the platform. Others users can check this information in your
            profile.
          </p>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-max flex items-center justify-center flex-col mb-8"
          >
            {inputs.map((input, index) => (
              <Input
                key={index}
                {...input}
                register={register}
                errors={errors}
                containerClassname="w-[60%]"
                labels={true}
                inputClassname="my-0 mb-1"
              />
            ))}
            <Button
              text="Submit"
              className="w-[60%] mb-4 flex items-center justify-center gap-4"
              isLoading={isLoading}
            />
            <small className="text-white/50 text-xs font-normal cursor-pointer underline">
              Why we asked for more information?
            </small>
          </form>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <picture>
            <Image
              src={"/testing-image.jpg"}
              alt="testing-image"
              width={600}
              height={600}
              className="rounded-md w-full"
            />
          </picture>
        </div>
      </div>
    </div>
  )
}

export default UserInformationForm
