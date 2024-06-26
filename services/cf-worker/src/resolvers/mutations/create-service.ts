import { CfWorkersDataSource } from '@src/datasources';
import { CreateServiceInput } from 'generated';
import { GraphQLError } from 'graphql';

export const createService = async (
  __: unknown,
  { input }: { input: CreateServiceInput },

  { datasources: { cfWorkersDataSource } }: { datasources: { cfWorkersDataSource: CfWorkersDataSource } },
) => {
  try {
    return cfWorkersDataSource.createService(input);
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Failed to create service', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        error,
      },
    });
  }
};
