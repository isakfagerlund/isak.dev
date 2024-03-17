import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as schema from "./schema";

const client = createClient({
  url: "libsql://isak-dev-isakfagerlund.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA2MDk1NjgsImlkIjoiMzJhMTgyNjMtYTMxNy00NzI3LWE1YjAtNTVkN2FlYzg2ZjY1In0.P0SJtIRGUdARNwuGKU4tmsqPKOvlhxE2s5A3gE2RSZHuFYbuARHBANaISbEFVwRVddZi6StvR92R_bYC9HloBA",
});

export const db = drizzle(client, { schema });
