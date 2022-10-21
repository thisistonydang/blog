import { Router } from "itty-router";

import api_subscribe from "./routes/api/subscribe";
import list_unsubscribe from "./routes/list/unsubscribe";
import list_verify from "./routes/list/verify";
import support_create_stripe_checkout from "./routes/support/create-stripe-checkout";
import support_donations from "./routes/support/donations";
import webhooks_stripe from "./routes/webhooks/stripe";

const router = Router();
router.post("/api/subscribe", api_subscribe);
router.get("/list/unsubscribe", list_unsubscribe);
router.get("/list/verify", list_verify);
router.post("/support/create-stripe-checkout", support_create_stripe_checkout);
router.get("/support/donations", support_donations);
router.post("/webhooks/stripe", webhooks_stripe);

export default { fetch: router.handle };
