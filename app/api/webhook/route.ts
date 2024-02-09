import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { number } from "zod";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("event created");
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const checkoutSession = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      // const checkoutSession = event.data.object;

      if (!checkoutSession?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 });
      }

      console.log("got user id");

      console.log(checkoutSession);

      await prismadb.userPayment.create({
        data: {
          userId: checkoutSession?.metadata?.userId,
          stripeCustomerId: checkoutSession.customer_email as string,
          stripePaymentId: checkoutSession.id,
          stripeAmount: checkoutSession.amount_total,
          stripeCredits: parseInt(checkoutSession?.metadata?.credit),
          stripePaymentIntent: checkoutSession.payment_intent as string,
        },
      });

      const UserApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
          userId: checkoutSession?.metadata?.userId,
        },
      });

      if (UserApiLimit) {
        await prismadb.userApiLimit.update({
          where: {
            userId: checkoutSession?.metadata?.userId,
          },
          data: {
            count:
              UserApiLimit.count + parseInt(checkoutSession?.metadata?.credit),
          },
        });
      }

      console.log("Prisma db created");

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // if (event.type === "invoice.payment_succeeded") {
  //   const subscription = await stripe.subscriptions.retrieve(
  //     session.subscription as string
  //   );

  //   await prismadb.userSubscription.update({
  //     where: {
  //       stripeSubscriptionId: subscription.id,
  //     },
  //     data: {
  //       stripePriceId: subscription.items.data[0].price.id,
  //     },
  //   });
  // }

  return new NextResponse(null, { status: 200 });
}
