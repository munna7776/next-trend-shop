import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createCustomerAccessToken, getCustomer } from "../shopify";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            // @ts-expect-error
            async authorize(credentials) {
                if(!credentials) {
                    return null;
                }

                const res = await createCustomerAccessToken({email: credentials.email, password: credentials.password})

                const invalidCredential = res.errors.find(error => error.code === "UNIDENTIFIED_CUSTOMER")
                if(invalidCredential) {
                    throw new Error("Invalid credential!")
                }

                if(res.errors.length > 0 && !invalidCredential) {
                    throw new Error("Something went wrong. Please try again after sometime.")
                }

                if(!res.customerAccessToken?.accessToken) {
                    return null;
                }

                return {
                    accessToken: res.customerAccessToken?.accessToken 
                }
            },    
        })
    ],
    callbacks: {
        async jwt({token,user}) {
            if(user) {
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({session,token}) {
            if(token && session.user) {
                session.user.accessToken = token.accessToken
            }
            return session
        }
    }
}