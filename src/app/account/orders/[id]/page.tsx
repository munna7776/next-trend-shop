import { notFound, redirect } from 'next/navigation'
import React from 'react'

const page = ({params, searchParams}: {
    params: {
        id: string
    },
    searchParams: { key: string }
}) => {
  if(!params.id) {
    return redirect("/account")
  }
  if(!searchParams.key) {
    return notFound()
  }
  const orderId = `gid://shopify/Order/${params.id}?key=${searchParams.key}`
  console.log(orderId)
  return (
    <div>
      {params.id}
    </div>
  )
}

export default page
