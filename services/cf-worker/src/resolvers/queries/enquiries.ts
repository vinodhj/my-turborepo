import { CfWorkersDataSource } from '@src/datasources';
import { GraphQLError } from 'graphql';

export const enquiries = async (
  __: unknown,
  { ids }: { ids: string[] },
  { datasources: { cfWorkersDataSource } }: { datasources: { cfWorkersDataSource: CfWorkersDataSource } },
) => {
  try {
    if (ids && ids.length > 0) {
      return cfWorkersDataSource.enquiryByIds(ids);
    } else {
      return cfWorkersDataSource.allEnquiries();
    }
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Failed to fetch enquiries', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        error,
      },
    });
  }
};
