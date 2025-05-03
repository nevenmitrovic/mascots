import { IAnimator, IAnimatorDocument } from "animators/animator.model";
import {
  ILocation,
  ILocationDocument,
  ILocationMessageResponse,
} from "../src/locations/location.model";
import {
  IEvent,
  IEventDocument,
  ICreateEvent,
  ICreatedEvent,
} from "events/event.model";

export const mockLocations: ILocationDocument[] = [
  {
    _id: "67f5237dcaf56ff295efd4a9",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
    name: "Mock1",
    phone: "+381656196083",
    address: "Kralja Petra 41",
  },
  {
    _id: "67f53c68bf7547741b0e2eef",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipT",
    name: "Mock2",
    phone: "+381656196083",
    address: "Kralja Petra 41",
  },
  {
    _id: "67f55bcc755956e39523251a",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTqSSSSS",
    name: "Mock3",
    phone: "+381656196083",
    address: "Kralja Petra 41",
  },
  {
    _id: "67f5639fa26f52b544484236",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTqSSSS123123S",
    name: "Mock4",
    phone: "+381656196083",
    address: "Kralja Petra 41",
  },
];
export const mockLocation: ILocationDocument = {
  _id: "67f5237dcaf56ff295efd4a9",
  location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
  name: "Mock1",
  phone: "+381656196083",
  address: "Kralja Petra 41",
};
export const mockDeleteMessageResponse: ILocationMessageResponse = {
  message: "location deleted successfully",
  data: {
    _id: "67f5237dcaf56ff295efd4a9",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
    name: "Mock1",
    phone: "+381656196083",
    address: "Kralja Petra 41",
  },
};
export const uniqueData = {
  location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
};
export const updatedLocation: ILocationMessageResponse = {
  message: "location updated successfully",
  data: {
    _id: "67f5237dcaf56ff295efd4a9",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
    name: "Updated Location",
    phone: "+381656196083",
    address: "Updated Address",
  },
};
export const newLocation: ILocation = {
  location: "https://maps.app.goo.gl/new",
  name: "New Location",
  phone: "+381656196000",
  address: "New Address 123",
};

export const createdLocation: ILocationMessageResponse = {
  message: "location created successfully",
  data: {
    ...newLocation,
    _id: "67f5999dcaf56ff295efd4a9",
  },
};

export const newLocationBadRequest: ILocation = {
  location: "https://maps.app.gl/new",
  name: "New Location",
  phone: "+381656196000",
  address: "New Address 123",
};

export const newLocationBadRequestName: Omit<ILocation, "name"> = {
  location: "https://maps.app.goo.gl/new",
  phone: "+381656196000",
  address: "New Address 123",
};

export const newAnimator: IAnimator = {
  fullName: "John Doe",
  username: "johndoe",
  password: "password123",
  email: "john.doe@gmail.com",
  phone: "+381656196000",
  paycheck: 1000,
};

export const newAnimatorDocument: IAnimatorDocument = {
  _id: "67f5999dcaf56ff295efd4a9",
  fullName: "John Doe",
  username: "johndoe",
  password: "password123",
  email: "john.doe@gmail.com",
  phone: "+381656196000",
  paycheck: 1000,
};

export const newAnimatorBadRequest: IAnimator = {
  fullName: "John Doe",
  username: "jo",
  password: "password123",
  email: "john.doe@gmail.com",
  phone: "+381656196000",
  paycheck: 1000,
};

export const newEvent: ICreateEvent = {
  date: new Date("2025-05-15T14:00:00"),
  location: {
    address: "123 Main Street, Cityville",
    link: "https://maps.app.goo.gl/new",
  },
  title: "Birthday Party",
  price: 150,
  organizer: {
    name: "Sarah Johnson",
    phone: "+1234567890",
    social: "instagram",
  },
  mascots: ["5f8d0d55b54764421b710000", "5f8d0d55b54764421b710001"],
  animators: ["6e7f8a92c65875312d620000", "6e7f8a92c65875312d620001"],
  confirmed: "confirmed",
  collector: ["6e7f8a92c65875312d620000"],
};
export const createdEvent: ICreatedEvent = {
  _id: "67f5999dcaf56ff295efd4a9",
  date: new Date("2025-05-15T14:00:00"),
  location: {
    address: "123 Main Street, Cityville",
    link: "https://maps.app.goo.gl/new",
  },
  title: "Birthday Party",
  price: 150,
  organizer: {
    name: "Sarah Johnson",
    phone: "+1234567890",
    social: "instagram",
  },
  mascots: ["5f8d0d55b54764421b710000", "5f8d0d55b54764421b710001"],
  animators: ["6e7f8a92c65875312d620000", "6e7f8a92c65875312d620001"],
  confirmed: "confirmed",
  collector: ["6e7f8a92c65875312d620000"],
};

export const newEventDocs: IEventDocument[] = [
  {
    _id: "67f12345caf56ff295efd111",
    date: new Date("2025-05-15T14:00:00"),
    location: {
      address: "123 Main Street, Cityville",
      link: "https://maps.app.goo.gl/new",
    },
    price: 150,
    title: "Birthday Party",
    organizer: {
      name: "Sarah Johnson",
      phone: "+1234567890",
      social: "instagram",
    },
    mascots: [{ name: "Neven" }, { name: "Igor" }],
    animators: [{ username: "Neven" }, { username: "Igor" }],
    confirmed: "confirmed",
    collector: [{ username: "Neven" }],
  },
  {
    _id: "67f12346caf56ff295efd222",
    date: new Date("2025-05-20T10:30:00"),
    location: {
      address: "456 Park Avenue, Downtown",
      link: "https://maps.app.goo.gl/new",
    },
    price: 200,
    title: "Corporate Event",
    organizer: {
      name: "Michael Brown",
      phone: "+1987654321",
      social: "whatsapp",
    },
    mascots: [{ name: "Neven2" }, { name: "Igor2" }],
    animators: [{ username: "Neven2" }, { username: "Igor2" }],
    confirmed: "pending",
    collector: [{ username: "Neven2" }],
  },
];
