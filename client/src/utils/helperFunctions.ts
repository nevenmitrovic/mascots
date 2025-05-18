import {
  ICreateEvent,
  IEventDocument,
  IEventFormType,
  IEventFormTypeDocument,
  type IEvent,
} from "types/eventTypes";
import { type LocationDocument } from "types/locationTypes";
import { type MascotDocument } from "types/mascotTypes";
import { type AnimatorDocument } from "types/animatorsTypes";

import dayjs from "dayjs";
import { EventSchemaType } from "validations/eventSchema";

type AnimatorSelectProps =
  | LocationDocument[]
  | MascotDocument[]
  | AnimatorDocument[];

//function to map data to display select input for create/edit event form
export const mapSelectedData = (data: AnimatorSelectProps) => {
  return data.map((item) => ({
    label: "name" in item ? item.name : item.username,
    value: item._id,
  }));
};
//function to map data to display in location select input for create/edit event form
//nova lokacija is added in case we want to add new location for the event which is not
//used often and it will not be saved in DB as such
export const mapSelectLocationData = (data: LocationDocument[]) => {
  const customLocation = { label: "Nova lokacija", value: "none" };
  const locationSelectData = data.map((item) => ({
    label: item.name,
    value: { link: item.location, address: item.address },
  }));
  return [customLocation, ...locationSelectData];
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

//getting current date
export const getMonthYearDetails = (initialDate: dayjs.Dayjs) => {
  const month = initialDate.format("MM");
  const year = initialDate.format("YYYY");
  const date = initialDate.format("DD.MM");
  const formDate = initialDate.format("YYYY-MM-DD");
  const time = initialDate.format("HH:mm");
  return { month, year, date, time, formDate };
};

export const formatPrice = (price: number) => {
  return Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(Number(price));
};

export const getNewMonthAndYear = (prevData, increment) => {
  const { month, year } = prevData;

  let newMonth = Number(month) + increment;
  let newYear = Number(year);

  if (newMonth > 12) {
    newMonth = 1;
    newYear += 1;
  }
  if (newMonth < 1) {
    newMonth = 12;
    newYear -= 1;
  }
  const updatedMonth = newMonth.toString().padStart(2, "0");
  const updatedYear = newYear.toString();

  return { month: updatedMonth, year: updatedYear };
};

//make path for fetching
export const createPath = (data: string[]) => {
  const params = data.join("/");
  return params;
};

//format data to create or edit event

export const formatEventData = (data: IEventFormType): ICreateEvent => {
  const {
    name,
    phone,
    social,
    location,
    customLocationAddress,
    customLocationLink,
    ...restData
  } = data;
  let newLocation;
  if (location[0] === "none") {
    newLocation = {
      link: customLocationLink ?? "",
      address: customLocationAddress ?? "",
    };
  } else {
    newLocation = location[0];
  }
  const organizer = { name, phone: String(phone), social: social[0] };
  const formatedData = {
    ...restData,
    organizer,
    location: newLocation,
    collector: Array(),
  };
  return formatedData;
};

export const formatDataForEdit = (data: IEvent): IEventFormType => {
  const { date, price, animators, organizer, mascots, location } = data;
  const { time, formDate } = getMonthYearDetails(dayjs(date));
  const eventEditData = {
    social: [organizer.social],
    mascots: mascots.map((mascot) => mascot._id),
    animators: animators.map((animator) => animator._id),
    date: formDate,
    time,
    location: [location],
    price: String(price),
    title: data.title,
    name: organizer.name,
    phone: organizer.phone,
  };
  return eventEditData;
};
