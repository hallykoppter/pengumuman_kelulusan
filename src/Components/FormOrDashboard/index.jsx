import { signIn } from "next-auth/react"
import InputText from "@/components/InputText"
import { useState } from "react"

const FormOrDashboard = ({ user }) => {
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()

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

  if (user?.role === "admin") {
    return (
      <div>
        <a
          href="/dashboard"
          className="flex p-2 px-4 rounded-md bg-primary font-baloo text-xl"
        >
          Dashboard
        </a>
      </div>
    )
  } else if (user?.role === "siswa") {
    return (
      <div>
        <a
          href="/pengumuman"
          className="flex p-2 px-4 rounded-md bg-primary font-baloo text-xl"
        >
          Pengumuman
        </a>
      </div>
    )
  } else {
    return (
      <div>
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
            type={"number"}
            id="password"
            label="Password"
            onchange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-lime-600 text-white rounded-md p-2 cursor-pointer">
            Masuk
          </button>
        </form>
      </div>
    )
  }
}

export default FormOrDashboard
