"use client"

import ContentPage from "@/components/Dashboard/ContentPage"
import TitlePage from "@/components/Dashboard/TitlePage"
import bcrypt from "bcryptjs"
import { importSiswa } from "@/libs/SiswaService"
import { saveAs } from "file-saver"
import { useRef, useState } from "react"
import * as XLSX from "xlsx"
import { Toast } from "primereact/toast"
import { useProgress } from "@bprogress/next"

const Page = () => {
  const toast = useRef()
  let [excelData, setExcelData] = useState()

  const { start, stop } = useProgress()

  const handleDownload = () => {
    saveAs(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/asset/excel/import_data_siswa.xlsx`,
      "import_data_siswa.xlsx"
    )
  }

  const handleImport = async () => {
    start()
    if (excelData) {
      for (let i = 0; i < excelData?.length; i++) {
        excelData[i].password = await bcrypt.hash(
          excelData[i].password.toString(),
          10
        )
        excelData[i].nis = excelData[i].nis.toString()
        excelData[i].nisn = excelData[i].nisn.toString()
      }
    }
    const data = JSON.stringify(excelData)
    try {
      const req = await importSiswa(data)
      req.status == "ok"
        ? toast.current.show({
            severity: "success",
            summary: "Success",
            life: 3000,
          })
        : toast.current.show({ severity: "error", summary: "Success" })
      stop()
    } catch (error) {
      console.log(error)
    }
  }

  // if (isLoading) return <span className="text-black">Loading...</span>

  const getFileExcel = (e) => {
    e.preventDefault()
    const excel = e.target.files[0]
    if (excel) {
      let reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const workSheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(workSheet)
          console.log(json)
          setExcelData(json)
        }
      }
      reader.readAsArrayBuffer(excel)
    }
  }

  return (
    <ContentPage>
      <Toast ref={toast} />
      <TitlePage title={"Import data peserta didik"} />
      <div className="flex flex-col justify-center items-start bg-gray-800 p-6 rounded-t-sm w-xl text-white">
        <h1>Silakan download file format excel berikut untuk import data.</h1>
        <button
          onClick={handleDownload}
          className="flex gap-2 items-center cursor-pointer bg-green-500 p-2 px-4 rounded-sm"
        >
          <i className="scale-150 pi pi-file-excel"></i>
          <h1>Download</h1>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 w-xl p-4 bg-gray-600 rounded-b-sm">
          <input
            className="w-full cursor-pointer file:cursor-pointer file:bg-blue-500 file:text-white file:p-1 file:px-2 file:rounded-l-sm bg-white text-black rounded-sm"
            type="file"
            id="import_data_siswa"
            name="import_data_siswa"
            accept=".xlsx"
            onChange={getFileExcel}
          />
          <button
            type="submit"
            onClick={handleImport}
            className="flex gap-2 justify-center items-center p-1 px-3 cursor-pointer bg-green-500 text-white rounded-sm"
          >
            <i className="pi pi-download"></i>
            Import
          </button>
        </div>
      </div>
    </ContentPage>
  )
}

export default Page
