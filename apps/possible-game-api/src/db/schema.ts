import { sql } from "drizzle-orm";
import {
  bigint,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const gameProfiles = pgTable("possible_game_profiles", {
  userId: text("user_id").primaryKey(),
  displayName: text("display_name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const gameStats = pgTable(
  "possible_game_stats",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => gameProfiles.userId, { onDelete: "cascade" }),
    attempts: integer("attempts").default(0).notNull(),
    finishes: integer("finishes").default(0).notNull(),
    currentStreak: integer("current_streak").default(0).notNull(),
    longestStreak: integer("longest_streak").default(0).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    check("possible_game_stats_attempts_check", sql`${table.attempts} >= 0`),
    check("possible_game_stats_finishes_check", sql`${table.finishes} >= 0`),
    check(
      "possible_game_stats_finishes_attempts_check",
      sql`${table.finishes} <= ${table.attempts}`,
    ),
    check("possible_game_stats_current_streak_check", sql`${table.currentStreak} >= 0`),
    check(
      "possible_game_stats_longest_streak_check",
      sql`${table.longestStreak} >= ${table.currentStreak}`,
    ),
  ],
);

export const gameAttempts = pgTable(
  "possible_game_attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => gameProfiles.userId, { onDelete: "cascade" }),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    result: text("result"),
  },
  (table) => [
    index("possible_game_attempts_user_started_idx").on(table.userId, table.startedAt),
    uniqueIndex("possible_game_attempts_one_open_per_user_idx")
      .on(table.userId)
      .where(sql`${table.completedAt} is null`),
    check(
      "possible_game_attempts_result_check",
      sql`${table.result} is null or ${table.result} in ('died', 'finished')`,
    ),
  ],
);

export const gameEvents = pgTable(
  "possible_game_events",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    userId: text("user_id").notNull(),
    displayName: text("display_name").notNull(),
    result: text("result").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("possible_game_events_created_idx").on(table.createdAt),
    check("possible_game_events_result_check", sql`${table.result} in ('died', 'finished')`),
  ],
);

export const gamePresence = pgTable(
  "possible_game_presence",
  {
    connectionId: uuid("connection_id").primaryKey(),
    userId: text("user_id").notNull(),
    displayName: text("display_name").notNull(),
    connectedAt: timestamp("connected_at", { withTimezone: true }).defaultNow().notNull(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("possible_game_presence_last_seen_idx").on(table.lastSeenAt),
    index("possible_game_presence_user_idx").on(table.userId),
  ],
);
