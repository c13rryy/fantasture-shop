import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { ProductVoteValidator } from "@/lib/validators/votes";
import { CachedProduct } from "@/types/redis";
import { z } from "zod";

const CACHE_AFTER_UPVOTES = 4;

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { productId, voteType } = ProductVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    });

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        votes: true,
      },
    });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            id: existingVote.id,
          },
        });

        return new Response("OK");
      }

      await db.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          type: voteType,
        },
      });

      //recount the votes for cache

      const votesAmt = product.votes.reduce((acc, vote) => {
        if (vote.type === "ACTIVE_ONE") return acc + 1;
        if (vote.type === "ACTIVE_TWO") return acc + 2;
        if (vote.type === "ACTIVE_THREE") return acc + 3;
        if (vote.type === "ACTIVE_FOUR") return acc + 4;
        if (vote.type === "ACTIVE_FIVE") return acc + 5;

        return acc;
      }, 0);

      if (votesAmt / product.votes.length >= CACHE_AFTER_UPVOTES) {
        const cachePayload: CachedProduct = {
          name: product.name ?? "",
          description: product.description ?? "",
          fullDescription: product.fullDescription ?? "",
          id: product.id ?? "",
          imageUrl: product.imageUrl ?? "",
          price: product.price ?? "",
          discount: product.discount ?? "",
          currentVote: voteType,
          createdAt: product.createdAt,
        };

        await redis.hset(`post:${productId}`, cachePayload);
      }

      return new Response("ok");
    }

    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        productId,
      },
    });

    const votesAmt = product.votes.reduce((acc, vote) => {
      if (vote.type === "ACTIVE_ONE") return acc + 1;
      if (vote.type === "ACTIVE_TWO") return acc + 2;
      if (vote.type === "ACTIVE_THREE") return acc + 3;
      if (vote.type === "ACTIVE_FOUR") return acc + 4;
      if (vote.type === "ACTIVE_FIVE") return acc + 5;

      return acc;
    }, 0);

    if (votesAmt / product.votes.length >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedProduct = {
        name: product.name ?? "",
        description: product.description ?? "",
        fullDescription: product.fullDescription ?? "",
        id: product.id ?? "",
        imageUrl: product.imageUrl ?? "",
        price: product.price ?? "",
        discount: product.discount ?? "",
        currentVote: voteType,
        createdAt: product.createdAt,
      };

      await redis.hset(`post:${productId}`, cachePayload);
    }
    return new Response("ok");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not register your vote, please try again", {
      status: 500,
    });
  }
}
