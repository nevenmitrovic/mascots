import { DatabaseError } from "errors/database.error";

export class UniqueConstraintError extends DatabaseError {
  field: string;
  value: any;

  constructor(field: string, value: any) {
    super(`a record with ${field} '${value}' already exists`);
    this.name = "UniqueConstraintError";
    this.field = field;
    this.value = value;
  }
}
