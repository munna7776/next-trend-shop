import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        accessToken?: string;
        expiresAt?: string;
    }

    interface Session {
        user?: {
            accessToken?: string | unknown;
        } & DefaultSession["user"],
    }
}