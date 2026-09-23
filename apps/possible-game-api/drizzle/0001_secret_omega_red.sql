DELETE FROM "possible_game_attempts"
WHERE "id" IN (
	SELECT "id"
	FROM (
		SELECT
			"id",
			row_number() OVER (
				PARTITION BY "user_id"
				ORDER BY "started_at" DESC, "id" DESC
			) AS "row_number"
		FROM "possible_game_attempts"
		WHERE "completed_at" IS NULL
	) AS "open_attempts"
	WHERE "row_number" > 1
);
--> statement-breakpoint
CREATE UNIQUE INDEX "possible_game_attempts_one_open_per_user_idx" ON "possible_game_attempts" USING btree ("user_id") WHERE "possible_game_attempts"."completed_at" is null;