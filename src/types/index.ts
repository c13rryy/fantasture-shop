import { IAvailableIcons } from "@/assets/icons";
import { Subscription, Vote } from "@prisma/client";

export interface LinksProps {
  value: string;
  href: string;
}

export interface BannerCardProps {
  title: string;
  description: string;
  iconName: IAvailableIcons;
}

export interface FilterButtonProps {
  /* iconName: IAvailableIcons; */
  title: string;
}

export type ProductType = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color?: string;
  size?: string;
  price: string;
  categoryId?: string;
  sizeIds?: string[];
  colorIds?: string[];
  discount: string | null;
  createdAt?: Date;
  updatedAt?: Date;
} & {
  quantity?: number;
  subscribers?: Subscription[];
  votes?: Vote[];
};
