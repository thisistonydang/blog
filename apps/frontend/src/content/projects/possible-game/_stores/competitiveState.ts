import { writable } from "svelte/store";

export type CompetitiveUser = {
  id: string;
  name: string;
  email: string | undefined;
};

export type CompetitiveStats = {
  attempts: number;
  finishes: number;
  currentStreak: number;
  longestStreak: number;
  finishRate: number;
};

export type LeaderboardEntry = CompetitiveStats & {
  userId: string;
  displayName: string;
  rank: number;
};

export type Leaderboard = {
  leaders: LeaderboardEntry[];
  current: LeaderboardEntry | null;
};

export type OnlinePlayer = {
  userId: string;
  displayName: string;
};

export type GameToast = {
  id: number;
  message: string;
};

export const emptyStats: CompetitiveStats = {
  attempts: 0,
  finishes: 0,
  currentStreak: 0,
  longestStreak: 0,
  finishRate: 0,
};

export const authStatus = writable<"checking" | "signed_out" | "signed_in" | "error">("checking");
export const competitiveUser = writable<CompetitiveUser | null>(null);
export const competitiveStats = writable<CompetitiveStats>(emptyStats);
export const leaderboard = writable<Leaderboard>({ leaders: [], current: null });
export const onlineCount = writable(0);
export const onlinePlayers = writable<OnlinePlayer[]>([]);
export const competitiveError = writable("");
export const activeAttemptId = writable<string | null>(null);
export const attemptStarting = writable(false);
export const resultSubmitting = writable(false);
export const gameToasts = writable<GameToast[]>([]);

let nextToastId = 1;

export function addGameToast(message: string): void {
  const id = nextToastId++;
  gameToasts.update((toasts) => [...toasts, { id, message }]);
  setTimeout(() => {
    gameToasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }, 5000);
}
