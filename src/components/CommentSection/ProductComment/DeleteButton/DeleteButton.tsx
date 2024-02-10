"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

interface DeleteButtonProps {
  commentId: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ commentId }) => {
  const router = useRouter();
  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/product/comment/${commentId}`);

      return data;
    },
    onError: () => {
      toast.error("Could not delete this comment");
    },
    onSuccess: data => {
      router.refresh();
      return toast.success(data);
    },
  });
  return (
    <div className="absolute right-8px top-8px">
      <button
        onClick={() => deleteComment()}
        className="w-[40px] flex justify-center items-center h-[40px] rounded-[4px] duration-700 hover:duration-700 hover:bg-grey_3 bg-black_4"
      >
        <Icon icon="trash" size={24} fill="#000" />
      </button>
    </div>
  );
};

export default DeleteButton;
