import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  model: text('model').notNull(),
  price: text('price').notNull(),
  priceNumber: real('price_number').notNull().default(0),
  tag: text('tag').notNull().default(''),
  category: text('category').notNull(),
  categoryLabel: text('category_label').notNull(),
  image: text('image').notNull().default(''),
  voltage: text('voltage').notNull().default('12V'),
  amperage: text('amperage').notNull().default(''),
  cca: text('cca').notNull().default(''),
  warranty: text('warranty').notNull().default(''),
  warrantyMonths: integer('warranty_months').notNull().default(12),
  technology: text('technology').notNull().default(''),
  dimensions: text('dimensions').notNull().default(''),
  weight: text('weight').notNull().default(''),
  vehicles: text('vehicles').notNull().default('[]'),
  description: text('description').notNull().default(''),
  features: text('features').notNull().default('[]'),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type ParsedProduct = Omit<Product, 'vehicles' | 'features'> & {
  vehicles: string[];
  features: string[];
};

export function parseProduct(p: Product): ParsedProduct {
  return {
    ...p,
    vehicles: JSON.parse(p.vehicles || '[]'),
    features: JSON.parse(p.features || '[]'),
  };
}
