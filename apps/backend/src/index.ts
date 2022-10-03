import { Router } from "itty-router";

import api_subscribe from "./routes/api/subscribe";
import support_donations from "./routes/support/donations";

const router = Router();
router.post("/api/subscribe", api_subscribe);
router.get("/support/donations", support_donations);

export default { fetch: router.handle };
