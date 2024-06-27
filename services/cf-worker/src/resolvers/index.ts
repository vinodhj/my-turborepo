import { Mutation } from './mutations';
import { Query } from './queries';
import { CfWorkersDataSource } from '@src/datasources';
import { GraphQLError } from 'graphql';
import { enquiry } from 'db/schema';

export const resolvers = {
  Query,
  Mutation,
  Enquiry: {
    selected_services: async (
      { selected_services: ids }: typeof enquiry.$inferSelect,
      _: unknown,
      { datasources: { cfWorkersDataSource } }: { datasources: { cfWorkersDataSource: CfWorkersDataSource } },
    ) => {
      try {
        return cfWorkersDataSource.serviceByIds(ids);
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Failed to fetch services by id', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error,
          },
        });
      }
    },
  },
};
