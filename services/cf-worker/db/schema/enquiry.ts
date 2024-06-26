import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export type json_test = {
  msg: string;
  status: string;
};

export const enquiry = sqliteTable('enquiry', {
  id: text('id').primaryKey(), // nano id
  email: text('email').notNull(),
  message: text('message'),
  selected_services: text('selected_services', { mode: 'json' }).$type<string[]>().notNull(),
  json_text: text('json_text', { mode: 'json' }).$type<json_test>().notNull(),
  created_at: integer('created_at', { mode: 'timestamp_ms' })
    .$default(() => new Date())
    .notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp_ms' })
    .$default(() => new Date())
    .notNull(),
});
