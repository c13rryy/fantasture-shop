import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q) return new Response("Invalid query", { status: 400 });

  const startValue = q.charAt(0).toUpperCase() + q.slice(1);

  const results = await db.product.findMany({
    where: {
      name: {
        startsWith: startValue,
      },
    },
  });

  return new Response(JSON.stringify(results));
}
