import { createContext } from "react";

import { useToggle } from "hooks/global/useToggle";

type CalendarFormDialogContextType = {
  open: boolean;
  toggleDialog: () => void;
};

export const CalendarFormDialogContext =
  createContext<CalendarFormDialogContextType>({
    open: false,
    toggleDialog: () => {},
  });

export const CalendarFormDialogProvider = ({ children }: any) => {
  const [open, toggleDialog] = useToggle(false);

  return (
    <CalendarFormDialogContext.Provider value={{ open, toggleDialog }}>
      {children}
    </CalendarFormDialogContext.Provider>
  );
};
