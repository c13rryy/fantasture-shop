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

    const filterData = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          include: {
            subscribers: true,
            votes: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(filterData));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
