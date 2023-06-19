import React from 'react'

const Page = async({params}: {params: {handle:string}}) => {
  return (
    <div>
      {params.handle}
    </div>
  )
}

export default Page
