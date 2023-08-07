"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler  } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../../../public/next-shop-logo.png";
import { Input } from "@/components/UI";
import { validationRules } from "@/libs/const";

type FormValues = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  acceptsMarketing: boolean,
}

const Page = () => {
  const [loading,setLoading] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptsMarketing: false,
    },
  });

  const router = useRouter()

  const handleSignUpSubmit: SubmitHandler<FormValues> = async(data) => {
    const { confirmPassword, ...input } = data
    if(confirmPassword !== input.password) {
      setError("password",{message: "Passwords do not match."}, {shouldFocus: true})
      setError("confirmPassword",{message: "Passwords do not match."})
      return;
    }
    clearErrors()
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        body: JSON.stringify(input)
      })

      if(res.status === 409) {
        throw new Error("Email already exists.")
      }

      if(res.status === 400) {
        throw new Error("Unable to create your account. Please try again after sometime.")
      }

      if(res.status === 500) {
        throw new Error("Internal server error")
      }
      
      const data = await res.json() as {message: string}
      toast.success(data.message)
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <section className="flex justify-center">
      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 bg-white py-16 order-1">
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
        <form onSubmit={handleSubmit(handleSignUpSubmit)} className="w-[90%] md:w-1/2 lg:w-3/5 2xl:w-1/2 mx-auto">
          <Input
            labelText="First Name"
            placeholder="First Name"
            name="firstName"
            register={register}
            rules={validationRules.firstName}
            error={errors?.firstName?.message}
          />
          <Input
            labelText="Last Name"
            placeholder="Last Name"
            name="lastName"
            className="my-6"
            register={register}
            rules={validationRules.lastName}
            error={errors?.lastName?.message}
          />
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
            className="my-6"
            register={register}
            rules={validationRules.password}
            error={errors?.password?.message}
          />
          <Input
            type="password"
            labelText="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            rules={validationRules.confirmPassword}
            error={errors?.confirmPassword?.message}
          />
          <div className="flex gap-3 items-center my-6">
            <input
              {...register("acceptsMarketing")}
              type="checkbox"
              id="acceptsMarketing"
              className="h-[24px] w-[24px] border border-[#ccccd7] grid place-content-center cursor-pointer rounded relative focus:outline-none accepts-marketing"
            />
            <label htmlFor="acceptsMarketing" className="text-[#7f7f9a]">
              Sign up now to receive email updates and exciting promotions!
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#212323] grid place-items-center my-4 text-white w-full py-3 text-lg text-center rounded-md"
          >
            { loading ? <span className="inline-block h-[28px] w-[28px] border-t-2 border-r-2 border-white rounded-3xl animate-spin"  /> : "Sign up" }
          </button>
          <Link
            className="block w-full text-center text-lg text-[#24242e]"
            href="/login"
          >
            Already have an account?{" "}
            <span className="underline whitespace-nowrap">Sign in</span> here
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Page;
