"use client";

import { votes } from "@/data/vote-data";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { FC, useEffect, useMemo, useState } from "react";
import { Icon } from "../../ui/Icon/Icon";
import Typo from "../../ui/typography/typo";
import { useMutation } from "@tanstack/react-query";
import { ProductVoteRequest } from "@/lib/validators/votes";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/useCustomToast";
import toast from "react-hot-toast";
import { convertCurrentVoteToNumber } from "@/lib/utils";

interface ProductVoteClientProps {
  productId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
  quantityOfVote: number;
}

const ProductVoteClient: FC<ProductVoteClientProps> = ({
  productId,
  initialVotesAmt,
  initialVote,
  quantityOfVote,
}) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);
  const { loginToast } = useCustomToast();

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: addVote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: ProductVoteRequest = {
        productId,
        voteType: type,
      };

      await axios.patch("/api/products/vote", payload);
    },
    onError: (err, type) => {
      if (type === "ACTIVE_ONE") setVotesAmt(prev => prev - 1);
      else if (type === "ACTIVE_TWO") setVotesAmt(prev => prev - 2);
      else if (type === "ACTIVE_THREE") setVotesAmt(prev => prev - 3);
      else if (type === "ACTIVE_FOUR") setVotesAmt(prev => prev - 4);
      else setVotesAmt(prev => prev - 5);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast.error("Your vote was not registered.");
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "ACTIVE_ONE") setVotesAmt(prev => prev - 1);
        else if (type === "ACTIVE_TWO") setVotesAmt(prev => prev - 2);
        else if (type === "ACTIVE_THREE") setVotesAmt(prev => prev - 3);
        else if (type === "ACTIVE_FOUR") setVotesAmt(prev => prev - 4);
        else setVotesAmt(prev => prev - 5);
      } else {
        setCurrentVote(type);
        if (type === "ACTIVE_ONE")
          setVotesAmt(
            prev => prev - convertCurrentVoteToNumber(currentVote) + 1
          );
        else if (type === "ACTIVE_TWO")
          setVotesAmt(
            prev => prev - convertCurrentVoteToNumber(currentVote) + 2
          );
        else if (type === "ACTIVE_THREE")
          setVotesAmt(
            prev => prev - convertCurrentVoteToNumber(currentVote) + 3
          );
        else if (type === "ACTIVE_FOUR")
          setVotesAmt(
            prev => prev - convertCurrentVoteToNumber(currentVote) + 4
          );
        else
          setVotesAmt(
            prev => prev - convertCurrentVoteToNumber(currentVote) + 5
          );
      }
    },
  });

  const quantityOfVoteChek = useMemo(() => {
    if (!initialVote && currentVote) {
      return quantityOfVote + 1;
    }

    if (initialVote && typeof currentVote === "undefined") {
      return quantityOfVote - 1;
    }

    return quantityOfVote;
  }, [currentVote, initialVote, quantityOfVote]);

  const amount = useMemo((): number => {
    if (quantityOfVote === 0 && !currentVote) {
      return votesAmt;
    }

    if (quantityOfVote === 1 && !currentVote) {
      return 0;
    }

    const result = votesAmt / quantityOfVoteChek;

    return parseFloat(result.toFixed(1));
  }, [currentVote, quantityOfVote, quantityOfVoteChek, votesAmt]);

  return (
    <div className="flex items-center gap-16px">
      <div className="w-[30px] flex justify-center">
        <Typo tag="h3" text={amount} />
      </div>
      {votes.map((vote, idx) => (
        <button key={vote} onClick={() => addVote(vote)}>
          <Icon
            icon="star"
            size={24}
            color={amount >= idx + 1 ? "#d09e23" : "#ccc"}
            fill={amount >= idx + 1 ? "#fff" : "transparent"}
          />
        </button>
      ))}
    </div>
  );
};

export default ProductVoteClient;
