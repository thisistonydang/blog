import { Router } from "itty-router";

import api_subscribe from "./routes/api/subscribe";
import support_create_stripe_checkout from "./routes/support/create-stripe-checkout";
import support_donations from "./routes/support/donations";
import support_webhook from "./routes/support/webhook";

const router = Router();
router.post("/api/subscribe", api_subscribe);
router.post("/support/create-stripe-checkout", support_create_stripe_checkout);
router.get("/support/donations", support_donations);
router.post("/support/webhook", support_webhook);

export default { fetch: router.handle };
