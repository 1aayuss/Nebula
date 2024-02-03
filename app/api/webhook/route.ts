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

  // if (event.type === "checkout.session.completed") {
  //   const subscription = await stripe.subscriptions.retrieve(
  //     session.subscription as string
  //   );

  //   if (!session?.metadata?.userId) {
  //     return new NextResponse("User id is required", { status: 400 });
  //   }

  //   await prismadb.userPayment.create({
  //     data: {
  //       userId: session?.metadata?.userId,
  //       stripePaymentId: subscription.id,
  //       stripeCustomerId: subscription.customer as string,
  //       stripePriceId: subscription.items.data[0].price.id,
  //       stripeAmount:
  //     },
  //   });
  // }

  switch (event.type) {
    case "checkout.session.completed":
      console.log("checkout.session.completed");

      const paymentSucceeded = event.data.object;

      if (!checkoutSession?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 });
      }

      console.log("got user id");

      console.log(paymentSucceeded);

      await prismadb.userPayment.create({
        data: {
          userId: checkoutSession?.metadata?.userId,
          stripePaymentId: paymentSucceeded.id,
          stripeCustomerId: paymentSucceeded.customer as string,
          stripePaymentIntent: paymentSucceeded.payment_intent as string,
          stripeAmount: paymentSucceeded.amount_total,
          stripeCredits: parseInt(checkoutSession?.metadata?.credit),
        },
      });

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
