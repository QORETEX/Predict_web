import { defineConfig } from "orval";

export default defineConfig({
  predict: {
    input: {
      target: "http://localhost:8000/api/schema/",
    },
    output: {
      mode: "tags-split",
      target: "src/lib/api/generated",
      schemas: "src/lib/api/generated/schemas",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/lib/api/client.ts",
          name: "api",
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
});
