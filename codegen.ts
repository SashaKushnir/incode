import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {

      [process.env.API_URL as string]: {
      //   headers: {
      //     "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
      //     "X-Hasura-Role": "user"
      //   }
      }
    }
  ],
  documents: ["./src/api/*.graphql"],
  overwrite: true,
  generates: {
    "./src/api/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client"
      }
    }
  }
};

export default config