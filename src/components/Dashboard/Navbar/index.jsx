"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Menu } from "primereact/menu"
import { useRef } from "react"

const Navbar = () => {
  const menuRight = useRef(null)
  const { data: session } = useSession()
  const router = useRouter()

  const items = [
    {
      label: "User",
      items: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => router.push("/logout"),
        },
      ],
    },
  ]

  return (
    <div className="flex w-full bg-indigo-800 font-baloo text-white justify-between items-center p-3">
      <i className="pi pi-bars"></i>
      <button onClick={(event) => menuRight.current.toggle(event)}>
        <h2>{session?.user.name}</h2>
      </button>
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </div>
  )
}

export default Navbar
