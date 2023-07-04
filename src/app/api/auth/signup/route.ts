import { createCustomer } from "@/libs/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const input = await req.json()

    try {
        const res = await createCustomer(input)
        const emailExistError = res.errors.find(error => error.code === "TAKEN")
        if(emailExistError) {
            return NextResponse.json({error: "Email already exists"}, {status: 409})
        }
        if(res.errors.length > 0 && !emailExistError) {
            return NextResponse.json({error: "Unable to create your account. Please try again after sometime."},{status: 400})
        }
        return NextResponse.json({message: "User created successfully."}, {status: 201})
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}