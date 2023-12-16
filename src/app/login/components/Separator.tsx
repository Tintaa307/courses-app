import React from "react"

const Separator = () => {
  return (
    <div className="w-[50%] h-max flex items-center justify-center flex-row gap-4">
      <hr className="w-full h-[1px] " />
      <p className="text-white/80">or</p>
      <hr className="w-full h-[1px] " />
    </div>
  )
}

export default Separator
