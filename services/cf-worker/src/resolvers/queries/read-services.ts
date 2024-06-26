import { CfWorkersDataSource } from '@src/datasources';
import { GraphQLError } from 'graphql';

export const services = async (
  __: unknown,
  { ids }: { ids: string[] },
  { datasources: { cfWorkersDataSource } }: { datasources: { cfWorkersDataSource: CfWorkersDataSource } },
) => {
  try {
    if (ids && ids.length > 0) {
      return cfWorkersDataSource.serviceByIds(ids);
    } else {
      return cfWorkersDataSource.allServices();
    }
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Failed to fetch services', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        error,
      },
    });
  }
};
