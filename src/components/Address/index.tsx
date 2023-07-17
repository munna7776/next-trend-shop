"use client"

import { MailingAddress } from "@/libs/shopify/type";
import { DeleteIcon, EditIcon } from "../icons";

const Address = ({
    address,
    defaultAddress = false,
  }: {
    address: MailingAddress;
    defaultAddress: true | false;
  }) => {
      
    return (
      <div className="border p-6 bg-[#f7f7f9] rounded-lg" >
        <ul>
          {address.formatted &&
            address.formatted.map((line) => <li key={line} className="" >{line}</li>)}
        </ul>
        {
          defaultAddress ? <p className="py-1 px-6 my-4 bg-[#cccccb] rounded-3xl inline-block" >Default</p> : <button className="py-1 px-2 border bg-[#cccccb] my-4 rounded-md" >Change to default address</button>
        }

        <div className="flex gap-4">
            <button className="border border-black rounded-md px-5 py-1 flex gap-2 items-center" >
                <span>Edit</span>
                <EditIcon />
            </button>
            <button className="border border-black rounded-md px-5 py-1 flex gap-2 items-center">
                <span>Remove</span>
                <DeleteIcon height={16} width={16} />
            </button>
        </div>
      </div>
    );
  };

  export default Address;
