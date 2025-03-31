import { HttpError } from "errors/http.error";

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, "ForbiddenError", 403);
  }
}
