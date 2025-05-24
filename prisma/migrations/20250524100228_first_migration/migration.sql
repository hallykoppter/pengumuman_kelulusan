-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "npsn" TEXT NOT NULL,
    "nama_sekolah" TEXT NOT NULL,
    "email_sekolah" TEXT NOT NULL,
    "alamat_sekolah" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "nama_kepsek" TEXT NOT NULL,
    "nip_kepsek" TEXT NOT NULL,
    "logo_sekolah" TEXT NOT NULL,
    "aktif_pengumuman" INTEGER NOT NULL,
    "waktu_pengumuman" TEXT NOT NULL,
    "izin_login" INTEGER NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TEXT NOT NULL,
    "keterangan" INTEGER NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");
