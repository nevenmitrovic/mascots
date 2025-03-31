import express from "express";
import morgan from "morgan";

import { env } from "config/env";

class App {
  private app = express();

  constructor() {
    this.initializeMiddlewares();
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
