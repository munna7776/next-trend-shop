import NextAuth from "next-auth/next";
import { authOptions } from "@/libs/nextauth-provider-options";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }