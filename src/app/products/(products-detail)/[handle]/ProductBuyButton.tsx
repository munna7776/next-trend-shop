import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";

const ProductBuyButton = ({variantId}: {variantId: string}) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [_,startTransition] = useTransition()
  const router = useRouter()

  const handleAddToCart = async() => {
    const res = await fetch("/api/cart",{
      method: "POST",
      body: JSON.stringify({merchandiseId: variantId,quantity: quantity})
    })
    const data = await res.json()
    
    startTransition(() => router.refresh())
  }
  return (
    <>
      <div className="w-full sm:w-3/4 md:w-full my-5 flex items-center justify-between gap-6">
        <label className="font-medium" >Quantity</label>
        <div className="flex items-center gap-2" >
          <button className="disabled:cursor-not-allowed" disabled={quantity === 1} onClick={() => setQuantity(prev => prev-1)} >
            <MinusIcon />
          </button>
          <input
            type="number"
            min="1"
            id="quantity"
            name="quantity"
            step="1"
            className="w-10 text-center focus:outline-none"
            value={quantity ? quantity : 1}
            onChange={(e) => setQuantity(e.target.valueAsNumber)}
          />
          <button onClick={() => setQuantity(prev => prev+1)} >
            <PlusIcon />
          </button>
        </div>
      </div>
      <button
        type="button"
        className="block w-full sm:w-3/4 md:w-full text-xl p-4 rounded-md my-3 border border-black text-black"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      <button
        type="button"
        className="block w-full sm:w-3/4 md:w-full text-xl p-4 rounded-md my-3 bg-black text-white"
      >
        Buy Now
      </button>
    </>
  );
};

export default ProductBuyButton;
