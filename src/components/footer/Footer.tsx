import React from "react"

const Footer = () => {
  return (
    <footer className="w-full h-max flex items-center justify-center flex-row mt-12">
      <div className="w-[70%] border-t-[2px] border-white/30 flex items-center justify-evenly">
        <p className="text-white/80 text-sm font-normal my-8">
          © 2024 All rights reserved
        </p>
        <p className="text-white/80 text-sm font-normal my-8 cursor-pointer">
          Terms of Service | Privacy Policy
        </p>
      </div>
    </footer>
  )
}

export default Footer
