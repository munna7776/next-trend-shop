import Header from "@/components/Header"
import "./globals.css"
import "swiper/css"
import "swiper/css/pagination";
import { Inter } from "next/font/google"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next Trend Shop",
  description: "Next Trend Shop is an online store built using shopify and next js.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
