import { z } from "zod";

export const ProductSubscriptionValidator = z.object({
  productId: z.string(),
});

export type SubPayload = z.infer<typeof ProductSubscriptionValidator>;
