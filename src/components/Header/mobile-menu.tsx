"use client";

import React, { useEffect, useState } from "react"
import Link from "next/link";

const MobileMenu = () => {
  const [showSidebar,setShowSidebar] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
        if(window.innerWidth> 768) {
            setShowSidebar(false)
        }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  },[])
  return (
    <>
      <button
          className="inline-block md:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-align-center"
          >
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="17" y1="12" x2="7" y2="12"></line>
            <line x1="19" y1="18" x2="5" y2="18"></line>
          </svg>
        </button>
        { showSidebar && <MobileNav onClick={() => setShowSidebar(false)} /> }
    </>
  )
}


const MobileNav = ({onClick}: {onClick: () => void;}) => {
    return (
      <>
          <div onClick={onClick} className="absolute left-0 top-0 overflow-hidden w-screen h-screen z-[9999] bg-[#0003] backdrop-blur-[10px]" />
          <div className={`fixed top-0 left-0 z-[9999] rounded-r-lg p-[30px] w-full max-w-[300px] bg-[#fbf9f9] h-screen overflow-hidden mobile-nav `} >
            <button className="mb-10" onClick={onClick} >
              <svg
                className="opacity-20"
                width="24"
                height="24"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4355 17.8051L4.32667 27.914L0.957051 24.5444L11.0659 14.4355L0.957051 4.32664L4.32667 0.957016L14.4355 11.0659L24.5444 0.957016L27.914 4.32664L17.8052 14.4355L27.914 24.5444L24.5444 27.914L14.4355 17.8051Z"
                  fill="#221820"
                ></path>
              </svg>
            </button>
            <ul className="flex flex-col gap-[10px] text-[#3c3c3c]" >
              <li>
                <Link className="text-[18px] uppercase font-semibold opacity-70" href="/" onClick={onClick}>Home</Link>
              </li>
              <li>
                <Link className="text-[18px] uppercase font-semibold opacity-70" href="/products/all" onClick={onClick}>Shop</Link>
              </li>
              <li>
                <Link className="text-[18px] uppercase font-semibold opacity-70" href="/collections/all" onClick={onClick}>Collections</Link>
              </li>
              <li>
                <Link className="text-[18px] uppercase font-semibold opacity-70" href="/" onClick={onClick}>Contact</Link>
              </li>
            </ul>
          </div>
        </>
    )
  }

export default MobileMenu
