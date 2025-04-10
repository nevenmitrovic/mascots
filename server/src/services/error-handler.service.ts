import { HttpError } from "errors/http.error";
import { DatabaseError } from "errors/database.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";
import { BadRequestError } from "errors/bad-request.error";
import { NotFoundError } from "errors/not-found.error";
import { ConflictError } from "errors/conflict.error";
import { ForbiddenError } from "errors/forbidden.error";
import { UnauthorizedError } from "errors/unauthorized.error";

export class ErrorHandlerService {
  handleError(err: Error): HttpError {
    if (err instanceof UniqueConstraintError) {
      return new ConflictError(err.message);
    }

    // if (err instanceof DatabaseError) {
    //   return new HttpError(err.message, err.name, 500);
    // }

    // if (err instanceof BadRequestError) {
    //   return new HttpError(err.message, err.name, err.statusCode);
    // }

    // if (err instanceof NotFoundError) {
    //   return new HttpError(err.message, err.name, err.statusCode);
    // }

    // if (err instanceof ConflictError) {
    //   return new HttpError(err.message, err.name, err.statusCode);
    // }

    // if (err instanceof ForbiddenError) {
    //   return new HttpError(err.message, err.name, err.statusCode);
    // }

    // if (err instanceof UnauthorizedError) {
    //   return new HttpError(err.message, err.name, err.statusCode);
    // }

    console.error("unhandled error:", err);
    return new HttpError(
      err.message || "an unexpected error occurred",
      err.name,
      500
    );
  }
}
