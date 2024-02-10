import { z } from "zod";

export const CommentValidator = z.object({
  productId: z.string(),
  text: z.string().min(5),
  replyToId: z.string().optional(),
});

export type CommentRequest = z.infer<typeof CommentValidator>;

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>;
