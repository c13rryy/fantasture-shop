import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);
  try {
    const { id, limit, page } = z
      .object({
        id: z.string(),
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        id: url.searchParams.get("id"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    if (id === "raiting") {
      const allProducts = await db.product.findMany();

      const products = await db.product.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        include: {
          subscribers: true,
          votes: true,
        },
        orderBy: {
          raiting: "desc",
        },
      });

      const quantityOfPage = (allProducts.length ?? 1) / parseInt(limit);

      const filterData = {
        products,
      };

      return new Response(
        JSON.stringify({
          filterData,
          hasMore: parseInt(page) < quantityOfPage,
          quantityOfPage,
        })
      );
    }

    const allFilterProjects = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    const filterData = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          take: parseInt(limit),
          skip: (parseInt(page) - 1) * parseInt(limit),
          include: {
            subscribers: true,
            votes: true,
          },
        },
      },
    });

    const quantityOfPage =
      (allFilterProjects?.products.length ?? 1) / parseInt(limit);

    return new Response(
      JSON.stringify({
        filterData,
        hasMore: parseInt(page) < quantityOfPage,
        quantityOfPage,
      })
    );
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
