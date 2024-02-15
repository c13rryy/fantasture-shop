import { z } from "zod";

export const ProductSubscriptionValidator = z.object({
  productId: z.union([z.string(), z.array(z.string())]),
});

export type SubPayload = z.infer<typeof ProductSubscriptionValidator>;
