"use client"

import { getSetting } from "@/libs/SettingService"
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown"
import "@leenguyen/react-flip-clock-countdown/dist/index.css"
import { useEffect, useState } from "react"

const Countdowncustom = ({ oncomplete }) => {
  const [setting, setSetting] = useState()

  useEffect(() => {
    async function init() {
      const req = await getSetting()
      setSetting(req)
    }
    init()
  }, [])

  const style = {
    label: {
      fontFamily: "Baloo Bhai 2",
      color: "white",
    },
    block: {
      fontFamily: "Aldrich",
      backgroundColor: "white",
      color: "black",
    },
    separator: {
      color: "white",
    },
    divider: {
      backgroundColor: "transparent",
    },
  }
  const label = ["Hari", "Jam", "Menit", "Detik"]

  if (!setting) return ""

  return (
    <FlipClockCountdown
      to={new Date(setting?.waktu_pengumuman)}
      renderOnServer
      suppressHydrationWarning={true}
      digitBlockStyle={style.block}
      labelStyle={style.label}
      dividerStyle={style.divider}
      separatorStyle={style.separator}
      labels={label}
      renderMap={[true, true, true, true]}
      onComplete={oncomplete}
      stopOnHiddenVisibility
    />
  )
}

export default Countdowncustom
