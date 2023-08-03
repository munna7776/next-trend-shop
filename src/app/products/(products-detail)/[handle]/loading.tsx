import { ProductSkeleton } from "@/components/skeleton-loader";
import React from "react";

const Loading = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row gap-x-2.5 pb-5 md:pt-5 md:px-6">
        <div className="left md:w-1/2">
          <div className="sticky top-0 z-[2]">
            <div className="images-grid">
              <div className="bg-slate-200 h-[400px] featured-image rounded-lg"></div>
              <div className="bg-slate-200 h-[200px] rounded-lg "></div>
              <div className="bg-slate-200 h-[200px] rounded-lg "></div>
              <div className="bg-slate-200 h-[200px] rounded-lg "></div>
              <div className="bg-slate-200 h-[200px] rounded-lg "></div>
            </div>
            <div className="block md:hidden h-[300px] w-full bg-slate-200" />
          </div>
        </div>
        <div className="right md:w-1/2 md:pl-6">
          <div className="sticky top-0 z-[2] pt-5 px-6">
            <h1 id="title-skeleton" className="h-10 bg-slate-200 rounded-md" />
            <p className="h-[28px] bg-slate-200 rounded-md mt-6" />
            <p className="h-[22px] bg-slate-200 rounded-md mt-1 mb-6" />
            <div className="flex flex-col gap-1">
              <h3 className="h-6 bg-slate-200 rounded-md" />
              <div className="flex flex-wrap gap-2">
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <h3 className="h-6 bg-slate-200 rounded-md" />
              <div className="flex flex-wrap gap-2">
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
                <div className="h-10 w-10 rounded-md bg-slate-200" />
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3 mt-5 mb-2">
              <p className="h-10 w-[200px] bg-slate-200 rounded-md me-auto" />
              <div className="h-10 w-10 rounded-md bg-slate-200" />
              <div className="h-10 w-10 rounded-md bg-slate-200" />
              <div className="h-10 w-10 rounded-md bg-slate-200" />
            </div>
            <button className="w-full sm:w-3/4 md:w-full h-11 bg-slate-200 rounded-md my-3"></button>
            <p
              id="description-skeleton"
              className="w-full sm:w-3/4 md:w-full h-[100px] bg-slate-200 rounded-md"
            />
          </div>
        </div>
      </section>
      <section className="px-6 pb-5 pt-1 flex gap-6">
        <ul className="flex gap-6">
          {[...new Array(6)].map((_, index) => (
            <ProductSkeleton key={index} className="w-[254px] sm:w-[325px]" />
          ))}
        </ul>
      </section>
    </>
  );
};

export default Loading;
