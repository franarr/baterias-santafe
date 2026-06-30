import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;

// On Vercel the filesystem is read-only/ephemeral, so a local SQLite file
// cannot persist writes. Require a remote (Turso) URL in production and fail
// loud instead of silently dropping product edits.
if (process.env.NODE_ENV === 'production' && !url) {
  throw new Error(
    'TURSO_DATABASE_URL no está configurado. Definí la base de datos Turso en las variables de entorno de producción (Vercel).'
  );
}

const client = createClient({
  url: url || 'file:./dev.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
