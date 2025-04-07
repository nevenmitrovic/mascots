import { HttpError } from "errors/http.error";
import { DatabaseError } from "errors/database.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";

export class ErrorHandlerService {
  handleError(err: Error): HttpError {
    if (err instanceof UniqueConstraintError) {
      return new HttpError(err.message, err.name, 409);
    }

    if (err instanceof DatabaseError) {
      return new HttpError(err.message, err.name, 500);
    }

    console.error("unhandled error:", err);
    return new HttpError(
      err.message || "an unexpected error occurred",
      err.name,
      500
    );
  }
}
