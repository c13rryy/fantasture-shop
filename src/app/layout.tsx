import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Providers";
import { getAuthSession } from "@/lib/auth";
import SubscribeModal from "@/components/Modals/SubscribeModal/SubscribeModal";
import { db } from "@/lib/db";
import { Toaster } from "react-hot-toast";
import SearchModal from "@/components/Modals/SearchModal/SearchModal";
import CartModal from "@/components/Modals/CartModal/CartModal";
import NotificationModal from "@/components/ui/notification-modal/notification-modal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
  description: "It is home page",
  openGraph: {
    title: "Our shop",
    description: "Some information about shop",
    images: [
      {
        url: "https://res.cloudinary.com/drckql7g9/image/upload/v1708117299/bbkkanxgti9ff8js5w1i.webp",
        width: 300,
        height: 300,
      },
    ],
    url: "https://fantasture-shop.vercel.app",
    type: "website",
    siteName: "Fantasture",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  const subData = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      subscriptions: {
        include: {
          product: true,
        },
      },
    },
  });

  const products = subData?.subscriptions.map(el => el.product);

  return (
    <html lang="en" className="w-full">
      <Providers>
        <body className={`relative h-full antialiased ${poppins.className}`}>
          <Toaster position="top-center" />
          <div id="modal" />
          <div id="notification-modal" />
          <div id="product-modal" />
          <Header session={session} />
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1">{children}</div>
          </main>
          <Footer />
          <CartModal />
          {products && <SubscribeModal subData={products} />}
          <SearchModal />
          <NotificationModal />
        </body>
      </Providers>
    </html>
  );
}
