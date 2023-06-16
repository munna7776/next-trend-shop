import React from "react"

const Layout = ({children}:{
    children: React.ReactNode
}) => {
    return (
        <main className="mx-auto" >
            {children}
        </main>
    )
}

export default Layout