import { createContext } from "react";
import { useEffect, useContext } from "react";

import { useToggle } from "hooks/global/useToggle";

import { FormDataContext } from "./FormDataContext";

type CalendarFormDialogContextType = {
  open: boolean;
  handleDialogClose: () => void;
   toggleDialog: () => void,
};

export const CalendarFormDialogContext =
  createContext<CalendarFormDialogContextType>({
    open: false,
    handleDialogClose: () => {},
    toggleDialog: () => {},
  });

export const CalendarFormDialogProvider = ({ children }: any) => {
  const [open, toggleDialog] = useToggle(false);
  const { setIsEditing, setItemEdit } = useContext(FormDataContext);
  const handleDialogClose = () => {
    toggleDialog();
    setIsEditing();
    setItemEdit(null);
  };

  return (
    <CalendarFormDialogContext.Provider
      value={{ open, handleDialogClose, toggleDialog }}
    >
      {children}
    </CalendarFormDialogContext.Provider>
  );
};
