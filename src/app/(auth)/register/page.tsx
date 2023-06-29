import Image from "next/image";
import Link from "next/link";
import trend from "../../../../public/images/trend-7-image.jpg";
import logo from "../../../../public/next-shop-logo.png";

const Page = () => {
  return (
    <section className="flex flex-wrap">
      <div className="w-full h-full lg:w-3/5 bg-white py-16 order-1">
        <Image
          src={logo}
          alt="next-trend-shop-logo"
          height={50}
          width={50}
          className="mx-auto"
        />
        <h1 className="text-4xl text-center mt-4 mb-10 font-bold text-[#3c3c3c]">
          Create your account
        </h1>
        <form className="w-3/4 md:w-1/2 lg:w-3/5 2xl:w-1/2 mx-auto">
          <div className="flex flex-col gap-[10px]">
            <label className="#333333 text-lg font-medium" htmlFor="firstName">
              First Name
            </label>
            <input 
              type="text" 
              placeholder="First Name" 
              name="firstName" 
              id="firstName"
              className="focus:outline-none border border-[#ccccd7] px-[10px] py-[10px] rounded-md text-[#5f5f7c] text-lg" 
            />
          </div>
          <div className="flex flex-col gap-[10px]  my-6">
            <label className="#333333 text-lg font-medium" htmlFor="lastName">
              Last Name
            </label>
            <input 
              type="text" 
              placeholder="Last Name" 
              name="lastName" 
              id="lastName"
              className="focus:outline-none border border-[#ccccd7] px-[10px] py-[10px] rounded-md text-[#5f5f7c] text-lg" 
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label className="#333333 text-lg font-medium" htmlFor="email">
              Email
            </label>
            <input 
              type="text" 
              placeholder="Email" 
              name="email" 
              id="email"
              className="focus:outline-none border border-[#ccccd7] px-[10px] py-[10px] rounded-md text-[#5f5f7c] text-lg" 
            />
          </div>
          <div className="flex flex-col gap-[10px] my-6">
            <label className="#333333 text-lg font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="focus:outline-none border border-[#ccccd7] px-[10px] py-[10px] rounded-md text-[#5f5f7c] text-lg"
            />
          </div>
          <div className="flex gap-4 items-center mb-6" >
            <input type="checkbox" name="acceptsMarketing" id="acceptsMarketing" className="h-[24px] w-[24px] border border-[#ccccd7] grid place-content-center cursor-pointer rounded relative focus:outline-none accepts-marketing" />
            <label htmlFor="acceptsMarketing" className="text-[#7f7f9a]" >Sign up now to receive email updates and exciting promotions!</label>
          </div>
          <button type="submit" className="bg-[#212323] my-4 text-white block w-full py-3 text-lg text-center rounded-md">Sign up</button>
          <Link className="block w-full text-center text-lg text-[#24242e]" href="/login" >Already have an account? <span className="underline whitespace-nowrap" >Sign in</span> here</Link>
        </form>
      </div>
      <div className="w-full h-full lg:w-2/5 order-2">
        <div className="relative min-h-[80vh] overflow-hidden">
          <Image
            src={trend}
            alt="next-trend-shop-images"
            placeholder="blur"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
