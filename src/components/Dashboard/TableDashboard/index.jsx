import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { updateKeterangan } from "@/libs/SiswaService"

const TableDashboard = (props) => {
  const { data, toast } = props

  let datatable
  if (data) {
    datatable = data?.map((siswa, key) => {
      return (
        <TableRow key={key} className={"border-0 text-center"}>
          <TableCell>{key + 1}</TableCell>
          <TableCell className={"text-left"}>{siswa.nama}</TableCell>
          <TableCell>{siswa.nis}</TableCell>
          <TableCell>{siswa.nisn}</TableCell>
          <TableCell>{siswa.kelas}</TableCell>
          <TableCell>
            {siswa.keterangan == 1 ? "lulus" : "tidak lulus"}
          </TableCell>
          <TableCell className={"flex flex-row"}>
            <button
              className="bg-green-500 p-1 rounded-sm px-2 text-white scale-75 cursor-pointer"
              onClick={async () => {
                const res = await updateKeterangan({
                  id: siswa.id,
                  keterangan: siswa.keterangan === 1 ? 0 : 1,
                })
                res.status === "ok"
                  ? toast.current.show({
                      severity: "success",
                      summary: "Success",
                      life: 3000,
                    })
                  : toast.current.show({
                      severity: "error",
                      summary: "Error",
                      life: 3000,
                    })
              }}
            >
              Ubah keterangan
            </button>
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Table className={"w-full"}>
      <TableHeader>
        <TableRow className={"text-center"}>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">Nama</TableHead>
          <TableHead className="text-center">NIS</TableHead>
          <TableHead className="text-center">NISN</TableHead>
          <TableHead className="text-center">Kelas</TableHead>
          <TableHead className="text-center">Keterangan</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{datatable}</TableBody>
    </Table>
  )
}

export default TableDashboard
