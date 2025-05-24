"use server"

import prisma from "./prisma"

const getSetting = async () => {
  const req = await prisma.settings.findUnique({
    where: {
      id: 1,
    },
  })

  return req
}

const upsertSetting = async (data) => {
  let body = data
  body.izin_login = Number(body.izin_login)
  body.aktif_pengumuman = Number(body.aktif_pengumuman)
  const req = await prisma.settings.upsert({
    where: {
      id: 1,
    },
    update: body,
    create: body,
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

const updateSetting = async (data) => {
  let body = data
  body.izin_login = Number(body.izin_login)
  body.aktif_pengumuman = Number(body.aktif_pengumuman)
  const req = await prisma.settings.update({
    where: {
      id: 1,
    },
    data: body,
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

export { getSetting, upsertSetting, updateSetting }
