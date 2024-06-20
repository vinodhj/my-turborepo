import { YogaSchemaDefinition, createYoga } from 'graphql-yoga';
import { CfWorkersDataSource } from './datasources';
import { schema } from './schemas';

export interface YogaInitialContext {
	datasources: {
		cfWorkersDataSource: CfWorkersDataSource;
	};
}

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);
		const datasources = {
			cfWorkersDataSource: new CfWorkersDataSource(),
		};
		const yoga = createYoga({
			schema: schema as YogaSchemaDefinition<object, YogaInitialContext>,
			landingPage: false,
			graphqlEndpoint: '/graphql',
			context: () => ({
				datasources: {
					cfWorkersDataSource: new CfWorkersDataSource(),
				},
			}),
		});

		return yoga.fetch(request);
	},
};
