import type { APIRoute } from "astro";

import {sql} from "@lib/db/sql";
import { string_to_seconds } from "../_lib/time/string-to-seconds";

export const GET: APIRoute = async ({ params }) => {
  const { run_date } = params as { run_date: string };
  const runs = await sql`SELECT * FROM relay_run WHERE run_date = ${run_date}`;
  const data = runs.map((run) => ({
    name: run.name,
    pace: string_to_seconds(run.time) / run.leg_distance,
  }));

  return new Response(
    JSON.stringify(data.sort((a, b) => a.pace - b.pace)), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export async function getStaticPaths() {
  const runs = await sql`SELECT DISTINCT run_date FROM relay_run`;
  return runs.map((run) => ({
    params: { run_date: run.run_date.toISOString().split("T")[0] },
  }));
}
