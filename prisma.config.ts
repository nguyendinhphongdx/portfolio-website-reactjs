import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL for migrations (bypasses connection pooler)
    url: process.env["DIRECT_URL"] || process.env["DATABASE_URL"],
  },
});
