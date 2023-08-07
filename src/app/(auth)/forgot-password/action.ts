"use server";

import { customerRecover } from "@/libs/shopify";

export const sendCustomerResetPasswordLink = async(email: string) => {
    try {
        const errors = await customerRecover(email)
        if(errors.length === 0) {
            return { message: "Reset password link has been sent to your email." }
        }

        const unidentifiedCustomer = errors.find(error => error.code === "UNIDENTIFIED_CUSTOMER")
        if(unidentifiedCustomer){
            return { error: "Customer does not exist. Please provide valid email id." }
        }
    } catch (error) {
        return { error: "Something went wrong. Please try after sometimes." }
    }
    
}