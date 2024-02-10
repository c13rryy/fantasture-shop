"use client";

import Button from "@/components/ui/button/button";
import Textarea from "@/components/ui/textarea/textarea";
import { useCustomToast } from "@/hooks/useCustomToast";
import { CommentRequest } from "@/lib/validators/comment";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface CreateCommentProps {
  productId: string;
  replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ productId, replyToId }) => {
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: comment, isPending } = useMutation({
    mutationFn: async ({ productId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        productId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(`/api/product/comment`, payload);

      return data;
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast.error(
        "Comment was not created successfully. Please try again."
      );
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });
  return (
    <div className="grid w-full gap-10px">
      <Textarea
        label="Your Comment"
        name="comment"
        id="comment"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="What are your thoughts ?"
      />
      <div className="mt-10 flex justify-end">
        <Button
          disabled={input.length === 0}
          isLoading={isPending}
          onClick={() => comment({ productId, text: input, replyToId })}
          size="large"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
