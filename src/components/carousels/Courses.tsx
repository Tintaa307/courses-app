import React, { useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CartItemProps } from "@/types/types"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"

type CoursesProps = {
  defaultData: CartItemProps[]
}

const Courses = ({ defaultData }: CoursesProps) => {
  const router = useRouter()

  useEffect(() => {
    console.log(defaultData.length)
  }, [defaultData])

  return (
    <Carousel className="w-full">
      <CarouselContent className="w-full gap-2">
        {defaultData.map((c) => (
          <CarouselItem
            onClick={() => {
              router.push(`/cart-item/${c.id}`)
            }}
            key={c.id}
            className={cn(
              "h-max basis-1/4 rounded-md flex items-start justify-center flex-col gap-1 cursor-pointer",
              {
                "basis-1/3": defaultData.length === 3,
                "basis-1/2": defaultData.length === 2,
              }
            )}
          >
            <picture className="w-full h-[240px] bg-black rounded-md flex items-center justify-center">
              <Image
                src={c.preview}
                alt="image preview"
                width={500}
                height={500}
                className="rounded-md w-full h-full"
              />
            </picture>
            <div className="relative w-full h-max flex flex-row justify-between items-center">
              <div className="flex flex-col justify-start items-start gap-1">
                <small className="text-white font-medium text-lg flex flex-col">
                  {c.title.slice(0, 20) + "..."}
                </small>
                <p className="text-white/80 text-sm font-normal">
                  Author: {c.author}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <small className="text-white/70 text-base">{c.price}$</small>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-none rounded-full" />
      <CarouselNext className="border-none rounded-full" />
    </Carousel>
  )
}

export default Courses
