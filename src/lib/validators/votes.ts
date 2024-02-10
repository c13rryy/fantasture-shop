import { z } from "zod";

export const ProductVoteValidator = z.object({
  productId: z.string(),
  voteType: z.enum([
    "ACTIVE_ONE",
    "ACTIVE_TWO",
    "ACTIVE_THREE",
    "ACTIVE_FOUR",
    "ACTIVE_FIVE",
  ]),
});

export type ProductVoteRequest = z.infer<typeof ProductVoteValidator>;
