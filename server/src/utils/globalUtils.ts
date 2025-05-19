import { DatabaseError } from "errors/database.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";
import { BaseError } from "errors/base.error";

import {
  ICreateEvent,
  ICreateEventClient,
  IUpdateEvent,
  IUpdateEventClient,
} from "events/event.model";

import { MongoServerError } from "mongodb";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import bcrypt from "bcryptjs";

dayjs.extend(utc);
dayjs.extend(timezone);

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

export function getDateFromData(data: ICreateEventClient | IUpdateEventClient) {
  const { date, time, ...rest } = data;
  const utcDate = dayjs.utc(`${date} ${time}`).toDate();
  const repositoryData: ICreateEvent | IUpdateEvent = {
    ...rest,
    date: utcDate,
  };

  return repositoryData;
}

export async function hashPassword(password: string): Promise<string> {
  const SALT = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
  } catch (error) {
    throw new BaseError(
      "failed to hash password",
      "CriptographyError",
      500,
      true
    );
  }
}
