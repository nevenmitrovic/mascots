import { BaseError } from "errors/base.error";

export class HttpError extends BaseError {
  constructor(message: string, name: string, statusCode: number) {
    super(message, name, statusCode, true);
  }
}
