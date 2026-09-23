import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: true,
  functions: {
    possiblegame: {
      name: "Possible Game API",
      source: "apps/possible-game-api/src/index.ts",
      dev: {
        port: 8787,
      },
    },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      // Run `neon checkout <name>` to create a new branch with these settings
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});
