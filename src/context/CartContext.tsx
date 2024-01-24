"use client"

import { CartItemProps } from "@/types/types"
import { v4 as randomUUID } from "uuid"
import { createContext, useEffect, useState } from "react"

export const CartContext = createContext<{
  cart: CartItemProps[]
  defaultData: CartItemProps[]
  setCart: React.Dispatch<React.SetStateAction<CartItemProps[]>>
  setDefaultData: React.Dispatch<React.SetStateAction<CartItemProps[]>>
}>({
  cart: [],
  defaultData: [],
  setCart: () => {},
  setDefaultData: () => {},
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const courses = [
    {
      id: randomUUID(),
      title: "Learining to trade",
      author: "John Doe",
      price: 29,
      preview: "/preview-course-trading.png",
      category: "Digital Marketing",
    },
    {
      id: randomUUID(),
      title: "Improve your english",
      author: "John Doe",
      price: 29,
      preview: "/preview-course-english.jpg",
      category: "Languages",
    },
    {
      id: randomUUID(),
      title: "Best practices with Javascript",
      author: "John Doe",
      price: 29,
      preview: "/preview-course-js.avif",
      category: "Programming",
    },
    {
      id: randomUUID(),
      title: "Programming with Python",
      author: "John Doe",
      price: 29,
      preview: "/preview-course-python.webp",
      category: "Programming",
    },
  ]

  const [cart, setCart] = useState<CartItemProps[]>([])
  const [defaultData, setDefaultData] = useState<CartItemProps[]>(courses)

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
    if (cart.length === 0) {
      localStorage.removeItem("cart")
    }
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, setCart, defaultData, setDefaultData }}
    >
      {children}
    </CartContext.Provider>
  )
}
