
export const metadata = {
    title: "Next Trend Shop - Discover Curated Collections of the Latest Trends and Must-Have Items",
    description: "Curated Collections of What's Next - Discover a world of trends and style at Next Trend Shop's All Collections page. Explore themed selections encompassing fashion, technology, home goods, and more. Your one-stop destination to explore carefully curated assortments that embody the essence of what's trending now. Elevate your shopping experience and immerse yourself in the future of style and innovation, all conveniently organized in a single location."
}

const Layout = ({children}:{children: React.ReactNode}) => {
    return (
        <main className="w-auto md:w-4/5 lg:w-3/4 mx-4 md:mx-auto mt-4 mb-6" >
            <h1 className="text-2xl font-semibold mb-[14px]" >Next Trend Collections</h1>
            {children}
        </main>
    )
}

export default Layout