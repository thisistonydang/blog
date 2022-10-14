import type { APIRoute } from "astro";

import { sql } from "@lib/db/sql";

export const get: APIRoute = async ({ params }) => {
  const { run_date } = params as { run_date: string };
  const runs = await sql`
    SELECT notes FROM relay_run WHERE run_date = ${run_date} ORDER BY position
  `;
  const notes = runs.map((run) => run.notes).filter((note) => note);
  return { body: JSON.stringify(notes) };
};

export async function getStaticPaths() {
  const runs = await sql`SELECT DISTINCT run_date FROM relay_run`;
  return runs.map((run) => ({
    params: { run_date: run.run_date.toISOString().split("T")[0] },
  }));
}
