"use client"

import ContentPage from "@/components/Dashboard/ContentPage"
import ITextarea from "@/components/Dashboard/ITextarea"
import TitlePage from "@/components/Dashboard/TitlePage"
import { getPengumuman, upsertPengumuman } from "@/libs/PengumumanService"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"

const Page = () => {
  const toast = useRef()
  const [pengumuman, setPengumuman] = useState()

  const reqPengumuman = async () => {
    const req = await getPengumuman()
    setPengumuman(req)
  }

  useEffect(() => {
    reqPengumuman()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(e.target))
    const req = await upsertPengumuman(body)
    if (req) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        life: 3000,
      })
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        life: 3000,
      })
    }
  }

  return (
    <ContentPage>
      <Toast ref={toast} />
      <TitlePage title={"Pengumuman"} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-xl p-3 rounded-sm text-white bg-gray-500"
      >
        <ITextarea
          height={"h-48"}
          label={"Pengumuman"}
          id={"pengumuman"}
          defvalue={pengumuman?.pengumuman}
        />
        <button className="flex justify-center items-center p-2 gap-2 cursor-pointer rounded-sm bg-green-500">
          <i className="pi pi-save"></i>
          Simpan
        </button>
      </form>
    </ContentPage>
  )
}

export default Page
