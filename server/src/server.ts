import { AnimatorController } from "animators/animator.controller";
import App from "app";
import { EventController } from "events/event.controller";
import { LocationController } from "locations/location.controller";
import { MascotController } from "mascots/mascot.controller";

const app = new App([
  new LocationController(),
  new MascotController(),
  new AnimatorController(),
  new EventController(),
]);
app.listen();
