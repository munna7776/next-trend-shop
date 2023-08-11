import React, { useTransition } from "react";
import { Checkbox, Input } from "../UI";
import { SubmitHandler, useForm } from "react-hook-form";
import { MailingAddressInput } from "@/libs/shopify/type";
import { createAddress, updateAddress } from "./action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
    mailingAddress?: MailingAddressInput;
    buttonText: string;
    buttonTextWhileSubmitting: string;
    onCloseDrawer: () => void;
} & ({ isAdd: true } | { isAdd: false, addressId: string })

const AddOrEditAddress = ({ mailingAddress, buttonText, buttonTextWhileSubmitting, ...props }: Props) => {
  const { register, handleSubmit } = useForm<MailingAddressInput>({
    defaultValues: {
      firstName: mailingAddress?.firstName ?? "",
      lastName: mailingAddress?.lastName ?? "",
      address1: mailingAddress?.address1 ?? "",
      address2: mailingAddress?.address2 ?? "",
      city: mailingAddress?.city ?? "",
      company: mailingAddress?.company ?? "",
      country: mailingAddress?.country ?? "",
      phone: mailingAddress?.phone ?? "",
      province: mailingAddress?.province ?? "",
      zip: mailingAddress?.zip ?? "",
      checked: mailingAddress?.checked ?? false
    },
  });
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleFormSubmit: SubmitHandler<MailingAddressInput> = (data) => {    
    startTransition(async() => {
      const result = props.isAdd ? await createAddress(data) : await updateAddress(data,props.addressId)
      if(result?.error) {
        toast.error(result.error)
        return;
      }
      toast.success(props.isAdd ? "Address successfully created." : "Address successfully updated.")
      props.onCloseDrawer()
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 overflow-y-auto h-[85%] flex flex-col gap-[6px] address-form">
      <Input
        labelText="First Name"
        placeholder="First Name..."
        name="firstName"
        register={register}
      />
      <Input
        labelText="Last Name"
        placeholder="Last Name..."
        name="lastName"
        register={register}
      />
      <Input
        labelText="Address1"
        placeholder="Street Adress or PO Box Number..."
        name="address1"
        register={register}
      />
      <Input
        labelText="Address2"
        placeholder="Apartment Number or Flat Number..."
        name="address2"
        register={register}
      />
      <Input
        labelText="City"
        placeholder="City..."
        name="city"
        register={register}
      />
      <Input
        labelText="Country"
        placeholder="Country..."
        name="country"
        register={register}
      />
      <Input
        labelText="Company"
        placeholder="Company or Organization..."
        name="company"
        register={register}
      />
      <Input
        labelText="Phone"
        placeholder="Phone..."
        name="phone"
        register={register}
      />
      <Input
        labelText="State"
        placeholder="State..."
        name="province"
        register={register}
      />
      <Input
        labelText="Zip Code"
        placeholder="Postal code of the address..."
        name="zip"
        register={register}
      />
      <Checkbox 
        labelText="Set as default address"
        name="checked"
        register={register}
      />
      <button
        type="submit"
        className="bg-black rounded-md text-white text-lg w-full text-center py-3 mt-2"
      >
        { pending ? buttonTextWhileSubmitting : buttonText }
      </button>
    </form>
  );
};

export default AddOrEditAddress;
