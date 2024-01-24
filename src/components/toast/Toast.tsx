import React from "react"
import { Toaster, toast } from "sonner"

const Toast = () => {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  )
}

export default Toast
