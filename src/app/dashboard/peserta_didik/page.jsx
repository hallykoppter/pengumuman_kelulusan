"use client"

import ButtonDash from "@/components/Dashboard/ButtonDash"
import ContentPage from "@/components/Dashboard/ContentPage"
import PaginationTable from "@/components/Dashboard/PagintaionTable"
import TableDashboard from "@/components/Dashboard/TableDashboard"
import TitlePage from "@/components/Dashboard/TitlePage"
import {
  batalkanKelulusan,
  getSiswaPage,
  luluskanSemuaSiswa,
  truncateSiswa,
} from "@/libs/SiswaService"
import { useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { ConfirmDialog } from "primereact/confirmdialog"

const PAGE_SIZE = 8

const Page = (props) => {
  const router = useRouter()
  const toast = useRef(null)
  const [data, setData] = useState()
  const [visible, setVisible] = useState(false)
  const searchParams = useSearchParams()
  const pageNumber = Number(searchParams.get("page") || 1)
  const take = PAGE_SIZE
  const skip = (pageNumber - 1) * take

  const handleSiswa = async () => {
    const req = await getSiswaPage(skip, take)
    setData(req)
  }

  useEffect(() => {
    handleSiswa()
  }, [take, skip])

  const handleLuluskanSemua = async () => {
    const req = await luluskanSemuaSiswa()
    req.status == "ok"
      ? toast.current.show({
          severity: "success",
          summary: "Success",
          life: 3000,
        })
      : toast.current.show({ severity: "error", summary: "Success" })
  }
  const handleBatalkanKelulusan = async () => {
    const req = await batalkanKelulusan()
    req.status == "ok"
      ? toast.current.show({
          severity: "warn",
          summary: "Success",
          life: 3000,
        })
      : toast.current.show({ severity: "error", summary: "Success" })
  }

  const accept = async () => {
    const req = await truncateSiswa()
    if (req.status === "ok") {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Hapus data siswa berhasil",
        life: 2000,
      })
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Hapus data siswa gagal",
        life: 2000,
      })
    }
  }
  const reject = () => {
    toast.current.show({
      severity: "warning",
      summary: "Warning",
      detail: "Hapus data siswa dibatalkan",
      life: 2000,
    })
  }

  const handleRefresh = async () => {
    await handleSiswa()
    router.refresh()
  }

  return (
    <ContentPage>
      <Toast ref={toast} onRemove={handleRefresh} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Apakah yakin akan menghapus seluruh data peserta didik?"
        header="Hapus data peserta didik"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
      <TitlePage title={"Daftar Peserta Didik"} />
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <ButtonDash
            icon={"pi pi-check-circle"}
            label={"Luluskan Semua"}
            onclick={handleLuluskanSemua}
            color={"bg-green-500"}
          />
          <ButtonDash
            icon={"pi pi-times-circle"}
            label={"Batalkan Kelulusan"}
            onclick={handleBatalkanKelulusan}
            color={"bg-red-500"}
          />
          <ButtonDash
            icon={"pi pi-ban"}
            label={"Hapus Semua"}
            onclick={() => setVisible(true)}
            color={"bg-red-500"}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex flex-2/3 flex-col gap-4">
            <TableDashboard {...data} toast={toast} />
            <PaginationTable {...data?.metadata} page={pageNumber} />
          </div>
          <div className="flex flex-1/3 flex-col text-white">
            <div className="flex flex-col gap-3 bg-red-800 p-3">
              <h1 className="text-white text-xl">Informasi Tambahan</h1>
              <p className="text-sm">
                Untuk mengedit data silakan lakukan pada file excel, kemudian
                import kembali di menu import PD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  )
}

export default Page
