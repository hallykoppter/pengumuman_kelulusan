"use client"

import { createUser } from "@/libs/UsersService"
import { useRouter } from "next/navigation"
import { Toast } from "primereact/toast"
import { useRef } from "react"

const Page = () => {
  const toast = useRef()
  const router = useRouter()
  const handleCreate = async (e) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))
    await createUser(data)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center gap-2 items-center bg-black">
      <Toast ref={toast} onRemove={() => router.push("/login")} />
      <h1 className="font-baloo text-xl text-white mb-2">
        Register Administrator
      </h1>
      <form
        onSubmit={handleCreate}
        className="flex flex-col p-3 gap-3 bg-blue-600 rounded-sm"
      >
        <div className="flex flex-row gap-2 font-baloo items-center justify-start">
          <label
            className="flex flex-1 text-center text-sm bg-gray-800 rounded-sm p-1 px-2 mb-1 text-white"
            htmlFor="name"
          >
            Nama Lengkap
          </label>
          <input
            className="border-1 font-baloo rounded-sm p-1 px-3 text-white"
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div className="flex font-baloo flex-row gap-2 items-center justify-center">
          <label
            className="flex flex-1 text-center text-sm bg-gray-800 rounded-sm p-1 px-2 mb-1 text-white"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="border-1 font-baloo rounded-sm p-1 px-3 text-white"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className="flex font-baloo flex-row gap-2 items-center justify-center">
          <label
            className="flex flex-1 text-center text-sm bg-gray-800 rounded-sm p-1 px-2 mb-1 text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-1 font-baloo rounded-sm p-1 px-3 text-white"
            type="text"
            id="password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 font-baloo text-white text-center cursor-pointer p-2 px-3 rounded-sm"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Page
