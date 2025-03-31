import { config } from "dotenv";
import { cleanEnv, port } from "envalid";

config({ path: ".env" });

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
});
