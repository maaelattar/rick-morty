import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.VITE_RICK_Graphql_ENDPOINT!,
  documents: ["./lib/queries.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};
export default config;
