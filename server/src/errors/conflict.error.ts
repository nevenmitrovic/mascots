import { HttpError } from "errors/http.error";

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, "ConflictError", 409);
  }
}
