import { HttpError } from "errors/http.error";

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, "InternalServerError", 500);
  }
}
