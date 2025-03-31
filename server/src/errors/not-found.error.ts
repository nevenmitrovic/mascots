import { HttpError } from "errors/http.error";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, "NotFoundError", 404);
  }
}
