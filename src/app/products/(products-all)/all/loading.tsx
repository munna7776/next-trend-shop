import { ProductSkeleton } from "@/components/skeleton-loader";

const Loading = () => {
  return (
    <ul
      className="mt-2 mb-6 grid gap-6 justify-center skeleton-grid"
    >
      {[...new Array(10)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </ul>
  );
};

export default Loading;
