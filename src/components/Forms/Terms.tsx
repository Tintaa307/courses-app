import React from "react"

const Terms = () => {
  return (
    <div className="w-[50%] h-max flex items-center justify-center text-center mt-12">
      <p className="text-gray-600 text-xs w-1/2">
        By continuing, you agree to Courses-app{" "}
        <span className="underline italic text-white/50">Terms of Service</span>{" "}
        and{" "}
        <span className="underline italic text-white/50">Privacy Policy</span>,
        and to receive periodic emails with updates.
      </p>
    </div>
  )
}

export default Terms
