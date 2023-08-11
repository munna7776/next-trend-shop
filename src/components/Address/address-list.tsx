"use client";

import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MailingAddress, MailingAddressInput } from "@/libs/shopify/type";
import { DeleteIcon, EditIcon } from "../icons";
import AddOrEditAddress from "./AddOrEditAddress";
import { Drawer } from "../UI";
import { changeToDefaultAddress, deleteAddress } from "./action";

const AddressList = ({
  address,
  defaultAddress = false,
}: {
  address: MailingAddress;
  defaultAddress: true | false;
}) => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteAddress = async () => {
    startTransition(async () => {
      const result = await deleteAddress(address.id);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Successfully deleted the address.");
      router.refresh();
    });
  };

  const mailingAddress: MailingAddressInput = {
    firstName: address.firstName,
    lastName: address.lastName,
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    country: address.country,
    company: address.company,
    province: address.province,
    zip: address.zip,
    phone: address.phone,
    checked: defaultAddress,
  };

  return (
    <div className="border p-6 bg-[#f7f7f9] rounded-lg">
      <ul>
        {address.formatted &&
          address.formatted.map((line) => (
            <li key={line} className="">
              {line}
            </li>
          ))}
      </ul>
      {defaultAddress ? (
        <p className="py-1 px-6 my-4 bg-[#cccccb] rounded-3xl inline-block">
          Default
        </p>
      ) : (
        <form action={changeToDefaultAddress}>
          <input className="hidden" name="addressId" defaultValue={address.id} />
          <button type="submit" className="py-1 px-6 my-4 bg-[#cccccb] rounded-3xl ">
            Set as default
          </button>
        </form>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          className="border border-black rounded-md px-5 py-1 flex gap-2 items-center"
          onClick={() => setShowDrawer(true)}
        >
          <span>Edit</span>
          <EditIcon />
        </button>
        <button
          disabled={pending}
          onClick={handleDeleteAddress}
          className="border border-black rounded-md px-5 py-1 flex gap-2 items-center"
        >
          <span>{pending ? "Removing" : "Remove"}</span>
          <DeleteIcon
            className={pending ? "pulse" : ""}
            height={16}
            width={16}
          />
        </button>
      </div>
      {showDrawer && (
        <Drawer title="Edit Address" onClick={() => setShowDrawer(false)}>
          <AddOrEditAddress
            isAdd={false}
            addressId={address.id}
            mailingAddress={mailingAddress}
            buttonText="Update Address"
            buttonTextWhileSubmitting="Updating..."
            onCloseDrawer={() => setShowDrawer(false)}
          />
        </Drawer>
      )}
    </div>
  );
};

export default AddressList;
