import { CfWorkersDataSource } from '@src/datasources';
import { Sort, Sort_By } from 'generated';
import { GraphQLError } from 'graphql';

export const enquiries = async (
  __: unknown,
  { ids, first, after, sort, sort_by }: { ids: string[]; first: number; after: string; sort: Sort; sort_by: Sort_By },
  { datasources: { cfWorkersDataSource } }: { datasources: { cfWorkersDataSource: CfWorkersDataSource } },
) => {
  try {
    if (ids && ids.length > 0) {
      return cfWorkersDataSource.enquiryByIds(ids);
    }
    return cfWorkersDataSource.allEnquiries({ first, after, sort, sort_by });
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
