"use client";

import { ChangeEvent, useState } from "react";
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

  const [selectedProductOptions, setSelectedProductOptions] = useState<
    { name: string; value: string }[]
  >(variants[0].selectedOptions);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newSelectedVariant = [...selectedProductOptions];
    const index = newSelectedVariant.findIndex(
      (variant) => variant.name === name
    );
    newSelectedVariant[index].value = value;
    setSelectedProductOptions(newSelectedVariant);
  };


  const title = selectedProductOptions.map(variant => variant.value).join(" / ")
  const selectedVariants = variants.find(variant => variant.title === title)!
  const selectedVariantPrice = moneyFormatter(selectedVariants?.price.currencyCode,selectedVariants?.price.amount)
  const has_only_default_variant = options[0].name === "Title";
  
  return (
    <>
       <p className="mt-6 text-xl text-[#212323] font-semibold">{selectedVariantPrice}</p>
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
                        className="hidden"
                        name={option.name}
                        id={value}
                        checked={selectedProductOptions[optionIndex].value === value}
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
      <ProductBuyButton />
    </>
  );
};

export default ProductVariants;
