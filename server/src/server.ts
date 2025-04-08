import App from "app";
import { LocationController } from "locations/location.controller";

const app = new App([new LocationController()]);
app.listen();
