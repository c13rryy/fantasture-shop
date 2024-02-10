"use client";

import { FC, useState } from "react";
import { Icon } from "../ui/Icon/Icon";
import Typo from "../ui/typography/typo";
import { CommentVote, CommentVoteType } from "@prisma/client";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { CommentVoteRequest } from "@/lib/validators/comment";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useCustomToast } from "@/hooks/useCustomToast";

type PartialVote = Pick<CommentVote, "type">;

interface CommentVotesProps {
  commentId: string;
  votesLikeAmt: number;
  votesDislikeAmt: number;
  currentVote?: PartialVote;
}

const CommentVotes: FC<CommentVotesProps> = ({
  commentId,
  currentVote: _currentVote,
  votesLikeAmt: _votesLikeAmt,
  votesDislikeAmt: _votesDislikeAmt,
}) => {
  const [votesLikeAmt, setVotesLikeAmt] = useState<number>(_votesLikeAmt);
  const [votesDislikeAmt, setVotesDislikeAmt] =
    useState<number>(_votesDislikeAmt);
  const [currentVote, setCurrentVote] = useState<PartialVote | undefined>(
    _currentVote
  );
  const prevVote = usePrevious(currentVote);
  const { loginToast } = useCustomToast();

  const { mutate: vote } = useMutation({
    mutationFn: async (type: CommentVoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType: type,
      };

      await axios.patch("/api/product/comment/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesLikeAmt(prev => prev - 1);
      else setVotesDislikeAmt(prev => prev - 1);

      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast.error("Your vote was not registered.");
    },
    onMutate: (type: CommentVoteType) => {
      if (currentVote?.type === type) {
        setCurrentVote(undefined);
        if (type === "UP") setVotesLikeAmt(prev => prev - 1);
        else if (type === "DOWN") setVotesDislikeAmt(prev => prev - 1);
      } else if (
        (votesDislikeAmt === 0 && votesLikeAmt === 0) ||
        typeof currentVote?.type === "undefined"
      ) {
        setCurrentVote({ type });
        if (type === "UP") {
          setVotesLikeAmt(prev => prev + 1);
        } else if (type === "DOWN") {
          setVotesDislikeAmt(prev => prev + 1);
        }
      } else {
        setCurrentVote({ type });
        if (type === "UP") {
          setVotesDislikeAmt(prev => prev - 1);
          setVotesLikeAmt(prev => prev + 1);
        } else if (type === "DOWN") {
          setVotesLikeAmt(prev => prev - 1);
          setVotesDislikeAmt(prev => prev + 1);
        }
      }
    },
  });
  return (
    <div className="flex items-center gap-16px">
      <div className="flex items-center gap-6px">
        <button onClick={() => vote("UP")}>
          <Icon
            icon="vote-like"
            size={24}
            color="#000"
            fill={currentVote?.type === "UP" ? "#000" : "#fff"}
          />
        </button>
        <Typo type="mediumP" text={votesLikeAmt} />
      </div>

      <div className="flex items-center gap-6px">
        <button onClick={() => vote("DOWN")}>
          <Icon
            icon="vote-dislike"
            size={24}
            color="#000"
            fill={currentVote?.type === "DOWN" ? "#000" : "#fff"}
          />
        </button>
        <Typo type="mediumP" text={votesDislikeAmt} />
      </div>
    </div>
  );
};

export default CommentVotes;
