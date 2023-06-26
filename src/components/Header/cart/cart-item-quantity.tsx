import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DeleteIcon, MinusIcon, PlusIcon } from "@/components/icons"
import { deleteCartItem } from "./action";

const CartItemQuantity = ({quantity,lineId,merchandiseId}: {
    quantity: number;
    lineId: string;
    merchandiseId: string;
}) => {
   const quantityInputRef = useRef<HTMLInputElement>(null)
   const [loading, setLoading] = useState<boolean>(false)
   const [pending, startTransition] = useTransition()
   const router = useRouter()
   
   useEffect(() => {
    if(quantityInputRef.current) {
        quantityInputRef.current.valueAsNumber = quantity
    }
   },[quantity])

   const handleDecreaseQuantity = async() => {
    if(!quantityInputRef.current || quantityInputRef.current.valueAsNumber === 1) {
        return ;
    }
    quantityInputRef.current.valueAsNumber = quantityInputRef.current.valueAsNumber - 1
    setLoading(true)
    const res = await fetch("/api/cart",{
        method: "PUT",
        body: JSON.stringify({lineId,merchandiseId,quantity: quantityInputRef.current.valueAsNumber})
    })
    const data = await res.json()
    setLoading(false)
    startTransition(() => router.refresh())
   }

   const handleIncreaseQuantity = async() => {
    if(!quantityInputRef.current) {
        return ;
    }
    quantityInputRef.current.valueAsNumber = quantityInputRef.current.valueAsNumber + 1
    setLoading(true)
    const res = await fetch("/api/cart",{
        method: "PUT",
        body: JSON.stringify({lineId,merchandiseId,quantity: quantityInputRef.current.valueAsNumber})
    })
    console.log(res)
    const data = await res.json()
    setLoading(false)
    startTransition(() => router.refresh())
   }

   const handleDeleteCartItem = () => {
    startTransition(async() => {
      const error = await deleteCartItem(lineId)

      if(error) {
        toast.error(error.message)
        return;
      }
      router.refresh()
    })

   }
   
   const isUpdatingOrDeleting = loading || pending

  return (
    <div className="flex items-center justify-between gap-2 mt-2">
        <label className="font-medium hidden" >Quantity</label>
        <div className="flex items-center gap-2" >
          <button disabled={isUpdatingOrDeleting} onClick={handleDecreaseQuantity} className="disabled:cursor-not-allowed" >
            <MinusIcon />
          </button>
          <input
            type="number"
            min="1"
            id="quantity"
            name="quantity"
            step="1"
            className="w-10 text-center bg-transparent focus:outline-none"
            ref={quantityInputRef}
          />
          <button disabled={isUpdatingOrDeleting} onClick={handleIncreaseQuantity}  >
            <PlusIcon />
          </button>
          <button className="disabled:cursor-not-allowed" disabled={isUpdatingOrDeleting} onClick={handleDeleteCartItem} >
            <DeleteIcon />
          </button>
          { isUpdatingOrDeleting && <span className="inline-block h-6 w-6 border-t-2 border-r-2 border-black rounded-3xl animate-spin"  /> }
        </div>
      </div>
  )
}

export default CartItemQuantity
