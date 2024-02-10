import { IAvailableIcons } from "@/assets/icons";

interface ContactsProps {
  icon: IAvailableIcons;
  title: string;
  contactDataFirst: string;
  contactDataSecond?: string;
  href?: string;
}

export const CONTACTS: Array<ContactsProps> = [
  {
    title: "AddressAddress",
    icon: "location",
    contactDataFirst: "236 5th SE Avenue, Bangalore 560000, India ",
  },
  {
    title: "Phone",
    icon: "phone",
    contactDataFirst: "Mobile: +(91) 546-6789-123",
    contactDataSecond: "Hotline: +(91) 456-6789-321",
  },
  {
    title: "Working Time",
    icon: "clock",
    contactDataFirst: "Monday-Friday: 9:00 - 22:00",
    contactDataSecond: "Saturday-Sunday: 9:00 - 21:00",
  },
];
