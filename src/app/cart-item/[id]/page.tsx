"use client"

import Button from "@/components/button/Button"
import { CartContext } from "@/context/CartContext"
import { CartItemProps } from "@/types/types"
import React, { useContext, useEffect, useState } from "react"
import { Shield } from "lucide-react"
import Image from "next/image"
import Courses from "@/components/carousels/Courses"
import { Toaster, toast } from "sonner"
import { SessionContext } from "@/context/SessionContext"
import { useRouter } from "next/navigation"

const ItemInformation = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { defaultData, setCart, cart } = useContext(CartContext)
  const [cartItem, setCartItem] = useState<CartItemProps>()
  const [OthersItems, setOthersItems] = useState<CartItemProps[]>([])
  const [selected, setSelected] = useState<CartItemProps>()
  const { publicUser } = useContext(SessionContext)
  const router = useRouter()

  useEffect(() => {
    if (defaultData.length > 0) {
      const item = defaultData.find((item) => item.id === id)
      setCartItem(item)
    }
  }, [defaultData])

  useEffect(() => {
    if (defaultData.length > 0) {
      const items = defaultData.filter((item) => item.id !== id)
      setOthersItems(items)
    }
  }, [defaultData])

  useEffect(() => {
    if (selected) {
      const isItemInArray = cart.find((i) => i.id === cartItem?.id)
      if (isItemInArray) {
        toast.info("Item already in cart")
      } else {
        toast.success("Item added to cart")
        setSelected(undefined)
        setCart((prev) => [...prev, cartItem!])
      }
    }
  }, [selected])

  return (
    <section
      className={[
        "w-full h-full flex items-center justify-center flex-col",
        ,
      ].join(" ")}
    >
      <Toaster richColors position="top-center" duration={3000} />
      <div className="w-[70%] h-full flex items-start justify-center flex-row gap-8">
        <main className="w-1/2 h-max flex justify-start items-start flex-col gap-4 my-24">
          <h1 className="text-white/90 text-4xl font-bold">
            {cartItem?.author} - {cartItem?.title}
          </h1>
          <div className="w-max h-max flex items-center justify-start flex-row gap-3">
            <small className="text-white/80 font-medium text-lg">
              ${cartItem?.price}
            </small>
            <span className="w-[1px] bg-white/20 h-6" />
            <small className="text-white/70 text-base font-normal">
              {cartItem?.category}
            </small>
          </div>
          <p className="text-white/70 text-base font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            accusantium. Minus alias facilis consequuntur ut harum quae, quis ea
            quo eius, aspernatur sint voluptatem sequi illum nesciunt minima est
            dolores! Ducimus impedit, optio eaque consequatur hic, saepe sequi
            cumque blanditiis voluptate ab eligendi expedita sit earum itaque
            inventore commodi corrupti.
          </p>
          <div className="w-full h-max flex items-center justify-center flex-col gap-5 mt-24">
            <Button
              accion={() => {
                publicUser ? setSelected(cartItem) : router.push("/login")
              }}
              text="Add to cart"
              className="w-full"
            />
            <div className="flex flex-row gap-2">
              <Shield size={22} className="text-blue-200/50" />
              <small className="text-white/60">30 Day Return Guarantee</small>
            </div>
          </div>
        </main>
        <picture className="w-1/2 h-max flex items-start justify-center">
          {cartItem?.preview && (
            <Image
              src={cartItem.preview}
              alt="image-preview"
              width={600}
              height={1200}
              className="h-[450px] rounded-md my-24"
            />
          )}
        </picture>
      </div>
      <div className="w-[70%] h-max flex items-center justify-center mt-24 mb-10">
        <Courses defaultData={OthersItems} />
      </div>
    </section>
  )
}

export default ItemInformation
