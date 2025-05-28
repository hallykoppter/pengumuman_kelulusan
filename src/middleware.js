import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token?.role === "siswa"
    ) {
      return new NextResponse(
        "Peserta Didik tidak diperkenankan mengakses halaman ini!"
      )
    }
    if (
      req.nextUrl.pathname.startsWith("/pengumuman") &&
      req.nextauth.token?.role === "admin"
    ) {
      return new NextResponse(
        "Admin tidak diperkenankan mengakses halaman ini!"
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/siswa/:path*"],
}
