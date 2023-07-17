import React from "react";
import { MailingAddress } from "@/libs/shopify/type";
import Address from "@/components/Address";


const AddressBook = ({
  addresses,
  defaultAddress,
}: {
  addresses: MailingAddress[];
  defaultAddress: MailingAddress | null | undefined;
}) => {
  return (
    <>
      <div className="my-6">
        {addresses.length === 0 && (
          <p className="mb-2 text-lg">
            You haven&apos;t saved any addresses yet.
          </p>
        )}
        <button className="py-3 px-4 bg-black text-white text-lg rounded-sm">
          Add an address
        </button>
      </div>
      {addresses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {addresses.map((address) => (
            <Address
              key={address.id}
              address={address}
              defaultAddress={address.id === defaultAddress?.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AddressBook;


