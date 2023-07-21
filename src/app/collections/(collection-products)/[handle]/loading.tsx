import { ProductSkeleton } from "@/components/skeleton-loader";

const Loading = () => {
  return (
    <>
      <div className="my-4 flex justify-center gap-[30px] items-center">
        <div className="w-[40%]">
          <h1 className="h-10 w-[180px] rounded-lg bg-slate-200"></h1>
          <p className="h-[100px] rounded-lg bg-slate-200 mt-3"></p>
        </div>
        <div
          className="w-[40%] rounded-lg h-[300px] bg-slate-200"
        ></div>
      </div>
      <ul className="mt-2 mb-6 grid gap-6 justify-center product-grid" >
        {[...new Array(10)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </ul>
    </>
  );
};

export default Loading;
