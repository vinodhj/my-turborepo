import { service } from 'db/schema';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { CreateServiceInput } from 'generated';
import { GraphQLError } from 'graphql';
import { nanoid } from 'nanoid';

export class CfWorkersDataSource {
  private db: DrizzleD1Database;

  constructor({ db }: { db: DrizzleD1Database }) {
    this.db = db;
  }

  async createService(input: CreateServiceInput) {
    try {
      const result = await this.db
        .insert(service)
        .values({
          id: nanoid(),
          ...input,
        })
        .returning()
        .get();
      console.log(result);
      if (!result) {
        throw new GraphQLError('Failed to create service');
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to create service', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }
}
