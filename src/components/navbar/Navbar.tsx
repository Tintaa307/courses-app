"use client"

import React, { useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import "remixicon/fonts/remixicon.css"
import { SessionContext } from "@/context/SessionContext"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  ExternalLink,
  Wallet2,
  LogOut,
  Inbox,
  Settings2,
  MessageCircleQuestion,
  User2,
  UserRoundX,
} from "lucide-react"
import Cart from "../cart/Cart"
import { CartContext } from "@/context/CartContext"
import Image from "next/image"

const Navbar = () => {
  const pathname = usePathname()
  const { publicUser } = useContext(SessionContext)
  const [isCartActive, setIsCartActive] = useState(false)
  const { cart } = useContext(CartContext)

  useEffect(() => {
    console.log(publicUser)
  }, [publicUser])

  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <>
      {pathname !== "/verification-page" &&
        pathname !== "/login" &&
        pathname !== "/recover-password" &&
        pathname !== "/update-password" &&
        pathname !== "/register" && (
          <header className="relative top-0 left-0 z-40 w-full h-[66px] flex items-center justify-center">
            {isCartActive ? (
              <Cart active={isCartActive} setActive={setIsCartActive} />
            ) : null}
            <nav
              className={[
                "w-[70%] h-full flex items-center justify-center",
                "nav-border",
              ].join(" ")}
            >
              <div className="w-full h-full flex items-start justify-evenly">
                <div className="w-[50%] h-full flex items-center justify-start">
                  <Image
                    onClick={() => router.push("/")}
                    src={"/clapperdboard.png"}
                    alt="clapperdboard-logo"
                    width={65}
                    height={65}
                    className="cursor-pointer"
                  />
                </div>

                <div className="w-[50%] h-full flex items-center justify-end flex-row gap-8">
                  {publicUser?.user_role === "seller" && (
                    <>
                      <Link
                        href={"/create-course"}
                        className="text-white hover:opacity-90 transition-colors duration-150"
                      >
                        Create course
                      </Link>
                      <span className="h-[45%] w-[1px] bg-[#24202a]" />
                    </>
                  )}
                  {!publicUser ? (
                    <>
                      <Link
                        href={"/login"}
                        className="text-white hover:opacity-90 transition-colors duration-150"
                      >
                        Sign in
                      </Link>
                      <span className="h-[45%] w-[1px] bg-[#24202a]" />
                      <Link
                        href={"/register"}
                        className="text-white hover:opacity-90 transition-colors duration-150"
                      >
                        Create account
                      </Link>
                    </>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="user-select-none border-none outline-none">
                        <Avatar>
                          <AvatarImage
                            onLoadingStatusChange={(status) =>
                              console.log(status)
                            }
                            src={publicUser.avatar_url}
                            className="rounded-full cursor-pointer hover:opacity-90 transition-colors duration-150"
                            width={32}
                            height={32}
                          />
                          <AvatarFallback className="bg-bg_color_dark rounded-full p-2 text-white/80">
                            {publicUser.name
                              ? publicUser.name.charAt(0).toUpperCase() +
                                publicUser.name
                                  .split(" ")[1]
                                  .charAt(0)
                                  .toUpperCase()
                              : "CA"}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="border-none bg-bg_color_dark text-white py-3 px-5 mt-4">
                        <div
                          className={cn(
                            "w-full h-max flex items-start justify-center flex-row gap-3 my-4",
                            {
                              "items-center": !publicUser.avatar_url,
                            }
                          )}
                        >
                          <Avatar>
                            <AvatarImage
                              src={publicUser.avatar_url}
                              className="rounded-full"
                              width={50}
                              height={50}
                            />
                            <AvatarFallback className="bg-bg_color rounded-full p-2 text-white/80">
                              {publicUser.name &&
                                publicUser.name.charAt(0).toUpperCase() +
                                  publicUser.name
                                    .split(" ")[1]
                                    .charAt(0)
                                    .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex justify-center items-start flex-col">
                            <h2 className="text-white text-[18px]">
                              {publicUser.name ? publicUser.name : "App user"}
                            </h2>
                            <small className="text-gray-500 text-xs">
                              {publicUser.id.length > 24
                                ? publicUser.id.substring(0, 24) + "..."
                                : publicUser.id}
                            </small>
                          </div>
                        </div>
                        <DropdownMenuSeparator className="my-4" />
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          Your profile
                          <User2 size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          Your courses
                          <Inbox size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          Subscriptions plans
                          <Wallet2 size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          Settings
                          <Settings2 size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-4" />
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          FAQ
                          <MessageCircleQuestion
                            size={20}
                            className="mx-2"
                          />{" "}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          Terms and conditions{" "}
                          <ExternalLink size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer">
                          Privacy policy{" "}
                          <ExternalLink size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-4" />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="focus:bg-bg_color focus:text-white/90 font-medium cursor-pointer"
                        >
                          Sign out
                          <LogOut size={20} className="mx-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-500 focus:text-white font-medium cursor-pointer">
                          Delete account{" "}
                          <UserRoundX size={20} className="mx-2" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <span className="h-[45%] w-[1px] bg-[#24202a]" />
                  <div className="flex flex-row gap-3 items-center">
                    <i
                      onClick={() => setIsCartActive(!isCartActive)}
                      className={cn(
                        "ri-shopping-cart-fill",
                        "text-white cursor-pointer text-xl hover:opacity-90 transition-colors duration-150 flex flex-row gap-2"
                      )}
                    ></i>
                    {cart.length > 0 ? (
                      <p className="font-medium text-white/80 text-lg">
                        {cart.length}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </nav>
          </header>
        )}
    </>
  )
}

export default Navbar
