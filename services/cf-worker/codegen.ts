import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8686/graphql',
  generates: {
    'generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;
