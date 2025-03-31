import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import { env } from "config/env";
import { errorMiddleware } from "middlewares/error.middleware";

import { HttpError } from "errors/http.error";

class App {
  private app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  private initializeErrorHandling() {
    this.app.use(
      (err: HttpError, req: Request, res: Response, _next: NextFunction) => {
        errorMiddleware(err, req, res, _next);
      }
    );
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan("combined"));
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(env.PORT, () => {
      console.log(`Listening on port: ${env.PORT}`);
    });
  }
}

export default App;
