"use client"

import CartItem from "@/components/cart/CartItem"
import { CartContext } from "@/context/CartContext"
import { SessionContext } from "@/context/SessionContext"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
import { X, Film } from "lucide-react"
import Button from "@/components/button/Button"
import Image from "next/image"
import Link from "next/link"

const CheckOutPage = () => {
  const { cart, setCart } = useContext(CartContext)
  const { publicUser } = useContext(SessionContext)
  const router = useRouter()
  const [idToDelete, setIdToDelete] = useState("")
  const [isEnable, setIsEnable] = useState(false)
  const [total, setTotal] = useState("")

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price + (acc + item.price) * 0.01,
      0
    )
    setTotal(total.toString().slice(0, 5))
  }, [cart])

  const termsArr = [
    {
      title: "Subtotal",
      price: `$${cart.reduce((acc, item) => acc + item.price, 0)}`,
    },
    {
      title: "Shipping",
      price: "free",
    },
    {
      title: "Transaction fee",
      price: "1%",
    },
    {
      title: "Total",
      price: `$${total}`,
    },
  ]

  useEffect(() => {
    if (cart.length === 0) setIsEnable(true)
    else setIsEnable(false)
  }, [cart])

  useEffect(() => {
    if (idToDelete) {
      const newCart = cart.filter((item) => item.id !== idToDelete)
      setCart(newCart)
    }
  }, [idToDelete])

  useEffect(() => {
    if (!publicUser) {
      router.push("/login")
    }
  }, [])

  return (
    <main
      className={cn(
        "w-full flex items-center justify-start flex-col",
        "main-page"
      )}
    >
      <section className="w-[70%] h-[60%] flex items-start justify-start flex-row gap-6 border-b-[1px] border-b-white/30 mt-16">
        <div className="w-1/2 h-full flex items-start justify-start flex-col">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-white/90 text-3xl font-semibold">
              Your cart items
            </h2>
            <span
              className={cn("w-full h-[1px] bg-white/30", {
                "mb-4": cart.length === 0,
              })}
            />
          </div>
          <div
            className={cn(
              "w-full h-full flex items-center justify-start flex-col gap-2",
              {
                "overflow-y-scroll": cart.length > 3,
              }
            )}
          >
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className={cn("w-full flex flex-row gap-4", {
                    "border-b-[1px] border-white/30": index !== cart.length - 1,
                  })}
                >
                  <CartItem {...item} className="w-[85%] h-full" />
                  <X
                    onClick={() => setIdToDelete(item.id)}
                    size={25}
                    className="text-white relative top-8 left-12 cursor-pointer hover:text-white/60 transition-colors duration-200"
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[93%] border-dashed border-[2px] border-white/30 flex items-center justify-start flex-col gap-2">
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
                <Link
                  href={"/"}
                  className="text-white/80 text-sm font-medium underline hover:text-white transition-colors duration-200"
                >
                  Go shop
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="w-full h-[85%] bg-bg_color_dark border-[1px] border-white/10 mt-5 flex justify-start items-center flex-col gap-3 rounded-sm">
            <div className="w-[85%] h-max flex items-start justify-start">
              <h2 className="text-white/90 text-xl font-medium mt-12">
                Final summary
              </h2>
            </div>
            <footer className="w-[85%] h-max flex items-center justify-center flex-col gap-4 mt-6">
              {termsArr.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-full h-max flex items-center justify-between flex-row",
                    {
                      "border-b-[1px] border-white/10":
                        index !== termsArr.length - 1,
                    }
                  )}
                >
                  <h5
                    className={cn("text-white/90 text-base font-medium my-2", {
                      "text-lg font-semibold": index === termsArr.length - 1,
                    })}
                  >
                    {item.title}
                  </h5>
                  <small
                    className={cn("text-white/90 text-sm font-medium", {
                      "text-lg font-semibold": index === termsArr.length - 1,
                    })}
                  >
                    {item.price}
                  </small>
                </div>
              ))}
              <Button disable={isEnable} text="Checkout" className="w-full" />
            </footer>
          </div>
        </div>
      </section>
      <section className="w-[70%] h-max flex items-center justify-center flex-col gap-4 mt-12">
        <picture>
          <Image
            src={"/clapperdboard.png"}
            alt="clapperdboard-image"
            width={100}
            height={100}
          />
        </picture>
        <div className="w-full h-max flex items-center justify-center text-center flex-col gap-2">
          <h5 className="text-white text-lg font-semibold">
            Try the seller experience
          </h5>
          <p className="text-white/70 text-sm font-normal w-1/2">
            Become a{" "}
            <Link
              href={"/create-course"}
              className="text-white underline  font-medium"
            >
              seller
            </Link>{" "}
            and start selling your courses to the world. Its a great opportunity
            to share your knowledge and earn money.
          </p>
        </div>
      </section>
    </main>
  )
}

export default CheckOutPage
