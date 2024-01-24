"use client"

import React, { useContext, useEffect } from "react"
import { CartContext } from "@/context/CartContext"
import Courses from "./Courses"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const PopularCourses = () => {
  const { defaultData, setDefaultData } = useContext(CartContext)
  const supabase = createClientComponentClient()

  return (
    <div className="w-[70%] h-max flex items-center justify-center flex-col gap-2">
      <div className="w-full h-max flex items-start justify-start flex-col gap-1">
        <h3 className="text-white/90 text-3xl font-bold">
          The most viewed courses
        </h3>
        <p className="text-gray-600 text-sm font-semibold">
          Here you can find the most viewed courses in the last month.
        </p>
      </div>
      <Courses defaultData={defaultData} />
    </div>
  )
}

export default PopularCourses
