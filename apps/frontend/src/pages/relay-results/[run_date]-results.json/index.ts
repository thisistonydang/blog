import type { APIRoute } from "astro";

import { sql } from "@lib/db/sql";
import { string_to_seconds } from "../_lib/time/string-to-seconds";

export const get: APIRoute = async ({ params }) => {
  const { run_date } = params as { run_date: string };
  const teams =
    await sql`SELECT DISTINCT team FROM relay_run WHERE run_date = ${run_date}`;
  const team_names = teams.map((team) => team.team);

  const team_results = await Promise.all(
    team_names.map(async (team_name) => {
      const runs = await sql`
        SELECT * FROM relay_run
        WHERE run_date = ${run_date} AND team = ${team_name}
      `;
      const team_result: {
        [key: number]: number;
        runners: { [key: number]: string };
        team: string;
        total_time: number;
      } = { runners: {}, team: team_name, total_time: 0 };
      runs.forEach((run) => {
        team_result[run.position] = string_to_seconds(run.time);
        team_result.runners[run.position] = run.name;
        team_result.total_time =
          team_result.total_time + string_to_seconds(run.time);
      });
      return team_result;
    })
  );
  const members_per_team = Math.max(
    ...team_results.map((team) => Object.keys(team.runners).length)
  );

  const data = {
    keys: Array.from({ length: members_per_team }, (_, i) => i + 1),
    members_per_team,
    team_names,
    team_results,
    x_max: Math.max(...team_results.map((team) => team.total_time)),
  };

  return { body: JSON.stringify(data) };
};

export async function getStaticPaths() {
  const runs = await sql`SELECT DISTINCT run_date FROM relay_run`;
  return runs.map((run) => ({
    params: { run_date: run.run_date.toISOString().split("T")[0] },
  }));
}
