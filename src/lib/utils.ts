import { OrderProductData } from "@/types";
import { Subscription, VoteType } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";

export const hasSubscription = (
  userId: string | undefined,
  productId: string,
  subscribers: Subscription[] | undefined
): boolean | null => {
  if (userId && subscribers) {
    return subscribers.some(
      sub => sub.userId === userId && sub.productId === productId
    );
  }

  return null;
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const convertCurrentVoteToNumber = (
  type: VoteType | undefined | null
) => {
  if (type) {
    if (type === "ACTIVE_ONE") return 1;
    else if (type === "ACTIVE_TWO") return 2;
    else if (type === "ACTIVE_THREE") return 3;
    else if (type === "ACTIVE_FOUR") return 4;
    else return 5;
  }

  return 0;
};

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      formatDistance,
    },
  });
}

export function calculateDiscountPrice(price: string, discount: string) {
  return Math.round((parseInt(price) * parseInt(discount)) / 100);
}

export const validateEmail = (email: unknown) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const productQuantity = (
  id: string,
  productData: Array<OrderProductData>
) => {
  if (productData) {
    const currentProduct = productData.findIndex(el => el.productId === id);

    return productData[currentProduct].quantity;
  }

  return 0;
};
