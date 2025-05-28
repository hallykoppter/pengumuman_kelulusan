"use client"

import Countdowncustom from "@/Components/Countdowncustom"
import FormOrDashboard from "@/Components/FormOrDashboard"
import { getSetting } from "@/libs/SettingService"
import { getUserAuth } from "@/libs/UsersService"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const Page = () => {
  const [setting, setSetting] = useState()

  const [hidden, setHidden] = useState(" ")
  const [done, setDone] = useState("hidden")
  const { data: session } = useSession()

  useEffect(() => {
    async function fetch() {
      const req = await getSetting()
      setSetting(req)
    }
    fetch()
  }, [])

  const handleComplete = () => {
    setDone()
    setHidden("hidden")
  }

  const Show = () => {
    return (
      <h1 className={"text-white text-center text-xl font-baloo " + done}>
        Pengumuman telah dibuka! <br />
        Silakan login menggunakan username dan password yang telah dibagikan!
      </h1>
    )
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden justify-center items-center gap-2">
      {setting && (
        <Image
          src={setting?.logo_sekolah}
          width={100}
          height={100}
          alt="Logo Sekolah"
        />
      )}
      <h1 className="uppercase text-white font-titan md:scale-100 scale-75 md:mb-20 mb-5 text-2xl text-center">
        Pengumuman Kelulusan <br /> {setting?.nama_sekolah}
      </h1>
      <div className="flex md:flex-row flex-col justify-center gap-2 md:gap-20 items-center">
        <div className="flex flex-col gap-10 md:gap-6 justify-center p-10 rounded-md items-center scale-[70%] md:scale-100">
          <h1
            className={
              "text-2xl md:text-3xl text-center font-baloo text-white " + hidden
            }
          >
            Pengumuman dibuka dalam:
          </h1>
          <Show />
          <Countdowncustom oncomplete={handleComplete} />
        </div>
        <div className="flex p-3 rounded-md ring-3 bg-blue-700 ring-red-500">
          <FormOrDashboard user={session?.user} />
        </div>
      </div>
    </div>
  )
}

export default Page
