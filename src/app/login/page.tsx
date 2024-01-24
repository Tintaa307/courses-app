import LoginForm from "@/components/Forms/LoginForm"
import React, { useEffect } from "react"
import Titles from "./components/Titles"
import LoginGoogleButton from "@/components/button/LoginGoogleButton"
import Separator from "./components/Separator"
import Links from "./components/Links"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Button from "@/components/button/Button"

const Login = async () => {
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
          <Links text="Sign up now" link="register" />
          <LoginGoogleButton session={session} text={"Sign in with Google"} />
          <Separator text="or" />
          <LoginForm />
        </div>
      </section>
    </main>
  )
}

export default Login
