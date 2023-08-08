import { NextRequest, NextResponse } from "next/server";
import { headers }  from "next/headers"

export async function POST(req: NextRequest): Promise<NextResponse> {

    const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
    const productWebhooks = ['products/create', 'products/delete', 'products/update'];

    const topic = headers().get("x-shopify-topic") || "unknown"

    console.log(topic)
    
    return NextResponse.json({status: 200, revalidated: true, now: Date.now()})
}