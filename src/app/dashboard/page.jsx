"use client"

import Countdowncustom from "@/components/Countdowncustom"
import ContentPage from "@/components/Dashboard/ContentPage"
import TitlePage from "@/components/Dashboard/TitlePage"
import { useState } from "react"

const Page = () => {
  const [hidden, setHidden] = useState(false)
  const handleComplete = () => {
    setHidden(true)
  }
  let show

  if (hidden == false) {
    show = (
      <div
        className={"flex flex-col gap-2 p-4 text-white bg-green-500 rounded-sm"}
      >
        <h1 className="font-bold text-2xl">Pengumuman dibuka dalam</h1>
        <Countdowncustom oncomplete={handleComplete} />
      </div>
    )
  } else {
    show = (
      <div
        className={"flex flex-col gap-2 p-4 text-white bg-green-500 rounded-sm"}
      >
        <h1 className="font-bold text-2xl">Pengumuman telah dibuka!</h1>
      </div>
    )
  }

  return (
    <ContentPage>
      <TitlePage title={"Dashboard"} />
      <div className="flex flex-col gap-2">
        <h1 className="bg-blue-400 p-2 px-4 rounded-sm text-white">
          Selamat datang di halaman administrator pengumuman kelulusan.
        </h1>
        {show}
      </div>
    </ContentPage>
  )
}

export default Page
