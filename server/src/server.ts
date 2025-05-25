import App from "app";

import { AnimatorController } from "animators/animator.controller";
import { EventController } from "events/event.controller";
import { LocationController } from "locations/location.controller";
import { MascotController } from "mascots/mascot.controller";
import { AuthController } from "auth/auth.controller";
import { ReportController } from "reports/report.controller";

const app = new App([
  new LocationController(),
  new MascotController(),
  new AnimatorController(),
  new EventController(),
  new AuthController(),
  new ReportController(),
]);
app.listen();
