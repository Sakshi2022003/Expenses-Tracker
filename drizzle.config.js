import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString:process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
