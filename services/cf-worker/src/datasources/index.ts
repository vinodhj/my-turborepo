import DataLoader from 'dataloader';
import { enquiry, service } from 'db/schema';
import { SQLWrapper, asc, desc, inArray, gt, lt } from 'drizzle-orm';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { CreateServiceInput, Sort, Sort_By, SubmitEnquiryInput } from 'generated';
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

  async allServices({
    first = 10,
    sort = Sort.Desc,
    sort_by = Sort_By.CreatedAt,
    after,
  }: {
    first?: number;
    sort?: Sort;
    sort_by?: Sort_By;
    after?: string;
  }) {
    try {
      // Fetch all the services with pagination
      const services_result = await this.db
        .select()
        .from(service)
        .orderBy(this.sorter(sort_by === Sort_By.CreatedAt ? service.created_at : service.updated_at, sort))
        .where(
          sort === Sort.Asc
            ? gt(sort_by === Sort_By.CreatedAt ? service.created_at : service.updated_at, after ? new Date(after) : new Date(0))
            : lt(sort_by === Sort_By.CreatedAt ? service.created_at : service.updated_at, after ? new Date(after) : new Date()),
        )
        .limit(first)
        .execute();

      // Convert services to edges
      const edges = services_result.map((nt) => ({
        cursor: nt.updated_at.toISOString(),
        node: nt as typeof service.$inferSelect,
      }));

      const hasNextPage = services_result.length >= first;

      return {
        edges,
        pageInfo: {
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
          hasNextPage,
        },
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to fetch all services with pagination', {
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

  async allEnquiries({
    first = 10,
    sort = Sort.Desc,
    sort_by = Sort_By.CreatedAt,
    after,
  }: {
    first?: number;
    sort?: Sort;
    sort_by?: Sort_By;
    after?: string;
  }) {
    try {
      // Fetch all the enquiries with pagination
      const enquiries_result = await this.db
        .select()
        .from(enquiry)
        .orderBy(this.sorter(sort_by === Sort_By.CreatedAt ? enquiry.created_at : enquiry.updated_at, sort))
        .where(
          sort === Sort.Asc
            ? gt(sort_by === Sort_By.CreatedAt ? enquiry.created_at : enquiry.updated_at, after ? new Date(after) : new Date(0))
            : lt(sort_by === Sort_By.CreatedAt ? enquiry.created_at : enquiry.updated_at, after ? new Date(after) : new Date()),
        )
        .limit(first)
        .execute();

      // Convert enquiries to edges
      const edges = enquiries_result.map((nt) => ({
        cursor: nt.updated_at!.toISOString(),
        node: nt as typeof enquiry.$inferSelect,
      }));

      const hasNextPage = enquiries_result.length >= first;

      return {
        edges,
        pageInfo: {
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
          hasNextPage,
        },
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to fetch all enquiries with pagination', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        },
      });
    }
  }

  private sorter(field: SQLWrapper, sort: Sort) {
    if (sort === Sort.Asc) {
      return asc(field);
    }
    return desc(field);
  }
}
