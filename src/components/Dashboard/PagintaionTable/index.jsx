import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import Link from "next/link"

const PaginationTable = (props) => {
  const { page = 1, hasNextPage, totalPage } = props

  const currentPage = Math.min(Math.max(Number(page), 1), totalPage)
  const getPagesToShow = () => {
    let startPage = currentPage - 2
    let endPage = currentPage + 2
    if (currentPage <= 3) {
      startPage = 1
      endPage = 5
    } else if (currentPage >= totalPage - 2) {
      startPage = totalPage - 4
      endPage = totalPage
    }

    return Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i
    )
  }

  const pages = getPagesToShow()

  return (
    <div className="flex justify-center items-center flex-row gap-1">
      <Link
        className={cn(
          "flex justify-center items-center gap-1 rounded-sm bg-black text-white p-1 px-2",
          currentPage === 1 ? "pointer-events-none bg-white text-black" : ""
        )}
        href={`?page=1`}
      >
        <i className="pi pi-angle-double-left"></i>First
      </Link>

      <Link
        className={cn(
          "flex justify-center items-center gap-1 rounded-sm bg-black text-white p-1 px-2",
          currentPage === 1 ? "pointer-events-none bg-white text-black" : ""
        )}
        href={`?page=${currentPage - 1}`}
      >
        <i className="pi pi-angle-double-left"></i>Previous
      </Link>
      {pages?.map((p, i) => (
        <Link
          className={cn(
            "flex bg-black text-white rounded-sm p-1 px-3",
            currentPage === p ? "pointer-events-none bg-white text-black" : ""
          )}
          key={i}
          href={`?page=${p}`}
        >
          {p}
        </Link>
      ))}

      <Link
        className={cn(
          "flex justify-center items-center gap-1 rounded-sm bg-black text-white p-1 px-2",
          !hasNextPage ? "pointer-events-none bg-white text-black" : ""
        )}
        href={`?page=${currentPage + 1}`}
      >
        Next<i className="pi pi-angle-double-right"></i>
      </Link>

      <Link
        className={cn(
          "flex justify-center items-center gap-1 rounded-sm bg-black text-white p-1 px-2",
          !hasNextPage ? "pointer-events-none bg-white text-black" : ""
        )}
        href={`?page=${totalPage}`}
      >
        Last
        <i className="pi pi-angle-double-right"></i>
      </Link>
    </div>
  )
  // return (
  //   <Pagination>
  //     <PaginationContent className={"text-white"}>
  //       <PaginationItem>
  //         <PaginationPrevious
  //           className={
  //             currentPage === 1
  //               ? "pointer-events-none bg-gray-800"
  //               : "bg-gray-800"
  //           }
  //           href={`?page=${currentPage - 1}`}
  //         />
  //       </PaginationItem>
  //       {pages?.map((p, i) => (
  //         <PaginationItem key={i}>
  //           <PaginationLink
  //             className={cn(
  //               currentPage === p
  //                 ? "pointer-events-none bg-white text-black"
  //                 : "bg-gray-800"
  //             )}
  //             href={`?page=${p}`}
  //           >
  //             {p}
  //           </PaginationLink>
  //         </PaginationItem>
  //       ))}

  //       <PaginationItem>
  //         <PaginationNext
  //           className={
  //             !hasNextPage ? "pointer-events-none bg-gray-800" : "bg-gray-800"
  //           }
  //           href={`?page=${currentPage + 1}`}
  //         />
  //       </PaginationItem>
  //     </PaginationContent>
  //   </Pagination>
  // )
}

export default PaginationTable
