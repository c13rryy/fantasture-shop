import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const isReplyCommentsExisting = await db.comment.findMany({
      where: {
        replyToId: params.commentId,
      },
    });

    if (isReplyCommentsExisting) {
      for (const reply of isReplyCommentsExisting) {
        await db.comment.delete({
          where: {
            id: reply.id,
          },
        });
      }
    }

    await db.comment.delete({
      where: {
        id: params.commentId,
      },
    });

    return new Response("Deleted successfully");
  } catch (error) {
    console.log(error);
    return new Response("Could not delete a category", { status: 500 });
  }
}
