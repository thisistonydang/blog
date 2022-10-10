import type { Stripe } from "stripe";

import { supabase } from "../../../lib/db/supabase";
import { construct_event } from "../../../lib/stripe/construct-event";
import type { Env } from "@lib/types/env";

import { handle_one_time_donation } from "./_handlers/handle-one-time-donation";

/** Listens for and handles events from Stripe. */
export default async function (request: Request, env: Env): Promise<Response> {
  const event = await construct_event(request, env);
  if (event) {
    // Check if duplicate event
    let { error, data } = await supabase(env)
      .from("stripe_event")
      .select("*")
      .match({ stripe_event_id: event.id });
    if (error) return new Response(null, { status: 500 });
    if (data?.length) return new Response(null, { status: 204 });

    // Record non-duplicate event
    ({ error, data } = await supabase(env)
      .from("stripe_event")
      .insert([{ stripe_event_id: event.id }]));
    if (error) return new Response("invalid event id", { status: 400 });

    // Handle checkout.session.completed events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (
        session.success_url ===
        `${env.BLOG_URL}/support/successful-one-time-donation`
      ) {
        const error = await handle_one_time_donation(session, env);
        if (error) {
          const res = await supabase(env)
            .from("stripe_event")
            .delete()
            .match({ stripe_event_id: event.id });
          if (res.error) return new Response(null, { status: 500 });
          return new Response("invalid session object", { status: 400 });
        }
        return new Response(null, { status: 201 });
      }
    }
    return new Response(null, { status: 204 });
  }
  return new Response("invalid signature or request", { status: 400 });
}
