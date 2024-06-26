import { CfWorkersDataSource } from '@src/datasources';
import { SubmitEnquiryInput } from 'generated';
import { GraphQLError } from 'graphql';

export const submitEnquiry = async (
  __: unknown,
  { input }: { input: SubmitEnquiryInput },

  { datasources: { cfWorkersDataSource } }: { datasources: { cfWorkersDataSource: CfWorkersDataSource } },
) => {
  try {
    return cfWorkersDataSource.submitEnquiry(input);
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
