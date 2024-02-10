import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { productId, text, replyToId } = CommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.comment.create({
      data: {
        text,
        productId,
        authorId: session.user.id,
        replyToId,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create comment. Please try later", {
      status: 500,
    });
  }
}
