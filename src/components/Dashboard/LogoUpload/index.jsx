"use client"

import { useRef, useState } from "react"
import { upload } from "@vercel/blob/client"

const LogoUpload = ({ toast }) => {
  const fileLogo = useRef()
  const [blob, setBlob] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    const file = fileLogo?.current.files[0]

    try {
      const newBlob = await upload(`setting/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/logo/upload",
      })

      setBlob(newBlob)
    } catch (error) {
      console.log(error)
    }
  }
  if (blob) {
    toast.current.show({ severity: "success", summary: "success", life: 3000 })
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleUpload}
        className="flex flex-col bg-green-700 p-5 gap-2 rounded-sm"
      >
        <h1>Upload logo dengan format PNG</h1>
        <input
          className="w-full cursor-pointer file:cursor-pointer file:bg-blue-500 file:text-white file:p-1 file:px-2 file:rounded-l-sm bg-white text-black rounded-sm"
          type="file"
          id="logo"
          name="logo"
          accept=".png"
          ref={fileLogo}
          required
        />
        <button className="flex gap-2 justify-center items-center p-1 px-2 bg-blue-500 cursor-pointer rounded-sm">
          <i className="pi pi-upload"></i>
          Upload
        </button>
      </form>
    </div>
  )
}

export default LogoUpload
