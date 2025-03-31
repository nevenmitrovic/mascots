import { Router } from "express";

export abstract class Controller {
  router = Router();

  constructor(protected path: string) {
    this.path = path;
  }

  protected abstract initializeRoutes(): void;
}
