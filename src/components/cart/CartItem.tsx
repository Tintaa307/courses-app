import { CartContext } from "@/context/CartContext"
import { cn } from "@/lib/utils"
import { CartItemProps } from "@/types/types"
import { X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

type CartItemComponent = CartItemProps & {
  className?: string
}

const CartItem = ({
  author,
  category,
  preview,
  price,
  title,
  id,
  className,
}: CartItemComponent) => {
  const { setCart, cart } = useContext(CartContext)
  const [itemToDelete, setItemToDelete] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (itemToDelete) {
      const newCart = cart.filter((item) => item.id !== itemToDelete)
      localStorage.setItem("cart", JSON.stringify(newCart))
      setCart(newCart)

      if (cart.length === 0) localStorage.removeItem("cart")
    }
  }, [itemToDelete])

  return (
    <div
      className={cn(
        "w-[95%] h-max flex items-center justify-evenly flex-row border-t-[2px] border-bg_color/90",
        className,
        {
          "border-b-[2px] border-bg_color/90": cart[cart.length - 1].id === id,
        }
      )}
    >
      <picture className="w-1/4 h-full flex items-center justify-start">
        <Image
          src={preview}
          alt="image-item"
          width={100}
          height={100}
          className="mx-2 w-[100px] h-[90px] rounded-md my-8"
        />
      </picture>
      <main className="w-2/3 h-full flex items-start justify-start flex-col gap-2">
        <h5 className="text-white/90 text-sm font-normal mt-8">
          {title} - {author}
        </h5>
        <p className="text-white/40 text-xs font-normal">{category}</p>
        <div
          onClick={() => setItemToDelete(id)}
          className="flex flex-row mt-5 items-center justify-center gap-1 cursor-pointer group"
        >
          <X
            size={10}
            className="text-white/60 group-hover:text-white/80 transition-colors duration-200"
          />
          <small className="text-xs text-white/50 group-hover:text-white/80 transition-colors duration-200">
            Remove
          </small>
        </div>
      </main>
      <div className="w-1/4 h-full flex items-start justify-center">
        <small className="mt-8 text-white/80 text-sm font-normal">
          ${price}
        </small>
      </div>
    </div>
  )
}

export default CartItem
