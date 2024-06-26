import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const service = sqliteTable('service', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  created_at: integer('created_at', { mode: 'timestamp_ms' })
    .$default(() => new Date())
    .notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' })
    .$default(() => new Date())
    .notNull(),
});
