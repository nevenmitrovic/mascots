import { DatabaseError } from "errors/database.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";

import { MongoServerError } from "mongodb";
import dayjs from "dayjs";

export const checkForErrors = (error: unknown) => {
  if (error instanceof MongoServerError && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    const value = Object.values(error.keyValue)[0];
    throw new UniqueConstraintError(field, value);
  }
  if (error instanceof MongoServerError) {
    throw new DatabaseError("failed to create: MongooseError");
  }

  throw new Error("unknown error in repository");
};

export function getRangeForDates(year: number, month: number) {
  const from = dayjs(`${year}-${month}-01`).toDate();
  const to = dayjs(from).add(1, "month");

  return { from, to };
}
