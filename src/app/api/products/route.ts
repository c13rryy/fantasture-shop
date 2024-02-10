import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const allProducts = await db.product.findMany();

    const products = await db.product.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
        subscribers: true,
        votes: true,
      },
    });

    const quantityOfPage = Math.round(allProducts.length / parseInt(limit));

    return new Response(JSON.stringify({ products, quantityOfPage }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not fetch products", { status: 500 });
  }
}
