import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

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

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];

    const addressString = addressComponents.filter(c => c !== null).join(", ");

    if (event.type === "checkout.session.completed") {
      await db.order.update({
        where: {
          id: session?.metadata?.orderId,
        },

        data: {
          isPaid: true,
          address: addressString,
          totalPrice: session.amount_total ?? 0,
          phone: session.customer_details?.phone || "",
        },
      });
    }

    return new Response(null, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
