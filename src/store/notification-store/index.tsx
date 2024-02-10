/* eslint-disable @typescript-eslint/no-unused-vars */
import { Children, ReactNode, createContext, useMemo, useState } from "react";

interface NotifyProps {
  open: boolean;
  action: ActionType;
}

interface ContextProps {
  notification: NotifyProps;
  toggle: (value: ActionType, open: boolean) => void;
}

type ActionType = "add" | "delete" | null;

export const NotificationContext = createContext<ContextProps>({
  notification: {
    action: null,
    open: false,
  },
  toggle: value => {},
});

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] = useState<{
    open: boolean;
    action: ActionType;
  }>({
    open: false,
    action: null,
  });

  const toggle = (value: ActionType, open: boolean) => {
    setNotification({
      open,
      action: value,
    });
  };
  const ctxValue = useMemo(
    () => ({
      notification,
      toggle,
    }),
    [notification]
  );

  return (
    <NotificationContext.Provider value={ctxValue}>
      {children}
    </NotificationContext.Provider>
  );
}
