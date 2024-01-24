import Link from "next/link"
import React from "react"

const Links = ({ text, link }: { text: string; link: string }) => {
  return (
    <small className="text-white/60 text-sm">
      Don´t have any account?{" "}
      <Link href={`/${link}`} className="text-white underline">
        {text}
      </Link>
    </small>
  )
}

export default Links
