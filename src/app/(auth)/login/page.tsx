"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react"
import trend from "../../../../public/images/trend-7-image.jpg";
import logo from "../../../../public/next-shop-logo.png";
import { Input } from "@/components/UI";
import { validationRules } from "@/libs/const";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
}

const Page = () => {
  const {register,formState: {errors}, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleLoginFormSubmit: SubmitHandler<FormValues> = async(data) => {
    setLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })
    setLoading(false)
    if(result?.error) {
      return toast.error(result.error)
    }
    router.push("/account")
  }

  return (
    <section className="flex flex-wrap">
      <div className="w-full lg:w-3/5 bg-white py-16 order-1 md:order-2 xl:order-1">
        <Image
          src={logo}
          alt="next-trend-shop-logo"
          height={50}
          width={50}
          className="mx-auto"
        />
        <h1 className="text-4xl text-center mt-4 mb-10 font-bold text-[#3c3c3c]">
          Login
        </h1>
        <form onSubmit={handleSubmit(handleLoginFormSubmit)} className="w-3/4 md:w-1/2 lg:w-3/5 2xl:w-1/2 mx-auto">
          <Input 
            labelText="Email"
            placeholder="Email"
            name="email"
            register={register}
            rules={validationRules.email}
            error={errors?.email?.message}
          />
          <Input 
            type="password"
            labelText="Password"
            placeholder="Password"
            name="password"
            register={register}
            rules={validationRules.password}
            error={errors?.password?.message}
            className="my-6" 
          />
          <Link className="block w-full text-center text-lg text-[#24242e]" href="/forgot-password" >Forgot your password?</Link>
          <button type="submit" className="bg-[#212323] grid place-items-center my-4 relative text-white w-full py-3 text-lg rounded-md">
          { loading ? <span className="inline-block h-[28px] w-[28px] border-t-2 border-r-2 border-white rounded-3xl animate-spin"  /> : "Sign in" }
          </button>
          <Link className="block w-full text-center text-lg text-[#24242e]" href="/register" >{"Don't have an account? "}<span className="underline whitespace-nowrap" >Sign up</span> here</Link>
        </form>
      </div>
      <div className="w-full lg:w-2/5 order-2 md:order-1 xl:order-2">
        <div className="relative h-full overflow-hidden">
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
