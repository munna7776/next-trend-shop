"use server";

import { revalidatePath } from "next/cache";
import { authOptions } from "@/libs/nextauth-provider-options";
import { customerAddressCreate, customerAddressUpdate, customerDefaultAddressUpdate, deleteCustomerAddress } from "@/libs/shopify";
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
    const {checked, ...addressField} = address

    try {
        const addressCreateResult = await customerAddressCreate({address: addressField, token: session?.user?.accessToken as string})
        if(addressCreateResult.errors.length > 0) {
            return {error: "Failed to create the address."}
        }
        if(!checked) {
            return;
        }
        const errors = await customerDefaultAddressUpdate(addressCreateResult.id, session?.user?.accessToken as string)
        if(errors.length > 0) {
            return {error: "Failed to create the address."}
        }
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong. Please try again after sometime."}
    }
}

export const updateAddress = async(address: MailingAddressInput,id: string) => {
    const session = await getServerSession(authOptions)
    const {checked, ...addressField} = address
    try {
        const addressUpdateResult = await customerAddressUpdate({address: addressField, id, token: session?.user?.accessToken as string})
        if(addressUpdateResult.errors.length > 0) {
            return {error: "Failed to update the address."}
        }
        if(!checked) {
            return;
        }
        const errors = await customerDefaultAddressUpdate(addressUpdateResult.id, session?.user?.accessToken as string)
        if(errors.length > 0) {
            return {error: "Failed to update the address."}
        }
    } catch (error) {
        return {error: "Something went wrong. Please try again after some time."}
    }
}

export const changeToDefaultAddress = async (formData: FormData) => {
    const session = await getServerSession(authOptions)
    const addressId = formData.get("addressId") ?? "";
    try {
        const errors = await customerDefaultAddressUpdate(`${addressId}`, session?.user?.accessToken as string)
        if(errors.length > 0) {
            throw new Error("Failed to set the address as default")
        }
        revalidatePath("/account")
    } catch (error) {
        throw new Error("Something went wrong. Please try after sometime.")
    }
}