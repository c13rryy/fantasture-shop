import { Vote } from "@prisma/client";

export type CachedProduct = {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  price: string;
  discount?: string;
  currentVote: Vote["type"] | null;
  createdAt: Date;
};
