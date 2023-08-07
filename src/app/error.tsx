'use client' // Error components must be Client Components
 
import { ErrorIcon } from '@/components/icons'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <main className="bg-[#f7f7f7]">
      <div className="container flex items-center min-h-[60vh] px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium rounded-full bg-[#ff00004f]">
            <ErrorIcon />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#333333] md:text-3xl">
            Something went wrong!
          </h1>
          <div className="flex flex-wrap justify-center items-center w-full mt-6 gap-3 shrink-0 sm:w-auto">
            <button
              onClick={() => reset()}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black rounded-lg shrink-0 sm:w-auto"
            >
              Retry Again
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
