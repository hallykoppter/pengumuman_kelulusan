"use client"

import Countdowncustom from "@/Components/Countdowncustom"
import InputText from "@/components/InputText"
import { getSetting } from "@/libs/SettingService"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const Page = () => {
  const [setting, setSetting] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [hidden, setHidden] = useState(" ")
  const [done, setDone] = useState("hidden")
  const { data: session } = useSession()
  let UserAktif

  useEffect(() => {
    async function fetch() {
      const req = await getSetting()
      setSetting(req)
    }
    fetch()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    signIn("credentials", {
      username: username,
      password: password,
      role: "siswa",
      redirect: true,
      callbackUrl: "/pengumuman",
    })
  }

  const handleComplete = () => {
    setDone()
    setHidden("hidden")
  }

  const Show = () => {
    return (
      <h1 className={"text-white text-center text-xl font-baloo " + done}>
        Pengumuman telah dibuka! <br />
        Silakan login menggunakan username dan password yang telah dibagikan!
      </h1>
    )
  }

  if (session?.user.role == "admin") {
    UserAktif = (
      <a
        href="/dashboard"
        className="flex p-2 px-4 rounded-md bg-primary font-baloo text-xl"
      >
        Dashboard
      </a>
    )
  } else if (session?.user.role == "siswa") {
    UserAktif = (
      <a
        href="/pd/pengumuman"
        className="flex p-2 px-4 rounded-md bg-primary font-baloo text-xl"
      >
        Pengumuman
      </a>
    )
  } else {
    UserAktif = (
      <form className="flex flex-col font-baloo gap-3" onSubmit={handleLogin}>
        <h1 className="flex mb-2 text-center text-white justify-center items-center">
          Login Sebagai Peserta Didik
        </h1>
        <input type="hidden" name="role" id="role" value="siswa" />
        <InputText
          type={"number"}
          id="nisn"
          label="NISN"
          onchange={(e) => setUsername(e.target.value)}
        />
        <InputText
          type={"password"}
          id="password"
          label="Password"
          onchange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-lime-600 rounded-md p-2 cursor-pointer">
          Masuk
        </button>
      </form>
    )
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-2">
      <h1 className="uppercase text-white font-titan md:scale-100 scale-75 md:mb-20 mb-5 text-2xl text-center">
        Pengumuman Kelulusan <br /> {setting?.nama_sekolah}
      </h1>
      <div className="flex md:flex-row flex-col justify-center gap-2 md:gap-20 items-center">
        <div className="flex flex-col gap-10 md:gap-6 justify-center p-10 rounded-md items-center scale-[70%] md:scale-100">
          <h1
            className={
              "text-2xl md:text-3xl text-center font-baloo text-white " + hidden
            }
          >
            Pengumuman dibuka dalam:
          </h1>
          <Show />
          <Countdowncustom oncomplete={handleComplete} />
        </div>
        <div className="flex p-3 rounded-md ring-3 bg-blue-700 ring-red-500">
          {UserAktif}
        </div>
      </div>
    </div>
  )
}

export default Page
