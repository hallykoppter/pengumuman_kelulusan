"use server"

import prisma from "./prisma"

const getPengumuman = async () => {
  const req = await prisma.pengumuman.findUnique({
    where: {
      id: 1,
    },
  })
  return req
}

const upsertPengumuman = async (request) => {
  const req = await prisma.pengumuman.upsert({
    where: {
      id: 1,
    },
    update: request,
    create: request,
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "error" }
  }
}

export { getPengumuman, upsertPengumuman }
