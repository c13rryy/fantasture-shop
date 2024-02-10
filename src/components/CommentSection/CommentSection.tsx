import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import ProductComment from "./ProductComment/ProductComment";
import CreateComment from "./CreateComment/CreateComment";

interface CommentSectionProps {
  productId: string;
}

const CommentSection = async ({ productId }: CommentSectionProps) => {
  const session = await getAuthSession();

  const comments = await db.comment.findMany({
    where: {
      productId,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-24" />

      <CreateComment productId={productId} />

      <div className="flex flex-col gap-y-24px mt-17">
        {comments
          .filter(comment => !comment.replyToId)
          .map(topLevelComment => {
            const topLevelCommentLikes = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === "UP") return acc + 1;

                return acc;
              },
              0
            );

            const topLevelCommentDislikes = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === "DOWN") return acc + 1;

                return acc;
              },
              0
            );

            const topLevelCommentVote = topLevelComment.votes.find(
              vote => vote.userId === session?.user.id
            );

            return (
              <div className="flex flex-col" key={topLevelComment.id}>
                <div className="mb-14">
                  <ProductComment
                    productId={productId}
                    comment={topLevelComment}
                    currentVote={topLevelCommentVote}
                    votesDislikeAmt={topLevelCommentDislikes}
                    votesLikeAmt={topLevelCommentLikes}
                  />
                </div>

                {topLevelComment.replies.map(reply => {
                  const replyCommentLikes = reply.votes.reduce((acc, vote) => {
                    if (vote.type === "UP") return acc + 1;

                    return acc;
                  }, 0);

                  const replyCommentDislikes = reply.votes.reduce(
                    (acc, vote) => {
                      if (vote.type === "DOWN") return acc + 1;

                      return acc;
                    },
                    0
                  );

                  const replyCommentVote = reply.votes.find(
                    vote => vote.userId === session?.user.id
                  );

                  return (
                    <div
                      key={reply.id}
                      className="sm:ml-17 pl-10 py-10 border-l-[2px] border-solid"
                    >
                      <ProductComment
                        comment={reply}
                        currentVote={replyCommentVote}
                        votesLikeAmt={replyCommentLikes}
                        votesDislikeAmt={replyCommentDislikes}
                        productId={productId}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
