import { getAllProducts } from "@/libs/shopify";
import { NextResponse } from "next/server";

export async function GET(req:Request): Promise<Response> {
    const {searchParams} = new URL(req.url)
    const first = searchParams.get("first")
    const after = searchParams.get("after")
    if(!first || !after) {
        return NextResponse.json({message: "First and after parameters are required"},{status:400})
    }
    try {
        const res = await getAllProducts({first: +first,after})
        return NextResponse.json(res, {status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}