"use server"

import { customerResetByURL } from "@/libs/shopify"

export const resetCustomerPassword = async (password: string, resetUrl: string) => {
    try {
        const errors = await customerResetByURL(password, resetUrl)
        if(errors.length === 0) {
            return { message: "Password reset successfully." }
        }
        const invalid = errors.find(error => error.code === "INVALID")
        if(invalid){
            return { error: invalid.message }
        }
    } catch (error) {
        return { error: "Something went wrong. Please try after sometimes." }
    }
}