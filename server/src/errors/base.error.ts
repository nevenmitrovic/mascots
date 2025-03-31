export class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string,
    name: string,
    statusCode: number,
    isOperational: boolean
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
