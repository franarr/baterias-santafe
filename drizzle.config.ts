import type { Config } from 'drizzle-kit';
import { readFileSync } from 'fs';
import { join } from 'path';

// drizzle-kit doesn't load .env.local automatically (Next.js does, drizzle-kit doesn't)
try {
  const content = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed.slice(eq + 1).trim();
        if (key && !process.env[key]) process.env[key] = value;
      }
    }
  }
} catch {}

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:./dev.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
