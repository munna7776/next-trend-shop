"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <header className="w-full py-4 pr-2 pl-4 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] sticky top-0 flex justify-between items-center bg-white">
      <div className="flex gap-2">
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
        <Link href="/">
          <Image
            src="/next-shop-logo.png"
            alt="next trend shop"
            width={40}
            height={40}
            className="block md:hidden"
          />
          <span className="text-xl font-extrabold hidden md:inline-block">
            Next Trend
          </span>
        </Link>
      </div>
      <nav className="hidden md:flex gap-[30px]">
        <Link href="/">Home</Link>
        <Link href="/">Shop</Link>
        <Link href="/">Collections</Link>
        <Link href="/">Contact</Link>
      </nav>
      <div className="flex items-center gap-1">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className="h-[20px] w-[20px] fill-none "
            fill="none"
            viewBox="0 0 18 19"
            >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
              fill="currentColor"
              ></path>
          </svg>
        </Link>
        <Link href="/">
          <svg
            className="h-[44px] w-[44px]"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            >
            <path
              d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
              fill="currentColor"
              fillRule="evenodd"
              ></path>
          </svg>
        </Link>
      </div>
      { showSidebar && <MobileNav onClick={() => setShowSidebar(false)}  /> }
    </header>
  );
};


const MobileNav = ({onClick}: {onClick: () => void;}) => {
  return (
    <div className="block md:hidden">
        <div onClick={onClick} className="absolute left-0 top-0 overflow-hidden w-full h-screen z-[999] bg-[#0003] backdrop-blur-[10px]" />
        <nav className={`fixed top-0 left-0 z-[9999] rounded-r-lg p-[30px] w-full max-w-[300px] bg-[#fbf9f9] h-screen overflow-hidden mobile-nav `} >
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
              <Link className="text-[18px] uppercase font-semibold opacity-70" href="/">Home</Link>
            </li>
            <li>
              <Link className="text-[18px] uppercase font-semibold opacity-70" href="/">Shop</Link>
            </li>
            <li>
              <Link className="text-[18px] uppercase font-semibold opacity-70" href="/">Collections</Link>
            </li>
            <li>
              <Link className="text-[18px] uppercase font-semibold opacity-70" href="/">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
  )
}

export default Header;
