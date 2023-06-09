import React from "react";

const ProductSkeleton = () => {
  return (
    <li className="min-w-[325px] xl:w-[325px]">
      <div className="w-full h-[325px] bg-slate-200 rounded-lg"></div>
      <div className="mt-3">
        <h3 className="rounded-lg h-[24px] w-full bg-slate-200 "></h3>
        <span className="rounded-lg h-[20px] mt-[6px] inline-block w-full bg-slate-200"></span>
      </div>
    </li>
  );
};

export default ProductSkeleton;
