import LogoutButton from "@/components/button/LogoutButton"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) return console.log(error)
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center text-center flex-col gap-12">
        <h1 className="text-white text-5xl font-semibold mt-24">
          Your best application to get <br /> into{" "}
          <span className="special">develop area</span>
        </h1>
        <LogoutButton session={session} />
      </div>
    </>
  )
}
