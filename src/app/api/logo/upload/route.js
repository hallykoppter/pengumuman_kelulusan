import { handleUpload } from "@vercel/blob/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { updateLogo } from "@/libs/SettingService"

export async function POST(request) {
  const body = await request.json()
  const session = await getServerSession(authOptions)

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/png"],
          allowOverwrite: true,
          tokenPayload: JSON.stringify({
            username: session?.user.name,
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("blob upload complete", blob, tokenPayload)

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
          const data = {
            logo_sekolah: blob.url,
          }
          await updateLogo(data)
        } catch (error) {
          throw new Error("Could not update user")
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: new Error(error.message) },
      { status: 400 } // The webhook will retry 5 times waiting for a status 200
    )
  }
}
