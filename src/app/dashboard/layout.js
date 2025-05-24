import Sidebar from "@/Components/Dashboard/Sidebar"
import "./style.css"
import { Aldrich, Baloo_Bhai_2, Titan_One } from "next/font/google"
import Navbar from "@/Components/Dashboard/Navbar"
import ClientProvider from "@/libs/ClientProvider"

const balooBhai = Baloo_Bhai_2({
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
})

const titan = Titan_One({
  variable: "--font-titan",
  subsets: ["latin"],
  weight: "400",
})

const aldrich = Aldrich({
  variable: "--font-aldrich",
  subsets: ["latin"],
  weight: ["400"],
})

const Layout = ({ children }) => {
  return (
    <ClientProvider>
      <div
        className={`flex h-screen w-screen flex-row ${balooBhai.variable} ${aldrich.variable} ${titan.variable} antialiased`}
      >
        <Sidebar />
        <div className="flex flex-col grow">
          <Navbar />
          {children}
        </div>
      </div>
    </ClientProvider>
  )
}

export default Layout
