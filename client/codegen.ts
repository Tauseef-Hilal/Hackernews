import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../api/src/graphql/schema/schema.graphql",
  documents: "src/lib/graphql/**/*.ts",
  generates: {
    "src/lib/graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
