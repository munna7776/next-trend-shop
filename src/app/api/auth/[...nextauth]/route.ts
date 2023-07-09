import { authOptions } from "@/libs/nextauth-provider-options";
import { createCustomerAccessToken, getCustomer } from "@/libs/shopify";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }