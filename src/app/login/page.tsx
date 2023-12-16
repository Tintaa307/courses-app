import LoginForm from "@/components/Forms/LoginForm"
import React, { useEffect } from "react"
import Titles from "./components/Titles"
import LoginGoogleButton from "@/components/button/LoginGoogleButton"
import Separator from "./components/Separator"
import Links from "./components/Links"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Login = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main
      className={[
        "w-full flex items-center justify-center flex-row",
        "height",
      ].join(" ")}
    >
      <section className="w-1/2 h-full flex items-center justify-center flex-col">
        <div className="w-full h-max flex items-center justify-center flex-col gap-6">
          <Titles />
          <LoginGoogleButton session={session} />
          <Separator />
          <LoginForm />
          <Links />
        </div>
        <div className="w-full h-max flex items-center justify-center text-center mt-12">
          <p className="text-gray-600 text-xs w-1/2">
            By continuing, you agree to Courses-app{" "}
            <span className="underline italic text-white/50">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline italic text-white/50">
              Privacy Policy
            </span>
            , and to receive periodic emails with updates.
          </p>
        </div>
      </section>
      <section className="w-1/2 h-full flex items-center justify-center"></section>
    </main>
  )
}

export default Login
