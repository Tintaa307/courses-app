"use client"

import CourseForm from "@/components/Forms/CourseForm"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

const CreateCourse = () => {
  const [exampleData, setExampleData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  })

  return (
    <main
      className={cn("w-full h-full flex items-center justify-center flex-col")}
    >
      <section className="w-[70%] h-full flex items-start justify-start flex-row gap-8">
        <div className="w-1/2 -full flex items-start justify-start flex-col gap-6">
          <div className="w-full h-max flex items-start justify-start flex-col gap-2">
            <h1 className="text-white/90 text-3xl font-semibold mt-12">
              Create a course
            </h1>
            <p className="text-white/70 text-sm font-normal">
              Here you can create a course and start selling it to the world!
            </p>
          </div>
          <span className="w-full h-[1px] bg-white/30" />
          <CourseForm setExampleData={setExampleData} />
        </div>
        <main className="w-1/2 h-max flex justify-start items-start flex-col gap-4 mt-32">
          <h1 className="text-white/90 text-4xl font-bold">
            {"John Doe"} - {exampleData.title}
          </h1>
          <div className="w-max h-max flex items-center justify-start flex-row gap-3">
            <small className="text-white/80 font-medium text-lg">
              ${exampleData.price}
            </small>
            <span className="w-[1px] bg-white/20 h-6" />
            <small className="text-white/70 text-base font-normal">
              {exampleData.category}
            </small>
          </div>
          <p
            className={cn("text-white/70 text-base font-normal w-3/4", {
              "break-words": exampleData.description.length > 60,
            })}
          >
            {exampleData.description}
          </p>
        </main>
      </section>
    </main>
  )
}

export default CreateCourse
