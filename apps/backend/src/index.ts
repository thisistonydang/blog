import { Router } from "itty-router";

import api_subscribe from "./routes/api/subscribe";

const router = Router();
router.post("/api/subscribe", api_subscribe);

export default { fetch: router.handle };
