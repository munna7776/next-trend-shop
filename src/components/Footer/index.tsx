import React from "react";
import Link from "next/link";
import {
  MasterCardIcon,
  PayPalIcon,
  RightChevronIcon,
  VisaIcon,
} from "../icons";

const quickLinks: { link: string; title: string }[] = [
  {
    link: "/",
    title: "About Us",
  },
  {
    link: "/collections/all",
    title: "Collections",
  },
  {
    link: "/products/all",
    title: "Shop",
  },
  {
    link: "/contact",
    title: "Contact",
  },
];

const legalLinks: { link: string; title: string }[] = [
  {
    link: "/",
    title: "Terms and Conditions",
  },
  {
    link: "/",
    title: "Privacy Policy",
  },
  {
    link: "/",
    title: "Cookies Preferences",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const copyRightDate = 2023 + (currentYear > 2023 ? ` - ${currentYear}` : "");

  return (
    <footer className="bg-black p-6">
      <div className="flex justify-between flex-wrap gap-8">
        <div
          id="newsletter-subscription"
          className="w-full sm:w-[75%] md:w-[30%]"
        >
          <p className="text-white text-[17px] font-bold">JOIN US</p>
          <p className="text-white mt-1 mb-4 text-[15px] leading-5 font-light">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form className="relative">
            <input
              type="text"
              placeholder="Email"
              className="w-full bg-transparent py-3 pl-4 pr-5 border border-white rounded-md text-white focus:outline-none placeholder:text-gray-400 "
            />
            <button
              type="submit"
              className="absolute right-3 top-[50%] translate-y-[-50%]"
              aria-label="Subscribe to newsletter"
            >
              <RightChevronIcon />
            </button>
          </form>
        </div>
        <div
          id="quick-links"
          className="flex gap-x-16 gap-y-8 flex-wrap text-white md:gap-8"
        >
          <div>
            <h4 className="uppercase font-bold mb-3">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((quickLink, index) => (
                <li key={index}>
                  <Link
                    aria-label={`${quickLink.title} page`}
                    className="font-light"
                    href={quickLink.link}
                  >
                    {quickLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="uppercase font-bold mb-3">Legal</h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((legalLink, index) => (
                <li key={index}>
                  <Link
                    aria-label={`${legalLink.title} page`}
                    className="font-light"
                    href={legalLink.link}
                  >
                    {legalLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ul className="w-full mt-10 flex gap-2 justify-center">
        <li>
          <VisaIcon />
        </li>
        <li>
          <MasterCardIcon />
        </li>
        <li>
          <PayPalIcon />
        </li>
      </ul>
      <div
        id="copyrights"
        className="border-t border-white text-white mt-6 pt-6 text-center"
      >
        &copy; {copyRightDate} Next Trend Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
