"use client";

import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShopifyProductVariant } from "@/libs/shopify/type";
import { moneyFormatter } from "@/libs/utils";
import ProductBuyButton from "./ProductBuyButton";

const ProductVariants = ({
  options,
  variants,
}: {
  options: { name: string; values: string[] }[];
  variants: ShopifyProductVariant[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentSearchParams = new URLSearchParams(searchParams);

  const selectedVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name)
    )
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    currentSearchParams.set(name, value);
    router.push(pathname + "?" + currentSearchParams.toString());
  };

  const selectedVariants = variants.find((variant) => variant.id === (selectedVariant?.id || variants[0].id))!;
  const selectedVariantPrice = moneyFormatter(
    selectedVariants.price.currencyCode,
    selectedVariants?.price.amount
  );
  const has_only_default_variant = options[0].name === "Title";

  return (
    <>
      <p className="mt-6 text-xl text-[#212323] font-semibold">
        {selectedVariantPrice}
      </p>
      <p className="text-[15px] text-[#4d4f4f] mb-6 ">
        Free Shipping, Return within 7 days
      </p>
      {!has_only_default_variant ? (
        <div className="flex flex-col gap-2">
          {options.map((option, optionIndex) => {
            return (
              <div className="flex flex-col gap-1" key={optionIndex}>
                <h3 className="text-base font-semibold text-[#212323]">
                  {option.name}
                </h3>
                <div className="flex flex-wrap gap-2 size-value">
                  {option.values.map((value, valueIndex) => (
                    <div key={valueIndex}>
                      <input
                        type="checkbox"
                        onChange={onChange}
                        value={value}
                        className="hidden variant-option"
                        name={option.name}
                        id={value}
                        checked={
                          searchParams.get(option.name) === value
                        }
                      />
                      <label
                        className="rounded-md py-2 px-4 font-light cursor-pointer bg-[#f5f6f9] inline-block"
                        htmlFor={value}
                      >
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <ProductBuyButton variantId={selectedVariant?.id || variants[0].id} />
    </>
  );
};

export default ProductVariants;
