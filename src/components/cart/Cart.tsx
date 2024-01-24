"use client"

import { cn } from "@/lib/utils"
import React, { useContext, useEffect } from "react"
import { X, icons } from "lucide-react"
import { CartContext } from "@/context/CartContext"
import Image from "next/image"
import CartItem from "./CartItem"
import CheckOut from "./CheckOut"

type CartProps = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Cart = ({ active, setActive }: CartProps) => {
  const { cart, setCart } = useContext(CartContext)

  const navCartItems = [
    {
      name: `Cart ${cart.length > 0 ? `(${cart.length})` : ""}`,
      icon: "",
    },
    {
      name: "",
      icon: (
        <X
          size={20}
          className="text-white/90 cursor-pointer my-2 mx-2"
          onClick={() => setActive(false)}
        />
      ),
    },
  ]

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-black/40 z-40 transition-colors duration-200">
      <aside
        tabIndex={0}
        onBlur={() => setActive(!active)}
        className={cn(
          "fixed top-0 right-0 z-50 w-[32%] h-screen flex items-start justify-start bg-[#18151d] flex-col",
          active
            ? "translate-x-0 transition-all duration-200"
            : "translate-x-full transition-all duration-200"
        )}
      >
        <nav className="w-full h-16 flex items-center justify-center">
          <ul className="w-full h-full flex items-center justify-between">
            {navCartItems.map((item, index) => (
              <li key={index} className="flex items-center justify-center">
                {item.icon}
                <small className="text-white/80 my-2 ml-4 text-lg font-semibold">
                  {item.name}
                </small>
              </li>
            ))}
          </ul>
        </nav>
        <section className="w-full h-full flex items-center justify-start flex-col">
          {cart.length > 0 ? (
            <div
              className={cn(
                "w-full flex items-center justify-center flex-col gap-4",
                {
                  "overflow-y-scroll": cart.length > 4,
                }
              )}
            >
              {cart.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
              <CheckOut setActive={setActive} />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-2">
              <Image
                src={"/cart-icon.png"}
                alt="cart-icon"
                width={300}
                height={300}
              />
              <h3 className="text-white/90 text-3xl font-bold">
                Your cart is empty
              </h3>
              <p className="text-white/80 text-sm font-normal">
                Add some courses to your cart.
              </p>
            </div>
          )}
        </section>
      </aside>
    </div>
  )
}

export default Cart
