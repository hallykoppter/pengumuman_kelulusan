"use client"

import InputText from "@/components/InputText"
import InputTextArea from "@/Components/InputTextArea"
import { useState } from "react"
import { addHours, addYears } from "date-fns"
import { useRouter } from "next/navigation"
import { upsertSetting } from "@/libs/SettingService"

const Page = () => {
  const [nama_sekolah, setNamaSekolah] = useState()
  const [npsn, setNpsn] = useState()
  const [email_sekolah, setEmailSekolah] = useState()
  const [nama_kepsek, setNamaKepsek] = useState()
  const [nip_kepsek, setNipKepsek] = useState()
  const [alamat_sekolah, setAlamatSekolah] = useState()
  const router = useRouter()

  const date = addHours(addYears(new Date(), 1), 7).toISOString().slice(0, 16)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const logo_sekolah = "default.jpg"
    const semester = "2024/2025"
    const izin_login = 0
    const aktif_pengumuman = 0
    const waktu_pengumuman = date

    let data = {
      nama_sekolah: nama_sekolah,
      npsn: npsn,
      email_sekolah: email_sekolah,
      nama_kepsek: nama_kepsek,
      nip_kepsek: nip_kepsek,
      logo_sekolah: logo_sekolah,
      semester: semester,
      izin_login: izin_login,
      aktif_pengumuman: aktif_pengumuman,
      waktu_pengumuman: waktu_pengumuman,
      alamat_sekolah: alamat_sekolah,
    }

    const req = await upsertSetting(data)
    if (req.status === "ok") router.push("/")
    else {
      console.log("error")
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <div className="bg-gray-800 max-w-[90vw] md:max-w-[50vw] shadow-2xl shadow-gray-400/30 p-5 rounded-md flex flex-col">
        <h1 className="flex text-xl md:mb-5 mb-3 text-white font-baloo font-bold justify-center items-center">
          Inisialisasi Data Sekolah
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex text-white justify-between flex-nowrap flex-col md:flex-row md:flex-wrap font-baloo gap-3">
            <InputText
              type={"text"}
              id={"nama_sekolah"}
              grow={"grow"}
              label={"Nama Sekolah"}
              onchange={(e) => setNamaSekolah(e.target.value)}
            />
            <InputText
              type={"number"}
              id={"npsn"}
              grow={"grow"}
              label={"NPSN Sekolah"}
              onchange={(e) => setNpsn(e.target.value)}
            />
            <InputText
              type={"email"}
              id={"email_sekolah"}
              grow={"flex-2/2"}
              label={"Email Sekolah"}
              onchange={(e) => setEmailSekolah(e.target.value)}
            />
            <InputText
              type={"text"}
              id={"nama_kepsek"}
              grow={"grow"}
              label={"Nama Kepala Sekolah"}
              onchange={(e) => setNamaKepsek(e.target.value)}
            />
            <InputText
              type={"number"}
              id={"nip_kepsek"}
              grow={"grow"}
              label={"NIP Kepala Sekolah"}
              onchange={(e) => setNipKepsek(e.target.value)}
            />
            <InputTextArea
              id={"alamat_sekolah"}
              label={"Alamat Sekolah"}
              grow={"flex-2/2"}
              onchange={(e) => {
                setAlamatSekolah(e.target.value)
              }}
            />
          </div>
          <button
            className="flex grow ring-1 ring-secondary text-white bg-primary rounded-sm w-full p-2 justify-center items-center cursor-pointer"
            type="submit"
          >
            Inisialisasi
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
