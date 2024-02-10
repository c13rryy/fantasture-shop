"use client";

import CommentVotes from "@/components/CommentVotes/CommentVotes";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import Typo from "@/components/ui/typography/typo";
import { Comment, CommentVote, User } from "@prisma/client";
import { FC, useRef, useState } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import { Icon } from "@/components/ui/Icon/Icon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Textarea from "@/components/ui/textarea/textarea";
import Button from "@/components/ui/button/button";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";
import toast from "react-hot-toast";
import { formatTimeToNow } from "@/lib/utils";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface ProductCommentProps {
  comment: ExtendedComment;
  votesLikeAmt: number;
  votesDislikeAmt: number;
  currentVote: CommentVote | undefined;
  productId: string;
}

const ProductComment: FC<ProductCommentProps> = ({
  comment,
  votesDislikeAmt,
  votesLikeAmt,
  currentVote,
  productId,
}) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const commentRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const { mutate: createComment, isPending } = useMutation({
    mutationFn: async ({ productId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        productId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(`/api/product/comment`, payload);

      return data;
    },
    onError: () => {
      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });
  return (
    <div ref={commentRef} className="flex flex-col relative">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
        />

        <div className="ml-10 flex items-center gap-x-10px">
          <Typo type="sectionP" text={comment.author.username ?? "user1"} />
        </div>

        <p className="ml-10 text-12 font-normal">
          {formatTimeToNow(new Date(comment.createdAt))}
        </p>
      </div>

      <Typo type="labelM" text={comment.text} className="ml-17 mt-17" />

      <div className="flex gap-24px items-center justify-end flex-wrap">
        <CommentVotes
          commentId={comment.id}
          votesDislikeAmt={votesDislikeAmt}
          votesLikeAmt={votesLikeAmt}
          currentVote={currentVote}
        />

        <button
          onClick={() => {
            if (!session) return router.push("/sign-in");
            setIsReplying(true);
          }}
          className="flex items-center gap-6px"
        >
          <Icon icon="message-square" size={16} />
          <Typo type="mediumP" text="Reply" />
        </button>

        {isReplying ? (
          <div className="grid w-full gap-10px">
            <Textarea
              label="Your Comment"
              name="comment"
              id="comment"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="What are your thoughts ?"
            />
            <div className="mt-10 flex gap-10px justify-end">
              <Button
                tabIndex={-1}
                onClick={() => {
                  setIsReplying(false);
                  setInput("");
                }}
                size="auth"
                classes="rounded-[10px]"
              >
                Cancel
              </Button>
              <Button
                disabled={input.length === 0}
                isLoading={isPending}
                onClick={() => {
                  createComment({
                    productId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id,
                  });
                  setInput("");
                }}
                size="large"
              >
                Post
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      {comment.authorId === session?.user.id && (
        <DeleteButton commentId={comment.id} />
      )}
    </div>
  );
};

export default ProductComment;
