"use server";

import { authOptions } from "@/libs/nextauth-provider-options";
import { customerAddressCreate, customerAddressUpdate, deleteCustomerAddress } from "@/libs/shopify";
import { MailingAddressInput } from "@/libs/shopify/type";
import { getServerSession } from "next-auth";

export const deleteAddress = async(addressId: string) => {
    const session = await getServerSession(authOptions)
    try {
        const result = await deleteCustomerAddress({id:addressId, token: session?.user?.accessToken as string})
        if(result.customerUserErrors.length > 0) {
            return {error: "Failed to delete the address."}
        }
    } catch (error: any) {
        return {error: "Something went wrong. Please try again after some time."}
    }
}

export const createAddress = async(address: MailingAddressInput) => {
    const session = await getServerSession(authOptions)

    try {
        const result = await customerAddressCreate({address, token: session?.user?.accessToken as string})
        if(result.customerUserErrors.length > 0) {
            return {error: "Failed to create the address."}
        }
    } catch (error) {
        return {error: "Something went wrong. Please try again after some time."}
    }
}

export const updateAddress = async(address: MailingAddressInput,id: string) => {
    const session = await getServerSession(authOptions)

    try {
        const result = await customerAddressUpdate({address, id, token: session?.user?.accessToken as string})
        if(result.customerUserErrors.length > 0) {
            return {error: "Failed to update the address."}
        }
    } catch (error) {
        return {error: "Something went wrong. Please try again after some time."}
    }
}