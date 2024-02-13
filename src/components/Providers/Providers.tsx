"use client";

import { ModalContextProvider } from "@/store/modal-store";
import { CartContextProvider } from "@/store/cart-store";
import { NotificationContextProvider } from "@/store/notification-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NotificationContextProvider>
          <CartContextProvider>
            <ModalContextProvider>{children}</ModalContextProvider>
          </CartContextProvider>
        </NotificationContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
