import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Cart from "./cart";
import { CartIcon } from "@/components/icons";

const Header = () => {
  return (
    <header className="w-full p-4 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] sticky top-0 z-[100] flex justify-between items-center bg-white">
      <div className="flex gap-2">
        <MobileMenu />
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
        <Link href="/products/all">Shop</Link>
        <Link href="/collections/all">Collections</Link>
        <Link href="/">Contact</Link>
      </nav>
      <div className="flex items-center gap-3">
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
        <Suspense fallback={<CartIcon />} >
          <Cart />
        </Suspense>
      </div>
    </header>
  );
};


export default Header;
