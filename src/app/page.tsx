import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import UserInformationForm from "@/components/Forms/UserInformationForm"
import PopularCourses from "@/components/carousels/PopularCourses"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = await supabase
    .from("users")
    .select("*")
    .eq("id", session?.user?.id)

  return (
    <>
      {user.data && !user.data[0].user_role ? (
        <main
          className={[
            "fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center text-center flex-col gap-12 bg-black/70",
          ].join(" ")}
        >
          <UserInformationForm />
        </main>
      ) : (
        <main
          className={[
            "w-full flex items-center justify-start text-center flex-col gap-24",
            "main-page",
          ].join(" ")}
        >
          <div className="w-full h-max flex items-center justify-center flex-col gap-4">
            <h1 className="text-white text-5xl font-bold mt-12 tracking-normal">
              <span className="text-violet">LEARN</span>,{" "}
              <span className="text-red-600">SHARE</span> AND{" "}
              <span className="text-orange">GROW</span> IN TIME RECORD, <br />{" "}
              THE ONLY LIMIT IS YOURSELF
            </h1>
            <p className="w-1/3 text-base text-white/50">
              Welcome to Courses app, the best place to learn and share your
              knowledges with other people.
            </p>
          </div>
          <PopularCourses />
        </main>
      )}
    </>
  )
}
