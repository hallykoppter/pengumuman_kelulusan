"use client"

import { useSession } from "next-auth/react"

const Page = () => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col gap-2 min-h-screen justify-center items-center">
      <h1 className="text-white text-center font-titan text-2xl">
        PENGUMUMAN KELULUSAN PESERTA DIDIK
        <br />
        {session?.user.nama_sekolah} <br />
        <br />
        Halo, {session?.user.name}
      </h1>
      <div></div>
    </div>
  )
}

export default Page
