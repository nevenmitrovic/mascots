import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { env } from "config/env";
import { errorMiddleware } from "middlewares/error.middleware";
import { initializeDatabase } from "config/database";
import { HttpError } from "errors/http.error";
import { Controller } from "interfaces/controller.interface";

class App {
  private app = express();

  constructor(controllers: Controller[]) {
    initializeDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(helmet());
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use("/api/v1", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(
      (err: HttpError, req: Request, res: Response, _next: NextFunction) => {
        errorMiddleware(err, req, res, _next);
      }
    );
  }

  listen() {
    this.app.listen(env.PORT, () => {
      console.log(`Listening on port: ${env.PORT}`);
    });
  }
}

export default App;
