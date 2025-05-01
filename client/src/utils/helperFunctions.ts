import { type IEvent } from "types/eventTypes";
import { type LocationDocument } from "types/locationTypes";
import { type MascotDocument } from "types/mascotTypes";
import { type AnimatorDocument } from "types/animatorsTypes";

type AnimatorSelectProps =
  | LocationDocument[]
  | MascotDocument[]
  | AnimatorDocument[];

//function to map data to display select input for create/edit event form 
export const mapSelectedData = (data: AnimatorSelectProps) => {
  return data.map((item) => ({
    title: "name" in item ? item.name : item.username,
    value: item._id,
  }));
};

//default values for the form
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
      case "confirmed":
        color = "green";
        break;
      case "rejected":
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

