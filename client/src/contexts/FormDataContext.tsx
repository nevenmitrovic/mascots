import useItemToEdit, { ItemToEdit } from "hooks/global/useItemToEdit";
import { useToggle } from "hooks/global/useToggle";
import { createContext } from "react";
import {
  type IEventFormType,
  type IEventFormTypeDocument,
} from "types/eventTypes";

type FormDataContextType = {
  isEditing: boolean;
  setIsEditing: () => void;
  itemToEdit: ItemToEdit<IEventFormType> | null;
  setItemEdit: (data: IEventFormTypeDocument | null) => void;
};

export const FormDataContext = createContext<FormDataContextType>({
  isEditing: false,
  setIsEditing: () => {},
  itemToEdit: null,
  setItemEdit: () => {},
});

export const FormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { itemToEdit, setItemEdit } = useItemToEdit<IEventFormTypeDocument>();
  const [isEditing, setIsEditing] = useToggle(false);

  return (
    <FormDataContext.Provider
      value={{
        isEditing,
        setIsEditing,
        itemToEdit,
        setItemEdit,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
