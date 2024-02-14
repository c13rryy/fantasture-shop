import { PAGE_SIZE } from "@/constants";
import { db } from "@/lib/db";
import { ProductData } from "@/types/db";
import { revalidatePath } from "next/cache";

export interface FeedResult {
  data: ProductData[] | [];
  metadata: {
    hasNextPage: boolean;
    totalPages: number;
  };
  error?: string;
}

export const fetchFeed = async ({
  take = PAGE_SIZE,
  skip = 0,
  categoryName,
  page,
}: {
  take: number;
  skip: number;
  categoryName: string;
  page: number;
}): Promise<FeedResult> => {
  if (categoryName === "") {
    return {
      data: [],
      metadata: {
        hasNextPage: false,
        totalPages: 0,
      },
    };
  }

  try {
    if (categoryName === "Raiting") {
      const result = await db.product.findMany({
        take,
        skip,
        orderBy: {
          raiting: "desc",
        },
        include: {
          votes: true,
          subscribers: true,
        },
      });

      const total = await db.product.count();

      const totalPages = Math.ceil((total ?? 0) / take);

      if (page > totalPages) {
        return {
          data: [],
          metadata: {
            hasNextPage: false,
            totalPages: 0,
          },
          error: "Page doesn't exists",
        };
      }

      revalidatePath("/shop");
      return {
        data: result,
        metadata: {
          hasNextPage: skip + take < (total ?? 0),
          totalPages,
        },
      };
    }

    const categoryData = await db.category.findFirst({
      where: {
        name: categoryName,
      },
      include: {
        products: {
          take,
          skip,
          include: {
            votes: true,
            subscribers: true,
          },
        },
      },
    });

    if (!categoryData) {
      return {
        data: [],
        metadata: {
          hasNextPage: false,
          totalPages: 0,
        },
        error: "Non-existent category",
      };
    }

    if (categoryData) {
      const allCategoryProduct = await db.category.findFirst({
        where: {
          name: categoryName,
        },
        include: {
          products: {
            include: {
              votes: true,
              subscribers: true,
            },
          },
        },
      });

      const total = allCategoryProduct?.products.length;

      const totalPages = Math.ceil((total ?? 0) / take);

      if (page > totalPages) {
        return {
          data: [],
          metadata: {
            hasNextPage: false,
            totalPages: 0,
          },
          error: "Filter page doesn't exists",
        };
      }

      revalidatePath("/shop");
      return {
        data: categoryData?.products,
        metadata: {
          hasNextPage: skip + take < (total ?? 0),
          totalPages: Math.ceil((total ?? 0) / take),
        },
      };
    }
    return {
      data: [],
      metadata: {
        hasNextPage: false,
        totalPages: 0,
      },
    };
  } catch (error) {
    return {
      data: [],
      metadata: {
        hasNextPage: false,
        totalPages: 0,
      },
      error: "Something went wrong",
    };
  }
};
