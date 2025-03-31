import { HttpError } from "errors/http.error";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, "BadRequestError", 400);
  }
}
