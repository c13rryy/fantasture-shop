import { Category, Product, Subscription, Vote } from "@prisma/client";

export type ExtendedProduct = Product & {
  categories: Category;
  subscribers: Subscription[];
  votes: Vote[];
};

export type FilterData = Category & {
  products: ProductData[];
};

export type ProductData = Product & {
  subscribers: Subscription[];
  votes: Vote[];
};

export type SubData = Subscription & {
  product: Product;
};
