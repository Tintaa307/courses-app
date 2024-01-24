import React, { useContext, useEffect, useState } from "react"
import Button from "../button/Button"
import { CartContext } from "@/context/CartContext"
import { useRouter } from "next/navigation"

type CheckOutState = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckOut = ({ setActive }: CheckOutState) => {
  const { cart } = useContext(CartContext)
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (cart.length === 0) setTotal(0)
    else {
      const total = cart.reduce((acc, item) => acc + item.price, 0)
      setTotal(total)
    }
  }, [cart])

  const listOfTerms = [
    {
      title: "Shipping",
      price: "free",
    },
    {
      title: "Transaction fee",
      price: "1% of the total price",
    },
    {
      title: "Total",
      price: `$${Math.round(total)}`,
    },
  ]

  return (
    <footer className="w-[95%] h-max flex items-center justify-center flex-col gap-4">
      {listOfTerms.map((item, index) => (
        <div
          key={index}
          className="w-full h-max flex items-center justify-between flex-row"
        >
          <h5 className="text-white/90 text-sm font-medium">{item.title}</h5>
          <small className=" text-white/90 text-sm font-normal">
            {item.price}
          </small>
        </div>
      ))}
      <Button
        text="Continue to checkout"
        className="w-full"
        accion={() => {
          router.push("/checkout")
          setActive(false)
        }}
      />
    </footer>
  )
}

export default CheckOut
