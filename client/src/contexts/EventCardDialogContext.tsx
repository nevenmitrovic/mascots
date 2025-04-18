import { createContext, useState } from "react";

type EventCardDialogContextType = {
  eventCardTuple: [boolean, string | null];
  toggleEventCardTuple: (id: string | null) => void;
};

export const EventCardDialogContext = createContext<EventCardDialogContextType>(
  {
    eventCardTuple: [false, null],
    toggleEventCardTuple: () => {},
  }
);

export const EventCardDialogProvider = ({ children }: any) => {
  const [eventCardTuple, setEventCardTuple] = useState<
    [boolean, string | null]
  >([false, null]);

  const toggleEventCardTuple = (id: string | null = null) => {
    setEventCardTuple((prev) => {
      if (prev[0]) {
        return [false, null];
      } else {
        return [true, id];
      }
    });
  };

  return (
    <EventCardDialogContext.Provider
      value={{ eventCardTuple, toggleEventCardTuple }}
    >
      {children}
    </EventCardDialogContext.Provider>
  );
};
