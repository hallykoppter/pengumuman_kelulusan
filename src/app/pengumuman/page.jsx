"use client"

import { getPengumuman } from "@/libs/PengumumanService"
import { getSetting } from "@/libs/SettingService"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const Page = () => {
  const { data: session } = useSession()
  const [pengumuman, setPengumuman] = useState(null)
  const [setting, setSetting] = useState()

  const reqPengumuman = async () => {
    const req = await getPengumuman()
    setPengumuman(req)
  }

  const reqSetting = async () => {
    const req = await getSetting()
    setSetting(req)
  }

  useEffect(() => {
    reqSetting()
    reqPengumuman()
  }, [])

  return (
    <div className="flex flex-col gap-5 min-h-screen justify-center items-center">
      <Image
        src={setting?.logo_sekolah}
        width={100}
        height={100}
        alt="Logo Sekolah"
      />
      <div className="text-white text-center font-titan text-2xl md:scale-100 scale-[70%]">
        PENGUMUMAN KELULUSAN PESERTA DIDIK
        <br />
        {session?.user.nama_sekolah} <br />
        TAHUN AJARAN 2024/2025
        <br />
        <br />
        Halo, {session?.user.name}
      </div>
      <div className="flex justify-center items-center">
        <p className="text-center text-white md:w-xl w-auto md:scale-100 scale-[70%]">
          {pengumuman && pengumuman.pengumuman}
        </p>
      </div>
      <div className="flex justify-center items-center text-center">
        <Image
          width={200}
          height={100}
          src={`/asset/images/amplop-tutup.png`}
          alt="Amplop"
        />
      </div>
      <div className="flex justify-center items-center">
        <a className="bg-white p-1 px-2 rounded-sm text-black" href={"/logout"}>
          Logout
        </a>
      </div>
    </div>
  )
}

export default Page
