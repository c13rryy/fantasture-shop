import { z } from "zod";

export const CheckoutValidator = z.object({
  productData: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
});

export type CheckoutPayload = z.infer<typeof CheckoutValidator>;
