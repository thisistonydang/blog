import type { APIRoute } from "astro";

import { sql } from "@lib/db/sql";
import { string_to_seconds } from "../_lib/time/string-to-seconds";

export const GET: APIRoute = async ({ params }) => {
  const { run_date } = params as { run_date: string };

  const relay_run =
    await sql`SELECT * FROM relay_run WHERE run_date = ${run_date}`;
  const relay_run_location_id = relay_run[0]?.relay_run_location_id;

  const runs = await sql`
    SELECT DISTINCT name FROM relay_run WHERE run_date = ${run_date}
  `;
  const names = runs.map((run) => run.name);

  const data = [];

  for (const name of names) {
    const runner = [];

    const runs = await sql`
      SELECT DISTINCT run_date FROM relay_run
      WHERE run_date <= ${run_date}::date
      AND relay_run_location_id = ${relay_run_location_id}
      AND name = ${name}
    `;
    const dates = runs.map((run) => run.run_date);

    for (const date of dates) {
      const runs = await sql`
        SELECT * FROM relay_run
        WHERE run_date = ${date.toISOString().split("T")[0]}
        AND name = ${name}
      `;
      const times = runs.map((run) => string_to_seconds(run.time));

      const data_point = {
        date: date.toISOString(),
        name: name,
        pace: Math.min(...times) / runs[0]?.leg_distance,
      };
      runner.push(data_point);
    }

    if (runner.length > 1) {
      data.push(runner);
    }
  }

  data.sort((a, b) => (b.at(-1)?.pace as number) - (a.at(-1)?.pace as number));
  return { body: JSON.stringify(data) };
};

export async function getStaticPaths() {
  const runs = await sql`SELECT DISTINCT run_date FROM relay_run`;
  return runs.map((run) => ({
    params: { run_date: run.run_date.toISOString().split("T")[0] },
  }));
}
