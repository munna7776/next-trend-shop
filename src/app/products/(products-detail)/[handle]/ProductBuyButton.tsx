import React from 'react'

const ProductBuyButton = () => {
  return (
    <>
        <button type="button" className="block w-full sm:w-3/4 md:w-full text-xl p-4 rounded-md my-3 border border-black text-black" >
        Add to cart
        </button>
        <button type="button" className="block w-full sm:w-3/4 md:w-full text-xl p-4 rounded-md my-3 bg-black text-white" >
        Buy Now
        </button>
    </>
  )
}

export default ProductBuyButton
