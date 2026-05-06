import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "file:./dev.db", // Maglumat bazasynyň ýoly hökman şu taýda bolmaly
  },
});
