"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import trend from "../../../../public/images/trend-7-image.jpg";
import logo from "../../../../public/next-shop-logo.png";
import { Input } from "@/components/UI";
import { validationRules } from "@/libs/const";
import { sendCustomerResetPasswordLink } from "./action";

const Page = () => {
  const {register,formState: {errors},handleSubmit, setValue} = useForm({
    defaultValues: {
      email:""
    }
  })
  const [pending, startTransition] = useTransition()

  const onSubmit: SubmitHandler<{email: string}> = async(data) => {
    startTransition(async() => {
      const result = await sendCustomerResetPasswordLink(data.email)
      if(result?.error) {
        toast.error(result.error)
        return;
      }
      setValue("email", "")
      toast.success(result?.message)
      return;
    })
  }

  return (
    <section className="flex flex-wrap">
      <div className="w-full flex flex-col justify-center lg:w-3/5 bg-white py-16 order-1">
        <Image
          src={logo}
          alt="next-trend-shop-logo"
          height={50}
          width={50}
          className="mx-auto"
        />
        <h1 className="text-2xl text-center mt-4 mb-3 font-bold text-[#3c3c3c]">
          Reset your password
        </h1>
        <p className="text-[#5f5f7c] text-center mb-8" >We will send you an email to reset your password.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 md:w-1/2 lg:w-3/5 2xl:w-1/2 mx-auto">
          <Input 
            labelText="Email"
            placeholder="Enter your email"
            name="email"
            register={register}
            rules={validationRules.email}
            error={errors?.email?.message}
          />
          <button type="submit" disabled={pending} className="bg-[#212323] my-4 text-white grid place-items-center w-full py-3 text-lg text-center rounded-md">
            { pending ? <span className="inline-block h-[28px] w-[28px] border-t-2 border-r-2 border-white rounded-3xl animate-spin"  /> : "Submit" }
          </button>
          <Link className="block w-full text-center text-lg text-[#24242e]" href="/login" >Cancel</Link>
        </form>
      </div>
      <div className="w-0 none lg:block lg:w-2/5 order-2">
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
