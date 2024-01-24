import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import { cookies } from "next/headers"
import LoginGoogleButton from "@/components/button/LoginGoogleButton"
import Titles from "../login/components/Titles"
import Links from "../login/components/Links"
import RegisterForm from "@/components/Forms/RegisterForm"
import Separator from "../login/components/Separator"
import Button from "@/components/button/Button"

const Register = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <main
      className={["w-full flex items-center justify-center", "height"].join(
        " "
      )}
    >
      <section className="w-full h-full flex items-center justify-center flex-col">
        <div className="w-full h-max flex items-center justify-center flex-col gap-6">
          <Titles />
          <Links text="Sign in now" link="login" />
          <LoginGoogleButton session={session} text={"Sign up with Google"} />
          <Separator text="or" />
          <RegisterForm />
        </div>
      </section>
    </main>
  )
}

export default Register
