import { createContext, useState } from "react";

import { EventSchemaType } from "validations/eventSchema";

type FormDataContextType = {
  formData: EventSchemaType | undefined;
  setFormData: (data: EventSchemaType | undefined) => void;
};

export const FormDataContext = createContext<FormDataContextType>({
  formData: undefined,
  setFormData: () => {},
});

export const FormDataProvider = ({ children }: any) => {
  const [formData, setFormData] = useState<EventSchemaType | undefined>(
    undefined
  );

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
