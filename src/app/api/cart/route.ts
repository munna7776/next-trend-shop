import { addToCart, removeCart, updateCart } from "@/libs/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
    const cartId = cookies().get("cartId")?.value

    const {merchandiseId, quantity} = await req.json()

    if(!cartId || !merchandiseId) {
        return NextResponse.json({message: "Missing cart id or merchandise id"}, {status: 400})
    }

    try {
        const res = await addToCart(cartId, [{merchandiseId,quantity}])
        return NextResponse.json({checkoutUrl: res.checkoutUrl},{status: 204})
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function PUT(req: NextRequest): Promise<Response> {
    const cartId = cookies().get("cartId")?.value

    const {merchandiseId,lineId, quantity} = await req.json()

    if(!cartId || !merchandiseId || !lineId || !quantity) {
        return NextResponse.json({message: "Missing cart id or merchandise id or line id or quantity"}, {status: 400})
    }

    try {
        await updateCart(cartId,[{id:lineId,quantity,merchandiseId}])
        return NextResponse.json({status: 204})
    } catch (error) {
        return NextResponse.json({error})
    }
}
