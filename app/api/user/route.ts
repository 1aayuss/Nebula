import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  const fname = await user?.firstName;
  const imageurl = await user?.imageUrl;

  return NextResponse.json(
    { firstName: fname, imageUrl: imageurl },
    { status: 200 }
  );
}
