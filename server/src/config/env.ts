import { config } from "dotenv";
import { cleanEnv, port, url } from "envalid";

config({ path: ".env" });

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGODB_URI_DEVELOPMENT: url(),
});
