import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "file:./dev.db", // Maglumat bazasynyň ýoly şu taýda bolmaly
  },
});
