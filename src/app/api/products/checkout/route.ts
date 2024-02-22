import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { CheckoutValidator } from "@/lib/validators/checkout";
import { db } from "@/lib/db";
import { z } from "zod";
import { calculateDiscountPrice, productQuantity } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productData } = CheckoutValidator.parse(body);

    const productIds = productData.map(el => el.productId);
    const orderQuantity = productData.reduce(
      (value, cartItem) => value + cartItem.quantity,
      0
    );

    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach(product => {
      line_items.push({
        quantity: productQuantity(product.id, productData),
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: product.discount
            ? (Number(product.price) -
                calculateDiscountPrice(product.price, product.discount)) *
              100
            : Number(product.price) * 100,
        },
      });
    });

    const order = await db.order.create({
      data: {
        isPaid: false,
        orderQuantity,
      },
    });

    for (const product of productData) {
      await db.orderItem.create({
        data: {
          productId: product.productId,
          orderId: order.id,
          quantity: product.quantity,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return new Response(session.url);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
