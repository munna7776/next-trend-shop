import Link from "next/link";
import { ErrorIcon } from "@/components/icons";

const NotFound = () => {
  return (
    <main className="bg-[#f7f7f7]">
      <div className="container flex items-center min-h-[60vh] px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium rounded-full bg-[#ff00004f]">
            <ErrorIcon />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">{`The page you are looking for doesn't exist. Here are some helpful links:`}</p>
          <Link
            href="/"
            className="w-1/2 px-5 mt-6 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black rounded-lg shrink-0 sm:w-auto"
          >
            Return to Home page
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
