"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {

  const router = useRouter()

  const handleLogout = async() => {
   const data = await signOut({redirect: false, callbackUrl: "/login"})
   console.log(data)
   router.push(data.url)
  }

  return (
    <button onClick={handleLogout} className="block mx-auto border border-[#333333] text-[#333333] rounded-md mt-3 py-2 px-6">
      Logout
    </button>
  );
};

export default LogoutButton;
