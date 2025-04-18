import {
  ILocation,
  ILocationDocument,
  ILocationMessageResponse,
} from "../src/locations/location.model";

const mockDate = new Date();
export const mockLocations: ILocationDocument[] = [
  {
    _id: "67f5237dcaf56ff295efd4a9",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
    name: "Mock1",
    phone: "+381656196083",
    address: "Kralja Petra 41",
    createdAt: mockDate,
  },
  {
    _id: "67f53c68bf7547741b0e2eef",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipT",
    name: "Mock2",
    phone: "+381656196083",
    address: "Kralja Petra 41",
    createdAt: mockDate,
  },
  {
    _id: "67f55bcc755956e39523251a",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTqSSSSS",
    name: "Mock3",
    phone: "+381656196083",
    address: "Kralja Petra 41",
    createdAt: mockDate,
  },
  {
    _id: "67f5639fa26f52b544484236",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTqSSSS123123S",
    name: "Mock4",
    phone: "+381656196083",
    address: "Kralja Petra 41",
    createdAt: mockDate,
  },
];
export const mockLocation: ILocationDocument = {
  _id: "67f5237dcaf56ff295efd4a9",
  location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
  name: "Mock1",
  phone: "+381656196083",
  address: "Kralja Petra 41",
  createdAt: mockDate,
};
export const mockDeleteMessageResponse: ILocationMessageResponse = {
  message: "location deleted successfully",
  data: {
    _id: "67f5237dcaf56ff295efd4a9",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
    name: "Mock1",
    phone: "+381656196083",
    address: "Kralja Petra 41",
    createdAt: mockDate,
  },
};
export const updateData: Partial<ILocation> = {
  name: "Updated Location",
  address: "Updated Address",
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
    createdAt: mockDate,
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
    createdAt: mockDate,
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
