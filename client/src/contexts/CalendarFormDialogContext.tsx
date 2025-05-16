import { createContext } from "react";
import { useEffect, useContext } from "react";

import { useToggle } from "hooks/global/useToggle";

import { FormDataContext } from "./FormDataContext";

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
  const { setFormData } = useContext(FormDataContext);
  const [open, toggleDialog] = useToggle(false);

  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        date: "",
        time: "",
        location: [],
        mascots: [],
        animators: [],
        price: "",
        confirmed: "",
        collector: "",
        customLocationAddress: "",
        customLocationLink: "",
        name: "",
        phone: "",
        social: [],
      });
    }
  }, [open]);

  return (
    <CalendarFormDialogContext.Provider value={{ open, toggleDialog }}>
      {children}
    </CalendarFormDialogContext.Provider>
  );
};
