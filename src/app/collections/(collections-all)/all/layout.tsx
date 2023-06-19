const Layout = ({children}:{children: React.ReactNode}) => {
    return (
        <main className="w-auto md:w-4/5 lg:w-3/4 mx-4 md:mx-auto mt-4 mb-6" >
            <h1 className="text-2xl font-semibold mb-[14px]" >Next Trend Collections</h1>
            {children}
        </main>
    )
}

export default Layout