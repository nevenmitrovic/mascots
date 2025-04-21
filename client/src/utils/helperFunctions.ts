import { IEvent } from "../types/eventTypes";

export const defaultValues = <T>(inputs: T[]) => {
  const obj: Record<string, string | string[]> = {};
  inputs.forEach((input: any) => {
    if (input.type === "select") {
      obj[input.name] = [];
      return;
    }
    obj[input.name] = "";
  });
  return obj;
};

export function mapEventsToCalendar(events: IEvent[]) {
  return events.map((event) => {
    let color = "";
    switch (event.confirmed) {
      case "y":
        color = "green";
        break;
      case "n":
        color = "red";
        break;
      case "pending":
        color = "gray";
        break;
      default:
        color = "blue";
    }

    return {
      id: event._id,
      title: event.title,
      date: event.date,
      backgroundColor: color,
      borderColor: color,
    };
  });
}
