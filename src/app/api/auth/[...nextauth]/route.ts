import { createCustomerAccessToken, getCustomer } from "@/libs/shopify";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            
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
                    return;
                }

                const customer = await getCustomer(res.customerAccessToken.accessToken)
                console.log({
                    ...customer,
                    accessToken: res.customerAccessToken.accessToken,
                    expiresAt: res.customerAccessToken.expiresAt
                })
                const user = {
                    id: customer.id as string,
                    name: customer.firstName+" "+customer.lastName,
                    email: customer.email as string,
                    image: null
                }
                if(user.email) {
                    return user
                }
                return null
            },    
        })
    ],
    callbacks: {
        async jwt({token,user}) {
            // if(user) {
            //     token.accessToken = user.accessToken
            //     token.expiresAt = user.expiresAt
            // }
            // return token
            console.log(token)
            if(user) {
                console.log(user)
            }
            return token
        },
        async session({session,token, user}) {
            // if(token && session.user) {
            //     session.user.accessToken = token.accessToken
            //     session.expires = user.expiresAt
            //     session.user.expiresAt = user.expiresAt
            // }
            // return session
            // console.log(session)
            // console.log(user)
            return session
        }
    }
})

export { handler as GET, handler as POST }