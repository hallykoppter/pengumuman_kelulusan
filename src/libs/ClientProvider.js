"use client"

import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getSetting } from "./SettingService"
import { Suspense, useEffect } from "react"
import { PrimeReactProvider, PrimeReactContext } from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { ProgressProvider } from "@bprogress/next/app"
import "@bprogress/core/css"
import { Bar, Progress } from "@bprogress/next"

const ClientProvider = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const setting = await getSetting()
      if (setting?.id != 1 || !setting?.id) {
        router.push("initialization")
      }
    }
    init()
  }, [])

  return (
    <SessionProvider>
      <Suspense>
        <ProgressProvider
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false, template: null }}
          shallowRouting
        >
          <Progress>
            <Bar />
          </Progress>
          <PrimeReactProvider>{children}</PrimeReactProvider>
        </ProgressProvider>
      </Suspense>
    </SessionProvider>
  )
}

export default ClientProvider
