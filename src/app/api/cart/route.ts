import { addToCart } from "@/libs/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
    const cartId = cookies().get("cartId")?.value

    const {merchandiseId, quantity} = await req.json()

    if(!cartId || !merchandiseId) {
        return NextResponse.json({message: "Missing cart id or merchandise id"}, {status: 400})
    }

    try {
        await addToCart(cartId, [{merchandiseId,quantity}])
        return NextResponse.json({status: 204})
    } catch (error) {
        return NextResponse.json({error})
    }
}