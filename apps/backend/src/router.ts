import { Router } from "itty-router";

// Microservices
import microservices_mailer_send from "./routes/microservices/mailer/send";
import microservices_yjs_merge from "./routes/microservices/yjs/merge";

// Blog
import list_subscribe from "./routes/list/subscribe";
import list_unsubscribe from "./routes/list/unsubscribe";
import list_verify from "./routes/list/verify";
import sandbox from "./routes/sandbox";
import support_create_stripe_checkout from "./routes/support/create-stripe-checkout";
import support_donations from "./routes/support/donations";
import webhooks_stripe from "./routes/webhooks/stripe";

const router = Router();

// Microservices
router.post("/microservices/mailer/send", microservices_mailer_send);
router.post("/microservices/yjs/merge", microservices_yjs_merge);

// Blog
router.post("/list/subscribe", list_subscribe);
router.get("/list/unsubscribe", list_unsubscribe);
router.get("/list/verify", list_verify);
router.get("/sandbox", sandbox);
router.post("/support/create-stripe-checkout", support_create_stripe_checkout);
router.get("/support/donations", support_donations);
router.post("/webhooks/stripe", webhooks_stripe);
router.all("*", () => new Response("Not Found.", { status: 404 }));

export default { fetch: router.handle };
