import React from 'react'

const CollectionsSkeleton = ({noOfSkeleton}: {noOfSkeleton: number}) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        {
            [...new Array(noOfSkeleton)].map((_,index) => {
                return (
                    <li key={index} className="grid h-[350px] animate-pulse">
                            <div className="w-full h-full row-start-1 row-end-2 col-start-1 col-end-2 rounded-lg bg-slate-200" ></div>
                            <div className="row-start-1 row-end-2 col-start-1 col-end-2 self-end mx-auto mb-[20px] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] w-[200px] bg-slate-200 border border-white rounded-xl h-[28px]">
                            </div>
                    </li>
                )
            })
        }
      
    </ul>
  )
}

export default CollectionsSkeleton
