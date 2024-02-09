import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { decreaseApiLimit, CheckApiLimit } from "@/lib/api_limit";
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await CheckApiLimit();
    // const isPro = await checkSubscription();

    if (!freeTrial) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    await decreaseApiLimit();

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
