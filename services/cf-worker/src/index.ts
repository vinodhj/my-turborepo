import { YogaSchemaDefinition, createYoga } from 'graphql-yoga';
import { CfWorkersDataSource } from './datasources';
import { schema } from './schemas';
import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  DB: D1Database;
}

export interface YogaInitialContext {
  datasources: {
    cfWorkersDataSource: CfWorkersDataSource;
  };
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const db = drizzle(env.DB);
    const datasources = {
      cfWorkersDataSource: new CfWorkersDataSource({ db }),
    };

    const yoga = createYoga({
      schema: schema as YogaSchemaDefinition<object, YogaInitialContext>,
      landingPage: false,
      graphqlEndpoint: '/graphql',
      context: () => ({
        datasources: {
          cfWorkersDataSource: new CfWorkersDataSource({ db }),
        },
      }),
    });

    return yoga.fetch(request);
  },
};
