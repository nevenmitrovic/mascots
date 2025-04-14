export type Location = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: string;
};

export type LocationFormValues = Omit<Location, "_id">;
