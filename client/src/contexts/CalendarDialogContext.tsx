import { createContext } from "react";
import { useToggle } from "../hooks/useToggle";

type CalendarDialogContextType = {
  open: boolean;
  toggleDialog: () => void;
};

export const CalendarDialogContext = createContext<CalendarDialogContextType>({
  open: false,
  toggleDialog: () => {},
});

export const DialogProvider = ({ children }: any) => {
  const [open, toggleDialog] = useToggle(false);

  return (
    <CalendarDialogContext.Provider value={{ open, toggleDialog }}>
      {children}
    </CalendarDialogContext.Provider>
  );
};
