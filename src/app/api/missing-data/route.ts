import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);
  try {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse({
        id: url.searchParams.get("id"),
      });

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    const sizes = await db.size.findMany({
      where: {
        id: {
          in: product?.sizeIds || [],
        },
      },
    });

    const colors = await db.color.findMany({
      where: {
        id: {
          in: product?.colorIds || [],
        },
      },
    });

    return new Response(
      JSON.stringify({
        productColor: [...colors],
        productSize: [...sizes],
      })
    );
  } catch (error) {
    return new Response("Could not fetch a data", { status: 500 });
  }
}
