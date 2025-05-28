"use client"

import ContentPage from "@/components/Dashboard/ContentPage"
import IDatetime from "@/components/Dashboard/IDatetime"
import ISelect from "@/components/Dashboard/ISelect"
import IText from "@/components/Dashboard/IText"
import ITextarea from "@/components/Dashboard/ITextarea"
import LogoUpload from "@/components/Dashboard/LogoUpload"
import TitlePage from "@/components/Dashboard/TitlePage"
import { getSetting, updateSetting } from "@/libs/SettingService"
import { addHours } from "date-fns"
import { useRouter } from "next/navigation"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"

const Page = () => {
  const toast = useRef()
  const router = useRouter()
  const [setting, setSetting] = useState()

  useEffect(() => {
    async function init() {
      const set = await getSetting()
      setSetting(set)
    }
    init()
  }, [])

  let w
  function checkVariable() {
    if (setting?.waktu_pengumuman != undefined) {
      const waktu_awal = new Date(setting?.waktu_pengumuman)
      const waktu = addHours(waktu_awal, 7)
      w = waktu
    }
  }
  checkVariable()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))
    const req = await updateSetting(data)
    req.status == "ok"
      ? toast.current.show({
          severity: "success",
          summary: "Success",
          life: 3000,
        })
      : toast.current.show({ severity: "error", summary: "Success" })
  }

  const option = {
    semester: [
      { value: "2024/2025", label: "2024/2025" },
      { value: "2023/2024", label: "2023/2024" },
    ],
    aktif_pengumuman: [
      { value: "0", label: "tidak diizinkan" },
      { value: "1", label: "diizinkan" },
    ],
    izin_login: [
      { value: "0", label: "tidak diizinkan" },
      { value: "1", label: "diizinkan" },
    ],
  }

  return (
    <ContentPage>
      <Toast ref={toast} />
      <TitlePage title={"Pengaturan"} />
      <div className="flex flex-row justify-evenly gap-5 bg-gray-400 p-4 rounded-sm text-white">
        <form
          id="edit"
          name="edit"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-3">
            <div className="flex flex-col">
              <IText
                type={"number"}
                id={"npsn"}
                label={"NPSN"}
                defvalue={setting?.npsn}
              />
              <IText
                type={"text"}
                id={"nama_sekolah"}
                label={"Nama Sekolah"}
                defvalue={setting?.nama_sekolah}
              />
              <IText
                type={"email"}
                id={"email_sekolah"}
                label={"Email Sekolah"}
                defvalue={setting?.email_sekolah}
              />
              <IText
                type={"text"}
                id={"nama_kepsek"}
                label={"Nama Kepala Sekolah"}
                defvalue={setting?.nama_kepsek}
              />
              <IText
                type={"number"}
                id={"nip_kepsek"}
                label={"NIP Kepala Sekolah"}
                defvalue={setting?.nip_kepsek}
              />
            </div>
            <div className="flex flex-col">
              <ISelect
                id={"semester"}
                label={"Semester"}
                option={option.semester}
                defvalue={setting?.semester}
              />
              <ISelect
                id={"aktif_pengumuman"}
                label={"Izinkan Pengumuman"}
                option={option.aktif_pengumuman}
                defvalue={setting?.aktif_pengumuman}
              />
              <ISelect
                id={"izin_login"}
                label={"Izinkan Login"}
                option={option.izin_login}
                defvalue={setting?.izin_login}
              />
              <IDatetime
                label={"Waktu Pengumuman"}
                id={"waktu_pengumuman"}
                defvalue={w}
              />
              <ITextarea
                grow={"grow"}
                label={"Alamat Sekolah"}
                id={"alamat_sekolah"}
                defvalue={setting?.alamat_sekolah}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center gap-2 items-center bg-green-700 p-2 px-4 text-white rounded-sm cursor-pointer"
          >
            <i className="pi pi-save"></i>
            Simpan
          </button>
        </form>
        <div className="flex flex-col">
          <LogoUpload toast={toast} />
        </div>
      </div>
    </ContentPage>
  )
}

export default Page
