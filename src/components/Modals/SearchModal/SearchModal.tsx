"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import Input from "@/components/ui/input/input";
import Modal from "@/components/ui/modal/modal";
import Typo from "@/components/ui/typography/typo";
import { ModalContext } from "@/store/modal-store";
import { Prisma, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import axios from "axios";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { currencyFormatter } from "@/lib/utils";

interface SearchModalProps {}

const SearchModal: FC<SearchModalProps> = ({}) => {
  const { open, toggle } = useContext(ModalContext);
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    setInput("");
  }, [pathname, open.searchModal]);

  function closeModal() {
    toggle("searchModal");
  }

  const {
    data: queryResult,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["search-query"],
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);

      return data as (Product & {
        _count: Prisma.ProductCountOutputType;
      })[];
    },
    enabled: false,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal isOpen={open.searchModal} toggle={closeModal}>
      <div className="h-[500px] overflow-y-auto custom-scroll">
        <div className="flex justify-between border-b-[1px] border-solid pb-20 items-center">
          <Typo tag="h3" text="Search products" />
          <button
            onClick={() => {
              closeModal();
              setInput("");
            }}
          >
            <Icon icon="close" size={24} />
          </button>
        </div>
        <Input
          classes="w-full"
          name="search"
          id="search"
          placeholder="Search products"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            debounceRequest();
          }}
        />

        {input.length === 0 && (
          <div className="flex justify-center items-center mt-[120px] gap-16px">
            <Icon icon="bot" size={50} />
            <Typo tag="h4" text="Search" />
          </div>
        )}

        {isFetching && (
          <div className="w-fit h-fit absolute top-[50%] left-[50%]">
            <div className="animate-spin">
              <Icon icon="loader" size={32} />
            </div>
          </div>
        )}

        {input.length > 0 && (
          <div className="mt-10">
            {isFetched && !isFetching && queryResult?.length === 0 && (
              <Typo tag="h4" text="No results found" />
            )}
            {(queryResult?.length ?? 0) > 0 ? (
              <div className="flex flex-col gap-12px">
                {queryResult?.map(product => (
                  <a
                    key={product.id}
                    className="border-t-[1px] border-solid p-10 flex items-center justify-between"
                    href={`/shop/${product.id}`}
                  >
                    <div className="flex items-center gap-8px">
                      <div className="relative w-[50px] h-[50px]">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover rounded-[4px]"
                          fill
                        />
                      </div>
                      <Typo type="mediumP" text={product.name} />
                    </div>

                    <div>
                      <Typo
                        type="mediumP"
                        text={currencyFormatter.format(parseInt(product.price))}
                        color="grey_3"
                      />
                    </div>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
