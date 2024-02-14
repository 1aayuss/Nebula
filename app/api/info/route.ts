// D:\Web Projects\nebula\app\api\info\route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { log } from "console";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const contact = await prisma.contactInfo.create({
      data: {
        FirstName: body.FirstName,
        LastName: body.LastName,
        Email: body.Email,
        Message: body.Message,
      },
    });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 400 });
  }
}
