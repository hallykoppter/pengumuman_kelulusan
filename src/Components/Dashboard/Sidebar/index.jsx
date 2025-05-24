"use client"

import { getSetting } from "@/libs/SettingService"
import Link from "next/link"
import { useEffect, useState } from "react"

const Sidebar = () => {
  const [setting, setSetting] = useState()

  useEffect(() => {
    const init = async () => {
      const set = await getSetting()
      setSetting(set)
    }
    init()
  }, [])

  return (
    <div className="w-[16vw] bg-indigo-800 min-h-screen text-white">
      <h1 className="font-titan text-xl text-center p-2 py-3">
        {setting?.nama_sekolah}
      </h1>
      <div className="flex flex-col p-6 gap-1">
        <div className="flex flex-col font-baloo mb-3">
          <div className="flex text-gray-400">Dashboard Menu</div>
          <div className="flex gap-2 p-2 items-center">
            <i className="pi pi-home"></i>
            <Link href={"/dashboard"} className="text-md">
              Dashboard
            </Link>
          </div>
          <div className="flex gap-2 p-2 items-center">
            <i className="pi pi-users"></i>
            <Link href={"/dashboard/peserta_didik"} className="text-md">
              Peserta Didik
            </Link>
          </div>
          <div className="flex gap-2 p-2 items-center">
            <i className="pi pi-file-import"></i>
            <Link href={"/dashboard/import"} className="text-md">
              Import PD
            </Link>
          </div>
        </div>
        <div className="flex flex-col font-baloo mb-3">
          <div className="flex text-gray-400">Pengaturan</div>
          <div className="flex gap-2 p-2 items-center">
            <i className="pi pi-cog"></i>
            <Link href={"/dashboard/pengaturan"} className="text-md">
              Pengaturan
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
