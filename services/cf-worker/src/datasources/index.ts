import DataLoader from 'dataloader';
import { enquiry, service } from 'db/schema';
import { inArray } from 'drizzle-orm';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { CreateServiceInput, SubmitEnquiryInput } from 'generated';
import { GraphQLError } from 'graphql';
import { nanoid } from 'nanoid';

export class CfWorkersDataSource {
  private db: DrizzleD1Database;
  private serviceLoader;

  constructor({ db }: { db: DrizzleD1Database }) {
    this.db = db;
    this.serviceLoader = new DataLoader(async (ids: readonly string[]) => {
      // batch fetch
      return this.servicesByBatchIds(ids as string[]);
    });
  }

  async submitEnquiry(input: SubmitEnquiryInput) {
    try {
      return this.db
        .insert(enquiry)
        .values({
          id: nanoid(),
          ...input,
        })
        .returning()
        .get();
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to submit enquiry', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }

  async createService(input: CreateServiceInput) {
    try {
      return this.db
        .insert(service)
        .values({
          id: nanoid(),
          ...input,
        })
        .returning()
        .get();
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

  async serviceByIds(ids: string[]) {
    return this.serviceLoader.loadMany(ids);
  }

  async servicesByBatchIds(ids: string[]) {
    try {
      const result = await this.db.select().from(service).where(inArray(service.id, ids)).execute();
      if (!result) {
        return [];
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to fetch services by batch ids', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }

  async allServices() {
    try {
      const result = await this.db.select().from(service).execute();
      // TODO: pagination
      if (!result) {
        return [];
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to fetch services', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }

  async enquiryByIds(ids: string[]) {
    try {
      const result = await this.db.select().from(enquiry).where(inArray(enquiry.id, ids)).execute();
      if (!result) {
        return [];
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to fetch enquiries by ids', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }

  async allEnquiries() {
    try {
      const result = await this.db.select().from(enquiry).execute();
      // TODO: pagination
      if (!result) {
        return [];
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to fetch enquiries', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }
}
