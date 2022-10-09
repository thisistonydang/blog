import type { Stripe } from "stripe";

import { supabase } from "../../../../lib/db/supabase";
import type { Env } from "@lib/types/env";

/**
 * Insert a one time donation into database given a Stripe.Checkout.Session.
 *
 * Return an error string if unsuccessful, else return null.
 */
export async function handle_one_time_donation(
  session: Stripe.Checkout.Session,
  env: Env
): Promise<string | null> {
  const name = session.customer_details?.name?.trim().replace(/\s+/g, " ");
  const email = session.customer_details?.email?.trim();
  const display_name = name?.split(" ")[0];
  const amount = session.amount_total;
  const { error } = await supabase(env)
    .from("one_time_donation")
    .insert([{ name, email, display_name, amount }]);
  return error ? error.message : null;
}
