import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProductSubscriptionValidator } from "@/lib/validators/subscribe";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { productId } = ProductSubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        productId,
        userId: session.user.id,
      },
    });

    if (subscriptionExists) {
      await db.subscription.delete({
        where: {
          id: subscriptionExists.id,
        },
      });

      return new Response("Delete");
    }

    await db.subscription.create({
      data: {
        productId,
        userId: session.user.id,
      },
    });

    return new Response(productId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not subscribe", { status: 500 });
  }
}
