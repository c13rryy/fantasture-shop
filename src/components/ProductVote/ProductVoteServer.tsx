import { getAuthSession } from "@/lib/auth";
import { Product, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import ProductVoteClient from "./ProductVoteClient";

//гибридный подход -> либо немедленно загружаем либо с suspense

interface ProductVoteServerProps {
  productId: string;
  initialVotesAmt?: number;
  quantityOfVote?: number;
  initialVote?: Vote["type"] | null;
  getData?: () => Promise<(Product & { votes: Vote[] }) | null>;
}

const ProductVoteServer = async ({
  productId,
  initialVotesAmt,
  initialVote,
  getData,
  quantityOfVote,
}: ProductVoteServerProps) => {
  const session = await getAuthSession();

  let _votesAmt: number = 0;
  let _currentVote: Vote["type"] | null | undefined = undefined;
  let _quantityOfVote: number = 0;

  if (getData) {
    const product = await getData();
    if (!product) return notFound();

    _votesAmt = product.votes.reduce((acc, vote) => {
      if (vote.type === "ACTIVE_ONE") return acc + 1;
      if (vote.type === "ACTIVE_TWO") return acc + 2;
      if (vote.type === "ACTIVE_THREE") return acc + 3;
      if (vote.type === "ACTIVE_FOUR") return acc + 4;
      if (vote.type === "ACTIVE_FIVE") return acc + 5;

      return acc;
    }, 0);

    _currentVote = product.votes.find(vote => vote.userId === session?.user.id)
      ?.type;

    _quantityOfVote = product.votes.length;
  } else {
    _votesAmt = initialVotesAmt!;
    _currentVote = initialVote!;
    _quantityOfVote = quantityOfVote!;
  }
  return (
    <ProductVoteClient
      productId={productId}
      initialVotesAmt={_votesAmt}
      initialVote={_currentVote}
      quantityOfVote={_quantityOfVote}
    />
  );
};

export default ProductVoteServer;
