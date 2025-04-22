import { AnimatorController } from "animators/animator.controller";
import App from "app";
import { LocationController } from "locations/location.controller";
import { MascotController } from "mascots/mascot.controller";

const app = new App([
  new LocationController(),
  new MascotController(),
  new AnimatorController(),
]);
app.listen();
