import Link from "next/link"
import React from "react"

const Links = () => {
  return (
    <small className="text-white/60 text-sm">
      Don´t have any account?{" "}
      <Link href={"/register"} className="text-white underline">
        Sign Up Now
      </Link>
    </small>
  )
}

export default Links
