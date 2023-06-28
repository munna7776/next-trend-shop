import { type ReactNode } from "react"

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <main className="bg-[#f7f7f9] py-10" >
      {children}
    </main>
  )
}

export default Layout
