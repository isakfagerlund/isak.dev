import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "turso",
  verbose: true,
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_TOKEN,
  },
  tablesFilter: ["isak.dev_*"],
  out: "drizzle",
} satisfies Config;
