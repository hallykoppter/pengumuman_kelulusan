"use server"

import prisma from "./prisma"
import bcrypt from "bcryptjs"

const getUser = async () => {
  const user = await prisma.users.findMany()
  return user
}

const createUser = async (request) => {
  let data = request
  data.password = await bcrypt.hash(data.password, 10)

  const user = await prisma.users.create({
    data: data,
  })
  if (user) {
    return { status: "ok", message: "success" }
  } else {
    return { status: "error", message: "Something when wrong!" }
  }
}

const getUserAuth = async (request) => {
  const { username, password, role } = request
  let req

  if (role == "admin") {
    req = await prisma.users.findUnique({
      where: {
        username: username,
      },
    })
  } else if (role == "siswa") {
    req = await prisma.siswa.findUnique({
      where: {
        nisn: username,
      },
    })
  }

  const verifyPassword = await bcrypt.compare(
    password,
    req?.password.toString()
  )
  const setting = await prisma.settings.findUnique({ where: { id: 1 } })
  const nama_sekolah = setting?.nama_sekolah

  const user = {
    name: req?.name || req?.nama,
    username: req?.username || req?.nisn,
    role: role,
    nama_sekolah: nama_sekolah,
  }

  if (!verifyPassword)
    return json({ message: "username or password didnt match" })
  else return user
}

export { getUser, getUserAuth, createUser }
