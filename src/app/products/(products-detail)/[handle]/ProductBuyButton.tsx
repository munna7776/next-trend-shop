import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";

const ProductBuyButton = ({variantId}: {variantId: string}) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [pending,startTransition] = useTransition()
  const router = useRouter()

  const handleAddToCart = async() => {
    setLoading(true)
    const res = await fetch("/api/cart",{
      method: "POST",
      body: JSON.stringify({merchandiseId: variantId,quantity: quantity})
    })
    const data = await res.json()
    
    setLoading(false)
    startTransition(() => router.refresh())
  }

  const isAddingToCart = loading || pending
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
        className="grid place-items-center w-full sm:w-3/4 md:w-full text-xl p-4 rounded-md my-3 border border-black text-black"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        { isAddingToCart ? <span className="inline-block h-[28px] w-[28px] border-t-2 border-r-2 border-black rounded-3xl animate-spin"  /> : "Add to cart" }
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
