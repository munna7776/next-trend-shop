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
                    return;
                }

                const customer = await getCustomer(res.customerAccessToken.accessToken)

                const user = {
                    id: customer.id,
                    name: customer.firstName+" "+customer.lastName,
                    email: customer.email,
                    image: null,
                    accessToken: res.customerAccessToken.accessToken,
                    expiresAt: res.customerAccessToken.expiresAt
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
            if(user) {
                token.accessToken = user.accessToken
                token.expiresAt = user.expiresAt
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