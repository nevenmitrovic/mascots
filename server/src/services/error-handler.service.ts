import { HttpError } from "errors/http.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";
import { ConflictError } from "errors/conflict.error";

export class ErrorHandlerService {
  handleError(err: Error): HttpError {
    if (err instanceof UniqueConstraintError) {
      return new ConflictError(err.message);
    }

    console.error("unhandled error:", err);
    return new HttpError(
      err.message || "an unexpected error occurred",
      err.name,
      500
    );
  }
}
