"use server"

import { revalidatePath } from "next/cache"
import prisma from "./prisma"

const getSiswaPage = async (skip, take) => {
  const siswa = await prisma.siswa.findMany({
    skip: skip,
    take: take,
  })
  const total = await prisma.siswa.count()
  revalidatePath("/")
  return {
    data: siswa,
    metadata: {
      hasNextPage: skip + take < total,
      totalPage: Math.ceil(total / take),
    },
  }
}

const updateKeterangan = async (props) => {
  const { id, keterangan } = props
  const req = await prisma.siswa.update({
    where: {
      id: id,
    },
    data: {
      keterangan: keterangan,
    },
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

const truncateSiswa = async () => {
  const req = await prisma.$executeRaw`TRUNCATE TABLE siswa;`
  if (req === 0) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "error" }
  }
}

const luluskanSemuaSiswa = async () => {
  const req = await prisma.siswa.updateMany({
    data: { keterangan: 1 },
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

const batalkanKelulusan = async () => {
  const req = await prisma.siswa.updateMany({
    data: { keterangan: 0 },
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

const importSiswa = async (excelData) => {
  const data = JSON.parse(excelData)
  const count = await prisma.siswa.count()

  if (count >= 1) {
    await prisma.$executeRaw`TRUNCATE TABLE siswa;`
  }
  const req = await prisma.siswa.createMany({
    data: data,
  })
  if (req) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

export {
  getSiswaPage,
  truncateSiswa,
  luluskanSemuaSiswa,
  batalkanKelulusan,
  updateKeterangan,
  importSiswa,
}
